import PropTypes from 'prop-types';
import { FaTrash, FaPen } from 'react-icons/fa';
import { useRemoveChatMutation } from '../../redux/api/workspaceApi';

import './custom-modal.scss';

const NewChatSidebarModal = ({ isOpen, closeModal, chatId, workspaceId, folderId, onDeleted, onRename, onRequestDelete, position }) => {
  const [removeChat] = useRemoveChatMutation();

  if (!isOpen) return null;

  const handleMoveToTrash = async () => {
    if (onRequestDelete) {
      onRequestDelete(chatId);
      closeModal();
      return;
    }
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
      <div className="custom-modal-newchat-overlay" onClick={closeModal}></div>
      <div
        className="custom-modal-dropdown-menu"
        style={{
          '--dropdown-top': `${position.top}px`,
          '--dropdown-left': `${position.left}px`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="custom-modal-dropdown-item"
          onClick={() => { onRename(); closeModal(); }}
        >
          <FaPen className="custom-modal-newchat-icon" /> Rename
        </div>
        <div
          className="custom-modal-dropdown-item"
          onClick={handleMoveToTrash}
        >
          <FaTrash className="custom-modal-newchat-icon" /> Move to Trash
        </div>
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
  onRequestDelete: PropTypes.func,
  position: PropTypes.shape({
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
  }).isRequired,
};

export default NewChatSidebarModal;
