import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { RxCross2 } from 'react-icons/rx';
import { IoMdLink } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';

import { useSelector, useDispatch } from 'react-redux';
//import { addUserToChat } from '../redux/actions'; // Adjust with your actual action creator

import { useSelectedChat } from '../../redux/selectors/useSelectedChat';

import './custom-modal.scss';

const ShareModal = ({ members, onClose }) => {
  const dispatch = useDispatch();

  const { selectedChatId, chats, users, currentChat } = useSelectedChat();

  const permanentOwner = {
    name: 'Owner Name', // Replace with actual owner name
    userId: 'owner-id', // Replace with actual owner ID
    role: 'owner',
  };

  const userDetailsMap = currentChat
    ? currentChat.sharedUsers.reduce((acc, user) => {
        acc[user.userId] = users.find((u) => u.userId === user.userId);
        return acc;
      }, {})
    : {};

  const [userRoles, setUserRoles] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [role, setRole] = useState('edit');
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  useEffect(() => {
    if (currentChat) {
      const userRolesArray = currentChat.sharedUsers.map((user) => ({
        ...user,
        ...userDetailsMap[user.userId],
      }));
      setUserRoles([permanentOwner, ...userRolesArray]);
    }
  }, [currentChat, userDetailsMap]);

  const handleRoleChange = (userId, newRole) => {
    setUserRoles(
      userRoles.map((user) =>
        user.userId === userId ? { ...user, role: newRole } : user
      )
    );
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestedUsers(filteredUsers);
  };

  const handleRoleSelectChange = (e) => {
    setRole(e.target.value);
  };

  const handleUserSelect = (selectedUser) => {
    setInputValue(selectedUser.name);
    setSuggestedUsers([]);
  };

  const handleSendInvite = () => {
    const newUser = {
      name: inputValue,
      role,
    };
    // dispatch(addUserToChat(newUser, selectedChatId)); // Dispatch action to add user to chat
    setInputValue('');
    setRole('edit');
  };

  const isExistingMember = userRoles.some((user) => user.name === inputValue);
  const isEmail =
    /^[^\s@]+@[^\s@]+\.(com|.net|.org|.edu|.gov|.mil|.biz|.info|.io|.co|.us|.uk|.me|.site|.online|.outlook|.email|.pro|.tech|.app|.dev|.xyz|.ai)$/i.test(
      inputValue
    );

  const isInviteButtonDisabled =
    !inputValue || isExistingMember || isEmail || role === 'owner';

  const handleApplyChanges = () => {
    // Implement the action to handle changes to the users' dropdown
    // Example: dispatch(updateChatUsers(selectedChatId, userRoles)); // Replace with actual action
  };

  const renderRoleOptions = (user) => {
    if (user.role === 'owner') {
      return (
        <>
          <option value="owner">Owner</option>
        </>
      );
    } else {
      return (
        <>
          <option value="edit">Can Edit</option>
          <option value="view">Can View</option>
          <option value="remove">Remove</option>
        </>
      );
    }
  };

  return (
    <>
      <div className="custom-modal-share-overlay" onClick={onClose}>
        <div className="custom-modal-share-dialog" onClick={(e) => e.stopPropagation()}>
          <div className="custom-modal-share-header">
            <h3 className="custom-modal-share-heading">Share "AI Assistant Test File"</h3>
            <div className="custom-modal-close-link-btn">
              <button className="custom-modal-copy-link-btn">
                <IoMdLink size={18} /> Copy Link
              </button>
              <span className="custom-modal-share-close-button" onClick={onClose}>
                <RxCross2 className="custom-modal-share-cross-icon" />
              </span>
            </div>
          </div>
          <hr className="custom-modal-straight-line" />
          <div className="custom-modal-input-container">
            <div className="custom-modal-input-group">
              <input
                className="custom-modal-share-input"
                type="text"
                placeholder="Add people by email or name"
                value={inputValue}
                onChange={handleInputChange}
              />
              <select
                className="custom-modal-select"
                value={role}
                onChange={handleRoleSelectChange}
              >
                <option value="edit" className="custom-modal-roles-option">
                  Can Edit
                </option>
                <option value="view" className="custom-modal-roles-option">
                  Can View
                </option>
              </select>
            </div>
            {suggestedUsers.length > 0 && (
              <ul className="custom-modal-suggestion-list">
                {suggestedUsers.map((user) => (
                  <li
                    key={user.userId}
                    className="custom-modal-suggestion-item"
                    onClick={() => handleUserSelect(user)}
                  >
                    {user.name} ({user.email})
                  </li>
                ))}
              </ul>
            )}
            <button
              disabled={isInviteButtonDisabled}
              className="custom-modal-invite-btn"
              style={{
                '--invite-btn-bg': isInviteButtonDisabled ? '#f1f1f1' : '#C3E11D',
                '--invite-btn-color': isInviteButtonDisabled ? '#666' : '#0B1444',
                '--invite-btn-cursor': isInviteButtonDisabled ? 'not-allowed' : 'pointer',
              }}
              onClick={handleSendInvite}
            >
              Send Invite
            </button>
          </div>
          <hr className="custom-modal-straight-line" />

          <ul className="custom-modal-members">
            {userRoles.map((user) => (
              <li key={user.userId} className="custom-modal-member">
                <div className="custom-modal-member-info">
                  <FaUserCircle size={30} />
                  <span className="custom-modal-member-name">{user.name}</span>
                </div>
                <select
                  className="custom-modal-select"
                  value={user.role}
                  onChange={(e) =>
                    handleRoleChange(user.userId, e.target.value)
                  }
                  disabled={user.role === 'owner'}
                >
                  {renderRoleOptions(user)}
                </select>
              </li>
            ))}
          </ul>

          {/* Add the new button here */}
          <button className="custom-modal-apply-btn" onClick={handleApplyChanges}>
            Apply Changes
          </button>
        </div>
      </div>
    </>
  );
};

ShareModal.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      role: PropTypes.oneOf(['owner', 'edit', 'view', 'remove']).isRequired,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ShareModal;
