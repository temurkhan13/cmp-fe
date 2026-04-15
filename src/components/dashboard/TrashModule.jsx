import { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiMoreVertical } from 'react-icons/fi';
import { MdOutlineSettingsBackupRestore, MdDeleteForever } from 'react-icons/md';
import { BsWindowStack } from 'react-icons/bs';
import { FaRegFolderOpen, FaTrash } from 'react-icons/fa';
import { IoIosChatboxes } from 'react-icons/io';
import { RiNewspaperLine } from 'react-icons/ri';
import { FaFolderTree } from 'react-icons/fa6';
import { truncateText } from '../../utils/helperFunction';
import {
  fetchTrashItems,
  restoreFromTrash,
  deleteFromTrash,
} from '../../redux/slices/trashSlice';
import { SkeletonCard } from '../common/Skeleton';
import NotificationBar from '../common/NotificationBar';

const typeIcons = {
  workspace: <BsWindowStack size={20} color="grey" />,
  folder: <FaRegFolderOpen size={20} color="grey" />,
  chat: <IoIosChatboxes size={20} color="grey" />,
  assessment: <RiNewspaperLine size={20} color="grey" />,
  sitemap: <FaFolderTree size={20} color="grey" />,
};

const getDisplayName = (item, type) => {
  if (type === 'workspace') return item.workspaceName || 'Unnamed';
  if (type === 'folder') return item.folderName || 'Unnamed';
  if (type === 'chat') return item.chatTitle || 'Unnamed';
  if (type === 'assessment') return item.assessmentTitle || 'Unnamed';
  if (type === 'sitemap') return item.name || item.sitemapName || item.sitemapTitle || 'Unnamed';
  return 'Unnamed';
};

const getId = (item) => item._id || item.id;

const TrashCard = ({ item, entityType, onAction }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayName = getDisplayName(item, entityType);
  const rawDate = item.dateDeleted || item.deleted_at || item.createdAt || item.created_at;
  const parsed = rawDate ? new Date(rawDate) : null;
  const dateLabel = parsed && !isNaN(parsed.getTime()) ? parsed.toLocaleDateString() : '';

  const handleAction = async (action, e) => {
    e.stopPropagation();
    setIsMenuOpen(false);
    setIsLoading(true);
    await onAction(action, entityType, getId(item));
    setIsLoading(false);
  };

  return (
    <div className="card-dashboard trash-card-item">
      <div>{typeIcons[entityType]}</div>
      <div className="info">
        <div>
          <h3>{truncateText(displayName, 20)}</h3>
          {dateLabel && <p>Deleted: {dateLabel}</p>}
        </div>
      </div>
      <div className="actions" ref={menuRef}>
        <FiMoreVertical
          className="more-icon"
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
          size={18}
          color="#000"
        />
        {isMenuOpen && (
          <div className="dropdown-menu">
            <button
              className="dropdown-item"
              onClick={(e) => handleAction('restore', e)}
              disabled={isLoading}
            >
              <MdOutlineSettingsBackupRestore size={16} />
              {isLoading ? 'Restoring...' : 'Restore'}
            </button>
            <button
              className="dropdown-item trash-delete-btn"
              onClick={(e) => handleAction('delete', e)}
              disabled={isLoading}
            >
              <MdDeleteForever size={16} />
              {isLoading ? 'Deleting...' : 'Delete Permanently'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const TrashEmpty = () => (
  <div className="trash-empty">
    <FaTrash size={40} color="#ccc" />
    <p className="trash-empty__title">No recent trash here</p>
    <p className="trash-empty__desc">
      Any file you trash will end up here. You&apos;ll have 30 days
      to restore them before they are automatically deleted from your Trash.
    </p>
  </div>
);

const TABS = [
  { key: 'workspace', label: 'Workspaces', stateKey: 'workspaces' },
  { key: 'folder', label: 'Projects', stateKey: 'folders' },
  { key: 'chat', label: 'Assistant', stateKey: 'chats' },
  { key: 'assessment', label: 'Assessment', stateKey: 'assessments' },
  { key: 'sitemap', label: 'Sitemap', stateKey: 'sitemaps' },
];

const TrashModule = () => {
  const dispatch = useDispatch();
  const trashState = useSelector((state) => state.trash || {});
  const trashItems = trashState.trashItems || {};
  const isLoading = trashState.isLoading || false;
  const error = trashState.error || null;

  const [activeTab, setActiveTab] = useState('workspace');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    dispatch(fetchTrashItems());
  }, [dispatch]);

  const handleAction = useCallback(async (action, entityType, id) => {
    try {
      if (action === 'restore') {
        await dispatch(restoreFromTrash({ type: entityType, id })).unwrap();
        setNotification({ message: 'Item restored successfully', type: 'success' });
      } else {
        await dispatch(deleteFromTrash({ type: entityType, id })).unwrap();
        setNotification({ message: 'Item deleted permanently', type: 'success' });
      }
      dispatch(fetchTrashItems());
    } catch {
      setNotification({ message: `Failed to ${action} item. Please try again.`, type: 'error' });
    }
  }, [dispatch]);

  const activeTabConfig = TABS.find((t) => t.key === activeTab);
  const items = trashItems[activeTabConfig?.stateKey] || [];

  return (
    <div className="trash-container">
      <div className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`tab ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="trash-content">
        {isLoading ? (
          <SkeletonCard count={4} />
        ) : error ? (
          <p style={{ color: '#dc2626', fontSize: '1.3rem' }}>{error}</p>
        ) : items.length > 0 ? (
          <div className="trash-grid">
            {items.map((item) => (
              <TrashCard
                key={getId(item)}
                item={item}
                entityType={activeTab}
                onAction={handleAction}
              />
            ))}
          </div>
        ) : (
          <TrashEmpty />
        )}
      </div>

      {notification && (
        <NotificationBar
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <style>{`
        .trash-container {
          display: flex;
          flex-direction: column;
          padding: 1rem 3rem;
        }
        .tabs {
          display: flex;
          gap: 1.5rem;
        }
        .tab {
          padding: 0.75rem 1.5rem;
          cursor: pointer;
          background: none;
          border: none;
          outline: none;
          font-size: 1.6rem;
          font-weight: 500;
          color: #6b7280;
          border-bottom: 2px solid transparent;
          transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
          border-radius: 6px 6px 0 0;
        }
        .tab:hover {
          color: #111;
          background: rgba(0,0,0,0.03);
        }
        .tab.active {
          color: #111;
          font-weight: 600;
          border-bottom: 2px solid #C3E11D;
        }
        .trash-content {
          margin-top: 1.5rem;
        }
        .trash-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1rem;
        }
        .trash-card-item .dropdown-menu {
          width: 190px;
        }
        .trash-card-item .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.3rem;
        }
        .trash-card-item .trash-delete-btn {
          color: #dc2626;
        }
        .trash-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          color: #666;
          text-align: center;
        }
        .trash-empty__title {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 1rem 0 0.25rem;
        }
        .trash-empty__desc {
          font-size: 1.2rem;
          line-height: 1.6;
          max-width: 400px;
        }
      `}</style>
    </div>
  );
};

export default TrashModule;
