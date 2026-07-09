'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1>Something went wrong</h1>
      <p style={{ marginTop: '1rem', marginBottom: '2rem' }}>{error.message}</p>
      <button
        onClick={reset}
        style={{
          padding: '0.5rem 1rem',
          background: '#1a1814',
          color: '#faf7f2',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '4px',
        }}
      >
        Try again
      </button>
    </div>
  );
}
