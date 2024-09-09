import PropTypes from 'prop-types';
import { FaFolder, FaTrash } from 'react-icons/fa';
import { deleteChat } from '../../redux/slices/chatSlice';
import { useDispatch } from 'react-redux';

const NewChatSidebarModal = ({ isOpen, closeModal, chatId, position }) => {
  const dispatch = useDispatch();
  if (!isOpen) return null;

  return (
    <>
      <div className="overlay" onClick={closeModal}></div>
      <div
        className="dropdown-menu"
        style={{
          top: position.top,
          left: position.left,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="dropdown-item"
          onClick={() => {
            // Handle Move to Folder
            closeModal();
          }}
        >
          <FaFolder style={{ marginRight: '10px' }} /> Move to Folder
        </div>
        <div
          className="dropdown-item"
          onClick={() => {
            // Handle Move to Trash
            dispatch(deleteChat(chatId));
            closeModal();
          }}
        >
          <FaTrash style={{ marginRight: '10px' }} /> Move to Trash
        </div>
        <style>{`
          .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 999;
            background: rgba(0, 0, 0, 0.5);
          }
          .dropdown-menu {
            z-index: 1000;
            position: absolute;
            width: 18rem;
            border-radius: 0.6rem;
            background-color: white;
            box-shadow: 0rem 0.4rem 2.4rem 0rem hsla(0, 0%, 0%, 0.122);
            padding: 1rem;
          }
          .dropdown-item {
            cursor: pointer;
            font-size: 1.4rem;
            padding: 0.8rem 1.2rem;
          }
          .dropdown-item:last-child {
            border-bottom: none;
          }
          .dropdown-item:hover {
            background-color: #f0f0f0;
          }
        `}</style>
      </div>
    </>
  );
};

NewChatSidebarModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  chatId: PropTypes.string.isRequired,
  position: PropTypes.shape({
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
  }).isRequired,
};

export default NewChatSidebarModal;
