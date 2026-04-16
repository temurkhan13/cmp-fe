import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTrash, FaPen } from 'react-icons/fa';
import { useRemoveChatMutation, useUpdateChatMutation } from '../../redux/api/workspaceApi';
import InputModal from '../common/InputModal';

const NewChatSidebarModal = ({ isOpen, closeModal, chatId, chatTitle, workspaceId, folderId, onDeleted, onRenamed, position }) => {
  const [removeChat] = useRemoveChatMutation();
  const [updateChat] = useUpdateChatMutation();
  const [showRenameModal, setShowRenameModal] = useState(false);

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
      {isOpen && (
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
              onClick={() => { setShowRenameModal(true); closeModal(); }}
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
      )}
      <InputModal
        isOpen={showRenameModal}
        title="Rename Chat"
        confirmText="Rename"
        cancelText="Cancel"
        defaultValue={chatTitle || ''}
        placeholder="Enter chat name"
        onConfirm={async (newName) => {
          try {
            await updateChat({
              workspaceId,
              folderId,
              chatId,
              chat: { chatTitle: newName },
            }).unwrap();
            if (onRenamed) onRenamed(chatId, newName);
          } catch (error) {
            import.meta.env.DEV && console.error('Failed to rename chat:', error);
          }
          setShowRenameModal(false);
        }}
        onCancel={() => setShowRenameModal(false)}
      />
    </>
  );
};

NewChatSidebarModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  chatId: PropTypes.string.isRequired,
  chatTitle: PropTypes.string,
  workspaceId: PropTypes.string.isRequired,
  folderId: PropTypes.string.isRequired,
  onDeleted: PropTypes.func,
  onRenamed: PropTypes.func,
  position: PropTypes.shape({
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
  }).isRequired,
};

export default NewChatSidebarModal;
