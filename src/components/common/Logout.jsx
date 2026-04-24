import PropTypes from 'prop-types';
import { FaSignOutAlt } from 'react-icons/fa';

const ProfileDropdown = ({ onClose }) => {
  return (
    <div className="profile-dropdown">
      <button className="profile-dropdown-item" onClick={onClose}>
        <FaSignOutAlt className="profile-dropdown-icon" /> Logout
      </button>
    </div>
  );
};

ProfileDropdown.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ProfileDropdown;
