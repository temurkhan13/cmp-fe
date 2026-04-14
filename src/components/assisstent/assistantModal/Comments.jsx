import PropTypes from 'prop-types';
import Dropdown from 'react-multilevel-dropdown';
import { useState, useEffect } from 'react';
import { FaEllipsisV, FaCheck } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import { IoFilter, IoSend } from 'react-icons/io5';
import { RxAvatar } from 'react-icons/rx';
import { MdOutlineAttachFile, MdAlternateEmail } from 'react-icons/md';
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

import {
  useRemoveCommentMutation,
  useAddReplyMutation,
  useUpdateCommentMutation,
  useUpdateReplyMutation,
  useRemoveReplyMutation,
} from '../../../redux/api/workspaceApi';
import { selectSelectedFolder } from '../../../redux/slices/folderSlice';

const Comments = ({ comments }) => {
  const dispatch = useDispatch();
  const workspaceId = useSelector(
    (state) => state.workspaces.currentWorkspaceId
  );
  const selectedFolder = useSelector(selectSelectedFolder);
  const folderId = selectedFolder?._id || selectedFolder?.id;
  const chatId = useSelector((state) => state.workspaces.currentChatId);
  const [removeCommentMutation] = useRemoveCommentMutation();
  const [addReplyMutation] = useAddReplyMutation();
  const [updateCommentMutation] = useUpdateCommentMutation();
  const [updateReplyMutation] = useUpdateReplyMutation();
  const [removeReplyMutation] = useRemoveReplyMutation();

  const [selectedComment, setSelectedComment] = useState(null);
  const [showReplies, setShowReplies] = useState({});
  const [editingCommentId, setEditingCommentId] = useState(null); // Separate state for comment editing
  const [editingReplyId, setEditingReplyId] = useState(null); // Separate state for reply editing
  const [editedCommentText, setEditedCommentText] = useState(''); // Separate state for comment text
  const [replyTexts, setReplyTexts] = useState({}); // Keyed by commentId
  const [editedReplyText, setEditedReplyText] = useState(''); // For editing existing replies
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownKey, setDropdownKey] = useState(0);
  const closeDropdown = () => setDropdownKey((k) => k + 1);
  const [photoPath, setPhotoPath] = useState('false');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setPhotoPath(storedUser.photoPath);
      setUser(storedUser);
    }
  }, []);

  const addLineBreaks = (text) => {
    return text.replace(/(.{25})/g, '$1\n');
  };

  const getInitials = () => {
    if (!user) {
      return 'N/A';
    }
    return `${user.firstName?.[0] || ''}${
      user.lastName?.[0] || ''
    }`.toUpperCase();
  };

  const handleEditComment = (commentId) => {
    setEditingCommentId(commentId);
    const comment = comments.find((c) => c.commentId === commentId);
    setEditedCommentText(comment.text); // Set the text for the specific comment
  };

  const handleSaveEdit = async (commentId, messageId) => {
    const updatedComment = editedCommentText;
    await updateCommentMutation({ workspaceId, folderId, chatId, messageId, commentId, text: updatedComment });
    setEditingCommentId(null);
    setEditedCommentText('');
  };

  const handleEditReply = (commentId, replyId) => {
    setEditingReplyId(replyId);
    const comment = comments.find((c) => c.commentId === commentId);
    const reply = comment.replies.find((r) => r.replyId === replyId);
    setEditedReplyText(reply.text); // Set the text for the specific reply
  };

  const handleSaveReply = async (commentId, replyId, messageId) => {
    await updateReplyMutation({ workspaceId, folderId, chatId, messageId, commentId, replyId, text: editedReplyText });
    setEditingReplyId(null);
    setEditedReplyText('');
  };

  const handleAddReply = async (commentId, messageId) => {
    const text = replyTexts[commentId] || '';
    if (!text.trim()) return;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    await addReplyMutation({
      workspaceId, folderId, chatId, messageId, commentId,
      reply: { text, userId: user.id, userName: [user.firstName || user.first_name, user.lastName || user.last_name].filter(Boolean).join(' ') || user.name || '' },
    });
    setReplyTexts((prev) => ({ ...prev, [commentId]: '' }));
  };

  const handleDeleteComment = async (commentId, isReply, parentCommentId, messageId) => {
    if (isReply) {
      await removeReplyMutation({ workspaceId, folderId, chatId, messageId, commentId: parentCommentId, replyId: commentId });
    } else {
      await removeCommentMutation({ workspaceId, folderId, chatId, messageId, commentId });
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

  const filteredComments = (comments || [])
    .filter((comment) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        (comment.text || '').toLowerCase().includes(q) ||
        (comment.userName || comment.user_name || '').toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (selectedItem === 'Sort by date') {
        return new Date(b.timestamp || b.created_at || 0) - new Date(a.timestamp || a.created_at || 0);
      }
      return 0;
    });

  return (
    <>
      <div className="comment-input">
        <CiSearch className="search-icon" />
        <input
          className="filter-input"
          placeholder="Find any word"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          style={{ fontSize: '1.2rem' }}
        />
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
        {filteredComments.length === 0 ? (
          <NoDataAvailable message={searchQuery ? "No matching comments" : "No comments available"} />
        ) : (
          filteredComments.map((comment) => (
            <div key={comment.commentId}>
              <div className="comment-container">
                <span className="comment-time">{comment.timestamp}</span>
                <div className="comment">
                  <div className="avatar">
                    {/* <RxAvatar /> */}
                    {photoPath ? (
                      <img
                        src={photoPath}
                        alt="User"
                        className="ProfileImage"
                      />
                    ) : (
                      <div className="initials-placeholder">
                        {getInitials()}
                      </div>
                    )}
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
                        key={`comment-dd-${comment.commentId}-${dropdownKey}`}
                        title={<FaEllipsisV className="options-icon" />}
                        buttonClassName="dropdown-button"
                      >
                        <Dropdown.Item
                          onClick={() => {
                            closeDropdown();
                            handleEditComment(comment.commentId);
                          }}
                        >
                          Edit Comment
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            closeDropdown();
                            handleDeleteComment(comment._id, false, null, comment.messageId || comment.message_id);
                          }}
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
                          onBlur={() => handleSaveEdit(comment.commentId, comment.messageId || comment.message_id)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter')
                              handleSaveEdit(comment.commentId, comment.messageId || comment.message_id);
                          }}
                        />
                      ) : (
                        <>
                          <p className="comment-text">
                            <span>|</span> {addLineBreaks(comment.text)}
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
                              key={`reply-dd-${reply.replyId}-${dropdownKey}`}
                              title={<FaEllipsisV className="options-icon" />}
                              buttonClassName="dropdown-button"
                            >
                              <Dropdown.Item
                                onClick={() => {
                                  closeDropdown();
                                  handleEditReply(
                                    comment.commentId,
                                    reply.replyId
                                  );
                                }}
                              >
                                Edit Reply
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => {
                                  closeDropdown();
                                  handleDeleteComment(
                                    reply.replyId,
                                    true,
                                    comment.commentId,
                                    comment.messageId || comment.message_id
                                  );
                                }}
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
                                    reply.replyId,
                                    comment.messageId || comment.message_id
                                  )
                                }
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter')
                                    handleSaveReply(
                                      comment.commentId,
                                      reply.replyId,
                                      comment.messageId || comment.message_id
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
                      value={replyTexts[comment.commentId] || ''}
                      onChange={(e) => setReplyTexts((prev) => ({ ...prev, [comment.commentId]: e.target.value }))}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter')
                          handleAddReply(comment.commentId, comment.messageId || comment.message_id);
                      }}
                    />
                    {/* <div className="user-icon">
                      <MdOutlineAttachFile />
                    </div>
                    <div className="mention-icon">
                      <MdAlternateEmail />
                    </div> */}
                    <div
                      className="send-icon"
                      onClick={() => handleAddReply(comment.commentId, comment.messageId || comment.message_id)}
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
  .ProfileImage {
   height: 4rem;
    width: 4rem;
    border-radius: 50%;
    cursor: pointer;
  }
  .initials-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #007bff;
    color: #ffffff;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    margin-right: 8px;
    cursor: pointer;
  }
    .chat-container {
    overflow-x: hidden;
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
          white-space: pre-wrap;
word-break: break-word;
max-width: 100%;
overflow-y: auto;
padding-right: 1rem;
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
        .comment-text {
white-space: pre-wrap;
word-break: break-word;
max-width: 100%; 
}
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
      font-size: 1.2rem;
      padding: 0.3rem;
      min-width: 0;
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
