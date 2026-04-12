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
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="delete-modal-content">
        <div className="modal-header">
          <h2>Delete Permanently</h2>
          <IoClose className="close-icon" onClick={onCancel} />
        </div>
        <div className="modal-body">
          <p>
            You're about to delete <strong>{folderName}</strong> from your
            <br />
            Trash. This can't be undone.
          </p>
        </div>
        <div className="modal-footer">
          <button className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button className="delete-button" onClick={onDelete}>
            Delete Permanently
          </button>
        </div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .delete-modal-content {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          text-align: center;
          width:40rem;
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        h2 {
          margin: 0;
          font-size: 1.8rem;
        }

        .close-icon {
          font-size: 2rem;
          cursor: pointer;
          background-color: lightgray;
          border-radius: 50%;
          padding: 0.2rem;
        }

        .modal-body {
          margin-bottom: 1.5rem;
        }

        p {
          margin: 0;
          font-size: 1.4rem;
          color: #333;
        }

        strong {
          font-weight: 600;
        }

        .modal-footer {
          display: flex;
          justify-content: space-between;
        }

        .cancel-button {
          background: none;
          border: 0.125rem solid #00008b;
          border-radius: 1rem;
          padding: 1rem;
          font-size: 1.3rem;
          font-weight: 500;
          color: #00008b;
          cursor: pointer;
          flex: 1;
          margin-right: 0.5rem;
        }

        .delete-button {
          background: #ccff00;
          border: none;
          border-radius: 1rem;
          padding: 1rem;
          font-size: 1.3rem;
          font-weight: 500;
          color: #333;
          cursor: pointer;
          flex: 1;
          margin-left: 0.5rem;
        }
      `}</style>
    </div>
  );
};

DeleteModal.propTypes = {
  folderName: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteModal;
