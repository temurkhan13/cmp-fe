import { useState } from 'react';
import { CiBellOn } from 'react-icons/ci';
import { FiLogOut } from 'react-icons/fi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import NotificationDropdown from './NotificationDropdown';
import { AnchoredMenu } from '../common';
import Modal from '../../components/common/Modal';
import ChangePassword from '../../components/dashboard/ChangePassword';
import { logout } from '../../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import './dashboard-inline.scss';

const Header = () => {
  const navigate = useNavigate();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const photoPath = user?.photoPath || '';

  const getInitials = () => {
    if (!user) {
      return 'N/A';
    }
    return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''
      }`.toUpperCase();
  };

  const [notifications] = useState([]);
  const hasNotification = notifications.length > 0;
  const [isChangePasswordModalOpen, setChangePasswordModalOpen] =
    useState(false);
  const dispatch = useDispatch();

  const handleNotificationClick = () => {
    setNotificationOpen(!notificationOpen);
  };

  const closeNotifications = () => {
    setNotificationOpen(false);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('selectedFolder');
    localStorage.removeItem('selectedWorkspace');

    navigate('/log-in');
  };

  const handleOpenChangePasswordModal = () => {
    setChangePasswordModalOpen(true);
  };

  const handleCloseChangePasswordModal = () => {
    setChangePasswordModalOpen(false);
  };

  return (
    <header className="header">
      <div className="ProfileBar">
        <div className="bellWrapper" onClick={handleNotificationClick}>
          <CiBellOn className="BellIcon" />
          {hasNotification && <span className="notificationDot" />}
        </div>

        {notificationOpen && (
          <NotificationDropdown
            isOpen={notificationOpen}
            markAllAsRead={() => { }}
            onClose={closeNotifications}
          />
        )}

        <AnchoredMenu
          align="right"
          trigger={({ onClick }) => {
            const handleTriggerClick = () => {
              setNotificationOpen(false);
              onClick();
            };
            return photoPath ? (
              <img
                src={photoPath}
                alt="User"
                className="ProfileImage"
                onClick={handleTriggerClick}
              />
            ) : (
              <div onClick={handleTriggerClick} className="initials-placeholder">
                {getInitials()}
              </div>
            );
          }}
          items={[
            {
              key: 'profile',
              label: 'Profile',
              icon: <CgProfile />,
              onClick: () => navigate('/dashboard/settings'),
            },
            {
              key: 'change-password',
              label: 'Change Password',
              icon: <RiLockPasswordLine />,
              onClick: handleOpenChangePasswordModal,
            },
            {
              key: 'logout',
              label: 'Logout',
              icon: <FiLogOut />,
              onClick: handleLogout,
            },
          ]}
        />

        {notificationOpen && (
          <div className="cmp-dropdown-overlay" onClick={closeNotifications}></div>
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
