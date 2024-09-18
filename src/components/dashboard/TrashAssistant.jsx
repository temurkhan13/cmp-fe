const TrashAssistant = () => {
  const trashItems = [
    { id: 1, name: 'File A', type: 'Document', dateDeleted: '2024-09-01' },
    { id: 2, name: 'File B', type: 'Image', dateDeleted: '2024-09-02' },
    { id: 3, name: 'File C', type: 'Video', dateDeleted: '2024-09-03' },
  ];

  return (
    <div className="trash-assisstant-container">
      {trashItems.map((item) => (
        <div className="trash-card" key={item.id}>
          <h3>{item.name}</h3>
          <p>Type: {item.type}</p>
          <p>Date Deleted: {item.dateDeleted}</p>
        </div>
      ))}

      <style>{`
        .trash-assisstant-container {
          display: flex;
          gap: 20px;
          padding: 20px;
          align-items:start;
          justify-content: flex-start;
        }
        .trash-card {
          background-color: #f8f8f8;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          text-align: center;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          &:hover{
          transform: translateY(-5px);
          }
        }
          
        .trash-card h3 {
          margin: 0;
          font-size: 1.5rem;
          color: #333;
        }
        .trash-card p {
          margin: 5px 0;
          font-size: 1.3rem;
          color: #666;
        }
      `}</style>
    </div>
  );
};

export default TrashAssistant;
