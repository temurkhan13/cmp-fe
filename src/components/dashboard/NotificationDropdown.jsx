import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { IoMdSettings } from 'react-icons/io';
import AllNotifications from './AllNotifications';
import UnreadNotifications from './UnreadNotifications';
import RequestsNotifications from './RequestsNotifications';
import Button from '../common/Button';

const NotificationDropdown = ({ isOpen, markAllAsRead, onClose }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [, setHasUnread] = useState(true);
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
        return <AllNotifications />;
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
      <div className={`notifications-dropdown ${isOpen ? 'open' : ''}`}>
        <div className="notifications-dropdown-header">
          <span className="notifications-dropdown-title">Notifications</span>
          <div className="notifications-settings-container">
            <IoMdSettings
              className="notifications-settings-icon"
              onClick={handleSettingsClick}
            />
            <div className="notifications-settings-tooltip">Settings</div>
          </div>
        </div>
        <div className="notifications-tab-bar">
          <div className="notifications-tabs">
            <div
              className={`notifications-tab ${activeTab === 'All' ? 'active' : ''}`}
              onClick={() => handleTabClick('All')}
            >
              All
            </div>
            <div
              className={`notifications-tab ${activeTab === 'Requests' ? 'active' : ''}`}
              onClick={() => handleTabClick('Requests')}
            >
              Requests
            </div>
            <div
              className={`notifications-tab ${activeTab === 'Unread' ? 'active' : ''}`}
              onClick={() => handleTabClick('Unread')}
            >
              Unread
            </div>
          </div>
          <Button
            variant="link"
            className="mark-read-btn"
            onClick={handleMarkAllAsRead}
          >
            Mark all as read
          </Button>
        </div>
        <div className="notification-content">{renderContent()}</div>
      </div>
    </>
  );
};

NotificationDropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  markAllAsRead: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired, // Prop for handling dropdown close
};

export default NotificationDropdown;
