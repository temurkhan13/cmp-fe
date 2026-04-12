import { Component } from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log to console in development only
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          padding: '2rem',
          textAlign: 'center',
          fontFamily: 'Poppins, sans-serif',
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.3 }}>
            &#9888;
          </div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 600, marginBottom: '0.5rem', color: '#111' }}>
            Something went wrong
          </h1>
          <p style={{ fontSize: '1.4rem', color: '#6b7280', marginBottom: '2rem', maxWidth: '400px' }}>
            An unexpected error occurred. Please try refreshing the page or go back to the dashboard.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '0.75rem 2rem',
                background: '#C3E11D',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1.4rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Refresh Page
            </button>
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
              Go to Dashboard
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
