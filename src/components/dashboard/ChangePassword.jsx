import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ChangePassword = ({ onChangePassword }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'currentPassword') setCurrentPassword(value);
    if (name === 'newPassword') setNewPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
  };

  const validate = () => {
    const newErrors = {};
    if (!currentPassword)
      newErrors.currentPassword = 'Current password is required.';
    if (!newPassword) newErrors.newPassword = 'New password is required.';
    if (newPassword !== confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onChangePassword(currentPassword, newPassword);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="change-password">
      {/* <h2>Change Password</h2> */}

      <div className="input-group">
        <label className="field-label">Old Password</label>
        <input
          type={showCurrentPassword ? 'text' : 'password'}
          name="currentPassword"
          placeholder="Enter current password"
          value={currentPassword}
          onChange={handleChange}
        />
        <span
          className="icon"
          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
        >
          {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
        {errors.currentPassword && (
          <p className="error">{errors.currentPassword}</p>
        )}
      </div>

      <div className="new-password-fields">
        <div className="input-group">
          <label className="field-label">New Password</label>
          <input
            type={showNewPassword ? 'text' : 'password'}
            name="newPassword"
            placeholder="Enter new password"
            value={newPassword}
            onChange={handleChange}
          />
          <span
            className="icon"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.newPassword && <p className="error">{errors.newPassword}</p>}
        </div>

        <div className="input-group">
          <label className="field-label">Confirm New Password</label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Enter confirm password"
            value={confirmPassword}
            onChange={handleChange}
          />
          <span
            className="icon"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
        </div>
      </div>

      <button type="submit" className="update-button">
        Update Password
      </button>

      <style>{`
        .change-password {
          // max-width: 40rem;
          margin: auto;
          // margin-top:2rem;
          // padding: 2rem;
          // border: 0.1rem solid #ddd;
          border-radius: 0.8rem;
          // background-color: #f9f9f9;
          // box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
          
        }
        .input-group {
          position: relative;
          margin-top: 1rem;
          width: 48%;
        }
        .new-password-fields {
          display: flex;
          gap: 2rem;
        }
        input {
          width: 100%;
          padding: 1rem;
          border: 0.1rem solid #ddd;
          border-radius: 1rem;
          outline: none;
        }
        .field-label {
          font-size: 1.4rem;
        }
        .icon {
          position: absolute;
          right: 1rem;
          top: 50%;
          cursor: pointer;
          font-size: 1.5rem;
          color: gray;
        }
        .error {
          color: red;
          font-size: 1.2rem;
          margin-top: 0.5rem;
        }
        .update-button {
          background-color: #c3e11d;
          color: #0b1444;
          font-size: 1.4rem;
          font-weight: 500;
          padding: 1rem 2rem;
          border: none;
          border-radius: 0.8rem;
          cursor: pointer;
          margin-top: 1.5rem;
        }
      `}</style>
    </form>
  );
};

ChangePassword.propTypes = {
  onChangePassword: PropTypes.func.isRequired,
};

export default ChangePassword;
