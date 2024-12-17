import { useState } from 'react';
import PropTypes from 'prop-types';
import { FiCheckCircle } from 'react-icons/fi';

const Notifications = ({ initialSettings }) => {
  const defaultSettings = {
    commentsEnabled: {
      mentions: false,
      replies: false,
      commentsOnContent: false,
    },
    accessEnabled: {
      editor: false,
      editAccess: false,
    },
  };

  const [settings, setSettings] = useState(initialSettings || defaultSettings);
  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = (category, key) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key],
      },
    }));
  };

  const handleSaveChanges = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="notification-settings">
      <h3>Notifications</h3>
      <p>Decide what you want to be notified about, and what you don&apso;t.</p>
      <hr />

      <div className="section">
        <h4>Comments</h4>
        <Toggle
          label="Someone @mentions me in a comment or reply"
          isChecked={settings.commentsEnabled.mentions}
          onToggle={() => handleToggle('commentsEnabled', 'mentions')}
        />
        <Toggle
          label="Someone replies to my comments"
          isChecked={settings.commentsEnabled.replies}
          onToggle={() => handleToggle('commentsEnabled', 'replies')}
        />
        <Toggle
          label="Someone comments on content I've added"
          isChecked={settings.commentsEnabled.commentsOnContent}
          onToggle={() => handleToggle('commentsEnabled', 'commentsOnContent')}
        />
      </div>

      <div className="section">
        <h4>Access</h4>
        <Toggle
          label="Someone has made me an editor"
          isChecked={settings.accessEnabled.editor}
          onToggle={() => handleToggle('accessEnabled', 'editor')}
        />
        <Toggle
          label="Someone wants edit access to the file"
          isChecked={settings.accessEnabled.editAccess}
          onToggle={() => handleToggle('accessEnabled', 'editAccess')}
        />
      </div>

      <button
        className="save-btn"
        onClick={handleSaveChanges}
        disabled={isSaving}
      >
        {isSaving ? 'Saving...' : 'Save Changes'}
        <FiCheckCircle />
      </button>

      <style>{`
        .notification-settings {
          padding: 2rem;
         background-color: #f9f9f9;
          box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
          border: 1px solid #e0e0e0;
          border-radius: 0.8rem;
          margin: auto;
          font-family: 'Arial', sans-serif;
        }

        h3 {
          margin-bottom: 1rem;
          color: #333;
          font-size: 1.8rem;
        }

        p {
          margin-bottom: 1rem;
          color: #777;
          font-size: 1.4rem;
        }

        .section {
          margin: 1rem 0 2rem 0 ;
        }

        h4 {
          margin-bottom: 1rem;
          color: #555;
          font-size: 1.6rem;
        }

        .save-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 1.5rem;
          background-color: #c3e11d;
          border: none;
          border-radius: 0.5rem;
          color: #333;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.3s ease;
          opacity: ${isSaving ? '0.6' : '1'};
        }

        .save-btn:disabled {
          cursor: not-allowed;
        }

        .save-btn:hover {
          background-color: #b2e042;
        }

        .save-btn svg {
          margin-left: 0.8rem;
        }
      `}</style>
    </div>
  );
};

// Toggle component with prop validation
const Toggle = ({ label, isChecked, onToggle }) => (
  <div className="toggle">
    <label>{label}</label>
    <input type="checkbox" checked={isChecked} onChange={onToggle} />
    <style>{`
      .toggle {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
      }

      label {
        color: #333;
        font-size: 1.4rem;
      }

      input[type='checkbox'] {
        width: 2rem;
        height: 2rem;
        cursor: pointer;
        appearance: none;
        background-color: #f0f0f0;
        border: 1px solid #ccc;
        border-radius: 0.3rem;
        position: relative;
      }

      input[type='checkbox']:checked {
        background-color: #2196f3;
        border-color: #2196f3;
        border-radius: 1rem;
      }

      input[type='checkbox']:checked::after {
        content: '\\2714';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 1.4rem;
      }
    `}</style>
  </div>
);

// Prop validation for Notifications component
Notifications.propTypes = {
  initialSettings: PropTypes.shape({
    commentsEnabled: PropTypes.shape({
      mentions: PropTypes.bool.isRequired,
      replies: PropTypes.bool.isRequired,
      commentsOnContent: PropTypes.bool.isRequired,
    }).isRequired,
    accessEnabled: PropTypes.shape({
      editor: PropTypes.bool.isRequired,
      editAccess: PropTypes.bool.isRequired,
    }).isRequired,
  }),
};

// Default prop values in case initialSettings is not provided
Notifications.defaultProps = {
  initialSettings: null, // Fallback to defaultSettings within useState
};

// Prop validation for Toggle component
Toggle.propTypes = {
  label: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Notifications;
