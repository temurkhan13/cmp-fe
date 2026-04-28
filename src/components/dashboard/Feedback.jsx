import { useState } from 'react';
import PropTypes from 'prop-types';
import { useAddFeedbackMutation } from '../../redux/api/workspaceApi';
import commonModal from '../../components/common/Modal';
import Button from '../common/Button';
const FeedbackComponent = ({ welcomeNote, radioOptions }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
  const [feedbackText, setFeedback] = useState('');
  const [rating, setRating] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Mutation hook
  const [addFeedback, { isLoading, isError, isSuccess }] =
    useAddFeedbackMutation();

  const handleRadioChange = (option) => {
    setSelectedOption(option);
    setSelectedCheckboxes({});
    setFormErrors((prev) => ({ ...prev, selectedOption: null }));
  };

  const handleCheckboxChange = (checkbox) => {
    setSelectedCheckboxes((prev) => ({
      ...prev,
      [checkbox]: !prev[checkbox],
    }));
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleRatingClick = (number) => {
    setRating(number);
    setFormErrors((prev) => ({ ...prev, rating: null }));
  };

  const validateForm = () => {
    const errors = {};
    if (!rating) errors.rating = 'Please select a rating';
    if (!selectedOption) errors.selectedOption = 'Please select an option';
    if (!feedbackText) errors.feedbackText = 'Please enter your feedback';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const feedbackData = {
      rating,
      category: {
        name: selectedOption,
        subcategories: radioOptions
          .find((option) => option.label === selectedOption)
          ?.checkboxes.map((checkbox) => ({
            name: checkbox,
            selected: !!selectedCheckboxes[checkbox],
          })),
      },
      feedbackText,
    };

    try {
      await addFeedback(feedbackData).unwrap();
      setModalMessage('Feedback submitted successfully!');
      setFeedback('');
      setRating('');
      setSelectedCheckboxes('');
      setSelectedOption('');
    } catch (error) {
      setModalMessage('Error submitting feedback. Please try again.');
    } finally {
      setShowModal(true);
    }
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="feedback-component">
      <p className="welcome-heading">{welcomeNote}</p>
      <div className="rating">
        <p className="rating-heading">
          How do you rate the quality of our product?
        </p>
        <div className="feedback-rating-row">
          <span className="feedback-rating-label">Poor</span>
          <div className="rating-numbers">
            {[1, 2, 3, 4, 5].map((number) => (
              <div
                key={number}
                className={`rating-number ${
                  rating === number ? `active-rating-${number}` : ''
                }`}
                onClick={() => handleRatingClick(number)}
              >
                {number}
              </div>
            ))}
          </div>
          <span className="feedback-rating-label">Excellent</span>
        </div>
        {formErrors.rating && <p className="error-text">{formErrors.rating}</p>}
      </div>
      <form>
        <div className="radio-option">
          {radioOptions.map((option) => (
            <div key={option.label} className="radio-option">
              <label className="radio-label">
                <input
                  type="radio"
                  name="feedbackOption"
                  value={option.label}
                  checked={selectedOption === option.label}
                  onChange={() => handleRadioChange(option.label)}
                />
                {option.label}
              </label>
              <div
                className={`checkbox-group ${
                  selectedOption === option.label ? 'show' : ''
                }`}
              >
                {option.checkboxes.map((checkbox) => (
                  <label key={checkbox} className="checkbox-label">
                    <input
                      type="checkbox"
                      name={checkbox}
                      checked={selectedCheckboxes[checkbox] || false}
                      onChange={() => handleCheckboxChange(checkbox)}
                    />
                    {checkbox}
                  </label>
                ))}
              </div>
            </div>
          ))}
          {formErrors.selectedOption && (
            <p className="error-text">{formErrors.selectedOption}</p>
          )}
        </div>
        <div className="mood-section">
          <label className="feedback-label">Your Feedback</label>
          <textarea
            value={feedbackText}
            name="feedbackText"
            onChange={handleFeedbackChange}
            placeholder="Write your views here..."
          />
          {formErrors.feedbackText && (
            <p className="error-text">{formErrors.feedbackText}</p>
          )}
        </div>
        <div className="submit-btn">
          <Button
            variant="primary"
            onClick={handleSubmit}
            loading={isLoading}
          >
            Submit
          </Button>
        </div>
      </form>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

FeedbackComponent.propTypes = {
  welcomeNote: PropTypes.string.isRequired,
  radioOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      checkboxes: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};

export default FeedbackComponent;
