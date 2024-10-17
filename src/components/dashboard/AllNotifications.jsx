import PropTypes from 'prop-types';
import { RxAvatar } from 'react-icons/rx';

const AllNotifications = ({ notifications }) => {
  return (
    <div className="notification-list">
      <p className="notification-timeine">Last 7 days</p>
      {notifications.map((notification, index) => (
        <>
          <div key={index} className="notification-item">
            <div className="notification-head">
              <div className="avatar">
                {notification.avatar ? (
                  <img src={notification.avatar} alt="avatar" />
                ) : (
                  <RxAvatar className="icon-avatar" />
                )}
              </div>
              <div className="all-notification-content">
                <p className="all-message">
                  <p style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
                    {notification.name}
                  </p>
                  {notification.message} - <span>{notification.team}</span>
                </p>
                {notification.subMessage && (
                  <p className="sub-message">@{notification.subMessage}</p>
                )}
              </div>
              <p className="date">{notification.date}</p>
            </div>
          </div>
          {notification.hasButtons && (
            <div className="actions">
              <button className="decline">Decline</button>
              <button className="approve">Approve</button>
            </div>
          )}
        </>
      ))}
      <style>{`
  .notification-list {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
  .notification-timeine {
    margin: 2rem 1rem;
  }
  .notification-head {
    display: flex;
  }
  .notification-item {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    cursor: pointer;
    padding: 1rem;
    position: relative;
    &:hover {
      background-color: rgba(10, 10, 10, 0.1);
    }
  }
  .avatar img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }
  .icon-avatar {
    width: 4rem;
    height: 4rem;
    color: #888;
  }
  .all-notification-content {
    flex: 1;
    margin-left: 1rem;
  }
  .all-message {
    margin: 0;
    font-size: 1.4rem;
    color: #333;
  }
  .sub-message {
    font-size: 1.2rem;
    color: #888;
  }
  .actions {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }
  .actions button {
    align-items: center;
    padding: 0.8rem;
    font-size: 1.4rem;
    border-radius: 1rem;
    width: 15rem;
    margin-bottom: 1rem;
  }
  .decline {
    background-color: transparent;
    color: #0B1444;
    border: 0.1rem solid #0B1444;
    text-align: center;
  }
  .approve {
    background-color: #C3E11D;
    color: #0B1444;
    border: none;
  }
  .date {
    position: absolute;
    right: 1rem;
    top: 0.1rem;
    font-size: 1.2rem;
    color: #888;
  }
`}</style>
    </div>
  );
};

AllNotifications.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string,
      name: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      team: PropTypes.string.isRequired,
      subMessage: PropTypes.string,
      date: PropTypes.string.isRequired,
      hasButtons: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default AllNotifications;
