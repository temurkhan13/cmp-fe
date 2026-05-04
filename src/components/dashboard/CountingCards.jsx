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
            className="counting-cards-count"
            style={{
              '--count-font': String(card.count).length > 3 ? '2.5rem' : '3rem',
            }}
          >
            {card.count || 0}
          </div>
          <div className="count-heading">
            <div>{card.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

CountingCards.propTypes = {
  activeWorkspace: PropTypes.string.isRequired,
  totalWorkspaces: PropTypes.number.isRequired,
  totalProjects: PropTypes.number.isRequired,
};

export default CountingCards;
