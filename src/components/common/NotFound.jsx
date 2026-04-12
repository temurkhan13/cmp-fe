import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      padding: '2rem',
      textAlign: 'center',
      fontFamily: 'Poppins, sans-serif',
    }}>
      <h1 style={{
        fontSize: '8rem',
        fontWeight: 900,
        color: '#C3E11D',
        lineHeight: 1,
        marginBottom: '0.5rem',
      }}>
        404
      </h1>
      <h2 style={{ fontSize: '2.4rem', fontWeight: 600, marginBottom: '0.5rem', color: '#111' }}>
        Page not found
      </h2>
      <p style={{ fontSize: '1.4rem', color: '#6b7280', marginBottom: '2rem', maxWidth: '400px' }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link
          to="/"
          style={{
            padding: '0.75rem 2rem',
            background: '#C3E11D',
            border: 'none',
            borderRadius: '10px',
            fontSize: '1.4rem',
            fontWeight: 600,
            textDecoration: 'none',
            color: '#111',
          }}
        >
          Go Home
        </Link>
        <Link
          to="/dashboard"
          style={{
            padding: '0.75rem 2rem',
            background: '#f0f0f0',
            border: 'none',
            borderRadius: '10px',
            fontSize: '1.4rem',
            fontWeight: 600,
            textDecoration: 'none',
            color: '#111',
          }}
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
