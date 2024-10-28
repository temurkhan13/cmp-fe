import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { useMoveToTrashMutation } from '../../../redux/api/workspaceApi.js';
import NotificationBar from '../../common/NotificationBar.jsx';

// Enum-like structure for type
const ItemTypeEnum = Object.freeze({
  WORKSPACE: 'workspace',
  FOLDER: 'folder',
  CHAT: 'chat',
  ASSESSMENT: 'assessment',
  SITEMAP: 'sitemap',
  WIREFRAME: 'wireframe',
});

const DashboardCard = ({ data = {}, onRemove }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [moveToTrash, { isLoading, isError, error }] = useMoveToTrashMutation();
  const [showNotification, setShowNotification] = useState(false);
  const menuRef = useRef(null);

  const handleMoveToTrash = async () => {
    try {
      await moveToTrash({ entityType: data.type, id: data.id }).unwrap();
      onRemove(data.id); // Call the onRemove prop to update the UI
    } catch (err) {
      console.error('Error moving to trash:', err);
      setShowNotification(true); // Show error notification
    }
    setIsMenuOpen(false); // Close the dropdown menu
  };

  console.log('data', data);

  // Close the menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Show notification if there’s an error
  useEffect(() => {
    if (isError && error) {
      setShowNotification(true);
    }
  }, [isError, error]);

  // Handle missing data properties gracefully
  const displayName = data.name || data.title || data.chatTitle || 'Unknown Item';
  const createdAt = data.createdAt ? new Date(data.createdAt).toLocaleDateString() : 'N/A';

  return (
    <>
      <div className="card">
        <div className="info">
          <h3>{displayName}</h3>
          <p>Created on: {createdAt}</p>
        </div>

        <div className="actions" ref={menuRef}>
          <FiMoreVertical className="more-icon" onClick={() => setIsMenuOpen(!isMenuOpen)} />
          {isMenuOpen && (
            <div className="dropdown-menu">
              <button
                className="dropdown-item"
                onClick={handleMoveToTrash}
                disabled={isLoading} // Disable while loading
              >
                {isLoading ? 'Moving...' : 'Move to Trash'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Error Notification Tab */}
      {showNotification && (
        <NotificationBar
          message="Failed to move to trash. Please try again."
          type="error"
          onClose={() => setShowNotification(false)}
        />
      )}

      <style>{`
        .card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          position: relative; /* Required for the actions to be absolutely positioned */
          width: 100%;
          
          max-width: 400px; /* Adjust based on your design needs */
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Shadow effect */
          transition: transform 0.2s ease, box-shadow 0.2s ease; /* Smooth transitions */
        }
        .card:hover {
          transform: translateY(-4px); /* Hover effect for card lift */
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* Darker shadow on hover */
        }
        .info {
          flex-grow: 1;
        }
        .info h3 {
          margin: 0;
          font-size: 1.5rem;
        }
        .info p {
          margin: 0.5rem 0 0;
          color: gray;
        }
        .actions {
          position: absolute; /* Make the three dots positioned relative to the card */
          top: 10px;
          right: 10px;
        }
        .more-icon {
          cursor: pointer;
          font-size: 1.5rem;
          color: gray;
        }
        .dropdown-menu {
          position: absolute;
          top: 2rem;
          right: 0;
          background-color: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 0.5rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          z-index: 100;
          width: 150px;
        }
        .dropdown-item {
          background-color: transparent;
          border: none;
          padding: 0.5rem 1rem;
          text-align: left;
          width: 100%;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .dropdown-item:hover {
          background-color: #f0f0f0; /* Light gray on hover */
        }
      `}</style>
    </>
  );
};

DashboardCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.oneOf(Object.values(ItemTypeEnum)).isRequired, // Enum for type
    createdAt: PropTypes.string.isRequired,
  }),
  onRemove: PropTypes.func.isRequired,
};

export default DashboardCard;
