import PropTypes from 'prop-types';
import Dropdown from 'react-multilevel-dropdown';
import { MdPeople, MdPerson } from 'react-icons/md';
import { useSelector } from 'react-redux';

import { useSelectedChat } from '../../redux/selectors/useSelectedChat';

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
        <Dropdown.Item style={styles.dropdownItem}>
          <MdPerson style={styles.icon} />
          <div>
            <div style={styles.userName}>{owner?.name || 'Owner'}</div>
            <div style={styles.userRole}>owner</div>
          </div>
        </Dropdown.Item>
        <hr style={{ color: 'lightgray' }} />
        {nonOwnerUsers.length === 0 ? (
          <Dropdown.Item style={styles.dropdownItem}>
            No other users available
          </Dropdown.Item>
        ) : (
          nonOwnerUsers.map((user) => {
            const userDetails = userDetailsMap[user.userId];
            return (
              <Dropdown.Item key={user.userId} style={styles.dropdownItem}>
                <img
                  src={userDetails.image}
                  alt={userDetails.name}
                  style={styles.userImage}
                />
                <div>
                  <div style={styles.userName}>{userDetails.name}</div>
                  <div style={styles.userRole}>{user.role}</div>
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
      className={activeIcon === 'people' ? 'active' : ''}
      onClick={() => handleIconClick('people')}
      style={
        activeIcon === 'people'
          ? styles.dropdownButtonActive
          : styles.dropdownBtn
      }
    >
      {renderDropdownItems()}
    </Dropdown>
  );
};

const styles = {
  dropdownButtonActive: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '0.8rem',
    padding: '0.7rem',
    cursor: 'pointer',
    border: 'none',
  },
  dropdownBtn: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.7rem',
    justifyContent: 'center',
    border: 'none',
    borderRadius: '0.8rem',
    cursor: 'pointer',
    fontSize: '2rem',
    transition: 'opacity 0.2s ease-in-out',
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.8rem',
    // borderRadius: '1rem',
  },
  userImage: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '0.8rem',
  },
  userName: {
    fontSize: '1.5rem',
    fontWeight: '500',
  },
  userRole: {
    fontSize: '1rem',
    color: 'gray',
  },
  icon: {
    marginRight: '0.8rem',
    fontSize: '1.5rem',
  },
};

UserDropdown.propTypes = {
  activeIcon: PropTypes.string,
  handleIconClick: PropTypes.func.isRequired,
};

export default UserDropdown;
