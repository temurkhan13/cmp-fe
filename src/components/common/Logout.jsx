import PropTypes from 'prop-types';
import { FaSignOutAlt } from 'react-icons/fa';
import Button from './Button';

const ProfileDropdown = ({ onClose }) => {
  return (
    <div className="profile-dropdown">
      <Button
        variant="ghost"
        className="profile-dropdown-item"
        iconLeft={<FaSignOutAlt className="profile-dropdown-icon" />}
        onClick={onClose}
      >
        Logout
      </Button>
    </div>
  );
};

ProfileDropdown.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ProfileDropdown;
