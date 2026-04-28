import { useState } from 'react';
import { RiMagicFill } from 'react-icons/ri';
import { GoCommentDiscussion } from 'react-icons/go';
import { RxMagicWand } from 'react-icons/rx';
import { BsFilterLeft } from 'react-icons/bs';
import { FaLocationArrow } from 'react-icons/fa6';
import PropTypes from 'prop-types';
import Button from '../common/Button';

const TonePopup = ({
  onToneChange,
  onResponseLengthChange,
  HandleAskAi,
  onClose,
}) => {
  const [showAskAi, setShowAskAi] = useState(false);

  const handleOptionClick = () => {
    onClose(); // Close the popup when any option is clicked
  };

  return (
    <div className="PopupBox">
      {!showAskAi ? (
        <div className="navbar">
          <div className="dropdown">
            <Button
              variant="ghost"
              className="dropbtn chat-tone-inspire-btn"
              iconLeft={<RiMagicFill />}
              onClick={() => setShowAskAi(true)}
            >
              Inspire me
            </Button>
          </div>
          <div className="dropdown">
            <Button
              variant="ghost"
              className="dropbtn"
              iconLeft={<GoCommentDiscussion />}
            >
              Comment
            </Button>
          </div>
          <div className="dropdown">
            <Button
              variant="ghost"
              className="dropbtn"
              iconLeft={<RxMagicWand />}
            >
              Change Tone
            </Button>
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
            <Button
              variant="ghost"
              className="dropbtn"
              iconLeft={<BsFilterLeft />}
            >
              Response Length
            </Button>
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
      ) : (
        <div className="navbar">
          <div className="dropdown chat-tone-ask-ai-dropdown">
            <Button
              variant="ghost"
              className="dropbtn chat-tone-ask-ai-input-wrapper"
            >
              <RiMagicFill className="chat-tone-ask-ai-send" />
              <input
                type="text"
                className="chat-tone-ask-ai-input"
                placeholder="Ask AI to edit or generate..."
              />
              <FaLocationArrow />
            </Button>
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
      )}
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
