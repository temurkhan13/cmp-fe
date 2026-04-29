import PropTypes from 'prop-types';
import Dropdown from 'react-multilevel-dropdown';
import { useState, useEffect } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import { IoFilter, IoSend } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import NoDataAvailable from '../../common/NoDataAvailable';
import AnchoredMenu from '../../dropdowns/AnchoredMenu';
import '../../chat/chat.scss';

import {
  useRemoveCommentMutation,
  useAddReplyMutation,
  useUpdateCommentMutation,
  useUpdateReplyMutation,
  useRemoveReplyMutation,
} from '../../../redux/api/workspaceApi';
import { selectSelectedFolder } from '../../../redux/slices/folderSlice';
import Button from '../../common/Button';

const Comments = ({ comments }) => {
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

  const [showReplies, setShowReplies] = useState({});
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState('');
  const [replyTexts, setReplyTexts] = useState({});
  const [editedReplyText, setEditedReplyText] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownKey, setDropdownKey] = useState(0);
  const closeDropdown = () => setDropdownKey((k) => k + 1);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  const getInitials = (name) => {
    if (name) {
      const parts = name.trim().split(/\s+/);
      return (parts[0]?.[0] || '') + (parts[1]?.[0] || '');
    }
    if (!user) return '?';
    return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
  };

  const photoPath = user?.photoPath || '';

  const handleEditComment = (commentId) => {
    setEditingCommentId(commentId);
    const comment = comments.find((c) => c.commentId === commentId);
    setEditedCommentText(comment.text);
  };

  const handleSaveEdit = async (commentId, messageId) => {
    await updateCommentMutation({ workspaceId, folderId, chatId, messageId, commentId, text: editedCommentText });
    setEditingCommentId(null);
    setEditedCommentText('');
  };

  const handleEditReply = (commentId, replyId) => {
    setEditingReplyId(replyId);
    const comment = comments.find((c) => c.commentId === commentId);
    const reply = comment.replies.find((r) => r.replyId === replyId);
    setEditedReplyText(reply.text);
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
  };

  const toggleReplies = (commentId) => {
    setShowReplies((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const handleItemClick = (item) => {
    setSelectedItem((prev) => (prev === item ? null : item));
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

  const formatTime = (ts) => {
    if (!ts) return '';
    const d = new Date(ts);
    if (isNaN(d.getTime())) return ts;
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) +
      ' ' + d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  };

  const Avatar = ({ name, size = 32 }) => (
    photoPath ? (
      <img src={photoPath} alt="" className="cm-avatar-img cm-avatar-img--sized" style={{ '--cm-avatar-size': `${size}px` }} />
    ) : (
      <span className="cm-avatar-initials cm-avatar-initials--sized" style={{ '--cm-avatar-size': `${size}px`, '--cm-avatar-font': `${size * 0.4}px` }}>
        {getInitials(name)}
      </span>
    )
  );

  return (
    <>
      {/* Search & Filter */}
      <div className="cm-search-bar">
        <CiSearch className="cm-search-icon" />
        <input
          className="cm-search-input"
          placeholder="Search comments..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClick={(e) => e.stopPropagation()}
        />
        <AnchoredMenu
          align="right"
          trigger={({ onClick }) => (
            <IoFilter onClick={onClick} className="cm-filter-icon" />
          )}
          items={menuItems.map((item) => ({
            key: item,
            label: item,
            selected: selectedItem === item,
            onClick: () => handleItemClick(item),
          }))}
        />
      </div>

      {/* Comments List */}
      <div className="cm-list">
        {filteredComments.length === 0 ? (
          <NoDataAvailable message={searchQuery ? 'No matching comments' : 'No comments yet'} />
        ) : (
          filteredComments.map((comment) => {
            const msgId = comment.messageId || comment.message_id;
            return (
              <div key={comment.commentId} className="cm-thread">
                {/* Comment */}
                <div className="cm-comment">
                  <Avatar name={comment.userName} />
                  <div className="cm-comment-body">
                    <div className="cm-comment-header">
                      <div className="cm-author-row">
                        <span className="cm-author">{comment.userName}</span>
                        <span className="cm-time">{formatTime(comment.timestamp)}</span>
                      </div>
                      <Dropdown
                        key={`comment-dd-${comment.commentId}-${dropdownKey}`}
                        title={<FaEllipsisV size={12} className="cm-menu-icon" />}
                        buttonClassName="cm-menu-btn"
                      >
                        <Dropdown.Item onClick={() => { closeDropdown(); handleEditComment(comment.commentId); }}>
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => { closeDropdown(); handleDeleteComment(comment._id, false, null, msgId); }}>
                          Delete
                        </Dropdown.Item>
                      </Dropdown>
                    </div>

                    {editingCommentId === comment.commentId ? (
                      <input
                        className="cm-edit-input"
                        type="text"
                        value={editedCommentText}
                        onChange={(e) => setEditedCommentText(e.target.value)}
                        onBlur={() => handleSaveEdit(comment.commentId, msgId)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSaveEdit(comment.commentId, msgId); }}
                        autoFocus
                      />
                    ) : (
                      <p className="cm-text">{comment.text}</p>
                    )}

                    {comment.replies?.length > 0 && (
                      <Button
                        variant="link"
                        className="cm-replies-toggle"
                        onClick={() => toggleReplies(comment.commentId)}
                      >
                        {showReplies[comment.commentId]
                          ? 'Hide replies'
                          : `${comment.replies.length} ${comment.replies.length === 1 ? 'reply' : 'replies'}`}
                      </Button>
                    )}
                  </div>
                </div>

                {/* Replies */}
                {showReplies[comment.commentId] && (
                  <div className="cm-replies">
                    {comment.replies.map((reply) => (
                      <div key={reply._Id || reply.replyId} className="cm-reply">
                        <Avatar name={reply.userName} size={26} />
                        <div className="cm-reply-body">
                          <div className="cm-comment-header">
                            <div className="cm-author-row">
                              <span className="cm-author">{reply.userName}</span>
                              <span className="cm-time">{formatTime(reply.timestamp)}</span>
                            </div>
                            <Dropdown
                              key={`reply-dd-${reply.replyId}-${dropdownKey}`}
                              title={<FaEllipsisV size={10} className="cm-menu-icon" />}
                              buttonClassName="cm-menu-btn"
                            >
                              <Dropdown.Item onClick={() => { closeDropdown(); handleEditReply(comment.commentId, reply.replyId); }}>
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item onClick={() => { closeDropdown(); handleDeleteComment(reply.replyId, true, comment.commentId, msgId); }}>
                                Delete
                              </Dropdown.Item>
                            </Dropdown>
                          </div>

                          {editingReplyId === reply.replyId ? (
                            <input
                              className="cm-edit-input"
                              type="text"
                              value={editedReplyText}
                              onChange={(e) => setEditedReplyText(e.target.value)}
                              onBlur={() => handleSaveReply(comment.commentId, reply.replyId, msgId)}
                              onKeyDown={(e) => { if (e.key === 'Enter') handleSaveReply(comment.commentId, reply.replyId, msgId); }}
                              autoFocus
                            />
                          ) : (
                            <p className="cm-text">{reply.text}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Input */}
                <div className="cm-reply-input">
                  <Avatar size={26} />
                  <div className="cm-input-box">
                    <input
                      type="text"
                      placeholder="Write a reply..."
                      value={replyTexts[comment.commentId] || ''}
                      onChange={(e) => setReplyTexts((prev) => ({ ...prev, [comment.commentId]: e.target.value }))}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleAddReply(comment.commentId, msgId); }}
                    />
                    <Button
                      variant="icon"
                      ariaLabel="Send reply"
                      className="cm-send-btn"
                      disabled={!(replyTexts[comment.commentId] || '').trim()}
                      onClick={() => handleAddReply(comment.commentId, msgId)}
                    >
                      <IoSend size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

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
