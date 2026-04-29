import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaBookmark } from 'react-icons/fa';
import NoDataAvailable from '../../common/NoDataAvailable';
import { truncateText } from '../../../utils/helperFunction';
import Button from '../../common/Button';

const ChatBookmark = ({ messages }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  const getInitials = (name) => {
    if (name) {
      const parts = name.trim().split(/\s+/);
      return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase();
    }
    if (!user) return '?';
    return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
  };

  const photoPath = user?.photoPath || '';

  const toggleExpand = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  if (!messages || messages.length === 0) {
    return <NoDataAvailable message="No bookmarks yet" />;
  }

  return (
    <>
      <div className="bm-list">
        {messages.map((message, index) => {
          const isExpanded = expandedIndex === index;
          const needsTruncate = message.text && message.text.length > 200;

          return (
            <div className="bm-card" key={message._id || message.id || index}>
              {/* Header */}
              <div className="bm-card-header">
                <div className="bm-avatar-row">
                  {photoPath ? (
                    <img src={photoPath} alt="" className="bm-avatar-img" />
                  ) : (
                    <span className="bm-avatar-initials">
                      {getInitials(message.from)}
                    </span>
                  )}
                  <div className="bm-meta">
                    <span className="bm-sender">{message.from || 'You'}</span>
                    <span className="bm-date">{message.localDate}</span>
                  </div>
                </div>
                <FaBookmark className="bm-icon" size={14} />
              </div>

              {/* Content */}
              <div className="bm-content">
                <p className="bm-text">
                  {isExpanded ? message.text : truncateText(message.text, 200)}
                </p>
                {needsTruncate && (
                  <Button
                    variant="link"
                    className="bm-toggle"
                    onClick={() => toggleExpand(index)}
                  >
                    {isExpanded ? 'Show less' : 'Show more'}
                  </Button>
                )}
              </div>

              {/* Footer */}
              <div className="bm-footer">
                <span className="bm-saved">Saved by </span>
                <span className="bm-saved-user">You</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

ChatBookmark.propTypes = {
  date: PropTypes.number,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      from: PropTypes.string,
      text: PropTypes.string,
      localDate: PropTypes.string,
    })
  ),
};

export default ChatBookmark;
