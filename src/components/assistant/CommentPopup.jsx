import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { IoSend } from 'react-icons/io5';
import { useAddCommentMutation } from '../../redux/api/workspaceApi';

const CommentPopup = ({
  onClose,
  workspaceId,
  folderId,
  chatId,
  messageId,
}) => {
  const [comment, setComment] = useState('');
  const [addComment] = useAddCommentMutation();
  const popupRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleSend = async () => {
    if (comment.trim()) {
      const text = comment;
      await addComment({ workspaceId, folderId, chatId, messageId, text });
      setComment('');
      onClose();
    }
  };

  return (
    <>
      <div
        className="cm-popup"
        ref={popupRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cm-popup-input-box">
          <input
            ref={inputRef}
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
          />
          <button
            className="cm-popup-send"
            onClick={handleSend}
            disabled={!comment.trim()}
          >
            <IoSend size={16} />
          </button>
        </div>
      </div>
    </>
  );
};

CommentPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  workspaceId: PropTypes.string.isRequired,
  folderId: PropTypes.string.isRequired,
  chatId: PropTypes.string.isRequired,
  messageId: PropTypes.string.isRequired,
};

export default CommentPopup;
