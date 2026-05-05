import PropTypes from 'prop-types';
import { FaCopy, FaThumbsUp, FaThumbsDown, FaBookmark, FaCommentAlt } from 'react-icons/fa';

const ACTIVE_COLOR = '#C3E11D';

const ActionButton = ({ Icon, title, active, onClick }) => (
  <div className="message-icon-wrapper" title={title} onClick={onClick}>
    <Icon style={active ? { color: ACTIVE_COLOR } : undefined} />
    <span className="tooltip-assessment">{title}</span>
  </div>
);

ActionButton.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

const MessageActions = ({
  onCopy,
  copied,
  onLike,
  liked,
  onDislike,
  disliked,
  onBookmark,
  bookmarked,
  onComment,
  commentMessageId,
}) => (
  <div className="message-action-icons">
    <ActionButton Icon={FaCopy} title="Copy" active={copied} onClick={onCopy} />
    <ActionButton Icon={FaThumbsUp} title="Like" active={liked} onClick={onLike} />
    <ActionButton Icon={FaThumbsDown} title="Dislike" active={disliked} onClick={onDislike} />
    {onComment && (
      <div className="message-icon-wrapper" title="Comment">
        <FaCommentAlt
          data-message-id={commentMessageId}
          onClick={onComment}
          className="cursor-pointer"
        />
        <span className="tooltip-assessment">Comment</span>
      </div>
    )}
    <ActionButton Icon={FaBookmark} title="Bookmark" active={bookmarked} onClick={onBookmark} />
  </div>
);

MessageActions.propTypes = {
  onCopy: PropTypes.func.isRequired,
  copied: PropTypes.bool,
  onLike: PropTypes.func.isRequired,
  liked: PropTypes.bool,
  onDislike: PropTypes.func.isRequired,
  disliked: PropTypes.bool,
  onBookmark: PropTypes.func.isRequired,
  bookmarked: PropTypes.bool,
  onComment: PropTypes.func,
  commentMessageId: PropTypes.string,
};

export default MessageActions;
