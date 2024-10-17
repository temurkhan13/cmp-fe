import { useState } from 'react';
import { CiBellOn } from 'react-icons/ci';
import { FiLogOut } from 'react-icons/fi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import User from '../../assets/chat/user.png';
import NotificationDropdown from './NotificationDropdown';
import LoadingBar from 'react-redux-loading-bar';
import Modal from '../../components/common/Modal';
import ChangePassword from '../../components/dashboard/ChangePassword';
import {logout} from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
const Header = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [hasNotification] = useState(true);
  const [isChangePasswordModalOpen, setChangePasswordModalOpen] =
    useState(false);
    const dispatch = useDispatch();
    

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

  const handleLogout = async() => {
    await dispatch (logout());
    navigate('/log-in');
    console.log('Logout clicked');
    closeDropdowns();
  };

  const handleOpenChangePasswordModal = () => {
    setChangePasswordModalOpen(true);
    closeDropdowns();
  };

  const handleCloseChangePasswordModal = () => {
    setChangePasswordModalOpen(false);
  };

  return (
    <header className="header">
      <div>
        <LoadingBar style={{ backgroundColor: 'blue', height: '5px' }} />
      </div>
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
            <div
              className="dropdownItem"
              onClick={() => {
                navigate('/dashboard/settings');
                closeDropdowns(); // Close dropdown after navigating
              }}
            >
              <CgProfile className="dropdownIcon" />
              Profile
            </div>
            <div
              className="dropdownItem"
              onClick={handleOpenChangePasswordModal}
            >
              <RiLockPasswordLine className="dropdownIcon" />
              Change Password
            </div>
            <div className="dropdownItem" onClick={handleLogout}>
              <FiLogOut className="dropdownIcon" />
              Logout
            </div>
          </div>
        )}

        {(dropdownOpen || notificationOpen) && (
          <div className="header-overlay" onClick={closeDropdowns}></div>
        )}
      </div>
      {isChangePasswordModalOpen && (
        <Modal
          title="Change Password"
          isOpen={isChangePasswordModalOpen}
          onClose={handleCloseChangePasswordModal}
        >
          <ChangePassword />
        </Modal>
      )}

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
          top: 4.5rem;
          right: 0rem;
          background-color: white;
          box-shadow: 0 1rem 5rem rgba(0, 0, 0, 0.2);
          border-radius: 1rem;
          overflow: hidden;
          z-index: 1001;
          width: 22rem;
        }

        .dropdownItem {
          display: flex;
          align-items: center;
          padding: 0.5rem 1.5rem;
          cursor: pointer;
          font-size: 1.6rem;
          transition: background-color 0.3s ease;
        }

        .dropdownItem:hover {
          background-color: #f0f0f0;
        }

        .dropdownIcon {
          margin-right: 0.8rem;
          font-size: 1.8rem;
        }

        .header-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0);
          z-index: 0;
        }
      `}</style>
    </header>
  );
};

export default Header;
