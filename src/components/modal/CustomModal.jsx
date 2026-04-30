import PropTypes from 'prop-types';
import Button from '../common/Button';
import Modal from './Modal';

const CustomModal = ({
  isOpen,
  onClose,
  onProceed,
  heading,
  bodyContent,
  cancelText,
  proceedText,
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={heading}
    footer={
      <>
        <Button variant="secondary" onClick={onClose}>
          {cancelText}
        </Button>
        <Button variant="primary" onClick={onProceed}>
          {proceedText}
        </Button>
      </>
    }
  >
    {bodyContent}
  </Modal>
);

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
