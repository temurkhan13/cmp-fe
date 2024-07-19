import PropTypes from 'prop-types';
import { FaSignOutAlt } from 'react-icons/fa';

const ProfileDropdown = ({ onClose }) => {
  return (
    <div className="profile-dropdown">
      <button className="dropdown-item" onClick={onClose}>
        <FaSignOutAlt className="icon" /> Logout
      </button>
      <style>{`
        .profile-dropdown {
          position: absolute;
          top:6rem;
          right: 5rem;
          background-color: white;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          z-index: 1000;
          margin-top: 0.5rem;          
          border-radius:0.8rem;
          }
          .dropdown-item {
            display: flex;
            align-items: center;
            padding: 1rem;
            cursor: pointer;
            background: none;
            border: none;
            text-align: left;
            width: 100%;
            font-size: 1.5rem;
            margin:0.5rem;
        }
        .dropdown-item:hover {
          background-color: #f0f0f0;
          border-radius:0.8rem;
        }
        .icon {
          margin-right: 0.5rem;
          font-size:1.5rem;
        }
      `}</style>
    </div>
  );
};

ProfileDropdown.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ProfileDropdown;
