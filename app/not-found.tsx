import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Page not found</p>
      <Link
        href="/"
        style={{
          padding: '0.75rem 1.5rem',
          background: '#1a1814',
          color: '#faf7f2',
          textDecoration: 'none',
          borderRadius: '4px',
          display: 'inline-block',
        }}
      >
        Return home
      </Link>
    </div>
  );
}
