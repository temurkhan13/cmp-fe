import { useState } from 'react';
import PropTypes from 'prop-types';

import { SiVisa } from 'react-icons/si';
import { AiOutlineClose } from 'react-icons/ai';

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
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <AiOutlineClose />
        </button>
        <h2 className="modal-title">Add Card Details</h2>
        <hr style={{ marginBottom: '2rem' }} />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
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
              <span className="error">{errors.cardHolderName}</span>
            )}
          </div>
          <div className="form-group card-number-group">
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
              <span className="error">{errors.cardNumber}</span>
            )}
          </div>
          <div className="form-row">
            <div className="form-group">
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
                <span className="error">{errors.expiryDate}</span>
              )}
            </div>
            <div className="form-group">
              <label>CVC</label>
              <input
                type="text"
                name="cvc"
                value={formData.cvc}
                onChange={handleInputChange}
                placeholder="CVC"
                required
              />
              {errors.cvc && <span className="error">{errors.cvc}</span>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
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
                <span className="error">{errors.country}</span>
              )}
            </div>
            <div className="form-group">
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
                <span className="error">{errors.zipCode}</span>
              )}
            </div>
          </div>
          <div className="button-group">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="add-button">
              Add Card
            </button>
          </div>
        </form>
      </div>
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: white;
          padding: 1.5rem;
          border-radius: 0.5rem;
          position: relative;
        }
        .close-button {
          position: absolute;
          top: 1rem;
          right: 1rem;
          border: none;
          cursor: pointer;
          font-size:1.5rem;
          background-color:lightgray;
          display:flex;
          padding:0.2rem;
          border-radius:50%;
        }
        .modal-title {
          margin: 0 0 1rem;
          font-size: 1.5rem;
          font-weight: bold;
        }
        .form-group {
          margin-bottom: 1rem;
          position: relative;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 1.3rem;
          font-weight: 500;
        }
        .form-group input,
        .form-group select {
          width: 100%;
          outline: none;
          padding: 1rem;
          font-size: 1.2rem;
          border: 1px solid #ddd;
          border-radius: 1rem;
        }
        .form-row {
          display: flex;
          gap: 1rem;
        }
        .form-row .form-group {
          width: 50%;
        }
        .button-group {
          display: flex;
          justify-content: space-between;
          margin-top: 1.5rem;
          gap: 1rem;
        }
        .cancel-button {
          background-color: #fff;
          border: 1px solid #000;
          color: #000;
          border-radius: 1rem;
          cursor: pointer;
          font-size: 1.3rem;
          width: 50%;
          transition: background-color 0.3s ease;
        }
        .cancel-button:hover {
          background-color: #f0f0f0;
        }
        .add-button {
          background-color: #c4ff00;
          border: none;
          color: #000;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          cursor: pointer;
          font-size: 1.3rem;
          width: 50%;
          transition: background-color 0.3s ease;
        }
        .add-button:hover {
          background-color: #a9ff00;
        }
        .visa-icon {
          position: absolute;
          top: 55%;
          right: 10px;
          
          transform: translateY(-10%);
          color:#051244;
        }
        .error {
          color: red;
          font-size: 1rem;
          margin-top: 0.5rem;
        }
      `}</style>
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
