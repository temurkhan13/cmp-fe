import PropTypes from 'prop-types';

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
              fontSize: `${String(card.count).length > 3 ? '2.5rem' : '3rem'}`,
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
          margin: 2rem 2.3rem;
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
          background-color: #C3E11D;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02);
          transition: all 0.2s ease;
        }

        .dashboard-card:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
          transform: translateY(-1px);
        }

        @media screen and (max-width: 1240px) {
          .dashboard-card {
            width: 100%;
            height: 20rem;
          }
        }

        .count-heading {
          font-size: 1.5rem;
          font-weight: 500;
          text-align: center;
        }

        .counts {
          font-weight: 700;
          color: black;
          margin-bottom: 1rem;
        }

        @media (max-width: 1080px) {
          .counting-cards {
            flex-wrap: wrap;
          }
          .dashboard-card {
            width: calc(50% - 0.5rem);
            height: 12rem;
          }
        }

        @media (max-width: 600px) {
          .counting-cards {
            flex-direction: column;
            margin: 1.5rem 1rem;
          }
          .dashboard-card {
            width: 100%;
            height: 10rem;
          }
          .counts {
            font-size: 2rem !important;
          }
          .count-heading {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </div>
  );
};

CountingCards.propTypes = {
  activeWorkspace: PropTypes.string.isRequired,
  totalWorkspaces: PropTypes.number.isRequired,
  totalProjects: PropTypes.number.isRequired,
};

export default CountingCards;
