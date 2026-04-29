import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAsync } from '../../../redux/slices/userSlice.js';
import apiClient from '../../../api/axios';
import ConfirmModal from '../../common/ConfirmModal';
import Button from '../../common/Button';
import { BiTrash } from 'react-icons/bi';

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  const [avatar, setAvatar] = useState(currentUser?.photoPath || '');
  const [firstName, setFirstName] = useState(currentUser?.firstName || '');
  const [lastName, setLastName] = useState(currentUser?.lastName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [companyName, setCompanyName] = useState(
    currentUser?.companyName || ''
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [photoDeleted, setPhotoDeleted] = useState(false);
  const fileInputRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Sync local state with currentUser from Redux store whenever it changes
  useEffect(() => {
    setAvatar(currentUser?.photoPath || '');
    setFirstName(currentUser?.firstName || '');
    setLastName(currentUser?.lastName || '');
    setEmail(currentUser?.email || '');
    setCompanyName(currentUser?.companyName || '');
    setPhotoDeleted(false);
    setSelectedFile(null);
  }, [currentUser]);

  useEffect(() => {
    setHasChanged(
      firstName !== currentUser?.firstName ||
      lastName !== currentUser?.lastName ||
      email !== currentUser?.email ||
      companyName !== currentUser?.companyName ||
      selectedFile !== null ||
      photoDeleted
    );
  }, [firstName, lastName, email, companyName, selectedFile, photoDeleted, currentUser]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = (e) => setAvatar(e.target.result);
      reader.readAsDataURL(file);
      setSelectedFile(file);
      setPhotoDeleted(false);
    } else {
      alert('File size should be less than 1 MB.');
    }
  };

  const handleImageDelete = () => {
    setAvatar('');
    setSelectedFile(null);
    setPhotoDeleted(true);
  };

  const validateForm = () => {
    const errors = {};
    if (email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      errors.email = 'Invalid email address.';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      const updatedUserData = {
        firstName,
        lastName,
        email,
        companyName,
      };

      const formData = {
        userId: currentUser.id,
        updatedUserData,
        photoPath: selectedFile ? selectedFile : null,
        removePhoto: photoDeleted && !selectedFile,
      };

      try {
        const result = await dispatch(updateUserAsync(formData));

        if (updateUserAsync.fulfilled.match(result)) {
          setSuccessMessage('Changes have been updated successfully!');
          setPhotoDeleted(false);
          dispatch({
            type: 'auth/updateUser',
            payload: result.payload,
          });
        } else {
          setErrors({ form: 'Failed to update user information.' });
        }
      } catch (error) {
        setErrors({ form: 'Failed to update user information.' });
      } finally {
        setLoading(false);
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    }
  };

  return (
    <div className="personal-info">
      <h2>Personal Information</h2>
      <p>Update your personal and company details here.</p>
      <hr />
      <div className="personal-info-upload-section">
        <div className="personal-info-avatar" style={{ backgroundImage: `url(${avatar})` }}>
          {!avatar && `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase()}
        </div>
        <div className='avatar-uploader'>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="personal-info-upload-input"
            accept="image/png, image/jpeg, image/gif"
          />
          <div className='avatar-upload-actions'>
            <Button
              variant="secondary"
              className="personal-info-upload-btn"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload Image
            </Button>
            {avatar && (
              <Button
                variant="secondary"
                className="personal-info-delete-btn"
                onClick={handleImageDelete}
                iconLeft={<BiTrash />}
              >
                Delete
              </Button>
            )}
          </div>
          <small>JPG, GIF, or PNG. Max size of 1Mb</small>
        </div>

      </div>
      <form className="personal-info-form" onSubmit={handleSubmit}>
        <div className="personal-info-form-row">
          <div className="personal-info-input">
            <label>First Name</label>
            <input
              type="text"
              required
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={errors.firstName ? 'personal-info-input--error' : ''}
            />
            {errors.firstName && (
              <small className="personal-info-error">{errors.firstName}</small>
            )}
          </div>
          <div className="personal-info-input">
            <label>Last Name</label>
            <input
              type="text"
              required
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={errors.lastName ? 'personal-info-input--error' : ''}
            />
            {errors.lastName && (
              <small className="personal-info-error">{errors.lastName}</small>
            )}
          </div>
        </div>

        <div className="personal-info-form-row">
          <div className="personal-info-input">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? 'personal-info-input--error' : ''}
            />
            {errors.email && <small className="personal-info-error">{errors.email}</small>}
          </div>
        </div>

        <div className="personal-info-form-row">
          <div className="personal-info-input">
            <label>What is your company name?</label>
            <input
              type="text"
              placeholder="Company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className={errors.companyName ? 'personal-info-input--error' : ''}
            />
            {errors.companyName && (
              <small className="personal-info-error">{errors.companyName}</small>
            )}
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="personal-info-save-btn"
          disabled={!hasChanged}
          loading={loading}
        >
          Save Changes
        </Button>
        {errors.form && <small className="personal-info-error">{errors.form}</small>}
        {successMessage && (
          <div className="personal-info-success">{successMessage}</div>
        )}
      </form>

      <hr className='settings-divider' />

      <div className="personal-info-danger-zone">
        <h3 className='settings-danger-title'>Danger Zone</h3>
        <p className='settings-danger-desc'>Once you delete your account, there is no going back. Please be certain.</p>
        <Button
          variant="destructive"
          className="personal-info-delete-account-btn"
          onClick={() => setShowDeleteConfirm(true)}
        >
          Delete Account
        </Button>
      </div>
      <ConfirmModal
        isOpen={showDeleteConfirm}
        title="Delete Account"
        description="Are you sure you want to delete your account? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={async () => {
          try {
            await apiClient.delete('/auth/delete-account');
            localStorage.clear();
            window.location.href = '/log-in';
          } catch {
            alert('Failed to delete account. Please try again.');
          }
          setShowDeleteConfirm(false);
        }}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
};

export default PersonalInfo;
