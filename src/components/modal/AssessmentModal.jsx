import PropTypes from 'prop-types';
import { RxCross2 } from 'react-icons/rx';
import Button from '../common/Button';

const AssessmentModal = ({ content, onClose }) => {
  const handleClose = () => {
    if (onClose) onClose();
  };
  return (
    <div className="assessment-modal-overlay" onClick={handleClose}>
      <div className="assessment-modal" onClick={(e) => e.stopPropagation()}>
        <Button
          variant="icon"
          ariaLabel="Close"
          className="assessment-modal-close"
          onClick={handleClose}
        >
          <RxCross2 size={18} />
        </Button>
        <div className="assessment-modal-content">{content}</div>
      </div>
    </div>
  );
};

AssessmentModal.propTypes = {
  content: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AssessmentModal;
