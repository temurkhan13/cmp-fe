import './common.scss';

const SkeletonCard = ({ count = 3 }) => {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-line skeleton-line--icon" />
          <div className="skeleton-line skeleton-line--title" />
          <div className="skeleton-line skeleton-line--text" />
          <div className="skeleton-line skeleton-line--text skeleton-line--short" />
        </div>
      ))}
    </div>
  );
};

const SkeletonList = ({ rows = 5 }) => {
  return (
    <div className="skeleton-list">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton-list-item">
          <div className="skeleton-line skeleton-line--icon" />
          <div className="skeleton-list-item-content">
            <div className="skeleton-line skeleton-line--title" />
            <div className="skeleton-line skeleton-line--text skeleton-line--short" />
          </div>
        </div>
      ))}
    </div>
  );
};

const SkeletonStatCards = () => {
  return (
    <div className="skeleton-stats">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="skeleton-stat-card">
          <div className="skeleton-line skeleton-line--stat-icon" />
          <div className="skeleton-line skeleton-line--stat-text" />
        </div>
      ))}
    </div>
  );
};

export { SkeletonCard, SkeletonList, SkeletonStatCards };
