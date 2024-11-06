import PropTypes from 'prop-types';
import { useState, useEffect, useRef, useCallback } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { useMoveToTrashMutation } from '../../../redux/api/workspaceApi';
import NotificationBar from '../../common/NotificationBar';
import { truncateText } from '../../../utils/helperFunction';
import './styles/DashboardCard.css';
import { FaFolderTree } from 'react-icons/fa6';
import { RiNewspaperLine } from 'react-icons/ri';
import { IoIosChatboxes } from 'react-icons/io';

// Enum for item types
const ItemTypeEnum = Object.freeze({
  WORKSPACE: 'workspace',
  FOLDER: 'folder',
  CHAT: 'chat',
  ASSESSMENT: 'assessment',
  SITEMAP: 'sitemap',
  WIREFRAME: 'wireframe',
});

// Function to map type for displaying correct icon
const getEntityType = (type) => {
  const typeMapping = {
    chats: 'chats',
    assessments: 'assessment',
    sitemaps: 'sitemap',
  };
  return typeMapping[type] || type;
};

const DashboardCard = ({ data = {}, onRemove, onClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [moveToTrash, { isLoading }] = useMoveToTrashMutation();
  const [showNotification, setShowNotification] = useState(false);
  const menuRef = useRef(null);
  const mountedRef = useRef(true); // Track component mounting status

  // Track mounting status to avoid setting state on an unmounted component
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleMoveToTrash = useCallback(
    async (event) => {
      event.stopPropagation();
      setIsMenuOpen(false);
      try {
        const entityType = getEntityType(data.type);
        await moveToTrash({ entityType, id: data.id }).unwrap();
        if (mountedRef.current) onRemove(data.id);
      } catch (error) {
        console.error('Error moving item to trash:', error);
        if (mountedRef.current) setShowNotification(true);
      }
    },
    [moveToTrash, data.id, data.type, onRemove]
  );

  const handleCloseNotification = useCallback(
    () => setShowNotification(false),
    []
  );

  const displayName =
    data.name || data.title || data.chatTitle || 'Unknown Item';
  const createdAt = data.createdAt
    ? new Date(data.createdAt).toLocaleDateString()
    : 'N/A';

  // Close the dropdown menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div className="card-dashboard" onClick={onClick}>
        <div>
          {data.type === 'chats' ? (
            <IoIosChatboxes size={20} color="grey" />
          ) : data.type === 'assessment' ? (
            <RiNewspaperLine size={20} color="grey" />
          ) : data.type === 'sitemap' ? (
            <FaFolderTree size={20} color="grey" />
          ) : (
            <FaFolderTree size={20} color="grey" />
          )}
        </div>
        <div className="info">
          <div>
            <h3>{truncateText(displayName, 20)}</h3>
            <p>Created on: {createdAt}</p>
          </div>
        </div>

        <div className="actions" ref={menuRef}>
          <FiMoreVertical
            className="more-icon"
            onClick={(event) => {
              event.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            size={18}
            color="#000"
          />
          {isMenuOpen && (
            <div className="dropdown-menu">
              <button
                className="dropdown-item"
                onClick={handleMoveToTrash}
                disabled={isLoading}
              >
                {isLoading ? 'Moving...' : 'Move to Trash'}
              </button>
            </div>
          )}
        </div>
      </div>
      {showNotification && (
        <NotificationBar
          message="Failed to move to trash. Please try again."
          type="error"
          onClose={handleCloseNotification}
        />
      )}
    </>
  );
};

DashboardCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.oneOf(Object.values(ItemTypeEnum)).isRequired,
    createdAt: PropTypes.string,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onClick: PropTypes.func,
};

export default DashboardCard;
