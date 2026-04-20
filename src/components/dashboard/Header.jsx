import { useState, useEffect } from 'react';
import { CiBellOn } from 'react-icons/ci';
import { FiLogOut } from 'react-icons/fi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import NotificationDropdown from './NotificationDropdown';
import Modal from '../../components/common/Modal';
import ChangePassword from '../../components/dashboard/ChangePassword';
import { logout } from '../../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import './dashboard-inline.scss';
// import { persistor } from '../../redux/store/store.js';
const Header = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const photoPath = user?.photoPath || '';

  const getInitials = () => {
    if (!user) {
      return 'N/A';
    }
    return `${user.firstName?.[0] || ''}${
      user.lastName?.[0] || ''
    }`.toUpperCase();
  };

  const [notifications] = useState([]);
  const hasNotification = notifications.length > 0;
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

  const handleLogout = async () => {
    await dispatch(logout());
    // persistor.purge();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('selectedFolder');
    localStorage.removeItem('selectedWorkspace');

    // OR if you want to clear everything
    // localStorage.clear();
    navigate('/log-in');
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
      {/*<div>*/}
      {/*  <LoadingBar style={{ backgroundColor: 'blue', height: '5px' }} />*/}
      {/*</div>*/}
      <div className="ProfileBar">
        <div className="bellWrapper" onClick={handleNotificationClick}>
          <CiBellOn className="BellIcon" />
          {hasNotification && <span className="notificationDot" />}
        </div>

        {notificationOpen && (
          <NotificationDropdown
            isOpen={notificationOpen}
            markAllAsRead={() => {}}
            onClose={closeDropdowns}
          />
        )}

        {photoPath ? (
          <img
            src={photoPath}
            alt="User"
            className="ProfileImage"
            onClick={handleProfileClick}
          />
        ) : (
          <div onClick={handleProfileClick} className="initials-placeholder">
            {getInitials()}
          </div>
        )}

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

    </header>
  );
};

export default Header;
