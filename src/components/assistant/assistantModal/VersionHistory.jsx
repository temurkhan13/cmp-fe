import PropTypes from 'prop-types';
import { FaUserCircle } from 'react-icons/fa';
import NoDataAvailable from '../../common/NoDataAvailable';

const VersionHistory = ({ versions, onClose }) => {
  const closeModal = () => {
    onClose();
  };

  return (
    <div className="version-history">
      {versions.length === 0 ? (
        <NoDataAvailable message="No data available" />
      ) : (
        <>
          <button className="current-version">Current Version</button>
          <div className="versions-container">
            {versions.map((version, index) => (
              <div
                key={index}
                className={`version ${index >= 3 ? 'blurred' : ''}`}
              >
                {index >= 3 && <div className="version-history-overlay"></div>}
                {index >= 3 && (
                  <button className="show-date-button">Upgrade</button>
                )}
                <div className="version-content">
                  <p className="vh-date">{version.date}</p>
                  <div className="vh-users">
                    {version.users.map((user, i) => (
                      <div key={i} className="vh-user">
                        <FaUserCircle className="vh-user-icon" />
                        <span className="vh-user-name">{user.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <hr className="straight-Line" />
          <div className="footer-buttons">
            <button className="vh-cancel" onClick={closeModal}>
              Cancel
            </button>
            <button className="restore-version">Restore Version</button>
          </div>
        </>
      )}
    </div>
  );
};

VersionHistory.propTypes = {
  versions: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      users: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default VersionHistory;
