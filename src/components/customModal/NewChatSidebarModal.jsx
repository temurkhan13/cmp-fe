import PropTypes from 'prop-types';
import { FaFolder, FaTrash } from 'react-icons/fa';
import { deleteChat } from '../../redux/slices/chatSlice';
import { useDispatch } from 'react-redux';

const NewChatSidebarModal = ({ isOpen, closeModal, chatId }) => {
  const dispatch = useDispatch();
  if (!isOpen) return null;

  return (
    <>
      <div className="overlay" onClick={closeModal}></div>
      <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
        <div
          className="dropdown-item"
          onClick={() => {
            /* Handle Move to Folder */
          }}
        >
          <FaFolder style={{ marginRight: '10px' }} /> Move to Folder
        </div>
        <div
          className="dropdown-item"
          onClick={() => {
            /* Handle Move to Trash */
            console.log(chatId);
            dispatch(deleteChat(chatId));
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
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 0.6rem;
            background-color: white;
            box-shadow: 0rem 0.4rem 2.4rem 0rem hsla(0, 0%, 0%, 0.122);
            padding: 1rem;
          }
          .dropdown-item {
            cursor: pointer;
            font-size: 1.4rem;
            padding: 0.8rem 1.2rem;
            // border-bottom: 1px solid #ddd;
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
};

export default NewChatSidebarModal;
