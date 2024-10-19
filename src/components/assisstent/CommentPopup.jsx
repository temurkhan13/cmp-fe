import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { RxAvatar } from 'react-icons/rx';
import { MdOutlineAttachFile } from 'react-icons/md';
import { MdAlternateEmail } from 'react-icons/md';
import { RiSendPlane2Fill } from 'react-icons/ri';
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose(); // Close the comment popup when clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const HandleEnterKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async () => {
    if (comment.trim()) {
      console.log('Comment sent:', comment, messageId);
      const text = comment;
      await addComment({ workspaceId, folderId, chatId, messageId, text });
      setComment('');
      onClose();
    }
  };

  return (
    <>
      <div
        className="commentPopup"
        ref={popupRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="user-image">
          <RxAvatar style={{ fontSize: '3.5rem' }} />
        </div>
        <div className="comment-box">
          <div className="input-wrapper">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Reply"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={HandleEnterKey}
            />
            <div className="user-icon">
              <MdOutlineAttachFile />
            </div>
            <div className="mention-icon">
              <MdAlternateEmail />
            </div>
            <div onClick={handleSend} className="send-icon">
              <RiSendPlane2Fill />
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .commentPopup {
          position: absolute;
          display: flex;
          box-shadow: 0px 4px 24px 0px #0000001F;
          background-color: white;
          position: fixed;
          top: 5rem;
          padding: 2rem;
          border-radius: 1rem;
        }
        .comment-box {
          display: flex;
          border: 1px solid lightgray;
          border-radius: 0.7rem;
        }
        .user-image {
          margin-right: 1rem;
        }
        .input-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 1.6rem;
          margin-right: 1rem;
        }
        .input-wrapper input {
          margin-left: 1rem;
          border: none;
          outline: none;
        }
        .user-icon, .mention-icon, .send-icon {
          font-size: 2rem;
          cursor: pointer;
        }
        .send-icon {
          color: gray;
        }
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
