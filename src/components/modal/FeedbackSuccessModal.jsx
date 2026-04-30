import PropTypes from 'prop-types';
import Modal from './Modal';

const FeedbackSuccessModal = ({ isOpen, onClose, message }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Feedback">
    <p>{message}</p>
  </Modal>
);

FeedbackSuccessModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default FeedbackSuccessModal;
