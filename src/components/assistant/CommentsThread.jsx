import PropTypes from 'prop-types';
import { FaCommentAlt } from 'react-icons/fa';

import apiClient from '../../api/axios';

const CommentsThread = ({
  comments,
  messageId,
  workspaceId,
  folderId,
  chatId,
  editingCommentId,
  setEditingCommentId,
  replyingCommentId,
  setReplyingCommentId,
  refetch,
}) => {
  if (!comments || comments.length === 0) return null;

  return (
    <div className="asst-comment-section">
      {comments.map((c, ci) => (
        <div key={ci} className="asst-comment-item">
          <FaCommentAlt className="asst-comment-icon" />
          {editingCommentId === (c._id || c.id) ? (
            <input
              autoFocus
              defaultValue={c.text}
              onKeyDown={async (e) => {
                if (e.key === 'Enter') {
                  const msgId = c.messageId || c.message_id || messageId;
                  await apiClient.patch(
                    `/workspace/${workspaceId}/folder/${folderId}/chat/${chatId}/message/${msgId}/comment/${c._id || c.id}`,
                    { text: e.target.value }
                  );
                  setEditingCommentId(null);
                  refetch();
                }
                if (e.key === 'Escape') setEditingCommentId(null);
              }}
              onBlur={() => setEditingCommentId(null)}
              className="asst-comment-input"
            />
          ) : (
            <>
              <span className="asst-comment-user">{c.userName || c.user_name || 'You'}:</span>
              <span className="asst-comment-text">{c.text}</span>
              <span
                className="asst-comment-action asst-comment-action--edit"
                onClick={() => setEditingCommentId(c._id || c.id)}
              >Edit</span>
              <span
                className="asst-comment-action asst-comment-action--delete"
                onClick={async () => {
                  const msgId = c.messageId || c.message_id || messageId;
                  await apiClient.delete(
                    `/workspace/${workspaceId}/folder/${folderId}/chat/${chatId}/message/${msgId}/comment/${c._id || c.id}`
                  );
                  refetch();
                }}
              >Delete</span>
              <span
                className="asst-comment-action asst-comment-action--save"
                onClick={() => setReplyingCommentId(c._id || c.id)}
              >Reply</span>
            </>
          )}
          {c.replies && c.replies.length > 0 && (
            <div className="asst-reply-section">
              {c.replies.map((r, ri) => (
                <div key={ri} className="asst-reply-item">
                  <span className="asst-comment-user">{r.userName || r.user_name || 'User'}:</span>{' '}
                  <span>{r.text}</span>
                </div>
              ))}
            </div>
          )}
          {replyingCommentId === (c._id || c.id) && (
            <div className="asst-reply-input-row">
              <input
                autoFocus
                placeholder="Write a reply... (Enter to send)"
                onKeyDown={async (e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    const val = e.target.value;
                    e.target.disabled = true;
                    try {
                      const msgId = c.messageId || c.message_id || messageId;
                      await apiClient.post(
                        `/workspace/${workspaceId}/folder/${folderId}/chat/${chatId}/message/${msgId}/comment/${c._id || c.id}/reply`,
                        { text: val }
                      );
                      setReplyingCommentId(null);
                      refetch();
                    } catch (err) {
                      e.target.disabled = false;
                    }
                  }
                  if (e.key === 'Escape') setReplyingCommentId(null);
                }}
                className="asst-reply-input"
              />
              <span
                className="asst-reply-cancel"
                onClick={() => setReplyingCommentId(null)}
              >Cancel</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

CommentsThread.propTypes = {
  comments: PropTypes.array,
  messageId: PropTypes.string,
  workspaceId: PropTypes.string,
  folderId: PropTypes.string,
  chatId: PropTypes.string,
  editingCommentId: PropTypes.string,
  setEditingCommentId: PropTypes.func.isRequired,
  replyingCommentId: PropTypes.string,
  setReplyingCommentId: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default CommentsThread;
