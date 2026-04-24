import PropTypes from 'prop-types';
import { RxCross2 } from 'react-icons/rx';

const AssessmentModal = ({ content, onClose }) => {
  const handleClose = () => {
    if (onClose) onClose();
  };
  return (
    <div className="assessment-modal-overlay" onClick={handleClose}>
      <div className="assessment-modal" onClick={(e) => e.stopPropagation()}>
        <button className="assessment-modal-close" onClick={handleClose}>
          <RxCross2 size={18} />
        </button>
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
