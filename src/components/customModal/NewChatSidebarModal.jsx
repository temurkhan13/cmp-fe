import PropTypes from 'prop-types';
import { FaTrash, FaPen } from 'react-icons/fa';
import { useRemoveChatMutation } from '../../redux/api/workspaceApi';

const NewChatSidebarModal = ({ isOpen, closeModal, chatId, workspaceId, folderId, onDeleted, onRename, position }) => {
  const [removeChat] = useRemoveChatMutation();

  if (!isOpen) return null;

  const handleMoveToTrash = async () => {
    try {
      await removeChat({ workspaceId, folderId, chatId }).unwrap();
      if (onDeleted) onDeleted(chatId);
    } catch (error) {
      import.meta.env.DEV && console.error('Failed to move chat to trash:', error);
    }
    closeModal();
  };

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
        <div
          className="dropdown-item"
          onClick={() => { onRename(); closeModal(); }}
        >
          <FaPen className="newchat-icon" /> Rename
        </div>
        <div
          className="dropdown-item"
          onClick={handleMoveToTrash}
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
  workspaceId: PropTypes.string.isRequired,
  folderId: PropTypes.string.isRequired,
  onDeleted: PropTypes.func,
  onRename: PropTypes.func.isRequired,
  position: PropTypes.shape({
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
  }).isRequired,
};

export default NewChatSidebarModal;