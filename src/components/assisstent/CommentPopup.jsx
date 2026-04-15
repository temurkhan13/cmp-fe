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
      <style>{`
        .cm-popup {
          position: fixed;
          top: 5rem;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.12);
          padding: 1rem 1.2rem;
          z-index: 100;
          min-width: 280px;
        }
        .cm-popup-input-box {
          display: flex;
          align-items: center;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 0.5rem 0.8rem;
          background: #fafafa;
          transition: border-color 0.2s;
        }
        .cm-popup-input-box:focus-within {
          border-color: #C3E11D;
        }
        .cm-popup-input-box input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 1.3rem;
          background: transparent;
        }
        .cm-popup-send {
          background: none;
          border: none;
          cursor: pointer;
          color: #999;
          display: flex;
          align-items: center;
          padding: 0.3rem;
          border-radius: 4px;
          transition: color 0.2s;
        }
        .cm-popup-send:not(:disabled):hover { color: #0B1444; }
        .cm-popup-send:disabled { cursor: default; opacity: 0.4; }
      `}</style>
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
