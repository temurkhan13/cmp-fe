const TrashAssessment = () => {
  const assessments = [
    {
      id: 1,
      title: 'Assessment 1',
      subject: 'Math',
      dateDeleted: '2024-09-05',
    },
    {
      id: 2,
      title: 'Assessment 2',
      subject: 'Science',
      dateDeleted: '2024-09-10',
    },
    {
      id: 3,
      title: 'Assessment 3',
      subject: 'History',
      dateDeleted: '2024-09-15',
    },
  ];

  return (
    <div className="assessment-container">
      {assessments.map((assessment) => (
        <div className="assessment-card" key={assessment.id}>
          <h3>{assessment.title}</h3>
          <p>Subject: {assessment.subject}</p>
          <p>Date Deleted: {assessment.dateDeleted}</p>
        </div>
      ))}

      <style>{`
        .assessment-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          padding: 20px;
        }
        .assessment-card {
          background-color: #f8f8f8;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .assessment-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }
        .assessment-card h3 {
          margin-bottom: 10px;
          font-size: 1.5rem;
          color: #333;
        }
        .assessment-card p {
          margin: 5px 0;
          font-size: 1.3rem;
          color: #666;
        }
      `}</style>
    </div>
  );
};

export default TrashAssessment;
