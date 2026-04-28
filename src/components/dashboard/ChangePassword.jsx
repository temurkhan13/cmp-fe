import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import apiClient from '../../api/axios';
import Button from '../common/Button';

const ChangePassword = ({ onChangePassword }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (onChangePassword) {
      onChangePassword(currentPassword, newPassword);
      return;
    }

    // Default behavior: call API directly
    setLoading(true);
    setSuccessMessage('');
    try {
      await apiClient.post('/auth/change-password', { currentPassword, newPassword });
      setSuccessMessage('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update password.';
      setErrors({ currentPassword: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="change-password">
      {/* <h2>Change Password</h2> */}

      <div className="input-group">
        <label className="field-label-">Old Password</label>
        <input
          className="reset-password-input"
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
            className="reset-password-input"
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
            className="reset-password-input"
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

      <Button
        type="submit"
        variant="primary"
        className="update-button"
        loading={loading}
      >
        Update Password
      </Button>
      {successMessage && (
        <p className="change-password-success">{successMessage}</p>
      )}

    </form>
  );
};

ChangePassword.propTypes = {
  onChangePassword: PropTypes.func,
};

export default ChangePassword;
