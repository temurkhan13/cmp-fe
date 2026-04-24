import PropTypes from 'prop-types';
import { IoClose } from 'react-icons/io5';

const DeleteModal = ({ folderName, onCancel, onDelete }) => {
  const handleOverlayClick = (e) => {
    // Close modal if the overlay (background) is clicked
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div className="delete-modal-overlay" onClick={handleOverlayClick}>
      <div className="delete-modal-content">
        <div className="delete-modal-header">
          <h2>Delete Permanently</h2>
          <IoClose className="delete-modal-close" onClick={onCancel} />
        </div>
        <div className="delete-modal-body">
          <p>
            You're about to delete <strong>{folderName}</strong> from your
            <br />
            Trash. This can't be undone.
          </p>
        </div>
        <div className="delete-modal-footer">
          <button className="delete-modal-cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="delete-modal-confirm-btn" onClick={onDelete}>
            Delete Permanently
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteModal.propTypes = {
  folderName: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteModal;
