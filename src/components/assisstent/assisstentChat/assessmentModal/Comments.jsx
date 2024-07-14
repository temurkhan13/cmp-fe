import PropTypes from 'prop-types';
import Dropdown from 'react-multilevel-dropdown';
import { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import { IoFilter } from 'react-icons/io5';
import { RxAvatar } from 'react-icons/rx';
import { FaCheck } from 'react-icons/fa';
import { MdOutlineAttachFile } from 'react-icons/md';
import { MdAlternateEmail } from 'react-icons/md';
import { RiSendPlane2Fill } from 'react-icons/ri';

const Comments = ({ Comments }) => {
  const [selectedComment, setSelectedComment] = useState(null);
  const [showReplies, setShowReplies] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleEditComment = (comment) => {
    setEditingComment(comment.id);
    setEditedText(comment.text);
  };

  const handleSaveEdit = (comment) => {
    comment.text = editedText;
    setEditingComment(null);
    setEditedText('');
  };

  const handleDeleteComment = (commentId, isReply) => {
    if (isReply) {
      Comments.replies = Comments.replies.filter(
        (reply) => reply.id !== commentId
      );
    } else {
      Comments.text = '';
      Comments.status = '';
      Comments.replies = [];
    }
    setSelectedComment(null);
  };

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  const handleItemClick = (item) => {
    if (selectedItem === item) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
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
        <div className="comment-container">
          <span className="comment-time">{Comments.time}</span>
          <div className="comment">
            <div className="avatar">{Comments.avatar}</div>
            <div className="comment-content">
              <div className="comment-header">
                <span className="comment-author">
                  {Comments.name}
                  <span className="comment-time">{Comments.time}</span>
                </span>
                <Dropdown
                  title={<FaEllipsisV className="options-icon" />}
                  buttonClassName="dropdown-button"
                >
                  <Dropdown.Item onClick={() => handleEditComment(Comments)}>
                    Edit Comment
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleDeleteComment(Comments.id, false)}
                  >
                    Delete Comment
                  </Dropdown.Item>
                </Dropdown>
              </div>
              <div className="comment-body">
                {editingComment === Comments.id ? (
                  <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    onBlur={() => handleSaveEdit(Comments)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') handleSaveEdit(Comments);
                    }}
                  />
                ) : (
                  <>
                    <p className="comment-text">
                      <span>|</span> {Comments.text}
                    </p>
                    <span className="comment-status">{Comments.status}</span>
                  </>
                )}
              </div>
              <div className="replies-toggle" onClick={toggleReplies}>
                {showReplies
                  ? 'Hide replies'
                  : `Show ${Comments.replies.length} replies`}
              </div>
            </div>
          </div>
          {showReplies && (
            <div className="replies-container">
              {Comments.replies.map((reply) => (
                <div key={reply.id} className="reply">
                  <span className="avatar">{reply.avatar}</span>
                  <div className="reply-content">
                    <div className="reply-header">
                      <span className="reply-author">
                        {reply.name}
                        <span className="comment-time">{reply.time}</span>
                      </span>
                      <Dropdown
                        title={<FaEllipsisV className="options-icon" />}
                        buttonClassName="dropdown-button"
                      >
                        <Dropdown.Item onClick={() => handleEditComment(reply)}>
                          Edit Comment
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleDeleteComment(reply.id, true)}
                        >
                          Delete Comment
                        </Dropdown.Item>
                      </Dropdown>
                    </div>
                    <div className="reply-body">
                      {editingComment === reply.id ? (
                        <input
                          type="text"
                          value={editedText}
                          onChange={(e) => setEditedText(e.target.value)}
                          onBlur={() => handleSaveEdit(reply)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') handleSaveEdit(reply);
                          }}
                        />
                      ) : (
                        <p className="reply-text"> {reply.text}</p>
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
              <input type="text" placeholder="Reply" />
              <div className="user-icon">
                <MdOutlineAttachFile />
              </div>
              <div className="mention-icon">
                <MdAlternateEmail />
              </div>
              <div className="send-icon">
                <RiSendPlane2Fill />
              </div>
            </div>
          </div>
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
  background: white;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  z-index: 100;
}
.dropdown ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.dropdown li {
  padding: 1rem;
  cursor: pointer;
}
.dropdown li:hover {
  background-color: #f0f0f0;
}
.replies-container {
  padding-left: 3rem;
}
._dropdown_15ws1_1 ._button_15ws1_5 {
  background: transparent;
  border: none;
  outline: none;
  padding: 0.5rem;
}
._dropdown_15ws1_1 ._button_15ws1_5:hover {
  background-color: #f0f0f0;
}
.reply-body input {
  border: 1px solid gray;
  outline: none;
  padding: 0.5rem;
  border-radius: 0.5rem;
}
.reply-wrapper {
  display: flex;
  padding: 2rem;
  border-radius: 1rem;
}
.reply-box {
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
  width: 13.5rem;
}
.user-icon, .mention-icon, .send-icon {
  font-size: 2rem;
  cursor: pointer;
}
.send-icon {
  color: gray;
}
.filter-icon, .search-icon {
  font-size: 1.8rem;
  color: gray;
}
.search-icon {
  font-size: 2rem;
  color: black;
}
.filter-icon:hover {
  cursor: pointer;
}
.comment-input {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  justify-content: space-between;
  border: 1px solid lightgray;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  border-radius: 0.7rem;
}
.filter-input {
  margin: 0 0.5rem;
  font-size: 1.2rem;
  border: none;
  outline: none;
}
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 16rem;
  background-color: white;
  border: none;
  font-size: 1.2rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  width: 15rem;
  z-index: 1000;
}
.dropdown-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.dropdown-menu li {
  padding: 0.5rem 1rem;
  cursor: pointer;
}
.dropdown-menu li:hover {
  background-color: #f0f0f0;
}

      `}</style>
      </div>
    </>
  );
};

Comments.propTypes = {
  Comments: PropTypes.shape({
    id: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    status: PropTypes.string,
    replies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        time: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default Comments;
