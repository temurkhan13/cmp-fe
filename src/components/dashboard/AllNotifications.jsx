import PropTypes from 'prop-types';
import { RxAvatar } from 'react-icons/rx';

const AllNotifications = ({ notifications }) => {
  return (
    <div className="notification-list">
      <p className="notification-timeine">Last 7 days</p>
      {/*{notifications.map((notification, index) => (*/}
      {/*  <>*/}
      {/*    <div key={index} className="notification-item">*/}
      {/*      <div className="notification-head">*/}
      {/*        <div className="avatar">*/}
      {/*          {notification.avatar ? (*/}
      {/*            <img src={notification.avatar} alt="avatar" />*/}
      {/*          ) : (*/}
      {/*            <RxAvatar className="icon-avatar" />*/}
      {/*          )}*/}
      {/*        </div>*/}
      {/*        <div className="all-notification-content">*/}
      {/*          <p className="all-message">*/}
      {/*            <p style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>*/}
      {/*              {notification.name}*/}
      {/*            </p>*/}
      {/*            {notification.message} - <span>{notification.team}</span>*/}
      {/*          </p>*/}
      {/*          {notification.subMessage && (*/}
      {/*            <p className="sub-message">@{notification.subMessage}</p>*/}
      {/*          )}*/}
      {/*        </div>*/}
      {/*        <p className="date">{notification.date}</p>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    {notification.hasButtons && (*/}
      {/*      <div className="actions">*/}
      {/*        <button className="decline">Decline</button>*/}
      {/*        <button className="approve">Approve</button>*/}
      {/*      </div>*/}
      {/*    )}*/}
      {/*  </>*/}
      {/*))*/}
      {/*}*/}
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
