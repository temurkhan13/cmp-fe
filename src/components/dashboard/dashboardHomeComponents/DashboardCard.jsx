import PropTypes from 'prop-types';
import { useState, useEffect, useRef, useCallback } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { useMoveToTrashMutation } from '../../../redux/api/workspaceApi';
import NotificationBar from '../../common/NotificationBar';
import './styles/DashboardCard.css';

const ItemTypeEnum = Object.freeze({
  WORKSPACE: 'workspace',
  FOLDER: 'folder',
  CHAT: 'chat',
  ASSESSMENT: 'assessment',
  SITEMAP: 'sitemap',
  WIREFRAME: 'wireframe',
});

const DashboardCard = ({ data = {}, onRemove, onClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [moveToTrash, { isLoading, isError }] = useMoveToTrashMutation();
  const [showNotification, setShowNotification] = useState(false);
  const menuRef = useRef(null);

  const handleMoveToTrash = useCallback(async () => {
    try {
      await moveToTrash({ entityType: data.type, id: data.id }).unwrap();
      onRemove(data.id);
    } catch {
      setShowNotification(true);
    }
    setIsMenuOpen(false);
  }, [moveToTrash, data.id, data.type, onRemove]);

  const handleCloseNotification = useCallback(() => setShowNotification(false), []);

  const displayName = data.name || data.title || data.chatTitle || 'Unknown Item';
  const createdAt = data.createdAt ? new Date(data.createdAt).toLocaleDateString() : 'N/A';

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
      <div className="card" onClick={onClick}>
        <div className="info">
          <h3>{displayName}</h3>
          <p>Created on: {createdAt}</p>
        </div>

        <div className="actions" ref={menuRef}>
          <FiMoreVertical
            className="more-icon"
            onClick={(event) => {
              event.stopPropagation(); // Prevent the card's onClick from firing
              setIsMenuOpen(!isMenuOpen);
            }}
          />
          {isMenuOpen && (
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={handleMoveToTrash} disabled={isLoading}>
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
