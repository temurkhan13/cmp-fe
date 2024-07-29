import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { setCurrentChat, fetchSharedUsers } from '@store/chatSlice';
import Components from '@components';
import assets from '../../assets';
import UserDropdown from '../CustomDropdown/UserDropdown';
import ShareModal from '../customModal/Sharemodal';
import CustomDropdown from '../CustomDropdown/CustomDropdown';
import SearchDropdown from '../CustomDropdown/SearchDropdown';
import ProfileDropdown from './Logout';
import { BiSearch } from 'react-icons/bi';
import { FaUserPlus } from 'react-icons/fa6';

const searchUser = ['John', 'abigale', 'mosa'];

const Header = () => {
  //const dispatch = useDispatch();
  const [activeIcon, setActiveIcon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // const selectedChatId = useSelector((state) => state.chat.selectedChatId);
  // const chats = useSelector((state) => state.chat.chats);
  // const currentChat = chats.find((chat) => chat.chatId === selectedChatId);

  // const currentChatId = useSelector((state) => state.chat.currentChatId);
  // const sharedUsers = useSelector((state) => state.chat.sharedUsers);

  const handleIconClick = (icon) => {
    setActiveIcon(activeIcon === icon ? null : icon);
  };

  const handleClose = () => {
    setActiveIcon(null);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const closeProfileDropdown = () => {
    setIsProfileDropdownOpen(false);
  };

  // useEffect(() => {
  //   if (currentChatId) {
  //    // console.log("header dispatch: "+fetchSharedUsers(currentChatId));
  //    setCurrentChat(currentChatId);
  //     dispatch(fetchSharedUsers(currentChatId));
  //   }
  // }, [currentChatId, dispatch]);

  return (
    <div className="topbar">
      <div>
        <Components.Feature.HeaderDropDown />
        <Components.Feature.Button className="secondry">
          Ai Assistant Test File
        </Components.Feature.Button>
      </div>
      <section>
        <div>
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
              onClose={handleClose}
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
          <div className="shareBtn" onClick={handleOpenModal}>
            <FaUserPlus />
            <span>Share</span>
          </div>
          {isModalOpen && <ShareModal onClose={handleCloseModal} />}
        </div>
        <img
          src={assets.common.profile}
          alt="profile"
          onClick={toggleProfileDropdown}
          style={{ cursor: 'pointer' }}
        />
      </section>
      {isProfileDropdownOpen && (
        <ProfileDropdown onClose={closeProfileDropdown} />
      )}
    </div>
  );
};

export default Header;
