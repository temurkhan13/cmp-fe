import { useState } from 'react';
import { RxAvatar } from 'react-icons/rx';
import { MdOutlineAttachFile } from 'react-icons/md';
import { MdAlternateEmail } from 'react-icons/md';
import { RiSendPlane2Fill } from 'react-icons/ri';
import PropTypes from 'prop-types';

const CommentPopup = ({ onClose }) => {
  const [comment, setComment] = useState('');

  const handleSend = () => {
    // Handle sending the comment here
    console.log('Comment sent:', comment);
    setComment('');
    onClose(); // Close the comment popup
  };

  const handleInputClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className="commentPopup" onClick={handleInputClick}>
        <div className="user-image">
          <RxAvatar style={{ fontSize: '3.5rem' }} />
        </div>
        <div className="comment-box">
          <div className="input-wrapper">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Reply"
              onClick={handleInputClick}
            />
            <div onClick={handleInputClick} className="user-icon">
              <MdOutlineAttachFile />
            </div>
            <div onClick={handleInputClick} className="mention-icon">
              <MdAlternateEmail />
            </div>
            <div onClick={handleSend} className="send-icon">
              <RiSendPlane2Fill />
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .commentPopup {
      position: absolute;
        display:flex;
          box-shadow: 0px 4px 24px 0px #0000001F;
          position: fixed;
          top: 5rem;
          padding:2rem;
          border-radius:1rem;
          }
          .comment-box{
            display:flex;
            border:1px solid lightgray;
          border-radius:0.7rem;

          }
          .user-image{
          margin-right:1rem;
          }
            .input-wrapper{
            display:flex;
            align-items:center;
            justify-content:center;
            gap:0.5rem;
            font-size:1.6rem;
            margin-right:1rem;

            }
            .input-wrapper input {
            margin-left:1rem;
            border:none;
            outline:none;
            }
             .user-icon, .mention-icon, .send-icon{
             font-size:2rem;
              cursor:pointer;}
              .send-icon{
              color:gray;
              }
              
      `}</style>
    </>
  );
};

CommentPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CommentPopup;
