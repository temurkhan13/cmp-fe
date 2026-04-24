import { FaUserCircle } from 'react-icons/fa';
import { MdCircle } from 'react-icons/md';

const unreadNotifications = [
  {
    id: 1,
    avatar: null,
    name: 'Jerald Huels',
    message: 'Mentioned you',
    subMessage: '@Imran Icon Change',
    team: 'Designs Ops',
    date: 'Aug 10',
  },
  {
    id: 2,
    avatar: null,
    name: 'Imran',
    message: 'Replied',
    subMessage: 'Done',
    team: 'Designs Ops',
    date: 'Aug 10',
  },
  {
    id: 2,
    avatar: null,
    name: 'Imran',
    message: 'Replied',
    subMessage: 'Done',
    team: 'Designs Ops',
    date: 'Aug 10',
  },
];

const UnreadNotifications = () => {
  return (
    <div className="notification-list">
      {/* TODO: Parked styles live in dashboard-inline.scss under "UnreadNotifications".
          When reviving, uncomment the block below — the class names here already
          match the parked rules. */}
      {/*{unreadNotifications.map((notification) => (*/}
      {/*  <div className="unread-notifications-item" key={notification.id}>*/}
      {/*    <div className="unread-notifications-avatar">*/}
      {/*      {notification.avatar ? (*/}
      {/*        <img src={notification.avatar} alt="avatar" className="unread-notifications-avatar-img" />*/}
      {/*      ) : (*/}
      {/*        <FaUserCircle className="unread-notifications-default-avatar" />*/}
      {/*      )}*/}
      {/*    </div>*/}
      {/*    <div className="unread-notifications-details">*/}
      {/*      <div className="unread-notifications-name">{notification.name}</div>*/}
      {/*      <div className="unread-notifications-message">*/}
      {/*        {notification.message} -{' '}*/}
      {/*        <span className="unread-notifications-team">{notification.team}</span>*/}
      {/*      </div>*/}
      {/*      <div className="unread-notifications-submessage">*/}
      {/*        {notification.subMessage}*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div className="unread-notifications-meta">*/}
      {/*      <div className="unread-notifications-date">{notification.date}</div>*/}
      {/*      <MdCircle className="unread-notifications-icon" />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*))}*/}
    </div>
  );
};

export default UnreadNotifications;
