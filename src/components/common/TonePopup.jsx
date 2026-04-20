import { useState, useEffect, useRef } from 'react';

import PropTypes from 'prop-types';
import { RiMagicFill } from 'react-icons/ri';
import { RxMagicWand } from 'react-icons/rx';
import { BsFilterLeft } from 'react-icons/bs';
import { FaLocationArrow } from 'react-icons/fa6';

const TonePopup = ({
  onToneChange,
  onResponseLengthChange,
  HandleAskAi,
  onClose,
}) => {
  const [showAskAi, setShowAskAi] = useState(false);
  const [inputValue, setInputValue] = useState('');
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

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      HandleAskAi(inputValue);
      setInputValue('');
      e.stopPropagation(); // Prevent closing the dropdown when pressing Enter
    }
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
            <button
              className="dropbtn tone-popup-inspire-btn"
              onClick={handleAskAiToggle}
            >
              <RiMagicFill /> Inspire Me
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
          <div
            className="dropdown"
            ref={dropdownRef}
            onClick={handleClickInsideDropdown}
          >
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
      ) : (
        <div className="navbar">
          <div
            className="dropdown"
            ref={dropdownRef}
            onClick={handleClickInsideDropdown}
            className="tone-popup-ask-ai-dropdown"
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
