import PropTypes from 'prop-types';
import { FaFolder, FaTrash } from 'react-icons/fa';
import { deleteChat } from '../../redux/slices/chatSlice';
import { useDispatch } from 'react-redux';

const NewChatSidebarModal = ({ isOpen, closeModal, chatId, position }) => {
  const dispatch = useDispatch();
  if (!isOpen) return null;

  return (
    <>
      <div className="newchat-overlay" onClick={closeModal}></div>
      <div
        className="dropdown-menu"
        style={{
          top: position.top,
          left: position.left,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* <div
          className="dropdown-item"
          onClick={() => {
            // Handle Move to Folder
            closeModal();
          }}
        >
          <FaFolder className="newchat-icon" /> Move to Folder
        </div> */}
        <div
          className="dropdown-item"
          onClick={() => {
            // Handle Move to Trash
            dispatch(deleteChat(chatId));
            closeModal();
          }}
        >
          <FaTrash className="newchat-icon" /> Move to Trash
        </div>
        <style>{`
          .newchat-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 999;
            // background: rgba(0, 0, 0, 0.5);
          }
          .dropdown-menu {
            z-index: 1000;
            position: absolute;
            width: 18rem;
            border-radius: 0.6rem;
            background-color: white;
            box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
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
            background-color: lightgray;
            border-radius:0.8rem;
          }
            .newchat-icon{
            margin-right:0.8rem;
            color:gray;
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
