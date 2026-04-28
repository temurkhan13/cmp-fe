import PropTypes from 'prop-types';
import { RxCross2 } from 'react-icons/rx';
import Button from '../common/Button';

import './custom-modal.scss';

const CustomModal = ({
  isOpen,
  onClose,
  onProceed,
  heading,
  bodyContent,
  cancelText,
  proceedText,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="custom-modal-overlay" onClick={onClose}>
      <div className="custom-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="custom-modal-header">
          <p className="custom-modal-heading">{heading}</p>
          <Button
            variant="icon"
            ariaLabel="Close"
            className="custom-modal-close-button"
            onClick={onClose}
          >
            <RxCross2 className="custom-modal-cross-icon" />
          </Button>
        </div>
        <hr className="custom-modal-straight-line" />
        <div className="custom-modal-body">{bodyContent}</div>
        <div className="custom-modal-actions">
          <Button
            variant="secondary"
            className="custom-modal-button custom-modal-cancel-button"
            onClick={onClose}
          >
            {cancelText}
          </Button>
          <Button
            variant="primary"
            className="custom-modal-button custom-modal-proceed-button"
            onClick={onProceed}
          >
            {proceedText}
          </Button>
        </div>
      </div>
    </div>
  );
};

CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onProceed: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
  bodyContent: PropTypes.node.isRequired,
  cancelText: PropTypes.string.isRequired,
  proceedText: PropTypes.string.isRequired,
};

export default CustomModal;
