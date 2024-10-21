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
      {/*{unreadNotifications.map((notification) => (*/}
      {/*  <div className="notification-item" key={notification.id}>*/}
      {/*    <div className="notification-avatar">*/}
      {/*      {notification.avatar ? (*/}
      {/*        <img src={notification.avatar} alt="avatar" className="avatar" />*/}
      {/*      ) : (*/}
      {/*        <FaUserCircle className="default-avatar" />*/}
      {/*      )}*/}
      {/*    </div>*/}
      {/*    <div className="notification-details">*/}
      {/*      <div className="notification-name">{notification.name}</div>*/}
      {/*      <div className="notification-message">*/}
      {/*        {notification.message} -{' '}*/}
      {/*        <span className="notification-team">{notification.team}</span>*/}
      {/*      </div>*/}
      {/*      <div className="notification-submessage">*/}
      {/*        {notification.subMessage}*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div className="notification-meta">*/}
      {/*      <div className="notification-date">{notification.date}</div>*/}
      {/*      <MdCircle className="unread-icon" />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*))}*/}
      <style>{`
        .notification-list {
        }
        .notification-item {
          display: flex;
          align-items: center;
          padding: 1rem 1.5rem;
          position: relative;
          &:hover{
           cursor:pointer;
          background-color: rgba(10, 10, 10, 0.1);
          }
        }
        .notification-avatar {
          margin-right: 1rem;
        }
        .avatar,
        .default-avatar {
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 50%;
        }
        .default-avatar {
          color: #777;
          font-size: 3.5rem;
        }
        .notification-details {
          flex-grow: 1;
        }
        .notification-name {
          font-size: 1.6rem;
          font-weight: 600;
          margin-bottom: 0.2rem;
        }
        .notification-message {
          font-size: 1.4rem;
          color: #555;
          margin-bottom: 0.3rem;
        }
        .notification-team {
          font-weight: 500;
        }
        .notification-submessage {
          font-size: 1.3rem;
          color: #777;
        }
        .notification-meta {
          display: flex;
          align-items: center;
        }
        .notification-date {
          font-size: 1.2rem;
          color: #888;
          margin-right: 0.5rem;
        }
        .unread-icon {
          font-size: 0.8rem;
          color: red;
        }
      `}</style>
    </div>
  );
};

export default UnreadNotifications;
