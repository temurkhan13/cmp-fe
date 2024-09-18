const TrashSitemap = () => {
  const sitemaps = [
    { id: 1, name: 'Home Page', type: 'Landing', dateDeleted: '2024-09-05' },
    { id: 2, name: 'About Us', type: 'Content', dateDeleted: '2024-09-10' },
    { id: 3, name: 'Contact Page', type: 'Form', dateDeleted: '2024-09-15' },
  ];

  return (
    <div className="sitemap-container">
      {sitemaps.map((sitemap) => (
        <div className="sitemap-card" key={sitemap.id}>
          <h3>{sitemap.name}</h3>
          <p>Type: {sitemap.type}</p>
          <p>Date Deleted: {sitemap.dateDeleted}</p>
        </div>
      ))}

      <style>{`
        .sitemap-container {
          display: flex;
          // grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          padding: 20px;
        }
        .sitemap-card {
          background-color: #f8f8f8;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          text-align: center;
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }
        .sitemap-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
        .sitemap-card h3 {
          margin-bottom: 10px;
          font-size: 1.5rem;
          color: #333;
        }
        .sitemap-card p {
          margin: 5px 0;
          font-size: 1.3rem;
          color: #777;
        }
      `}</style>
    </div>
  );
};

export default TrashSitemap;
