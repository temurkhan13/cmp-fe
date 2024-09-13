import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { IoMdSettings } from 'react-icons/io';
import AllNotifications from './AllNotifications';
import UnreadNotifications from './UnreadNotifications';
import RequestsNotifications from './RequestsNotifications';

const notifications = [
  {
    avatar: '',
    name: 'Jerald Huels',
    message: 'Mentioned you',
    team: 'Designs Ops',
    subMessage: 'Imran Icon Change',
    date: 'Aug 10',
    hasButtons: false,
  },
  {
    avatar: '',
    name: 'Jerald Huels',
    message: 'Invited you to the team',
    team: 'Designs Ops',
    subMessage: '',
    date: 'Aug 10',
    hasButtons: true,
  },
  {
    avatar: '',
    name: 'Imran',
    message: 'Wants to edit',
    team: 'Designs Ops',
    subMessage: '',
    date: 'Aug 10',
    hasButtons: true,
  },
  {
    avatar: '',
    name: 'Imran',
    message: 'Wants to edit',
    team: 'Designs Ops',
    subMessage: '',
    date: 'Aug 10',
    hasButtons: true,
  },
  {
    avatar: '',
    name: 'Imran',
    message: 'Wants to edit',
    team: 'Designs Ops',
    subMessage: '',
    date: 'Aug 10',
    hasButtons: true,
  },
];

const NotificationDropdown = ({ isOpen, markAllAsRead, onClose }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [hasUnread, setHasUnread] = useState(true);
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSettingsClick = () => {
    navigate('/dashboard/settings');
  };

  const handleMarkAllAsRead = () => {
    setHasUnread(false);
    markAllAsRead();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'All':
        return <AllNotifications notifications={notifications} />;
      case 'Unread':
        return <UnreadNotifications />;
      case 'Requests':
        return <RequestsNotifications />;
      default:
        return <AllNotifications />;
    }
  };

  return (
    <>
      {isOpen && <div className="notificationOverlay" onClick={onClose}></div>}
      <div className={`dropdown ${isOpen ? 'open' : ''}`}>
        <div className="header">
          <span className="title">Notifications</span>
          <div className="settings-container">
            <IoMdSettings
              className="settingsIcon"
              onClick={handleSettingsClick}
            />
            <div className="tooltip">Settings</div>
          </div>
        </div>
        <div className="tab-bar">
          <div className="tabs">
            <div
              className={`tab ${activeTab === 'All' ? 'active' : ''}`}
              onClick={() => handleTabClick('All')}
            >
              All
            </div>
            <div
              className={`tab ${activeTab === 'Requests' ? 'active' : ''}`}
              onClick={() => handleTabClick('Requests')}
            >
              Requests
            </div>
            <div
              className={`tab ${activeTab === 'Unread' ? 'active' : ''}`}
              onClick={() => handleTabClick('Unread')}
            >
              Unread
            </div>
          </div>
          <button className="mark-read-btn" onClick={handleMarkAllAsRead}>
            Mark all as read
          </button>
        </div>
        <div className="notification-content">{renderContent()}</div>
      </div>
      <style>{`
        .notificationOverlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
        }
        .dropdown {
          position: absolute;
          top: 4rem;
          right: 5rem;
          background-color: white;
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
          border-radius: 1rem;
          overflow: hidden;
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 0.1s ease;
          z-index: 1001;
          width: 400px;
          height: 100vh;
          overflow-y: auto;
        }
        .open {
          transform: scaleY(1);
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid #ddd;
          background-color: #f9f9f9;
        }
        .title {
          font-size: 1.5rem;
          font-weight: 600;
        }
        .settings-container {
          position: relative;
          display: flex;
          align-items: center;
        }
        .settingsIcon {
          height: 2rem;
          width: 2rem;
          color: gray;
          cursor: pointer;
        }
        .tooltip {
          position: absolute;
          bottom: -0.5rem;
          right: 120%;
          background-color: black;
          color: white;
          font-size: 1.1rem;
          padding: 0.5rem;
          border-radius: 0.5rem;
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
          white-space: nowrap;
        }
        .settings-container:hover .tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        .tab-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #ddd;
          background-color: #f9f9f9;
        }
        .tabs {
          display: flex;
          flex: 1;
        }
        .tab {
          padding: 0.75rem 1rem;
          text-align: center;
          cursor: pointer;
          font-size: 1.4rem;
          color: #333;
          transition: background-color 0.3s ease;
        }
        .tab.active {
          background-color: transparent;
          border-bottom: 2px solid gray;
          font-weight: 500;
        }
        .mark-read-btn {
          color: blue;
          border: none;
          cursor: pointer;
          font-size: 1.2rem;
          font-weight: 500;
          background-color: transparent;
        }
        .notification-content {
          color: gray;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </>
  );
};

NotificationDropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  markAllAsRead: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired, // Prop for handling dropdown close
};

export default NotificationDropdown;
