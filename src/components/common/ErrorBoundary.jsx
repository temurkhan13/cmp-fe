import { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import './common.scss';

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
        <div className="error-boundary">
          <div className="error-boundary__icon">
            &#9888;
          </div>
          <h1 className="error-boundary__title">
            Something went wrong
          </h1>
          <p className="error-boundary__message">
            An unexpected error occurred. Please try refreshing the page or go back to the dashboard.
          </p>
          <div className="error-boundary__actions">
            <Button
              variant="primary"
              className="error-boundary__btn-primary"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </Button>
            <Link to="/dashboard" className="error-boundary__btn-secondary">
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
