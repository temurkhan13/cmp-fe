import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { MdDelete, MdOutlineSettingsBackupRestore } from 'react-icons/md';
import {
  restoreFromTrash,
  deleteFromTrash,
  fetchTrashItemsAsync,
} from '../../redux/slices/trashSlice'; // Import actions
import { FaTrash } from 'react-icons/fa';

const TrashItemCard = ({ name, type, dateDeleted, onRestore, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowDropdown(false);
  };

  const handleThreeDotsClick = () => setShowDropdown((prev) => !prev);

  return (
    <div
      className="trash-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h3>{name}</h3>
      <p>Type: {type}</p>
      <p>Date Deleted: {dateDeleted}</p>

      {isHovered && (
        <div className="three-dots" onClick={handleThreeDotsClick}>
          <FiMoreHorizontal />
        </div>
      )}

      {showDropdown && (
        <div className="dropdown-menu">
          <div className="dropdown-item" onClick={onRestore}>
            <MdOutlineSettingsBackupRestore size={18} />
            Restore
          </div>
          <div className="dropdown-item" onClick={onDelete}>
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
          font-size: 2rem;
          color: black;
          position: absolute;
          top: 1rem;
          right: 1rem;
        }

        .dropdown-menu {
          position: absolute;
          top: 3rem;
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

const TrashAssessment = () => {
  const dispatch = useDispatch();
  const trashItems = useSelector((state) => state.trash.trashItems);

  const handleRestore = async (assessmentId) => {
    try {
      await dispatch(
        restoreFromTrash({ type: 'assessment', id: assessmentId })
      );
      dispatch(fetchTrashItemsAsync()); // Re-fetch the data after restore
      setShowDropdown(false);
    } catch (error) { if (import.meta.env.DEV) console.error(error); }
  };

  const handleDelete = async (assessmentId) => {
    try {
      const resultAction = await dispatch(
        deleteFromTrash({ type: 'assessment', id: assessmentId })
      );
      dispatch(fetchTrashItemsAsync());
      if (deleteFromTrashAsync.rejected.match(resultAction)) {
      } else {
        dispatch(fetchTrashItemsAsync()); // Re-fetch the data after deletion
      }
    } catch (error) { if (import.meta.env.DEV) console.error(error); }
  };

  const renderTrashItems = (assessments, type) =>
    assessments.length > 0 ? (
      assessments.map((item) => (
        <TrashItemCard
          key={item._id}
          name={item.assessmentTitle || 'Unnamed'}
          type={type}
          dateDeleted={item.dateDeleted || 'Unknown Date'}
          onRestore={() => handleRestore(item._id)}
          onDelete={() => handleDelete(item._id)}
        />
      ))
    ) : (
      <TrashFolderTab />
    );

  return (
    <div className="trash-assessment-container">
      {trashItems.assessments &&
        renderTrashItems(trashItems.assessments, 'Assessment')}

      <style>{`
        .trash-assessment-container {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          padding: 20px;
          align-items: start;
          justify-content: flex-start;
        }
      `}</style>
    </div>
  );
};

export default TrashAssessment;
