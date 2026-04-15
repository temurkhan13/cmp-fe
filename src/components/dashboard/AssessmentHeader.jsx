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
import { useDispatch } from 'react-redux';
// import { persistor } from '../../redux/store/store.js';
const Header = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [photoPath, setPhotoPath] = useState('false');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setPhotoPath(storedUser.photoPath);
      setUser(storedUser);
    }
  }, []);

  const getInitials = () => {
    if (!user) {
      return 'N/A';
    }
    return `${user.firstName?.[0] || ''}${
      user.lastName?.[0] || ''
    }`.toUpperCase();
  };

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
        {/* <div className="bellWrapper" onClick={handleNotificationClick}>
          <CiBellOn className="BellIcon" />
          {hasNotification && <span className="notificationDot" />}
        </div> */}

        {/* {notificationOpen && (
          <NotificationDropdown
            isOpen={notificationOpen}
            onClose={closeDropdowns}
          />
        )} */}

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

        <section>
          <div>
            <span
              className="improve-response"
              onClick={handleOpenImproveResponseModal}
            >
              Survey Info
            </span>

            {/* <span
            className={activeIcon === 'search' ? 'active' : ''}
            onClick={() => handleIconClick('search')}
          >
            <BiSearch />
          </span>
          {activeIcon === 'search' && (
            <SearchDropdown
              title="Search"
              items={searchUser}
              visible={activeIcon === 'search'}
              onClose={closeActiveIcon}
            />
          )} */}
            {/* <UserDropdown
            activeIcon={activeIcon}
            handleIconClick={handleIconClick}
          /> */}
            {/* <CustomDropdown
            activeIcon={activeIcon}
            handleIconClick={handleIconClick}
          /> */}
            {/*<div className="shareBtn" onClick={handleOpenShareModal}>*/}
            {/*  <FaUserPlus />*/}
            {/*  <span>Share</span>*/}
            {/*</div>*/}
          </div>
          {photoPath ? (
            <img
              src={
                photoPath ||
                'https://avatar.iran.liara.run/public/boy?username=Ash'
              }
              alt="profile"
              className="ProfileImage"
              onClick={toggleProfileDropdown}
              style={{ cursor: 'pointer' }}
              onError={(e) =>
                (e.target.src =
                  'https://avatar.iran.liara.run/public/boy?username=Ash')
              }
            />
          ) : (
            <div
              onClick={toggleProfileDropdown}
              className="initials-placeholder"
            >
              {getInitials()}
            </div>
          )}
        </section>

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
          justify-content: end;
          padding: 1% 2%;
          box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.1);
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
          top: 5rem;
          right: 0;
          background-color: #fff;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          padding: 0.5rem;
          z-index: 1001;
          width: 18rem;
        }

        .dropdownItem {
          display: flex;
          align-items: center;
          padding: 1rem;
          cursor: pointer;
          font-size: 1.4rem;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }

        .dropdownItem:hover {
          background-color: #f0f0f0;
        }

        .dropdownIcon {
          margin-right: 1rem;
          font-size: 1.8rem;
        }

        .initials-placeholder {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #C3E11D;
          color: #0B1444;
          font-size: 18px;
          font-weight: bold;
          text-align: center;
          margin-right: 8px;
          cursor: pointer;
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
