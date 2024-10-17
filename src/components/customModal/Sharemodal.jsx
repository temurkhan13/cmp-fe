import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { RxCross2 } from 'react-icons/rx';
import { IoMdLink } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';

import { useSelector, useDispatch } from 'react-redux';
//import { addUserToChat } from '../redux/actions'; // Adjust with your actual action creator

import { useSelectedChat } from '../../redux/selectors/useSelectedChat';

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
    console.log('Changes applied:', userRoles);
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
      <div style={styles.ShareModalOverlay} onClick={onClose}>
        <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div style={styles.header}>
            <h3 style={styles.shareHeading}>Share “AI Assistant Test File”</h3>
            <div style={styles.closeLinkBtn}>
              <button style={styles.copyLinkBtn}>
                <IoMdLink size={18} /> Copy Link
              </button>
              <span style={styles.closeButton} onClick={onClose}>
                <RxCross2
                  style={{
                    background: '#f1f1f1',
                    borderRadius: '50%',
                    fontSize: '1.8rem',
                    padding: '0.2rem',
                  }}
                />
              </span>
            </div>
          </div>
          <hr style={styles.straightLine} />
          <div style={styles.inputContainer}>
            <div style={styles.inputGroup}>
              <input
                style={styles.input}
                type="text"
                placeholder="Add people by email or name"
                value={inputValue}
                onChange={handleInputChange}
              />
              <select
                style={styles.select}
                value={role}
                onChange={handleRoleSelectChange}
              >
                <option value="edit" style={styles.rolesOption}>
                  Can Edit
                </option>
                <option value="view" style={styles.rolesOption}>
                  Can View
                </option>
              </select>
            </div>
            {suggestedUsers.length > 0 && (
              <ul style={styles.suggestionList}>
                {suggestedUsers.map((user) => (
                  <li
                    key={user.userId}
                    style={styles.suggestionItem}
                    onClick={() => handleUserSelect(user)}
                  >
                    {user.name} ({user.email})
                  </li>
                ))}
              </ul>
            )}
            <button
              disabled={isInviteButtonDisabled}
              style={{
                ...styles.inviteBtn,
                backgroundColor: isInviteButtonDisabled ? '#f1f1f1' : '#C3E11D',
                color: isInviteButtonDisabled ? '#666' : '#0B1444',
                cursor: isInviteButtonDisabled ? 'not-allowed' : 'pointer',
              }}
              onClick={handleSendInvite}
            >
              Send Invite
            </button>
          </div>
          <hr style={styles.straightLine} />

          <ul style={styles.members}>
            {userRoles.map((user) => (
              <li key={user.userId} style={styles.member}>
                <div style={styles.memberInfo}>
                  <FaUserCircle size={30} />
                  <span style={styles.memberName}>{user.name}</span>
                </div>
                <select
                  style={styles.select}
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
          <button style={styles.applyBtn} onClick={handleApplyChanges}>
            Apply Changes
          </button>
        </div>
      </div>
    </>
  );
};

const styles = {
  ShareModalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    background: '#fff',
    borderRadius: '0.5rem',
    padding: '2rem',
    boxShadow: '0 0.125rem 0.625rem rgba(0,0,0,0.1)',
    zIndex: 1000,
    position: 'relative',
  },
  shareHeading: {
    fontSize: '1.7rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: '1rem',
    position: 'relative',
  },
  inputGroup: {
    display: 'flex',
    marginBottom: '1rem',
    marginTop: '1rem',
    border: '0.0625rem solid #ccc',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    borderRadius: '0.8rem',
    position: 'relative',
  },
  input: {
    flex: 1,
    padding: '1rem',
    borderRadius: '0.25rem',
    marginRight: '0.5rem',
    width: '30rem',
    border: 'none',
    outline: 'none',
  },
  select: {
    borderRadius: '0.25rem',
    padding: '0.5rem',
    fontSize: '1.4rem',
    border: 'none',
    outline: 'none',
  },
  rolesOption: {
    fontSize: '1.4rem',
    color: '#333',
    outline: 'none',
    border: 'none',
  },
  inviteBtn: {
    border: 'none',
    outline: 'none',
    padding: '1rem',
    borderRadius: '0.8rem',
  },
  applyBtn: {
    position: 'relative',
    // bottom: '0rem',
    // right: '0rem',
    left: '40rem',
    top: '1rem',
    border: 'none',
    outline: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.8rem',
    backgroundColor: '#C3E11D',
    color: '#0B1444',
    cursor: 'pointer',
    fontSize: '1.4rem',
    fontWeight: '500',
  },
  members: {
    listStyleType: 'none',
    padding: '0',
  },
  member: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.5rem 0',
  },
  memberInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  memberName: {
    marginLeft: '0.5rem',
    fontSize: '1.4rem',
    color: 'black',
  },
  closeButton: {
    cursor: 'pointer',
  },
  straightLine: {
    borderTop: '0.0625rem solid lightgray',
  },
  copyLinkBtn: {
    border: 'none',
    outline: 'none',
    background: 'white',
    color: 'blue',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.4rem',
    fontWeight: '500',
  },
  closeLinkBtn: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '2rem',
    fontWeight: '500',
    cursor: 'pointer',
    gap: '1.5rem',
  },
  suggestionList: {
    position: 'absolute',
    top: '100%',
    left: '0',
    right: '0',
    zIndex: '1000',
    background: '#fff',
    boxShadow: '0 0.125rem 0.625rem rgba(0,0,0,0.1)',
    borderRadius: '0.5rem',
    maxHeight: '15rem',
    overflowY: 'auto',
    border: '0.0625rem solid #ccc',
  },
  suggestionItem: {
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    borderBottom: '0.0625rem solid #eee',
    fontSize: '1.4rem',
    color: '#333',
  },
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
