import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAsync } from '../../../redux/slices/userSlice.js';
import config from '../../../config/config.js';

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
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);

  // Sync local state with currentUser from Redux store whenever it changes
  useEffect(() => {
    setAvatar(currentUser?.photoPath || '');
    setFirstName(currentUser?.firstName || '');
    setLastName(currentUser?.lastName || '');
    setEmail(currentUser?.email || '');
    setCompanyName(currentUser?.companyName || '');
  }, [currentUser]);

  useEffect(() => {
    setHasChanged(
      firstName !== currentUser?.firstName ||
        lastName !== currentUser?.lastName ||
        email !== currentUser?.email ||
        companyName !== currentUser?.companyName ||
        selectedFile !== null
    );
  }, [firstName, lastName, email, companyName, selectedFile, currentUser]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = (e) => setAvatar(e.target.result);
      reader.readAsDataURL(file);
      setSelectedFile(file);
    } else {
      alert('File size should be less than 1 MB.');
    }
  };

  const handleImageDelete = () => {
    const generatedImage = generateInitialsImage();
    setAvatar(generatedImage);
    setSelectedFile(null);
  };

  const generateInitialsImage = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const initials = `${firstName?.[0] || ''}${
      lastName?.[0] || ''
    }`.toUpperCase();

    canvas.width = 200;
    canvas.height = 200;
    context.fillStyle = '#C3E11D';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = 'bold 80px Arial';
    context.fillStyle = '#0B1444';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(initials, canvas.width / 2, canvas.height / 2);

    return canvas.toDataURL('image/png');
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

      const imageToSend = selectedFile ? selectedFile : null;

      const formData = {
        userId: currentUser.id,
        updatedUserData,
        photoPath: imageToSend,
      };

      try {
        const result = await dispatch(updateUserAsync(formData));

        if (updateUserAsync.fulfilled.match(result)) {
          setSuccessMessage('Changes have been updated successfully!');
          // Directly update Redux store's user data after successful update
          dispatch({
            type: 'auth/updateUser',
            payload: { ...currentUser, ...updatedUserData, photoPath: avatar },
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
      <div className="upload-section">
        <div className="avatar" style={{ backgroundImage: `url(${avatar})` }}>
          {!avatar && `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase()}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            type="file"
            onChange={handleImageUpload}
            className="upload-input"
            accept="image/png, image/jpeg, image/gif"
          />
          <button
            type="button"
            onClick={() => document.querySelector('.upload-input').click()}
            className="upload-button"
          >
            Upload Image
          </button>
          <small>JPG, GIF, or PNG. Max size of 1Mb</small>
        </div>
        {avatar && (
          <button
            type="button"
            onClick={handleImageDelete}
            className="delete-button"
          >
            Delete
          </button>
        )}
      </div>
      <form className="info-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="input-wrapper">
            <label>First Name</label>
            <input
              type="text"
              required
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={errors.firstName ? 'input-error' : ''}
            />
            {errors.firstName && (
              <small className="error">{errors.firstName}</small>
            )}
          </div>
          <div className="input-wrapper">
            <label>Last Name</label>
            <input
              type="text"
              required
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={errors.lastName ? 'input-error' : ''}
            />
            {errors.lastName && (
              <small className="error">{errors.lastName}</small>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="input-wrapper">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <small className="error">{errors.email}</small>}
          </div>
        </div>

        <div className="form-row">
          <div className="input-wrapper">
            <label>What is your company name?</label>
            <input
              type="text"
              placeholder="Company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className={errors.companyName ? 'input-error' : ''}
            />
            {errors.companyName && (
              <small className="error">{errors.companyName}</small>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="save-button"
          disabled={!hasChanged || loading}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
        {errors.form && <small className="error">{errors.form}</small>}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
      </form>

      <hr style={{ margin: '2rem 0' }} />
      <div className="danger-zone">
        <h3 style={{ color: '#c00', fontSize: '1.8rem', marginBottom: '0.5rem' }}>Danger Zone</h3>
        <p style={{ fontSize: '1.3rem', color: '#666', marginBottom: '1rem' }}>Once you delete your account, there is no going back. Please be certain.</p>
        <button
          type="button"
          className="delete-account-button"
          onClick={async () => {
            if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) return;
            try {
              const token = localStorage.getItem('token');
              const res = await fetch(`${config.apiURL}/auth/delete-account`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
              });
              if (res.ok) {
                localStorage.clear();
                window.location.href = '/login';
              } else {
                alert('Failed to delete account. Please try again.');
              }
            } catch {
              alert('Failed to delete account. Please try again.');
            }
          }}
        >
          Delete Account
        </button>
      </div>
      <style>{`
        .personal-info {
          margin: 0 auto;
          padding: 2rem;
          background: #f9f9f9;
          border-radius: 0.8rem;
          box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
        }

        h2 {
          margin-bottom: 1rem;
          font-size: 2.4rem;
          font-weight: bold;
        }

        p {
          color: #777;
          font-size: 1.3rem;
        }

        .upload-section {
          display: flex;
          align-items: center;
          margin: 2rem 0;
        }

        .avatar {
          width: 8rem;
          height: 8rem;
          border-radius: 50%;
          background-color: #C3E11D;
          background-size: cover;
          background-position: center;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          color: #0B1444;
          font-size: 1.8rem;
          margin-right: 1.5rem;
          position: relative;
        }

        .delete-button {
          background: lightgray;
          border: none;
          color: black;
          font-size: 1.5rem;
          cursor: pointer;
          border-radius: 1rem;
          padding: 1rem;
        }

        .upload-input {
          display: none;
        }

        .upload-button {
          padding: 1rem 1.5rem;
          border: 0.1rem solid #0B1444;
          background: #fff;
          cursor: pointer;
          font-size: 1.4rem;
          border-radius: 1rem;
          color: #0B1444;
          width: 15rem;
        }

        small {
          margin-top: 1rem;
          color: #999;
          font-size: 1.2rem;
        }

        .info-form {
          display: flex;
          flex-direction: column;
        }

        .form-row {
          display: flex;
          margin-bottom: 1.5rem;
        }

        .input-wrapper {
          flex: 1;
          position: relative;
          margin-right: 1rem;
        }

        .input-wrapper:last-child {
          margin-right: 0;
        }

        .input-wrapper label {
          font-size: 1.4rem;
          font-weight: 400;
          margin-bottom: 0.5rem;
          display: inline-block;
          color: #000;
        }

        .input-wrapper input {
          width: 100%;
          padding: 1rem;
          font-size: 1.4rem;
          border: 0.1rem solid #ddd;
          border-radius: 1rem;
          outline: none;
          margin-bottom: 0.5rem;
        }

        .input-error {
          border-color: red;
        }

        .error {
          position: absolute;
          bottom: -1.5rem;
          left: 0;
          font-size: 1rem;
          color: red;
        }

        .success-message {
          margin-top: 1rem;
          color: green;
          font-size: 1.4rem;
        }

        .save-button {
          padding: 1rem 1.5rem;
          background-color: #C3E11D;
          border: none;
          color: #000;
          font-size: 1.5rem;
          border-radius: 1rem;
          cursor: pointer;
          font-weight: 500;
          width: 15rem;
          transition: background-color 0.3s ease;
        }

        .save-button:hover {
          background-color: #A6C41B;
        }

        .danger-zone {
          padding: 1.5rem;
          border: 1px solid #fcc;
          border-radius: 0.8rem;
          background: #fff5f5;
        }

        .delete-account-button {
          padding: 1rem 2rem;
          background-color: #c00;
          border: none;
          color: white;
          font-size: 1.4rem;
          border-radius: 1rem;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.3s ease;
        }

        .delete-account-button:hover {
          background-color: #900;
        }
      `}</style>
    </div>
  );
};

export default PersonalInfo;
