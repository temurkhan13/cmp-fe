import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import { IoFilter } from 'react-icons/io5';
import { RxAvatar } from 'react-icons/rx';
import { MdOutlineAttachFile, MdAlternateEmail } from 'react-icons/md';
import { RiSendPlane2Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import NoDataAvailable from '../../common/NoDataAvailable';
import Button from '../../common/Button';
import { AnchoredMenu } from '../../common';

import {
  updateComment,
  deleteComment,
  addReply,
  updateReply,
  deleteReply,
} from '../../../redux/slices/chatSlice';

const AssessmentComments = ({ comments }) => {
  const dispatch = useDispatch();
  const chatId = useSelector((state) => state.chat.selectedChatId);

  const [, setSelectedComment] = useState(null);
  const [showReplies, setShowReplies] = useState({});
  const [editingComment, setEditingComment] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const handleEditComment = (commentId) => {
    setEditingComment(commentId);
    const comment = comments.find((c) => c.commentId === commentId);
    setEditedText(comment.text);
  };

  const handleSaveEdit = (commentId) => {
    const updatedComment = editedText;
    dispatch(updateComment({ chatId, commentId, updatedComment }));
    setEditingComment(null);
    setEditedText('');
  };

  const handleEditReply = (commentId, replyId) => {
    setEditingComment(replyId);
    const comment = comments.find((c) => c.commentId === commentId);
    const reply = comment.replies.find((c) => c.replyId === replyId);
    setEditedText(reply.text);
  };

  const handleSaveReply = (commentId, replyId) => {
    const updatedReply = editedText;
    dispatch(updateReply({ chatId, commentId, replyId, updatedReply }));
    setEditingComment(null);
    setEditedText('');
  };

  const handleAddReply = (commentId) => {
    const reply = editedText;
    dispatch(addReply({ chatId, commentId, reply }));
    setEditingComment(null);
    setEditedText('');
  };

  const handleDeleteComment = (commentId, isReply, parentCommentId) => {
    const replyId = commentId;
    if (isReply) {
      dispatch(deleteReply({ chatId, commentId: parentCommentId, replyId }));
    } else {
      dispatch(deleteComment({ chatId, commentId }));
    }
    setSelectedComment(null);
  };

  const toggleReplies = (commentId) => {
    setShowReplies((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  const handleItemClick = (item) => {
    setSelectedItem((prevItem) => (prevItem === item ? null : item));
  };

  const menuItems = ['Sort by date', 'Sort by unread', 'Sort by resolved'];

  return (
    <div className="assessment-comments">
      <div className="comment-input">
        <CiSearch className="search-icon" />
        <input className="filter-input" placeholder="Find any word" />
        <AnchoredMenu
          align="right"
          trigger={({ onClick }) => (
            <IoFilter onClick={onClick} className="filter-icon" />
          )}
          items={menuItems.map((item) => ({
            key: item,
            label: item,
            selected: selectedItem === item,
            onClick: () => handleItemClick(item),
          }))}
        />
      </div>
      <hr />
      <div className="chat-container">
        {comments?.length === 0 ? (
          <NoDataAvailable message="No comments available." />
        ) : (
          comments?.map((comment) => (
            <div key={comment.commentId}>
              <div className="comment-container">
                <span className="comment-time">{comment.timestamp}</span>
                <div className="comment">
                  <div className="avatar">
                    <RxAvatar />
                  </div>
                  <div className="comment-content">
                    <div className="comment-header">
                      <span className="comment-author">
                        {comment.userName}
                        <span className="comment-time">
                          {comment.timestamp}
                        </span>
                      </span>
                      <AnchoredMenu
                        align="right"
                        trigger={({ onClick }) => (
                          <Button
                            variant="ghost"
                            className="dropdown-button"
                            ariaLabel="Comment options"
                            onClick={onClick}
                          >
                            <FaEllipsisV className="options-icon" />
                          </Button>
                        )}
                        items={[
                          { key: 'edit', label: 'Edit Comment', onClick: () => handleEditComment(comment.commentId) },
                          { key: 'delete', label: 'Delete Comment', onClick: () => handleDeleteComment(comment.commentId, false) },
                        ]}
                      />
                    </div>
                    <div className="comment-body">
                      {editingComment === comment.commentId ? (
                        <input
                          type="text"
                          value={editedText}
                          onChange={(e) => setEditedText(e.target.value)}
                          onBlur={() => handleSaveEdit(comment.commentId)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter')
                              handleSaveEdit(comment.commentId);
                          }}
                        />
                      ) : (
                        <>
                          <p className="comment-text">
                            <span>|</span> {comment.text}
                          </p>
                          <span className="comment-status">
                            {comment.status}
                          </span>
                        </>
                      )}
                    </div>
                    <div
                      className="replies-toggle"
                      onClick={() => toggleReplies(comment.commentId)}
                    >
                      {showReplies[comment.commentId]
                        ? 'Hide replies'
                        : `Show ${comment.replies.length} replies`}
                    </div>
                  </div>
                </div>
                {showReplies[comment.commentId] && (
                  <div className="replies-container">
                    {comment.replies.map((reply) => (
                      <div key={reply.replyId} className="reply">
                        <span className="avatar">{reply.userName[0]}</span>
                        <div className="reply-content">
                          <div className="reply-header">
                            <span className="reply-author">
                              {reply.userName}
                              <span className="comment-time">
                                {reply.timestamp}
                              </span>
                            </span>
                            <AnchoredMenu
                              align="right"
                              trigger={({ onClick }) => (
                                <Button
                                  variant="ghost"
                                  className="dropdown-button"
                                  ariaLabel="Reply options"
                                  onClick={onClick}
                                >
                                  <FaEllipsisV className="options-icon" />
                                </Button>
                              )}
                              items={[
                                { key: 'edit', label: 'Edit Reply', onClick: () => handleEditReply(comment.commentId, reply.replyId) },
                                { key: 'delete', label: 'Delete Reply', onClick: () => handleDeleteComment(reply.replyId, true, comment.commentId) },
                              ]}
                            />
                          </div>
                          <div className="reply-body">
                            {editingComment === reply.replyId ? (
                              <input
                                type="text"
                                value={editedText}
                                onChange={(e) => setEditedText(e.target.value)}
                                onBlur={() =>
                                  handleSaveReply(
                                    comment.commentId,
                                    reply.replyId
                                  )
                                }
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter')
                                    handleSaveReply(
                                      comment.commentId,
                                      reply.replyId
                                    );
                                }}
                              />
                            ) : (
                              <p className="reply-text">{reply.text}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="reply-wrapper">
                <div className="user-image">
                  <RxAvatar className="assessment-avatar-icon" />
                </div>
                <div className="reply-box">
                  <div className="input-wrapper">
                    <input
                      type="text"
                      placeholder="Reply"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      onBlur={() => handleAddReply(comment.commentId)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter')
                          handleAddReply(comment.commentId);
                      }}
                    />
                    <div className="user-icon">
                      <MdOutlineAttachFile />
                    </div>
                    <div className="mention-icon">
                      <MdAlternateEmail />
                    </div>
                    <div
                      className="send-icon"
                      onClick={() => handleAddReply(comment.commentId)}
                    >
                      <RiSendPlane2Fill />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

AssessmentComments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      commentId: PropTypes.number.isRequired,
      userName: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      replies: PropTypes.arrayOf(
        PropTypes.shape({
          replyId: PropTypes.number.isRequired,
          userName: PropTypes.string.isRequired,
          timestamp: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
};

export default AssessmentComments;
