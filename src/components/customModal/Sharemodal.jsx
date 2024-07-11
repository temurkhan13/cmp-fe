import { useState } from 'react';
import PropTypes from 'prop-types';

import { RxCross2 } from 'react-icons/rx';
import { IoMdLink } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';

const ShareModal = ({ members, onClose }) => {
  
  const [userRoles, setUserRoles] = useState(members);
  const [inputValue, setInputValue] = useState('');
  const [role, setRole] = useState('edit');

  const handleRoleChange = (name, newRole) => {
    setUserRoles(
      userRoles.map((user) =>
        user.name === name ? { ...user, role: newRole } : user
      )
    );
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleRoleSelectChange = (e) => {
    setRole(e.target.value);
  };

  const isExistingMember = userRoles.some((user) => user.name === inputValue);
  const isEmail =
    /^[^\s@]+@[^\s@]+\.(.com|.net|.org|.edu|.gov|.mil|.biz|.info|.io|.co|.us|.uk|.me|.site|.online|.outlook|.email|.pro|.tech|.app|.dev|.xyz|.ai)$/i.test(
      inputValue
    );

  const isInviteButtonDisabled = !inputValue || isExistingMember || isEmail;

  return (
    <>
      <div style={styles.overlay} onClick={onClose}>
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
                    background: 'lightgray',
                    borderRadius: '50%',
                    fontSize: '1.8reme',
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
                <option value="remove" style={styles.rolesOption}>
                  Remove
                </option>
              </select>
            </div>{' '}
            <button
              disabled={isInviteButtonDisabled}
              style={{
                ...styles.inviteBtn,
                backgroundColor: isInviteButtonDisabled ? '#ccc' : '#C3E11D',
                color: isInviteButtonDisabled ? '#666' : '#0B1444',
                cursor: isInviteButtonDisabled ? 'not-allowed' : 'pointer',
              }}
            >
              Send Invite
            </button>
          </div>
          <hr style={styles.straightLine} />

          <ul style={styles.members}>
            {userRoles.map((member) => (
              <li key={member.name} style={styles.member}>
                <div style={styles.memberInfo}>
                  <FaUserCircle size={30} />
                  <span style={styles.memberName}>{member.name}</span>
                </div>
                <select
                  style={styles.select}
                  value={member.role}
                  onChange={(e) =>
                    handleRoleChange(member.name, e.target.value)
                  }
                  disabled={member.role === 'owner'}
                >
                  <option value="owner" style={styles.rolesOption}>
                    Owner
                  </option>
                  <option value="edit" style={styles.rolesOption}>
                    Can Edit
                  </option>
                  <option value="view" style={styles.rolesOption}>
                    Can View
                  </option>
                  <option value="remove">Remove</option>
                </select>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

const styles = {
  overlay: {
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
  },
  inputGroup: {
    display: 'flex',
    marginBottom: '1rem',
    marginTop: '1rem',
    border: '0.0625rem solid #ccc',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    borderRadius: '0.8rem',
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
    border: 'none',
    outline: 'none',
  },
  inviteBtn: {
    border: 'none',
    outline: 'none',
    padding: '1rem',
    borderRadius: '0.8rem',
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
