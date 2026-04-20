import { Link } from 'react-router-dom';
import './common.scss';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1 className="not-found__code">
        404
      </h1>
      <h2 className="not-found__title">
        Page not found
      </h2>
      <p className="not-found__message">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="not-found__actions">
        <Link to="/" className="not-found__btn-primary">
          Go Home
        </Link>
        <Link to="/dashboard" className="not-found__btn-secondary">
          Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
