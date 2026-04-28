import PropTypes from 'prop-types';
import { useState, useEffect, useRef, useCallback } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { useMoveToTrashMutation } from '../../../redux/api/workspaceApi';
import NotificationBar from '../../common/NotificationBar';
import { truncateText } from '../../../utils/helperFunction';
import './styles/dashboard-card.scss';
import { FaFolderTree } from 'react-icons/fa6';
import { RiNewspaperLine } from 'react-icons/ri';
import { IoIosChatboxes } from 'react-icons/io';
import AvatarGroup from '../../common/AvatarGroup';
import ConfirmModal from '../../common/ConfirmModal';
import Button from '../../common/Button';

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

const DashboardCard = ({ data = {}, onRemove, onClick, folderData, id }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [moveToTrash, { isLoading }] = useMoveToTrashMutation();
  const [showNotification, setShowNotification] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const menuRef = useRef(null);
  const mountedRef = useRef(true); // Track component mounting status

  // Track mounting status to avoid setting state on an unmounted component
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleTrashClick = useCallback(
    (event) => {
      event.stopPropagation();
      setIsMenuOpen(false);
      setShowConfirm(true);
    },
    []
  );

  const handleConfirmTrash = useCallback(
    async () => {
      try {
        const entityType = getEntityType(data.type);
        await moveToTrash({ entityType, id: data.id }).unwrap();
        setShowConfirm(false);
        onRemove(data.id);
      } catch (error) {
        setShowConfirm(false);
        setShowNotification(true);
      }
    },
    [moveToTrash, data.id, data.type, onRemove]
  );

  const handleCloseNotification = useCallback(
    () => setShowNotification(false),
    []
  );

  const displayName =
    data.name ||
    data.title ||
    data.chatTitle ||
    (data.report && data.report[0] ? data.report[0].ReportTitle : '') ||
    'Unknown Item';
  const rawDate = data.createdAt || data.created_at || data.updatedAt || data.updated_at;
  const createdAt = rawDate
    ? new Date(rawDate).toLocaleDateString()
    : '';

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
            <RiNewspaperLine size={20} color="grey" />
          )}
        </div>

        {data.status === 'completed' ? (
          <div className="card-badge card-badge--green">
            Completed
          </div>
        ) : data.status === 'in-progress' ? (
          <div className="card-badge card-badge--blue">
            In Progress
          </div>
        ) : data.status === 'pending' ? (
          <div className="card-badge card-badge--yellow">
            Pending
          </div>
        ) : (
          ''
        )}
        <div className="info">
          <div>
            <h3>{truncateText(displayName, 20)}</h3>
            <p>Created on: {createdAt}</p>
          </div>
          {data.sharedUsers?.length > 0 && (
            <AvatarGroup users={data.sharedUsers} max={3} size={24} />
          )}
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
              <Button
                variant="ghost"
                className="dropdown-item"
                onClick={handleTrashClick}
                disabled={isLoading}
              >
                Move to Trash
              </Button>
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
      <ConfirmModal
        isOpen={showConfirm}
        title="Move to Trash"
        description="This item will be moved to trash. You can restore it from the Trash page."
        confirmText="Move to Trash"
        cancelText="Cancel"
        onConfirm={handleConfirmTrash}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
};

DashboardCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    title: PropTypes.string,
    chatTitle: PropTypes.string,
    report: PropTypes.arrayOf(
      PropTypes.shape({
        ReportTitle: PropTypes.string,
      })
    ),
    type: PropTypes.oneOf(Object.values(ItemTypeEnum)).isRequired,
    createdAt: PropTypes.string,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onClick: PropTypes.func,
};

export default DashboardCard;
