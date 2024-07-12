import { useState } from 'react';
import { RiMagicFill } from 'react-icons/ri';
import { GoCommentDiscussion } from 'react-icons/go';
import { RxMagicWand } from 'react-icons/rx';
import { BsFilterLeft } from 'react-icons/bs';
import { FaLocationArrow } from 'react-icons/fa6';
import PropTypes from 'prop-types';
import CommentPopup from './CommentPopup';

const TonePopup = ({
  onToneChange,
  onResponseLengthChange,
  HandleAskAi,
  onClose,
}) => {
  const [showAskAi, setShowAskAi] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [showCommentPopup, setShowCommentPopup] = useState(false);

  const handleOptionClick = () => {
    onClose(); // Close the popup when any option is clicked
  };

  const handlePopupToggle = (e) => {
    e.stopPropagation();
    setPopupVisible(!popupVisible);
  };

  const handleAskAiToggle = (e) => {
    e.stopPropagation();
    setShowAskAi(!showAskAi);
  };

  const handleCommentClick = (e) => {
    e.stopPropagation();
    setShowCommentPopup(true);
    setShowAskAi(false);
    setPopupVisible(false);
  };

  const handleCommentClose = () => {
    setShowCommentPopup(false);
  };

  return (
    <div className="PopupBox">
      {!showAskAi && !showCommentPopup ? (
        <div className="navbar">
          <div className="dropdown">
            <button
              className="dropbtn"
              onClick={handleAskAiToggle}
              style={{ color: 'rgba(0, 102, 255, 1)', fontWeight: 400 }}
            >
              <RiMagicFill /> Ask AI
            </button>
          </div>
          <div className="dropdown">
            <button className="dropbtn" onClick={handleCommentClick}>
              <GoCommentDiscussion /> Comment
            </button>
          </div>
          <div className="dropdown">
            <button className="dropbtn">
              <RxMagicWand /> Change Tone
            </button>
            <div className="dropdownContent">
              <a
                href="#"
                onClick={() => {
                  onToneChange('Normal');
                  handleOptionClick();
                }}
              >
                Normal
              </a>
              <a
                href="#"
                onClick={() => {
                  onToneChange('Professional');
                  handleOptionClick();
                }}
              >
                Professional
              </a>
              <a
                href="#"
                onClick={() => {
                  onToneChange('Casual');
                  handleOptionClick();
                }}
              >
                Casual
              </a>
              <a
                href="#"
                onClick={() => {
                  onToneChange('Relax');
                  handleOptionClick();
                }}
              >
                Relax
              </a>
              <a
                href="#"
                onClick={() => {
                  onToneChange('Friendly');
                  handleOptionClick();
                }}
              >
                Friendly
              </a>
              <a
                href="#"
                onClick={() => {
                  onToneChange('StraightForward');
                  handleOptionClick();
                }}
              >
                StraightForward
              </a>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropbtn">
              <BsFilterLeft /> Response Length
            </button>
            <div className="dropdownContent">
              <a
                href="#"
                onClick={() => {
                  onResponseLengthChange('Auto');
                  handleOptionClick();
                }}
              >
                Auto
              </a>
              <a
                href="#"
                onClick={() => {
                  onResponseLengthChange('Small');
                  handleOptionClick();
                }}
              >
                Small
              </a>
              <a
                href="#"
                onClick={() => {
                  onResponseLengthChange('Medium');
                  handleOptionClick();
                }}
              >
                Medium
              </a>
              <a
                href="#"
                onClick={() => {
                  onResponseLengthChange('Comprehensive');
                  handleOptionClick();
                }}
              >
                Comprehensive
              </a>
            </div>
          </div>
        </div>
      ) : showAskAi ? (
        <div className="navbar">
          <div
            className="dropdown"
            style={{
              minWidth: '100%',
              padding: '5px 5px',
              borderRadius: '10px',
            }}
          >
            <button
              className="dropbtn"
              style={{
                width: '400px',
                display: 'flex',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid lightgray',
                outline: 'none',
                padding: '10px',
                fontFamily: 'inherit',
                margin: '4px',
                background: 'white',
                borderRadius: '5px',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <RiMagicFill style={{ color: 'rgba(0, 102, 255, 1)' }} />
              <input
                type="text"
                style={{
                  border: 'none',
                  outline: 'none',
                  flex: 1,
                  margin: '0 10px',
                }}
                placeholder="Ask AI to edit or generate..."
              />
              <FaLocationArrow />
            </button>
            <div className="dropdownContent">
              <a
                href="#"
                onClick={() => {
                  HandleAskAi('Improve Writing');
                  handleOptionClick();
                }}
              >
                Improve Writing
              </a>
              <a
                href="#"
                onClick={() => {
                  HandleAskAi('Fix Spelling & Grammar');
                  handleOptionClick();
                }}
              >
                Fix Spelling & Grammar
              </a>
              <a
                href="#"
                onClick={() => {
                  HandleAskAi('Summarize');
                  handleOptionClick();
                }}
              >
                Summarize
              </a>
            </div>
          </div>
        </div>
      ) : null}
      {showCommentPopup && <CommentPopup onClose={handleCommentClose} />}
    </div>
  );
};

TonePopup.propTypes = {
  onToneChange: PropTypes.func.isRequired,
  onResponseLengthChange: PropTypes.func.isRequired,
  HandleAskAi: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired, // Add onClose prop
};

export default TonePopup;
