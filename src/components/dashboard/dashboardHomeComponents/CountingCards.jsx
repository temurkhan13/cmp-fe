// import PropTypes from 'prop-types';

const CountingCards = ({ activeWorkspace, totalWorkspaces, totalProjects }) => {
  const activeWorkspaceName = activeWorkspace || 'No Active Workspace';

  const cardData = [
    { title: 'Active Workspace', count: activeWorkspaceName },
    { title: 'Total Workspaces', count: totalWorkspaces },
    { title: 'Projects', count: totalProjects },
  ];

  return (
    <div className="counting-cards">
      {cardData.map((card, index) => (
        <div key={index} className="dashboard-card">
          <div
            className="counts"
            style={{
              fontSize: `${String(card.count).length > 3 ? '2.8rem' : '5rem'}`,
            }}
          >
            {card.count || 0}
          </div>
          <div className="count-heading">
            <div>{card.title}</div>
          </div>
        </div>
      ))}

      <style>{`
        .counting-cards {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin: 1rem 2.3rem;
        }

        @media screen and (max-width: 1240px) {
          .counting-cards {
            gap: 1.5rem;
          }
        }

        .dashboard-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          width: 40rem;
          height: 15rem;
          background-color: white;
          border: 1px solid black;
          border-radius: 2rem;
          transition: background-color 0.2s ease-in-out;
        }

        @media screen and (max-width: 1240px) {
          .dashboard-card {
            width: 100%;
            height: 20rem;
          }
        }

        .count-heading {
          font-size: 2rem;
          font-weight: 500;
          text-align: center;
        }

        .counts {
          font-weight: 700;
          color: black;
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
};

// CountingCards.propTypes = {
//   activeWorkspace: PropTypes.string.isRequired,
//   totalWorkspaces: PropTypes.number.isRequired,
//   totalProjects: PropTypes.number.isRequired,
// };

export default CountingCards;
