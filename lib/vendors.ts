import type { VendorId, VendorConfig } from './types';

export const VENDOR_CONFIG: Record<VendorId, VendorConfig> = {
  claude: {
    label: 'Claude',
    endpoint: 'https://api.anthropic.com/v1/messages',
    authStyle: 'x-api-key',
    envKey: 'CLAUDE_MASTER_KEY',
    keyPrefix: 'claude',
    basePath: '/api/v1/claude',
  },
  youragent: {
    label: 'YourAgent',
    endpoint: 'https://your-agent.cc/api/v1/messages',
    authStyle: 'x-api-key',
    envKey: 'YOURAGENT_MASTER_KEY',
    keyPrefix: 'youragent',
    basePath: '/api/v1/youragent',
  },
};

// Available models per vendor (label shown in UI, value sent to upstream API)
// Verified against live APIs on 2026-03-18
export const VENDOR_MODELS: Record<VendorId, { label: string; value: string; group?: string }[]> = {
  claude: [
    { label: 'Claude Opus 4.6', value: 'claude-opus-4-6' },
    { label: 'Claude Sonnet 4.6', value: 'claude-sonnet-4-6' },
    { label: 'Claude Haiku 4.5', value: 'claude-haiku-4-5-20251001' },
    { label: 'Claude Sonnet 4', value: 'claude-sonnet-4-20250514' },
    { label: 'Claude Opus 4', value: 'claude-opus-4-20250514' },
  ],
  youragent: [
    { label: 'Claude Opus 4.6', value: 'claude-opus-4-6' },
    { label: 'Claude Sonnet 4.6', value: 'claude-sonnet-4-6' },
    { label: 'Claude Haiku 4.5', value: 'claude-haiku-4-5-20251001' },
    { label: 'Claude Sonnet 4', value: 'claude-sonnet-4-20250514' },
  ],
};

export function isValidVendor(v: unknown): v is VendorId {
  return v === 'claude' || v === 'youragent';
}
