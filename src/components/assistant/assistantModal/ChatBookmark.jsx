import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaBookmark } from 'react-icons/fa';
import NoDataAvailable from '../../common/NoDataAvailable';
import { truncateText } from '../../../utils/helperFunction';

const ChatBookmark = ({ date, messages }) => {
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
                  <button
                    className="bm-toggle"
                    onClick={() => toggleExpand(index)}
                  >
                    {isExpanded ? 'Show less' : 'Show more'}
                  </button>
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

      <style>{`
        .bm-list {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          padding: 0.25rem;
        }

        .bm-card {
          background: #fff;
          border: 1px solid #f0f0f0;
          border-radius: 10px;
          padding: 1.2rem;
          transition: box-shadow 0.2s;
        }
        .bm-card:hover {
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }

        /* Header */
        .bm-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.8rem;
        }
        .bm-avatar-row {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }
        .bm-avatar-img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
        }
        .bm-avatar-initials {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #C3E11D;
          color: #0B1444;
          font-size: 1.2rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .bm-meta {
          display: flex;
          flex-direction: column;
        }
        .bm-sender {
          font-size: 1.3rem;
          font-weight: 600;
          color: #1a1a1a;
          line-height: 1.3;
        }
        .bm-date {
          font-size: 1.1rem;
          color: #999;
        }
        .bm-icon {
          color: #C3E11D;
          flex-shrink: 0;
        }

        /* Content */
        .bm-content {
          background: #fafafa;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 0.6rem;
        }
        .bm-text {
          font-size: 1.3rem;
          color: #444;
          line-height: 1.55;
          margin: 0;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .bm-toggle {
          background: none;
          border: none;
          color: #2563eb;
          font-size: 1.15rem;
          font-weight: 500;
          cursor: pointer;
          padding: 0.3rem 0 0 0;
        }
        .bm-toggle:hover {
          text-decoration: underline;
        }

        /* Footer */
        .bm-footer {
          font-size: 1.1rem;
        }
        .bm-saved {
          color: #999;
        }
        .bm-saved-user {
          color: #1a1a1a;
          font-weight: 500;
        }
      `}</style>
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
