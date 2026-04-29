import PropTypes from 'prop-types';
import Dropdown from 'react-multilevel-dropdown';
import { MdPeople, MdPerson } from 'react-icons/md';

import { useSelectedChat } from '../../redux/selectors/useSelectedChat';
import NoDataAvailable from '../common/NoDataAvailable';

import './custom-dropdown.scss';

const UserDropdown = ({ activeIcon, handleIconClick }) => {
  const { users, currentChat } = useSelectedChat();

  //const selectedChatId = useSelector((state) => state.chat.selectedChatId);
  //const chats = useSelector((state) => state.chat.chats);

  //const currentChat = chats.find((chat) => chat.chatId === selectedChatId);

  const userDetailsMap = currentChat
    ? currentChat.sharedUsers.reduce((acc, user) => {
        acc[user.userId] = users.find((u) => u.userId === user.userId);
        return acc;
      }, {})
    : {};

  const owner = users.find((user) => user.role === 'owner');

  const renderDropdownItems = () => {
    const nonOwnerUsers =
      currentChat?.sharedUsers.filter((user) => user.role !== 'owner') || [];

    return (
      <>
        <Dropdown.Item className="custom-dropdown-user-item">
          <MdPerson className="custom-dropdown-user-icon" />
          <div>
            <div className="custom-dropdown-user-name">{owner?.name || 'Owner'}</div>
            <div className="custom-dropdown-user-role">owner</div>
          </div>
        </Dropdown.Item>
        <hr className="custom-dropdown-user-hr" />
        {nonOwnerUsers.length === 0 ? (
          <Dropdown.Item className="custom-dropdown-user-item">
            <NoDataAvailable message="No User Available" />
          </Dropdown.Item>
        ) : (
          nonOwnerUsers.map((user) => {
            const userDetails = userDetailsMap[user.userId];
            return (
              <Dropdown.Item key={user.userId} className="custom-dropdown-user-item">
                <img
                  src={userDetails.image}
                  alt={userDetails.name}
                  className="custom-dropdown-user-image"
                />
                <div>
                  <div className="custom-dropdown-user-name">{userDetails.name}</div>
                  <div className="custom-dropdown-user-role">{user.role}</div>
                </div>
              </Dropdown.Item>
            );
          })
        )}
      </>
    );
  };

  return (
    <Dropdown
      title={<MdPeople fontSize={22} />}
      className={activeIcon === 'people' ? 'active custom-dropdown-user-btn-active' : 'custom-dropdown-user-btn'}
      onClick={() => handleIconClick('people')}
    >
      {renderDropdownItems()}
    </Dropdown>
  );
};

UserDropdown.propTypes = {
  activeIcon: PropTypes.string,
  handleIconClick: PropTypes.func.isRequired,
};

export default UserDropdown;
