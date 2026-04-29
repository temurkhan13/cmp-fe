import PropTypes from 'prop-types';
import { RiMagicFill } from 'react-icons/ri';
import { RxMagicWand } from 'react-icons/rx';
import { BsFilterLeft } from 'react-icons/bs';
import Button from './Button';
import AnchoredMenu from './AnchoredMenu';

const TonePopup = ({
  onToneChange,
  onResponseLengthChange,
  HandleAskAi,
  onClose,
}) => {
  const handleAskAi = (value) => {
    HandleAskAi(value);
    onClose();
  };
  const handleTone = (value) => {
    onToneChange(value);
    onClose();
  };
  const handleLength = (value) => {
    onResponseLengthChange(value);
    onClose();
  };

  return (
    <div className="PopupBox">
      <div className="navbar">
        <AnchoredMenu
          align="left"
          trigger={({ onClick }) => (
            <Button
              variant="ghost"
              className="dropbtn tone-popup-inspire-btn"
              iconLeft={<RiMagicFill />}
              onClick={onClick}
            >
              Inspire Me
            </Button>
          )}
          items={[
            { key: 'improve-writing', label: 'Improve Writing', onClick: () => handleAskAi('Improve Writing') },
            { key: 'fix-grammar', label: 'Fix Grammar', onClick: () => handleAskAi('Fix Spelling & Grammar') },
            { key: 'summarize', label: 'Summarize', onClick: () => handleAskAi('Summarize') },
            { key: 'explain-this', label: 'Explain This', onClick: () => handleAskAi('Explain This') },
          ]}
        />
        <AnchoredMenu
          align="left"
          trigger={({ onClick }) => (
            <Button
              variant="ghost"
              className="dropbtn"
              iconLeft={<RxMagicWand />}
              onClick={onClick}
            >
              Change Tone
            </Button>
          )}
          items={[
            { key: 'normal', label: 'Normal', onClick: () => handleTone('Normal') },
            { key: 'professional', label: 'Professional', onClick: () => handleTone('Professional') },
            { key: 'casual', label: 'Casual', onClick: () => handleTone('Casual') },
            { key: 'relax', label: 'Relax', onClick: () => handleTone('Relax') },
            { key: 'friendly', label: 'Friendly', onClick: () => handleTone('Friendly') },
            { key: 'straightforward', label: 'StraightForward', onClick: () => handleTone('StraightForward') },
          ]}
        />
        <AnchoredMenu
          align="left"
          trigger={({ onClick }) => (
            <Button
              variant="ghost"
              className="dropbtn"
              iconLeft={<BsFilterLeft />}
              onClick={onClick}
            >
              Response Length
            </Button>
          )}
          items={[
            { key: 'auto', label: 'Auto', onClick: () => handleLength('Auto') },
            { key: 'small', label: 'Small', onClick: () => handleLength('Small') },
            { key: 'medium', label: 'Medium', onClick: () => handleLength('Medium') },
            { key: 'comprehensive', label: 'Comprehensive', onClick: () => handleLength('Comprehensive') },
          ]}
        />
      </div>
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
