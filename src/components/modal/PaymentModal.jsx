import { useState } from 'react';
import PropTypes from 'prop-types';

import { SiVisa } from 'react-icons/si';
import { AiOutlineClose } from 'react-icons/ai';
import Button from '../common/Button';

const countries = [
  { code: 'US', name: 'United States 🇺🇸' },
  { code: 'CA', name: 'Canada 🇨🇦' },
  { code: 'GB', name: 'United Kingdom 🇬🇧' },
  { code: 'AU', name: 'Australia 🇦🇺' },
  { code: 'DE', name: 'Germany 🇩🇪' },
  { code: 'FR', name: 'France 🇫🇷' },
  { code: 'IN', name: 'India 🇮🇳' },
  { code: 'JP', name: 'Japan 🇯🇵' },
  { code: 'CN', name: 'China 🇨🇳' },
  { code: 'BR', name: 'Brazil 🇧🇷' },
  // Add more countries as needed
];

const PaymentModal = ({ onClose, details }) => {
  const [formData, setFormData] = useState({
    cardHolderName: details?.cardHolderName || '',
    cardNumber: details?.cardNumber || '',
    expiryDate: details?.expiryDate || '',
    cvc: details?.cvc || '',
    country: details?.country || '',
    zipCode: details?.zipCode || '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateFields = () => {
    const newErrors = {};
    const { cardHolderName, cardNumber, expiryDate, cvc, country, zipCode } =
      formData;

    if (!cardHolderName)
      newErrors.cardHolderName = 'Card Holder Name is required';
    if (!cardNumber || !/^\d{4} \d{4} \d{4} \d{4}$/.test(cardNumber))
      newErrors.cardNumber = 'Invalid card number format';
    if (!expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate))
      newErrors.expiryDate = 'Invalid expiry date format';
    if (!cvc || !/^\d{3,4}$/.test(cvc)) newErrors.cvc = 'Invalid CVC';
    if (!country) newErrors.country = 'Country is required';
    if (!zipCode) newErrors.zipCode = 'Zip Code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      // Logic to add payment method
      onClose(); // Close the modal after form submission
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="payment-modal-overlay" onClick={handleOverlayClick}>
      <div className="payment-modal-content">
        <Button
          variant="icon"
          ariaLabel="Close"
          className="payment-modal-close"
          onClick={onClose}
        >
          <AiOutlineClose />
        </Button>
        <h2 className="payment-modal-title">Add Card Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="payment-modal-form-group">
            <label>Card Holder Name</label>
            <input
              type="text"
              name="cardHolderName"
              value={formData.cardHolderName}
              onChange={handleInputChange}
              placeholder="Enter name"
              required
            />
            {errors.cardHolderName && (
              <span className="payment-modal-error">{errors.cardHolderName}</span>
            )}
          </div>
          <div className="payment-modal-form-group card-number-group">
            <label>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="XXXX - XXXX - XXXX - XXXX"
              required
            />
            <SiVisa className="visa-icon" size={24} />
            {errors.cardNumber && (
              <span className="payment-modal-error">{errors.cardNumber}</span>
            )}
          </div>
          <div className="payment-modal-form-row">
            <div className="payment-modal-form-group">
              <label>Expiry Date</label>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                required
              />
              {errors.expiryDate && (
                <span className="payment-modal-error">{errors.expiryDate}</span>
              )}
            </div>
            <div className="payment-modal-form-group">
              <label>CVC</label>
              <input
                type="text"
                name="cvc"
                value={formData.cvc}
                onChange={handleInputChange}
                placeholder="CVC"
                required
              />
              {errors.cvc && <span className="payment-modal-error">{errors.cvc}</span>}
            </div>
          </div>
          <div className="payment-modal-form-row">
            <div className="payment-modal-form-group">
              <label>Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              >
                <option value="">Select country</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
              {errors.country && (
                <span className="payment-modal-error">{errors.country}</span>
              )}
            </div>
            <div className="payment-modal-form-group">
              <label>Zip Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                placeholder="Zip Code"
                required
              />
              {errors.zipCode && (
                <span className="payment-modal-error">{errors.zipCode}</span>
              )}
            </div>
          </div>
          <div className="payment-modal-button-group">
            <Button
              variant="secondary"
              size="sm"
              className="payment-modal-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="payment-modal-add-btn"
            >
              Add Card
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

PaymentModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  details: PropTypes.shape({
    cardHolderName: PropTypes.string,
    cardNumber: PropTypes.string,
    expiryDate: PropTypes.string,
    cvc: PropTypes.string,
    country: PropTypes.string,
    zipCode: PropTypes.string,
  }),
};

export default PaymentModal;
