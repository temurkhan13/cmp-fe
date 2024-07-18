import PropTypes from 'prop-types';
import Dropdown from 'react-multilevel-dropdown';
import { MdPeople } from 'react-icons/md';
import { useSelector } from 'react-redux';

const UserDropdown = ({ activeIcon, handleIconClick }) => {
  const selectedChatId = useSelector((state) => state.chat.selectedChatId);
  const chats = useSelector((state) => state.chat.chats);
  const users = useSelector((state) => state.user.users); // Assuming you have a `users` slice of state

  const currentChat = chats.find((chat) => chat.chatId === selectedChatId);

  const userDetailsMap = currentChat ? currentChat.sharedUsers.reduce((acc, user) => {
    acc[user.userId] = users.find((u) => u.userId === user.userId);
    return acc;
  }, {}) : {};

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
      {currentChat && currentChat.sharedUsers.map((user) => {
        const userDetails = userDetailsMap[user.userId];
        return (
          <Dropdown.Item key={user.userId} style={styles.dropdownItem}>
            <img src={userDetails.image} alt={userDetails.name} style={styles.userImage} />
            <div>
              <div style={styles.userName}>{userDetails.name}</div>
              <div style={styles.userRole}>{user.role}</div>
            </div>
          </Dropdown.Item>
        );
      })}
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
    borderRadius: '1rem',
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
};

UserDropdown.propTypes = {
  activeIcon: PropTypes.string,
  handleIconClick: PropTypes.func.isRequired,
  members: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      role: PropTypes.oneOf(['owner', 'edit', 'view', 'remove']).isRequired,
    })
  ).isRequired,
};

export default UserDropdown;
