import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { FiMoreHorizontal } from 'react-icons/fi';
import { FaRegFolderOpen } from 'react-icons/fa6';
import { FaTrash } from 'react-icons/fa';
import { MdDelete, MdOutlineSettingsBackupRestore } from 'react-icons/md';
import DeleteModal from './DeleteModal';
import {
  restoreFromTrash,
  deleteFromTrashAsync,
  deleteFromTrash,
  fetchTrashItemsAsync,
} from '../../redux/slices/trashSlice'; // Import actions

const FolderCard = ({ folder }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useDispatch();

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowDropdown(false);
  };

  const handleThreeDotsClick = () => setShowDropdown((prev) => !prev);

  const handleRestoreClick = async () => {
    try {
      await dispatch(restoreFromTrash({ type: 'folder', id: folder._id }));
      dispatch(fetchTrashItemsAsync()); // Re-fetch the data after restore
      setShowDropdown(false);
    } catch (error) { if (import.meta.env.DEV) console.error(error); }
  };

  const handleDeleteClick = () => {
    setShowDropdown(false);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async (id) => {
    try {
      setShowDeleteModal(false);
      const resultAction = await dispatch(
        deleteFromTrash({ type: 'folder', id: folder._id })
      );
      dispatch(fetchTrashItemsAsync());
      if (deleteFromTrashAsync.rejected.match(resultAction)) {
      } else {
        dispatch(fetchTrashItemsAsync()); // Re-fetch the data after deletion
      }
    } catch (error) { if (import.meta.env.DEV) console.error(error); }
  };

  const handleCancelDelete = () => setShowDeleteModal(false);

  return (
    <div
      className="folder-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="folder-content">
        <FaRegFolderOpen className="folder-icon" />
        <div className="folder-details">
          <div className="folder-name">{folder.folderName}</div>
        </div>
      </div>
      {isHovered && (
        <div className="three-dots" onClick={handleThreeDotsClick}>
          <FiMoreHorizontal />
        </div>
      )}
      {showDropdown && (
        <div className="dropdown-menu">
          <div className="dropdown-item" onClick={handleRestoreClick}>
            <MdOutlineSettingsBackupRestore size={18} />
            <p>Restore</p>
          </div>
          <div className="dropdown-item" onClick={handleDeleteClick}>
            <MdDelete size={18} />
            Delete Permanently
          </div>
        </div>
      )}
      {showDeleteModal && (
        <DeleteModal
          folderName={folder.folderName}
          onCancel={handleCancelDelete}
          onDelete={handleConfirmDelete}
        />
      )}

      <style>{`
        .folder-card {
           display: flex;
          flex-direction: row; /* Align items horizontally */
          flex-wrap: wrap; /* Wrap items if there's no space */
          gap: 15px; /* Space between items */
          padding: 0;
          position: relative;
          margin: 0 0 0 50px;
          list-style: none;
        }
        .folder-card {
          display: flex;
          flex-direction: row; /* Folder icon on the left, content on the right */
          align-items: center; /* Vertically align content */
          justify-content: space-between;
          width: 30%; /* Adjust width as needed for the layout */
          min-width: 280px; /* Ensure items don't get too narrow */
          max-width: 400px; /* Ensure items don't get too wide */
          padding: 15px 20px; /* Adjusted padding */
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 5px;
          margin-top: 10px;
          transition: box-shadow 0.3s, background-color 0.3s; /* Smooth transitions */
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
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .folder-name {
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-size: 1.4rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
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
          font-size: 1.4rem;
          border: none;
        }

        .dropdown-item {
          padding: 0.8rem 1.6rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .dropdown-item:hover {
          background: #f0f0f0;
          border-radius: 1rem;
        }
      `}</style>
    </div>
  );
};

FolderCard.propTypes = {
  folder: PropTypes.shape({
    folderName: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

const TrashFolderTab = () => {
  return (
    <div className="folder-content">
      <FaTrash size={50} />
      <p className="trash-activity">No recent trash here</p>
      <p>
        Any file you trash will end up here. You&apos;ll have 30 days <br />
        to restore them before they are automatically deleted <br />
        from your Trash.
      </p>
      <style>{`
        .folder-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin: 0 auto;
          align-items: center;
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
  // Retrieve the folders from the Redux store
  const folders = useSelector((state) => state.trash.trashItems.folders || []);

  return (
    <div className="folder-tab">
      {folders.length > 0 ? (
        folders.map((folder) => <FolderCard key={folder._id} folder={folder} />)
      ) : (
        <TrashFolderTab />
      )}

      <style>{`
        .folder-tab {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default FolderTab;
