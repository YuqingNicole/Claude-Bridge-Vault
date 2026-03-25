'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ padding: '48px', fontFamily: 'monospace', color: '#ef4444' }}>
      <h2 style={{ fontSize: '18px', marginBottom: '12px' }}>Something went wrong</h2>
      <pre style={{ background: '#1a1a1a', color: '#f87171', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}>
        {error.message}
      </pre>
      <p style={{ marginTop: '16px', color: '#888', fontSize: '13px' }}>
        Likely cause: missing environment variables (Redis / API keys not configured in Vercel).
      </p>
      <button
        onClick={reset}
        style={{ marginTop: '16px', padding: '8px 16px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
      >
        Try again
      </button>
    </div>
  );
}
