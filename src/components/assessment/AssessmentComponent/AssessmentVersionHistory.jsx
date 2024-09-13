import PropTypes from 'prop-types';
import { FaUserCircle } from 'react-icons/fa';
import NoDataAvailable from '../../common/NoDataAvailable';

const AssessmentVersionHistory = ({ versions, onClose }) => {
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
                {index >= 3 && <div className="Version-overlay"></div>}
                {index >= 3 && (
                  <button className="show-date-button">Upgrade</button>
                )}
                <div className="version-content">
                  <p className="date">{version.date}</p>
                  <div className="users">
                    {version.users.map((user, i) => (
                      <div key={i} className="user">
                        <FaUserCircle className="icon" />
                        <span className="user-name">{user.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <hr className="straight-Line" />
          <div className="footer-buttons">
            <button className="cancel" onClick={closeModal}>
              Cancel
            </button>
            <button className="restore-version">Restore Version</button>
          </div>
        </>
      )}
      <style>{`
        .version-history {
          padding: 1rem;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .current-version {
          background-color: #fff;
          border: none;
          outline: none;
          padding: 1rem;
          width: 100%;
          display: flex;
          border-radius: 0.8rem;
          font-weight: 500;
          cursor: pointer;
        }
        .current-version:hover {
          background-color: lightgray;
        }
        .versions-container {
          flex-grow: 1;
          overflow-y: auto;
          margin: 1rem 0;
        }
        .versions-container::-webkit-scrollbar {
          width: 0.5rem;
        }
        .versions-container::-webkit-scrollbar-thumb {
          background-color: lightgray;
          border-radius: 0.25rem;
        }
        .versions-container::-webkit-scrollbar-track {
          background-color: #f1f1f1;
          border-radius: 0.25rem;
        }
        .version {
          position: relative;
          padding: 1rem;
          cursor: pointer;
        }
        .version:hover {
          border-radius: 0.8rem;
          background-color: #f1f1f1;
        }
        .version-content {
          filter: inherit;
        }
        .blurred .version-content {
          filter: blur(0.2rem);
        }
        .Version-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: transparent;
          pointer-events: none;
        }
        .date {
          font-size: 1.3rem;
          margin-bottom: 0.6rem;
          color: #000;
        }
        .users {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .user {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: gray;
          font-size: 1.3rem;
        }
        .icon {
          font-size: 3rem;
          color: lightgray;
        }
        .footer-buttons {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 2rem;
          padding-bottom: 2rem;
        }
        .cancel {
          background-color: #fff;
          border: 0.1rem solid black;
          padding: 1rem;
          border-radius: 0.8rem;
          font-size: 1.3rem;
          font-weight: 500;
          cursor: pointer;
          width: 49%;
        }
        .restore-version {
          background-color: #C3E11D;
          border: 0.2rem solid #C3E11D;
          padding: 1rem;
          font-size: 1.3rem;
          font-weight: 500;
          border-radius: 0.8rem;
          cursor: pointer;
          width: 49%;
        }
        .straight-Line {
          border-top: 0.15rem solid lightgray;
        }
        .show-date-button {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 7rem;
          height: 3rem;
          border-radius: 2.5rem;
          background-color: skyblue;
          border: 0.2rem solid skyblue;
          padding: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0066FF;
          font-size: 1.2rem;
          font-weight: 600;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

AssessmentVersionHistory.propTypes = {
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

export default AssessmentVersionHistory;
