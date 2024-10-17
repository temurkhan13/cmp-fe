import { useState } from 'react';
// import ChangePassword from '../ChangePassword';

const PersonalInfo = () => {
  const [avatar, setAvatar] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  // const [role, setRole] = useState('');
  // const [industry, setIndustry] = useState('');
  // const [companySize, setCompanySize] = useState('');
  const [companyName, setCompanyName] = useState('');
  // const [websiteURL, setWebsiteURL] = useState('');
  // const [jobTitle, setJobTitle] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('File size should be less than 1 MB.');
    }
  };

  const handleImageDelete = () => {
    setAvatar('');
  };

  const validateForm = () => {
    const errors = {};

    if (email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      errors.email = 'Invalid email address.';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit form logic here
      setSuccessMessage('Changes have been updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  return (
    <div className="personal-info">
      <h2>Personal Information</h2>
      <p>Update your personal and company details here.</p>
      <hr />
      <div className="upload-section">
        <div className="avatar" style={{ backgroundImage: `url(${avatar})` }}>
          {!avatar && 'SR'}
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

        {/* <div className="form-row">
          <div className="input-wrapper">
            <label>your Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={errors.role ? 'input-error' : ''}
            >
              <option value="">What is your role?</option>
            </select>
            {errors.role && <small className="error">{errors.role}</small>}
          </div>
        </div>

        <div className="form-row">
          <div className="input-wrapper">
            <label>What industry are you in?</label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className={errors.industry ? 'input-error' : ''}
            >
              <option value="">What industry are you in?</option>
            </select>
            {errors.industry && (
              <small className="error">{errors.industry}</small>
            )}
          </div>
        </div> */}
        {/* 
        <div className="form-row">
          <div className="input-wrapper">
            <label>What size is your company?</label>
            <select
              value={companySize}
              onChange={(e) => setCompanySize(e.target.value)}
              className={errors.companySize ? 'input-error' : ''}
            >
              <option value="">What size is your company?</option>
            </select>
            {errors.companySize && (
              <small className="error">{errors.companySize}</small>
            )}
          </div>
        </div> */}

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

        {/* <div className="form-row">
          <div className="input-wrapper">
            <label>What is your website URL?</label>
            <input
              type="url"
              placeholder="Website URL"
              value={websiteURL}
              onChange={(e) => setWebsiteURL(e.target.value)}
              className={errors.websiteURL ? 'input-error' : ''}
            />
            {errors.websiteURL && (
              <small className="error">{errors.websiteURL}</small>
            )}
          </div>
        </div> */}
        {/* 
        <div className="form-row">
          <div className="input-wrapper">
            <label>What is your job title?</label>
            <input
              type="text"
              placeholder="Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className={errors.jobTitle ? 'input-error' : ''}
            />
            {errors.jobTitle && (
              <small className="error">{errors.jobTitle}</small>
            )}
          </div>
        </div> */}

        <button type="submit" className="save-button">
          Save Changes
        </button>

        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
      {/* <ChangePassword /> */}
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
          // margin-bottom: 1rem;
          color: #777;
          font-size:1.3rem;
        }

        .upload-section {
          display: flex;
          align-items: center;
          margin: 2rem 0 ;
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
          top:0;
          padding: 1rem
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
          width:15rem;
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

        .input-wrapper input,
        .input-wrapper select {
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
      `}</style>
    </div>
  );
};

export default PersonalInfo;
