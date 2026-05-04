import { useState } from 'react';
import { PaymentModal, DeleteCardModal } from '../modal';
import Button from '../common/Button';

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
          <Button
            variant="ghost"
            className="edit-card-action"
            onClick={() =>
              handleEditClick({ cardNumber: '5914', expiryDate: '11/26' })
            }
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            className="delete-card-action"
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        </div>
      </div>

      <Button variant="primary" onClick={handleAddPaymentClick}>
        Add Payment Method
      </Button>

      {isModalOpen && (
        <PaymentModal onClose={handleCloseModal} details={paymentDetails} />
      )}
      <DeleteCardModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleCloseModal}
        paymentDetails={paymentDetails}
      />
    </div>
  );
};

export default PaymentMethod;
