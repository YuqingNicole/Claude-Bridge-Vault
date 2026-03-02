import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: { track: string } }
) {
  const track = params.track; // botearn or private
  const subKey = req.headers.get('x-api-key');
  
  // TODO: 生产环境应从 Redis 或数据库读取映射
  const MASTER_KEY = process.env.CLAUDE_MASTER_KEY;

  // 极简模拟校验：实际逻辑应匹配数据库中的 Sub-Key
  if (!subKey || !subKey.includes(track)) {
    return NextResponse.json({ error: 'Unauthorized Track' }, { status: 401 });
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': MASTER_KEY || '',
      'anthropic-version': '2023-06-01'
    },
    body: await req.text()
  });

  const data = await response.json();
  return NextResponse.json(data);
}
