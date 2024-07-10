import PropTypes from 'prop-types';
import { FaFolder, FaTrash } from 'react-icons/fa';

const modalStyles = {
  modalBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  modalOption: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 0',
    cursor: 'pointer',
    borderBottom: '1px solid #ddd',
  },
  lastModalOption: {
    borderBottom: 'none',
  },
  icon: {
    marginRight: '10px',
  },
};

const NewChatModal = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

  return (
    <div style={modalStyles.modalBackground} onClick={closeModal}>
      <div
        style={modalStyles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={modalStyles.modalOption}
          onClick={() => {
            /* Handle Move to Folder */
          }}
        >
          <FaFolder style={modalStyles.icon} /> Move to Folder
        </div>
        <div
          style={{ ...modalStyles.modalOption, ...modalStyles.lastModalOption }}
          onClick={() => {
            /* Handle Move to Trash */
          }}
        >
          <FaTrash style={modalStyles.icon} /> Move to Trash
        </div>
      </div>
    </div>
  );
};

NewChatModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default NewChatModal;
