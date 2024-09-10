import { useState } from 'react';
import { CiBellOn } from 'react-icons/ci';
import { FiLogOut } from 'react-icons/fi';
import User from '../../assets/chat/user.png';
import NotificationDropdown from './NotificationDropdown';
import LoadingBar from 'react-redux-loading-bar';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [hasNotification] = useState(true);

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
    setNotificationOpen(false);
  };

  const handleNotificationClick = () => {
    setNotificationOpen(!notificationOpen);
    setDropdownOpen(false);
  };

  const closeDropdowns = () => {
    setDropdownOpen(false);
    setNotificationOpen(false);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <header className="header">
      <div><LoadingBar style={{ backgroundColor: 'blue', height: '5px' }} /></div>
      <div className="ProfileBar">
        <div className="bellWrapper" onClick={handleNotificationClick}>
          <CiBellOn className="BellIcon" />
          {hasNotification && <span className="notificationDot" />}
        </div>

        {notificationOpen && (
          <NotificationDropdown
            isOpen={notificationOpen}
            onClose={closeDropdowns}
          />
        )}

        <img
          src={User}
          alt="User"
          className="ProfileImage"
          onClick={handleProfileClick}
        />

        {dropdownOpen && (
          <div className="dropdownMenu">
            <div className="dropdownItem" onClick={handleLogout}>
              <FiLogOut className="dropdownIcon" />
              Logout
            </div>
          </div>
        )}

        {(dropdownOpen || notificationOpen) && (
          <div className="overlay" onClick={closeDropdowns}></div>
        )}
      </div>

      <style>{`
        .header {
          display: flex;
          justify-content: space-between;
          padding: 1% 2%;
        }

        .ProfileBar {
          display: flex;
          align-items: center;
          position: relative;
        }

        .bellWrapper {
          position: relative;
          cursor: pointer;
        }

        .BellIcon {
          height: 3rem;
          width: 3rem;
          color: gray;
          margin-right: 1rem;
          transition: color 0.3s ease;
        }

        .BellIcon:hover {
          color: #007bff;
        }

        .notificationDot {
          position: absolute;
          top: 0;
          right: 0.7rem;
          width: 1.2rem;
          height: 1.2rem;
          background-color: red;
          border-radius: 50%;
          border: 2px solid white;
        }

        .ProfileImage {
          height: 4rem;
          width: 4rem;
          border-radius: 50%;
          cursor: pointer;
        }

        .dropdownMenu {
          position: absolute;
          top: 4rem;
          right: 0rem;
          background-color: white;
          box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.2);
          border-radius: 0.5rem;
          overflow: hidden;
          z-index: 1001;
        }

        .dropdownItem {
          display: flex;
          align-items: center;
          padding: 0.5rem 1rem;
          cursor: pointer;
          font-size: 1.7rem;
          transition: background-color 0.3s ease;
        }

        .dropdownItem:hover {
          background-color: #f0f0f0;
        }

        .dropdownIcon {
          margin-right: 0.625rem;
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0);
          z-index: 1000;
        }
      `}</style>
    </header>
  );
};

export default Header;
