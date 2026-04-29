import { useState, useEffect, useRef } from 'react';

import PropTypes from 'prop-types';
import { RiMagicFill } from 'react-icons/ri';
import { RxMagicWand } from 'react-icons/rx';
import { BsFilterLeft } from 'react-icons/bs';
import Button from './Button';

const TonePopup = ({
  onToneChange,
  onResponseLengthChange,
  HandleAskAi,
  onClose,
}) => {
  const [showAskAi, setShowAskAi] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowAskAi(false); // Close the dropdown when clicking outside
    }
  };

  // Prevent the dropdown from closing when clicking inside it
  const handleClickInsideDropdown = (e) => {
    e.stopPropagation(); // Prevent closing dropdown when clicking inside
  };

  const handleAskAiToggle = (e) => {
    e.stopPropagation();
    setShowAskAi((prev) => !prev); // Toggle dropdown state
  };

  const handleOptionClick = () => {
    onClose();
  };

  // Attach event listener to close the dropdown if clicked outside
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="PopupBox">
      {!showAskAi ? (
        <div className="navbar">
          <div
            className="dropdown"
            ref={dropdownRef}
            onClick={handleClickInsideDropdown}
          >
            <Button
              variant="ghost"
              className="dropbtn tone-popup-inspire-btn"
              iconLeft={<RiMagicFill />}
              onClick={handleAskAiToggle}
            >
              Inspire Me
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
                Fix Grammar
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
              <a
                href="#"
                onClick={() => {
                  HandleAskAi('Explain This');
                  handleOptionClick();
                }}
              >
                Explain This
              </a>
            </div>
          </div>
          <div
            className="dropdown"
            ref={dropdownRef}
            onClick={handleClickInsideDropdown}
          >
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
          <div
            className="dropdown"
            ref={dropdownRef}
            onClick={handleClickInsideDropdown}
          >
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
          <div
            className="dropdown tone-popup-ask-ai-dropdown"
            ref={dropdownRef}
            onClick={handleClickInsideDropdown}
          ></div>
        </div>
      )}
    </div>
  );
};

TonePopup.propTypes = {
  onToneChange: PropTypes.func.isRequired,
  onResponseLengthChange: PropTypes.func.isRequired,
  HandleAskAi: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TonePopup;
