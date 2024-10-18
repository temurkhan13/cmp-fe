import PropTypes from 'prop-types';
import Dropdown from 'react-multilevel-dropdown';
import { useState } from 'react';
import { FaEllipsisV, FaCheck } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import { IoFilter, IoSend } from 'react-icons/io5';
import { RxAvatar } from 'react-icons/rx';
import { MdOutlineAttachFile, MdAlternateEmail } from 'react-icons/md';
import { RiSendPlane2Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import {
  // addComment,
  updateComment,
  removeComment,
  addReply,
  updateReply,
  // removeReply,
} from '../../../redux/slices/workspaceSlice';
import NoDataAvailable from '../../common/NoDataAvailable';

// import {
//   useAddReplyMutation,
//   useUpdateReplyMutation,
//   useRemoveReplyMutation,
// } from '../../../redux/api/workspaceApi';

const Comments = ({ comments }) => {
  const dispatch = useDispatch();
  const workspaceId = useSelector(
    (state) => state.workspaces.currentWorkspaceId
  );
  const folderId = useSelector((state) => state.workspaces.currentFolderId);
  const chatId = useSelector((state) => state.workspaces.currentChatId);

  const [selectedComment, setSelectedComment] = useState(null);
  const [showReplies, setShowReplies] = useState({});
  const [editingCommentId, setEditingCommentId] = useState(null); // Separate state for comment editing
  const [editingReplyId, setEditingReplyId] = useState(null); // Separate state for reply editing
  const [editedCommentText, setEditedCommentText] = useState(''); // Separate state for comment text
  const [editedReplyText, setEditedReplyText] = useState(''); // Separate state for reply text
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleEditComment = (commentId) => {
    setEditingCommentId(commentId);
    const comment = comments.find((c) => c.commentId === commentId);
    setEditedCommentText(comment.text); // Set the text for the specific comment
  };

  const handleSaveEdit = (commentId) => {
    const updatedComment = editedCommentText;
    dispatch(updateComment({ commentId, updatedComment }));
    setEditingCommentId(null); // Stop editing
    setEditedCommentText('');
  };

  const handleEditReply = (commentId, replyId) => {
    setEditingReplyId(replyId);
    const comment = comments.find((c) => c.commentId === commentId);
    const reply = comment.replies.find((r) => r.replyId === replyId);
    setEditedReplyText(reply.text); // Set the text for the specific reply
  };

  const handleSaveReply = (commentId, replyId) => {
    const updatedReply = editedReplyText;
    dispatch(updateReply({ commentId, replyId, updatedReply }));
    setEditingReplyId(null); // Stop editing
    setEditedReplyText('');
  };

  const handleAddReply = async (commentId) => {
    const reply = editedReplyText;
    await addReply(workspaceId, folderId, chatId, commentId, reply);
    setEditedReplyText('');
  };

  const handleDeleteComment = (commentId, isReply, parentCommentId) => {
    if (isReply) {
      dispatch(removeReply({ commentId: parentCommentId, replyId: commentId }));
    } else {
      dispatch(removeComment({ commentId }));
    }
    setShowDropdown(false); // Close dropdown after deletion
    setSelectedComment(null);
  };

  const toggleReplies = (commentId) => {
    setShowReplies((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  const handleItemClick = (item) => {
    setSelectedItem((prevItem) => (prevItem === item ? null : item));
  };

  const menuItems = ['Sort by date', 'Sort by unread', 'Sort by resolved'];

  return (
    <>
      <div className="comment-input">
        <CiSearch className="search-icon" />
        <input className="filter-input" placeholder="Find any word" />
        <IoFilter onClick={toggleDropdown} className="filter-icon" />
        {showDropdown && (
          <div className="dropdown-menu">
            <ul>
              {menuItems.map((item, index) => (
                <li key={index} onClick={() => handleItemClick(item)}>
                  {item}
                  {selectedItem === item && <FaCheck className="check-icon" />}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <hr />
      <div className="chat-container">
        {comments.length === 0 ? (
          <NoDataAvailable message="No comments available" />
        ) : (
          comments.map((comment) => (
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
                      <Dropdown
                        title={<FaEllipsisV className="options-icon" />}
                        buttonClassName="dropdown-button"
                      >
                        <Dropdown.Item
                          onClick={() => handleEditComment(comment.commentId)}
                        >
                          Edit Comment
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            handleDeleteComment(comment.commentId, false)
                          }
                        >
                          Delete Comment
                        </Dropdown.Item>
                      </Dropdown>
                    </div>
                    <div className="comment-body">
                      {editingCommentId === comment.commentId ? (
                        <input
                          type="text"
                          value={editedCommentText}
                          onChange={(e) => setEditedCommentText(e.target.value)}
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
                      <div key={reply._Id} className="reply">
                        <span className="avatar">{reply.userName[0]}</span>
                        <div className="reply-content">
                          <div className="reply-header">
                            <span className="reply-author">
                              {reply.userName}
                              <span className="comment-time">
                                {reply.timestamp}
                              </span>
                            </span>
                            <Dropdown
                              title={<FaEllipsisV className="options-icon" />}
                              buttonClassName="dropdown-button"
                            >
                              <Dropdown.Item
                                onClick={() =>
                                  handleEditReply(
                                    comment.commentId,
                                    reply.replyId
                                  )
                                }
                              >
                                Edit Reply
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() =>
                                  handleDeleteComment(
                                    reply.replyId,
                                    true,
                                    comment.commentId
                                  )
                                }
                              >
                                Delete Reply
                              </Dropdown.Item>
                            </Dropdown>
                          </div>
                          <div className="reply-body">
                            {editingReplyId === reply.replyId ? (
                              <input
                                type="text"
                                value={editedReplyText}
                                onChange={(e) =>
                                  setEditedReplyText(e.target.value)
                                }
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
                  <RxAvatar style={{ fontSize: '3.5rem' }} />
                </div>
                <div className="reply-box">
                  <div className="input-wrapper">
                    <input
                      type="text"
                      placeholder="Reply"
                      value={editedReplyText}
                      onChange={(e) => setEditedReplyText(e.target.value)}
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
                      <IoSend />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <hr />
      <style>{`
          .chat-container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .comment-container {
            border-bottom: 1px solid #eee;
            padding: 1rem 0;
          }
          .comment, .reply {
            display: flex;
            align-items: center;
            padding: 0.5rem 0;
            cursor: pointer;
            position: relative;
          }
          .avatar {
            font-size: 3rem;
            margin-right: 1rem;
          }
          .comment-body input {
            border: 1px solid gray;
            outline: none;
            padding: 0.5rem;
            border-radius: 0.5rem;
          }
          .comment-content, .reply-content {
            flex-grow: 1;
          }
          .comment-header, .reply-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .comment-author, .reply-author {
            font-size: 1.3rem;
            font-weight: 500;
          }
          .comment-body, .reply-body {
            margin-top: 0.5rem;
          }
          .reply-text {
            font-size: 1.2rem;
          }
          .comment-time {
            font-size: 0.9rem;
            margin-left: 0.5rem;
            color: gray;
          }
          .comment-status {
            color: gray;
            font-size: 1.2rem;
          }
          .replies-toggle {
            color: blue;
            cursor: pointer;
            font-size: 1.1rem;
          }
          .options-icon {
            cursor: pointer;
          }
          .comment-text {
            font-size: 1.3rem;
            color: gray;
          }
          .comment-text span {
            color: black;
            font-weight: bold;
            font-size: 1.3rem;
          }
          .dropdown {
            position: absolute;
            right: 1rem;
            top: 2.5rem;
            background-color: #fff;
            box-shadow: 0px 0px 15px rgba(0,0,0,0.2);
            border-radius: 0.5rem;
            overflow: hidden;
          }
          .dropdown-item {
            padding: 0.75rem 1rem;
            cursor: pointer;
          }
          .dropdown-item:hover {
            background-color: #f0f0f0;
          }
          .comment-input {
            display: flex;
            align-items: center;
            border: 1px solid gray;
            border-radius: 0.5rem;
            padding: 0.5rem;
            margin-bottom: 0.5rem;
            width: 100%;
          }
          .comment-input input {
            border: none;
            outline: none;
            flex-grow: 1;
            margin:0 1rem;
          }
          .search-icon, .filter-icon {
            cursor: pointer;
            font-size: 1.5rem;
          }
          .filter-input {
            flex-grow: 1;
            border: none;
            outline: none;
          }
          .filter-icon {
            font-size: 1.5rem;
            color: black;
          }
          .dropdown-menu {
            position: absolute;
            z-index: 10;
            top:8rem;
            right: 5rem;
            width: 12rem;
            background: white;
            box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
            border-radius: 0.5rem;
            overflow: hidden;
          }
          .dropdown-menu ul {
            list-style: none;
            padding: 0;
            margin: 0 0 0 auto;
          }
          .dropdown-menu ul li {
            padding: 0.75rem 1rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .dropdown-menu ul li:hover {
            background: #f0f0f0;
          }
          .check-icon {
            color: green;
            font-size: 1rem;
          }
          .reply-wrapper {
            display: flex;
            // align-items: center;
            padding: 0.5rem 0;
            width: 100%;
          }
          .user-image {
            flex: 0 0 3rem;
            font-size: 2.5rem;
            margin-right: 1rem;
          }
          .reply-box {
            flex-grow: 1;
          }
          .input-wrapper {
            display: flex;
            align-items: center;
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 0.5rem;
            width: 100%;
          }
          .input-wrapper input {
            flex-grow: 1;
            border: none;
            outline: none;
          }
          .user-icon, .mention-icon, .send-icon {
            font-size: 1.5rem;
            margin-left: 1rem;
            cursor: pointer;
          }
        `}</style>
    </>
  );
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      commentId: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      replies: PropTypes.arrayOf(
        PropTypes.shape({
          replyId: PropTypes.string.isRequired,
          userName: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
          timestamp: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
};

export default Comments;
