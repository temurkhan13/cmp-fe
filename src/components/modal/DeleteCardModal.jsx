import PropTypes from 'prop-types';
import Button from '../common/Button';
import Modal from './Modal';

const DeleteCardModal = ({ isOpen, onClose, onConfirm, paymentDetails }) => {
  const cardLabel = paymentDetails
    ? `Visa Card **** ${paymentDetails.cardNumber.slice(-4)}`
    : 'Visa Card **** 5914';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Card Details"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Delete Permanently
          </Button>
        </>
      }
    >
      <p>
        You&apos;re about to delete {cardLabel} from your list. This can&apos;t be undone.
      </p>
    </Modal>
  );
};

DeleteCardModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  paymentDetails: PropTypes.shape({
    cardNumber: PropTypes.string.isRequired,
    expiryDate: PropTypes.string.isRequired,
  }),
};

export default DeleteCardModal;
