import { useState } from 'react';
import PropTypes from 'prop-types';

const FeedbackComponent = ({ welcomeNote, radioOptions }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(null);

  const handleRadioChange = (option) => {
    if (selectedOption === option) {
      // Deselect the radio button and close its checkboxes
      setSelectedOption(null);
      setSelectedCheckboxes({});
    } else {
      // Select the new radio button and clear checkboxes
      setSelectedOption(option);
      setSelectedCheckboxes({});
    }
  };

  const handleCheckboxChange = (checkbox) => {
    setSelectedCheckboxes((prevState) => ({
      ...prevState,
      [checkbox]: !prevState[checkbox],
    }));
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleRatingClick = (number) => {
    setRating(number);
  };

  const handleSubmit = () => {
    console.log('Selected Option:', selectedOption);
    console.log('Selected Checkboxes:', selectedCheckboxes);
    console.log('Feedback:', feedback);
    console.log('Rating:', rating);
  };

  return (
    <div className="feedback-component">
      <p className="welcome-heading">{welcomeNote}</p>
      <div className="rating">
        <p className="rating-heading">
          How do you rate the quality of our product?
        </p>
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
                      className="checkbox-input"
                      checked={selectedCheckboxes[checkbox] || false}
                      onChange={() => handleCheckboxChange(checkbox)}
                    />
                    {checkbox}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mood-section">
          {/* <div className="face-moods">
            <CiFaceSmile
              className={`face-icon ${mood === 'smile' ? 'active-smile' : ''}`}
              onClick={() => handleMoodClick('smile')}
            />
            <CiFaceMeh
              className={`face-icon ${mood === 'meh' ? 'active-meh' : ''}`}
              onClick={() => handleMoodClick('meh')}
            />
            <CiFaceFrown
              className={`face-icon ${mood === 'frown' ? 'active-frown' : ''}`}
              onClick={() => handleMoodClick('frown')}
            />
          </div> */}
          <label className="feedback-label">Your Feedback</label>
          <textarea
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder="Write your views here..."
          />
        </div>
        <div className="submit-btn">
          <button type="button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
      <style>{`
        .feedback-component {
          padding: 2rem 0;
          border-radius: 0.5rem;
          max-width: 80rem;
          margin: 0 auto;
          user-select: none;
        }
        .welcome-heading {
          font-size: 3rem;
          font-weight: 500;
          margin-bottom: 1.25rem;
        }
        .rating-heading {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        .face-moods {
          display: flex;
          gap: 0.625rem;
          margin-bottom: 1.25rem;
        }
        .face-icon {
          cursor: pointer;
          font-size: 5rem;
          padding: 0.5rem;
          background-color: #ddd;
          border-radius: 50%;
          transition: all 0.2s linear;
        }
        .active-smile, .active-meh, .active-frown {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          width: 5rem;
          height: 5rem;
        }
        .active-smile { background-color: lightgreen; }
        .active-meh { background-color: #FFDBBB; }
        .active-frown { background-color: #FF474D; }
        .rating {
          margin-bottom: 2rem;
        }
        .rating-number {
          margin: 0 0.5rem;
          cursor: pointer;
          padding: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          width: 5rem;
          height: 5rem;
          font-size: 2rem;
          background-color: #ddd;
          transition: background-color 0.3s, color 0.3s, border-radius 0.3s;
        }
        .rating-numbers {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .rating-number:hover {
          background-color: #ccc;
        }
        .active-rating-1, .active-rating-2, .active-rating-3, .active-rating-4, .active-rating-5 {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          width: 5rem;
          height: 5rem;
        }
        .active-rating-1 { background-color: #FF474D; }
        .active-rating-2 { background-color: lightcoral; }
        .active-rating-3 { background-color: orange; }
        .active-rating-4 { background-color: #FFDBBB; }
        .active-rating-5 { background-color: lightgreen; }
        form {
          display: flex;
          flex-direction: column;
        }
        .radio-option {
          margin-bottom: 1.25rem;
        }
        .checkbox-group {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s ease, opacity 0.3s ease;
          opacity: 0;
        }
        .checkbox-group.show {
          max-height: 14rem; /* Adjust based on your content */
          opacity: 1;
        }
        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-left: 3rem;
          font-size: 1.5rem;
        }
        .mood-section {
          margin-bottom: 1.25rem;
        }
        .feedback-label {
          font-size: 1.3rem;
          font-weight: 500;
        }
        textarea {
          width: 100%;
          height: 10rem;
          margin-top: 0.5rem;
          padding: 0.625rem;
          border: 0.0625rem solid #ccc;
          border-radius: 0.625rem;
          outline: none;
        }
        button {
          padding: 1rem 1.25rem;
          background-color: #C3E11D;
          color: #0B1444;
          font-size: 1.6rem;
          font-weight: 600;
          border: none;
          border-radius: 0.625rem;
          cursor: pointer;
          width: 15rem;
        }
        .submit-btn {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        button:hover {
          background-color: #b5cd19;
        }
        .radio-label {
          display: flex;
          align-items: center;
          cursor: pointer;
          gap: 1rem;
          font-size: 1.5rem;
        }
      `}</style>
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
