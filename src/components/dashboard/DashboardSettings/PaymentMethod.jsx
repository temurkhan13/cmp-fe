import { useState } from 'react';
import PropTypes from 'prop-types';
import PaymentModal from './PaymentModal';
import { RxCross2 } from 'react-icons/rx';

const PaymentMethod = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const handleAddPaymentClick = () => {
    setPaymentDetails(null); // Clear payment details to add a new method
    setIsModalOpen(true);
  };

  const handleEditClick = (details) => {
    setPaymentDetails(details); // Set current payment details for editing
    setIsModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true); // Show delete confirmation modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="payment-method-container">
      <h2 className="payment-method-title">Payment Method</h2>
      <p className="payment-method-description">
        Manage your billing email address, payment method, and view invoices
        with your account email.
      </p>
      <hr className="payment-method-divider" />

      <div className="payment-card">
        <div className="payment-card-details">
          <span>
            {paymentDetails
              ? `Visa Card **** ${paymentDetails.cardNumber.slice(-4)}`
              : 'Visa Card **** 5914'}
          </span>
          <span>
            Expiration: {paymentDetails ? paymentDetails.expiryDate : '11/26'}
          </span>
        </div>
        <div className="payment-card-actions">
          <button
            onClick={() =>
              handleEditClick({ cardNumber: '5914', expiryDate: '11/26' })
            }
            className="edit-card-action"
          >
            Edit
          </button>
          <button onClick={handleDeleteClick} className="delete-card-action">
            Delete
          </button>
        </div>
      </div>

      <button className="payment-method-add-btn" onClick={handleAddPaymentClick}>
        Add Payment Method
      </button>

      {isModalOpen && (
        <PaymentModal onClose={handleCloseModal} details={paymentDetails} />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          paymentDetails={paymentDetails}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

// DeleteModal Component
const DeleteModal = ({ paymentDetails, onClose }) => (
  <div className="pm-delete-modal">
    <div className="pm-delete-modal-content">
      <div className="pm-delete-modal-header">
        <p>Delete Card Details</p>
        <button className="pm-delete-modal-close" onClick={onClose}>
          <RxCross2 size={18} />
        </button>
      </div>
      <p>
        You&apos;re about to delete{' '}
        {paymentDetails
          ? `Visa Card **** ${paymentDetails.cardNumber.slice(-4)}`
          : 'Visa Card **** 5914'}
        from <br />
        your list. This can&apos;t be undone.
      </p>
      <div className="pm-delete-modal-buttons">
        <button className="pm-delete-cancel-btn" onClick={onClose}>
          Cancel
        </button>
        <button className="pm-delete-confirm-btn">Delete Permanently</button>
      </div>
    </div>
  </div>
);

DeleteModal.propTypes = {
  paymentDetails: PropTypes.shape({
    cardNumber: PropTypes.string.isRequired,
    expiryDate: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default PaymentMethod;
