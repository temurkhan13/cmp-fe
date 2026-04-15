import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { FiMoreHorizontal } from 'react-icons/fi';
import { MdDelete, MdOutlineSettingsBackupRestore } from 'react-icons/md';
import DeleteModal from './DeleteModal'; // Assuming you have a DeleteModal component
import { truncateText } from '../../utils/helperFunction';
import {
  restoreFromTrash,
  deleteFromTrash,
  fetchTrashItemsAsync,
} from '../../redux/slices/trashSlice'; // Import actions
import { FaTrash } from 'react-icons/fa';

const TrashItemCard = ({ name, type, dateDeleted, chat }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useDispatch();

  const handleThreeDotsClick = () => setShowDropdown((prev) => !prev);

  const handleRestoreClick = async () => {
    try {
      await dispatch(restoreFromTrash({ type: 'chat', id: chat._id }));
      dispatch(fetchTrashItemsAsync()); // Re-fetch the data after restore
      setShowDropdown(false);
    } catch (error) { if (import.meta.env.DEV) console.error(error); }
  };

  const handleDeleteClick = async (id) => {
    try {
      setShowDeleteModal(false);
      const resultAction = await dispatch(
        deleteFromTrash({ type: 'chat', id: chat._id })
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
    <div className="trash-card">
      <div className="trash-card-content">
        <h3>{truncateText(name, 15)}</h3>
        <p>Type: {type}</p>
        <p>Date Deleted: {dateDeleted}</p>
      </div>
      <div className="three-dots" onClick={handleThreeDotsClick}>
        <FiMoreHorizontal />
      </div>
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
      <style>{`
        .trash-card {
          background-color: #f8f8f8;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          text-align: center;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          position: relative;
          width: 20rem;
          margin-top: 1rem;
        }
        .trash-card:hover {
          transform: translateY(-5px);
        }
        .trash-card h3 {
          margin: 0;
          font-size: 1.5rem;
          color: #333;
        }
        .trash-card p {
          margin: 5px 0;
          font-size: 1.3rem;
          color: #666;
        }
        .three-dots {
          cursor: pointer;
          font-size: 1.6rem;
          color: black;
          position: absolute;
          top: 1rem;
          right: 1rem;
          opacity: 0; /* Initially hidden */
          transition: opacity 0.3s ease;
        }
        .trash-card:hover .three-dots {
          opacity: 1; /* Show on hover */
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

TrashItemCard.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  dateDeleted: PropTypes.string.isRequired,
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

const TrashAssistant = ({ chat }) => {
  // Access trash items from Redux store
  const trashItems = useSelector((state) => state.trash.trashItems);

  return (
    <div className="trash-assistant-container">
      {trashItems.chats && trashItems.chats.length > 0 ? (
        trashItems.chats.map((chat) => (
          <TrashItemCard
            key={chat._id}
            name={chat.chatTitle || 'Unnamed'}
            type="Chat"
            dateDeleted={chat.dateDeleted || 'Unknown Date'}
            chat={chat}
          />
        ))
      ) : (
        <TrashFolderTab />
      )}

      <style>{`
        .trash-assistant-container {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          padding: 20px 0;
          align-items: start;
          justify-content: flex-start;
        }
      `}</style>
    </div>
  );
};

export default TrashAssistant;
