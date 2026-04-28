import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import Button from '../common/Button';
import './dashboard-inline.scss';

const TrashModal = ({ isOpen, onClose, onProceed }) => {
  if (!isOpen) return null;

  return (
    <div className="trash-modal-backdrop">
      <div className="trash-modal">
        <div className="trash-modal__header">
          <h2 className="trash-modal__heading">Move to trash</h2>
          <FaTimes className="trash-modal__close-icon" onClick={onClose} />
        </div>
        <hr />
        <p className="trash-modal__subheading">
          Are you sure you want to move this file to the trash? It will remain
          there for 30 days before being permanently deleted.
        </p>
        <hr />
        <div className="trash-modal__buttons">
          <Button
            variant="secondary"
            size="sm"
            className="trash-modal__btn trash-modal__cancel-btn"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="trash-modal__btn trash-modal__proceed-btn"
            onClick={onProceed}
          >
            Proceed
          </Button>
        </div>
      </div>
    </div>
  );
};

TrashModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onProceed: PropTypes.func.isRequired,
};

export default TrashModal;
