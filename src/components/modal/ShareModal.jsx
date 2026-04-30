import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { IoMdLink } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';

//import { addUserToChat } from '../redux/actions'; // Adjust with your actual action creator

import { useSelectedChat } from '../../redux/selectors/useSelectedChat';
import Button from '../common/Button';
import Modal from './Modal';

import './modal.scss';

const ShareModal = ({ onClose }) => {
  const { users, currentChat } = useSelectedChat();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <Modal
      isOpen
      onClose={onClose}
      headerSlot={
        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            marginRight: '1rem',
          }}
        >
          <h3 className="custom-modal-share-heading">
            Share &quot;AI Assistant Test File&quot;
          </h3>
          <Button
            variant="secondary"
            size="sm"
            className="custom-modal-copy-link-btn"
            iconLeft={<IoMdLink size={18} />}
          >
            Copy Link
          </Button>
        </div>
      }
      footer={
        <Button variant="primary" onClick={handleApplyChanges}>
          Apply Changes
        </Button>
      }
    >
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
        <Button
          variant="primary"
          className="custom-modal-invite-btn"
          disabled={isInviteButtonDisabled}
          style={{
            '--invite-btn-bg': isInviteButtonDisabled ? '#f1f1f1' : '#C3E11D',
            '--invite-btn-color': isInviteButtonDisabled ? '#666' : '#0B1444',
            '--invite-btn-cursor': isInviteButtonDisabled ? 'not-allowed' : 'pointer',
          }}
          onClick={handleSendInvite}
        >
          Send Invite
        </Button>
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
    </Modal>
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
