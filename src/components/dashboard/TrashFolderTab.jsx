import { useState } from 'react';
import PropTypes from 'prop-types';
import { FiMoreHorizontal } from 'react-icons/fi';
import { FaRegFolderOpen } from 'react-icons/fa6';
import { FaTrash } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { MdOutlineSettingsBackupRestore } from 'react-icons/md';
import { MdPeopleAlt } from 'react-icons/md';
import DeleteModal from './DeleteModal';

const FolderCard = ({ folder }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowDropdown(false);
  };

  const handleThreeDotsClick = () => setShowDropdown(!showDropdown);
  const handleDeleteClick = () => {
    setShowDropdown(false);
    setShowDeleteModal(true);
  };
  const handleCancelDelete = () => setShowDeleteModal(false);
  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    // Add your delete logic here
    console.log(`Deleted: ${folder.name}`);
  };

  return (
    <div
      className="folder-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="folder-content">
        <FaRegFolderOpen className="folder-icon" />
        <div className="folder-details">
          <div className="folder-name">
            {folder.name}
            <MdPeopleAlt style={{ color: 'gray' }} />
          </div>
          <div className="folder-meta">
            Deleted by {folder.deletedBy} {folder.timeAgo}
          </div>
        </div>
      </div>
      {isHovered && (
        <div className="three-dots" onClick={handleThreeDotsClick}>
          <FiMoreHorizontal />
        </div>
      )}
      {showDropdown && (
        <div className="dropdown-menu">
          <div className="dropdown-item">
            <MdOutlineSettingsBackupRestore size={18} />
            Restore
          </div>
          <div className="dropdown-item" onClick={handleDeleteClick}>
            <MdDelete size={18} />
            Delete Permanently
          </div>
        </div>
      )}
      {showDeleteModal && (
        <DeleteModal
          folderName={folder.name}
          onCancel={handleCancelDelete}
          onDelete={handleConfirmDelete}
        />
      )}

      <style>{`
        .folder-card {
          display: flex;
          align-items: center;
          background: #f5f5f5;
          border-radius: 1rem;
          padding: 1rem;
          margin: 1rem;
          width:35rem;
          position: relative;
          box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2);
          transition: background 0.3s ease;
        }

        .folder-card:hover {
          background: #e0e0e0;
        }

        .folder-content {
          display: flex;
          flex: 1;
        }

        .folder-icon {
          font-size: 3rem;
          color: #6c6c6c;
          margin-right: 1rem;
        }

        .folder-details {
        //   flex: 1;
        display:flex;
        flex-direction:column;
        align-items:flex-start;
        }

        .folder-name {
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-size: 1.4rem;
          display:flex;
          align-items:center;
          gap:0.5rem;
          
        }

        .folder-meta {
          color: #888;
          font-size: 1.2rem;
        //   width:28rem;
        }

        .three-dots {
          cursor: pointer;
          font-size: 2rem;
          color: black;
        }

        .dropdown-menu {
          position: absolute;
          top: 3.5rem;
          right: 1rem;
          background: white;
          border-radius: 1rem;
          box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.1);
          z-index: 10;
          font-size:1.4rem;
          border:none;
        }

        .dropdown-item {
          padding: 0.8rem 1.6rem;
          cursor: pointer;
          display:flex;
          align-items: center;
          gap:0.5rem;
        }

        .dropdown-item:hover {
          background: #f0f0f0;
            border-radius: 1rem;
            d
        }
      `}</style>
    </div>
  );
};

FolderCard.propTypes = {
  folder: PropTypes.shape({
    name: PropTypes.string.isRequired,
    deletedBy: PropTypes.string.isRequired,
    timeAgo: PropTypes.string.isRequired,
  }).isRequired,
};

const TrashFolderTab = () => {
  return (
    <div className="folder-content">
      <FaTrash size={50} />
      <p className="trash-activity">No recent activity here</p>
      <p>
        Any file you trash will end up here. You&apos;ll have 30 days <br />
        to restore them before they are automatically deleted <br />
        from your Trash.
      </p>
      <style>{`
        .folder-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #666;
        }
        p {
          margin: 0.3125rem 0;
          font-size: 1.2rem;
        }
        .trash-activity {
          font-size: 1.4rem;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

const FolderTab = () => {
  const folders = [
    { id: 1, name: 'Folder Name', deletedBy: 'Imran', timeAgo: 'moments ago' },
    {
      id: 2,
      name: 'Folder Name',
      deletedBy: 'Sherrimac Gyver',
      timeAgo: 'moments ago',
    },
    {
      id: 2,
      name: 'Folder Name',
      deletedBy: 'Sherrimac Gyver',
      timeAgo: 'moments ago',
    },
    {
      id: 2,
      name: 'Folder Name',
      deletedBy: 'Sherrimac Gyver',
      timeAgo: '10 days ago',
    },
  ];

  return (
    <div className="folder-tab">
      {folders.length > 0 ? (
        folders.map((folder) => <FolderCard key={folder.id} folder={folder} />)
      ) : (
        <TrashFolderTab />
      )}

      <style>{`
        .folder-tab {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default FolderTab;
