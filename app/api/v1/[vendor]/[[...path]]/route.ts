import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import { isValidVendor } from '@/lib/vendors';
import { buildUpstreamRequest } from '@/lib/proxy';
import { extractTokenUsage, estimateVendorCostUsd, safeModelFromBody } from '@/lib/billing';

type RouteContext = {
  params: Promise<{ vendor: string; path?: string[] }>;
};

const parseKeyRecord = (value: unknown) => {
  if (!value) return null;
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch (error) {
      console.error('Failed to parse key record', error);
      return null;
    }
  }
  return value;
};

function isStreaming(rawBody: string): boolean {
  try {
    return JSON.parse(rawBody)?.stream === true;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest, context: RouteContext) {
  const { vendor } = await context.params;

  if (!isValidVendor(vendor)) {
    return NextResponse.json({ error: 'Unknown vendor' }, { status: 404 });
  }

  const subKey = req.headers.get('x-api-key');
  const masterKeys = (process.env[`${vendor.toUpperCase()}_MASTER_KEY`] ?? '')
    .split(',').map(k => k.trim()).filter(Boolean);

  if (masterKeys.length === 0) {
    console.error(`Missing ${vendor.toUpperCase()}_MASTER_KEY environment variable`);
    return NextResponse.json({ error: 'Service misconfigured' }, { status: 500 });
  }

  if (!subKey) {
    return NextResponse.json({ error: 'Missing API Key' }, { status: 401 });
  }

  try {
    const keyDataStr = await redis.hget('vault:subkeys', subKey);
    const keyData = parseKeyRecord(keyDataStr);

    if (!keyData || (keyData as { vendor?: string }).vendor !== vendor) {
      return NextResponse.json({ error: 'Invalid or mismatched key' }, { status: 403 });
    }

    const kd = keyData as { expiresAt?: string | null; totalQuota?: number | null; usage?: number };

    if (kd.expiresAt && new Date(kd.expiresAt) < new Date()) {
      return NextResponse.json({ error: 'Key expired' }, { status: 403 });
    }

    if (kd.totalQuota !== null && kd.totalQuota !== undefined) {
      if ((kd.usage ?? 0) >= kd.totalQuota) {
        return NextResponse.json({ error: 'Quota exceeded' }, { status: 429 });
      }
    }

    const rawBody = await req.text();
    const model = safeModelFromBody(rawBody);
    const streaming = isStreaming(rawBody);

    const upstream = buildUpstreamRequest(vendor, masterKeys[0], rawBody);
    console.log(`[proxy] ${vendor} key=${subKey.slice(-8)} model=${model ?? '?'} stream=${streaming} → ${upstream.url}`);

    const response = await fetch(upstream.url, {
      method: 'POST',
      headers: upstream.headers,
      body: upstream.body,
    });

    // Increment usage + log (fire-and-forget, don't block streaming)
    if (response.ok) {
      const now = new Date().toISOString();
      const updated = {
        ...keyData,
        usage: ((keyData as { usage?: number }).usage || 0) + 1,
        lastUsed: now,
      };
      void redis.hset('vault:subkeys', { [subKey]: JSON.stringify(updated) });

      const today = now.slice(0, 10);
      void redis.incr(`vault:daily:calls:${today}`)
        .then(() => redis.expire(`vault:daily:calls:${today}`, 35 * 24 * 3600))
        .catch((err) => console.warn('[analytics] daily counter failed', err));
    } else {
      console.warn(`[proxy] ${vendor} key=${subKey.slice(-8)} ✗ HTTP ${response.status}`);
    }

    // Stream: pipe SSE directly through
    if (streaming && response.body) {
      const headers = new Headers();
      headers.set('Content-Type', response.headers.get('Content-Type') ?? 'text/event-stream');
      headers.set('Cache-Control', 'no-cache');
      headers.set('Transfer-Encoding', 'chunked');
      return new Response(response.body, {
        status: response.status,
        headers,
      });
    }

    // Non-stream: parse JSON, update token/cost stats
    const data = await response.json() as Record<string, unknown>;

    if (response.ok) {
      const tokenUsage = extractTokenUsage(vendor, data);
      const inputInc = tokenUsage?.inputTokens ?? 0;
      const outputInc = tokenUsage?.outputTokens ?? 0;
      const costInc = tokenUsage ? estimateVendorCostUsd(vendor, model, tokenUsage) : 0;

      console.log(`[proxy] ${vendor} key=${subKey.slice(-8)} ✓ in=${inputInc} out=${outputInc} cost=$${costInc.toFixed(6)}`);

      const keyDataStr2 = await redis.hget('vault:subkeys', subKey);
      const latest = parseKeyRecord(keyDataStr2) ?? keyData;
      const updated = {
        ...latest,
        inputTokens: ((latest as { inputTokens?: number }).inputTokens || 0) + inputInc,
        outputTokens: ((latest as { outputTokens?: number }).outputTokens || 0) + outputInc,
        costUsd: ((latest as { costUsd?: number }).costUsd || 0) + costInc,
      };
      void redis.hset('vault:subkeys', { [subKey]: JSON.stringify(updated) });
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error(`[proxy] ${vendor} key=${subKey.slice(-8)} fatal`, error);
    return NextResponse.json({ error: 'Proxy Error' }, { status: 500 });
  }
}
