import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import NoDataAvailable from '../../common/NoDataAvailable';

const ChatBookmark = ({ date, messages }) => {
  const [bookmarks, setBookmarks] = useState(
    messages && messages.map(() => false)
  );

  const toggleBookmark = (index) => {
    setBookmarks((prevBookmarks) =>
      prevBookmarks.map((bookmarked, i) =>
        i === index ? !bookmarked : bookmarked
      )
    );
  };

  return (
    <div>
      <div className="date">{date}</div>
      <div className="chat-bookmark">
        {!messages ? (
          <NoDataAvailable message="No bookmark available" />
        ) : (
          messages &&
          messages.map((message, index) => (
            <div className="message" key={index}>
              <div className="header-content">
                <div className="avatar">
                  {/* <img src={message.avatar} alt={`${message.sender} avatar`} /> */}
                  {message.avatar}
                </div>
                <div className="content">
                  <div className="header">
                    <div className="sender">{message.sender}</div>
                    {bookmarks[index] ? (
                      <FaBookmark
                        className="bookmark-icon"
                        onClick={() => toggleBookmark(index)}
                      />
                    ) : (
                      <FaRegBookmark
                        className="bookmark-icon"
                        onClick={() => toggleBookmark(index)}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="bookmark-text">{message.text}</div>
              <div className="saved-by">
                <span> Saved by </span>
                {message.savedBy}
              </div>
            </div>
          ))
        )}
        <style>{`
          .chat-bookmark {
            padding: 1rem;
            border-bottom: 1px solid #ddd;
            &:hover {
              background-color: #f1f1f1;
              cursor: pointer;
            }
          }
          .date {
            font-size: 1.2rem;
            margin-bottom: 1rem;
            margin-top: 3rem;
            margin-left: 1rem;
            font-weight: 500;
          }
          .message {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 1rem;
          }
          .header-content {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .avatar {
            margin-right: 1rem;
            font-size: 3rem;
          }
          .content {
            flex: 1;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.5rem;
          }
          .sender {
            font-size: 1.5rem;
            font-weight: 500;
          }
          .bookmark-icon {
            cursor: pointer;
            font-size: 1.5rem;
          }
          .bookmark-text {
            margin-bottom: 0.5rem;
            border: 2px solid lightgray;
            font-size: 1.4rem;
            padding: 1rem;
            border-radius: 1rem;
          }
          .saved-by {
            font-size: 1.1rem;
          }
          .saved-by span {
            color: gray;
          }
        `}</style>
      </div>
    </div>
  );
};

ChatBookmark.propTypes = {
  date: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      sender: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      savedBy: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ChatBookmark;
