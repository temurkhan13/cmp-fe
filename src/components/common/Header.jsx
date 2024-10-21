import { useState } from 'react';

import PropTypes from 'prop-types';
import { BiSearch } from 'react-icons/bi';
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

const searchUser = ['John', 'abigale', 'mosa'];

const Header = ({ activeWorkspace, workspaces }) => {
  const [activeIcon, setActiveIcon] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isImproveResponseModalOpen, setIsImproveResponseModalOpen] =
    useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleIconClick = (icon) => {
    setActiveIcon(activeIcon === icon ? null : icon);
  };

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

  return (
    <div className="topbar">
      <div>
        <Components.Feature.HeaderDropDown />
        <Components.Feature.Button className="secondry">
          {activeWorkspace?.workspaceName}
        </Components.Feature.Button>
      </div>
      <section>
        <div>
          <span
            className="improve-response"
            onClick={handleOpenImproveResponseModal}
          >
            Improve Response
          </span>

          <span
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
          )}
          <UserDropdown
            activeIcon={activeIcon}
            handleIconClick={handleIconClick}
          />
          <CustomDropdown
            activeIcon={activeIcon}
            handleIconClick={handleIconClick}
          />
          <div className="shareBtn" onClick={handleOpenShareModal}>
            <FaUserPlus />
            <span>Share</span>
          </div>
        </div>
        <img
          src={assets.common.profile}
          alt="profile"
          onClick={toggleProfileDropdown}
          style={{ cursor: 'pointer' }}
        />
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
          <Questionnaire handleCloseImproveResponseModal={handleCloseImproveResponseModal} />
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
