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

      <div className="notification-settings-section">
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

      <div className="notification-settings-section">
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
        className="notification-save-btn"
        onClick={handleSaveChanges}
        disabled={isSaving}
      >
        {isSaving ? 'Saving...' : 'Save Changes'}
        <FiCheckCircle />
      </button>
    </div>
  );
};

// Toggle component with prop validation
const Toggle = ({ label, isChecked, onToggle }) => (
  <div className="notification-toggle">
    <label>{label}</label>
    <input type="checkbox" checked={isChecked} onChange={onToggle} />
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
