import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { BiPlus, BiSearch } from 'react-icons/bi';
import { FaUserPlus } from 'react-icons/fa6';

import Components from '@components';
import assets from '../../assets';
import UserDropdown from '../CustomDropdown/UserDropdown';
import ShareModal from '../customModal/Sharemodal';
import CustomDropdown from '../CustomDropdown/CustomDropdown';
import SearchDropdown from '../CustomDropdown/SearchDropdown';
import Modal from '../../components/common/Modal';
import ProfileDropdown from './Logout';
import { Questionnaire } from '../../modules/assessment';
import { selectWorkspace } from '../../redux/slices/workspacesSlice.js';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import UserProfilePic from '../../assets/chat/user.png';

const searchUser = ['John', 'abigale', 'mosa'];

const Header = ({ activeWorkspace, workspaces, siteMapId }) => {
  const [activeIcon, setActiveIcon] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [activeWorkspaceName, SetActiveWorkspaceName] = useState([]);
  const [isImproveResponseModalOpen, setIsImproveResponseModalOpen] =
    useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const handleIconClick = (icon) => {
    setActiveIcon(activeIcon === icon ? null : icon);
  };
  const selectedWorkspace = useSelector(selectWorkspace);
  // SetActiveWorkspaceName(selectedWorkspace);

  const closeActiveIcon = () => setActiveIcon(null);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleOpenShareModal = () => setIsShareModalOpen(true);
  const handleCloseShareModal = () => setIsShareModalOpen(false);

  const handleOpenImproveResponseModal = () =>
    setIsImproveResponseModalOpen(true);
  const handleCloseImproveResponseModal = () =>
    setIsImproveResponseModalOpen(false);

  const [photoPath, setPhotoPath] = useState('false');
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

  return (
    <div className="topbar">
      <div>
        <Components.Feature.HeaderDropDown />
        <Components.Feature.Button className="secondry">
          {selectedWorkspace?.workspaceName}
        </Components.Feature.Button>
        {(siteMapId && location.pathname === '/sitemap/new') ||
        location.pathname === `/sitemap/${siteMapId}` ? (
          <div>
            <div
              style={{
                margin: '16px 0',
                display: 'flex',
                justifyContent: 'end',
              }}
            >
              <div style={{}}>
                {/* <a
                  style={{
                    width: '100%',
                    background: '#C3E11B',
                    border: 'none',
                    padding: '5px',
                    borderRadius: '6px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    marginTop: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'black',
                    textDecoration: 'none',
                  }}
                  href="http://139.59.4.99:3500/"
                  target="_blank"
                >
                  <BiPlus />
                  Create Wireframe
                </a> */}
              </div>
            </div>
          </div>
        ) : null}
      </div>
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
          <div onClick={toggleProfileDropdown} className="initials-placeholder">
            {getInitials()}
          </div>
        )}
      </section>
      {isProfileDropdownOpen && (
        <ProfileDropdown onClose={toggleProfileDropdown} />
      )}
      {isShareModalOpen && <ShareModal onClose={handleCloseShareModal} />}
      {isImproveResponseModalOpen && (
        <Modal
          title="User Questionnaire"
          isOpen={isImproveResponseModalOpen}
          onClose={handleCloseImproveResponseModal}
        >
          <Questionnaire
            handleCloseImproveResponseModal={handleCloseImproveResponseModal}
          />
        </Modal>
      )}
    </div>
  );
};

Header.propTypes = {
  activeWorkspace: PropTypes.shape({
    workspaceName: PropTypes.string,
  }),
  workspaces: PropTypes.arrayOf(
    PropTypes.shape({
      workspaceId: PropTypes.string,
      workspaceName: PropTypes.string,
    })
  ),
};

export default Header;
