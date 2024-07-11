import PropTypes from 'prop-types';
import Dropdown from 'react-multilevel-dropdown';
import { MdPeople } from 'react-icons/md';
// import assets from '../../assets/dashboard/index';

const UserDropdown = ({ activeIcon, handleIconClick,members }) => {
  // Example user data
  const users = [
    { image: '/path/to/image3.jpg', name: 'Jerald Huels', role: 'Editor' },
    { image: '/path/to/image2.jpg', name: 'Sherrimac Gyver', role: 'Editor' },
    { image: '/path/to/image3.jpg', name: 'Jerald Huels', role: 'Editor' },
    ];

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
      {members.map((user) => (
        <Dropdown.Item key={user.name} style={styles.dropdownItem}>
          <img src={user.image} alt={user.name} style={styles.userImage} />
          <div>
            <div style={styles.userName}>{user.name}</div>
            <div style={styles.userRole}>{user.role}</div>
          </div>
        </Dropdown.Item>
      ))}
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
};


UserDropdown.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      role: PropTypes.oneOf(['owner', 'edit', 'view', 'remove']).isRequired,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UserDropdown;
