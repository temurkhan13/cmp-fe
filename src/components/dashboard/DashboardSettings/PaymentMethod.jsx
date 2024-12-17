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
      <h2 className="title">Payment Method</h2>
      <p className="description">
        Manage your billing email address, payment method, and view invoices
        with your account email.
      </p>
      <hr className="divider" />

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

      <button className="add-button" onClick={handleAddPaymentClick}>
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

      {/* Styles for component */}
      <style>{`
        .payment-method-container {
          padding: 1.25rem;
          background-color: #f9f9f9;
          box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
          border-radius: 0.5rem; 
        }
        .title {
          font-size: 1.8rem;
          font-weight: 600;
          color: #000;
          margin: 0;
        }
        .description {
          font-size: 1.2rem; 
          color: #888;
          margin: 0.5rem 0 0 0;
        }
        .divider {
          border: none;
          border-top: 0.0625rem solid #e0e0e0;
          margin: 1rem 0 3rem 0; 
        }
        .payment-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: white;
          padding: 1rem;
          margin-bottom: 1rem;
          border-radius: 1rem;
          font-size: 1.4rem;
          box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
        }
        .payment-card-details span {
          display: block;
        }
        .payment-card-actions button {
          background-color: transparent;
          cursor: pointer;
          margin: 0 0.5rem;
          align-items: center;
        }
        .edit-card-action,
        .delete-card-action {
          padding: 1rem;
          color: #333;
          border: 0.2rem solid #ccc;
          border-radius: 1rem;
          font-size: 1.4rem;
        }
        .delete-card-action {
          background-color: lightgray;
        }
        .add-button {
          background-color: #C3E11D;
          color: #000;
          border: none;
          padding: 1rem;
          border-radius: 1rem; 
          cursor: pointer;
          font-size: 1.5rem; 
          font-weight: 500;
          transition: background-color 0.3s ease;
        }
        .add-button:hover {
          background-color: #b2e200;
        }
      `}</style>
    </div>
  );
};

// DeleteModal Component
const DeleteModal = ({ paymentDetails, onClose }) => (
  <div className="delete-modal">
    <div className="delete-modal-content">
      <div className="delete-header">
        <p>Delete Card Details</p>
        <button className="close-button" onClick={onClose}>
          <RxCross2 size={18} />
        </button>
      </div>
      <hr style={{ marginBottom: '2rem' }} />
      <p>
        You&apos;re about to delete{' '}
        {paymentDetails
          ? `Visa Card **** ${paymentDetails.cardNumber.slice(-4)}`
          : 'Visa Card **** 5914'}
        from <br />
        your list. This can&apos;t be undone.
      </p>
      <div className="delete-modal-buttons">
        <button className="cancel-button" onClick={onClose}>
          Cancel
        </button>
        <button className="delete-button">Delete Permanently</button>
      </div>
    </div>

    <style>{`
      .delete-modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        // width: 50%;
        border-radius: 1rem;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: white;
      }
      .delete-header {
        width: 100%;
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .delete-header p {
        font-size: 1.6rem;
        font-weight: 600;
        margin: 0;
      }
      .close-button {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
      }
      .delete-modal-content {
        padding: 2rem;
        text-align: center;
        border-radius: 1rem;
        font-size:1.5rem
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
      }
        .delete-modal-content p{
         font-size:1.5rem;
        }
      .delete-modal-buttons {
        display: flex;
        justify-content: space-around;
        gap: 1rem;
        margin-top:2rem;
      }
      .cancel-button, .delete-button {
        padding: 0.9rem;
        width: 50%;
        border-radius: 1rem;
        font-size: 1.4rem;
        font-weight: 400;
        cursor: pointer;
      }
      .cancel-button {
        background-color: transparent;
        color: #333;
        border: 0.2rem solid #ccc;
        width:15rem;
      }
      .delete-button {
        background-color: #C3E11D;
        color: black;
        border: none;
      }
    `}</style>
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
