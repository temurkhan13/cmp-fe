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
      <style>{`
        .skeleton-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
          padding: 1.5rem 0;
          padding-top: 0;
        }

        .skeleton-card {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 12px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .skeleton-line {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 6px;
        }

        .skeleton-line--icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
        }

        .skeleton-line--title {
          width: 60%;
          height: 16px;
        }

        .skeleton-line--text {
          width: 90%;
          height: 12px;
        }

        .skeleton-line--short {
          width: 40%;
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};

const SkeletonList = ({ rows = 5 }) => {
  return (
    <div className="skeleton-list">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton-list-item">
          <div className="skeleton-line skeleton-line--icon" />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div className="skeleton-line skeleton-line--title" />
            <div className="skeleton-line skeleton-line--text skeleton-line--short" />
          </div>
        </div>
      ))}
      <style>{`
        .skeleton-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding: 1rem 2rem;
        }

        .skeleton-list-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 12px;
        }
      `}</style>
    </div>
  );
};

const SkeletonStatCards = () => {
  return (
    <div className="skeleton-stats">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="skeleton-stat-card">
          <div className="skeleton-line" style={{ width: '60px', height: '40px', borderRadius: '8px' }} />
          <div className="skeleton-line" style={{ width: '80%', height: '14px', borderRadius: '6px' }} />
        </div>
      ))}
      <style>{`
        .skeleton-stats {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin: 1rem 2.3rem;
        }

        .skeleton-stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          padding: 2rem;
          width: 100%;
          height: 15rem;
          background: white;
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }
      `}</style>
    </div>
  );
};

export { SkeletonCard, SkeletonList, SkeletonStatCards };
