import PropTypes from 'prop-types';
import { RxCross2 } from 'react-icons/rx';

const AssessmentModal = ({ content, onClose }) => {
  const handleClose = () => {
    if (onClose) onClose();
  };
  return (
    <div className="modalOverlayy" onClick={handleClose}>
      <div className="modall" onClick={(e) => e.stopPropagation()}>
        <button className="closeButton" onClick={handleClose}>
          <RxCross2 size={18} />
        </button>
        <div className="content">{content}</div>
      </div>
      <style>{`
        .modalOverlayy {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.3);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10;
        }
        .modall {
          height:98vh;
          display: flex;
          padding: 2rem;
          border-radius:1rem;
          overflow-y: hidden !important;
          background-color: white;
          width: fit-content !important;
          position: relative
        }
        .closeButton {
          background-color: transparent;
          border: none;
          position: absolute;
          right: 2rem;
          top: 15px;
          cursor: pointer;
          background-color: #f1f1f1;
          display: flex;
          border-radius: 50%;
          padding: 0.5rem;
        }
        .content {
          padding: 1.25rem;
          overflow-y: hidden;
        }
      `}</style>
    </div>
  );
};

AssessmentModal.propTypes = {
  content: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AssessmentModal;
