import { FaUserCircle } from 'react-icons/fa'; // Example for user icons

const requestsNotifications = [
  {
    id: 1,
    avatar: '',
    name: 'Sherrimac Gyver',
    message: 'Can edit',
    team: 'Designs Ops',
    date: 'Aug 10',
  },
  {
    id: 2,
    avatar: '',
    name: 'Jerald Huels',
    message: 'Made you editor',
    team: 'Designs Ops',
    date: 'Aug 10',
  },
  {
    id: 2,
    avatar: '',
    name: 'Jerald Huels',
    message: 'Made you editor',
    team: 'Designs Ops',
    date: 'Aug 10',
  },
  {
    id: 2,
    avatar: '',
    name: 'Jerald Huels',
    message: 'Made you editor',
    team: 'Designs Ops',
    date: 'Aug 10',
  },
];

const RequestsNotifications = () => {
  return (
    <div className="notification-list">
      {/*{requestsNotifications.map((notification) => (*/}
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
      {/*    </div>*/}
      {/*    <div className="notification-date">{notification.date}</div>*/}
      {/*  </div>*/}
      {/*))}*/}
      <style>{`
        .notification-list {
          background-color: #fff;
          border-radius: 8px;
          color:black;
        }
        .notification-item {
          display: flex;
          align-items: center;
          padding: 1rem 1.5rem;
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
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
        }
        .default-avatar {
          color: #777;
          font-size: 3rem;
        }
        .notification-details {
          flex-grow: 1;
        }
        .notification-name {
          font-size: 1.6rem;
          font-weight: 600;
        }
        .notification-message {
          font-size: 1.4rem;
          color: #555;
          margin-top: 0.3rem;
        }
        .notification-team {
          font-weight: 500;
        }
        .notification-date {
          font-size: 1.2rem;
          color: #888;
        }
      `}</style>
    </div>
  );
};

export default RequestsNotifications;
