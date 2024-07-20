import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const steps = [
  {
    question: 'Welcome! Your feedback will help us improve. Ready to start?',
    isIntro: true,
  },
  {
    question: 'What did you like about our service?',
    placeholder: 'Enter your feedback here...',
    isIntro: false,
  },
  {
    question: 'What can we do to improve?',
    placeholder: 'Enter your suggestions here...',
    isIntro: false,
  },
  {
    question: 'What can we do to improve?',
    placeholder: 'Enter your suggestions here...',
    isIntro: false,
  },
  {
    question: 'What can we do to improve?',
    placeholder: 'Enter your suggestions here...',
    isIntro: false,
  },
  {
    question: 'What can we do to improve?',
    placeholder: 'Enter your suggestions here...',
    isIntro: false,
  },
  {
    question: 'What can we do to improve?',
    placeholder: 'Enter your suggestions here...',
    isIntro: false,
  },
  {
    question: 'What can we do to improve?',
    placeholder: 'Enter your suggestions here...',
    isIntro: false,
  },
  {
    question: 'What can we do to improve?',
    placeholder: 'Enter your suggestions here...',
    isIntro: false,
  },
  // Add more steps as needed
];

const FeedbackComp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAnswerChange = (e) => {
    setAnswers({ ...answers, [currentStep]: e.target.value });
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Submitted answers:', answers);
  };

  return (
    <div className="feedback-container">
      <div
        className="feedback-step"
        style={{ transform: `translateX(-${currentStep * 100}%)` }}
      >
        {steps.map((step, index) => (
          <div key={index} className="feedback-step-content">
            {index === currentStep && (
              <>
                {step.isIntro ? (
                  <div className="intro-content">
                    <p>{step.question}</p>
                    {currentStep === 0 && (
                      <button onClick={handleNext} className="start-button">
                        Start
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="question-content">
                    <p>{step.question}</p>
                    <textarea
                      value={answers[currentStep] || ''}
                      onChange={handleAnswerChange}
                      placeholder={step.placeholder || ''}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
      <div className="feedback-navigation">
        <button onClick={handlePrevious} disabled={currentStep === 0}>
          <FaArrowLeft />
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
        >
          <FaArrowRight />
        </button>
      </div>
      {currentStep === steps.length - 1 && (
        <div className="btn-sub">
          <button onClick={handleSubmit} className="submit-button">
            Submit
          </button>
        </div>
      )}
      <style>{`
        .feedback-container {
          position: relative;
          width: 80%;
          top:10rem;
          margin: 0 auto;
          overflow: hidden;
        }
        .feedback-step {
          display: flex;
          transition: transform 0.3s ease-in-out;
        }
        .feedback-step-content {
          min-width: 100%;
          box-sizing: border-box;
        }
        .intro-content,
        .question-content {
          padding: 20px;
          text-align: center;
          font-size:2rem;
          background-color: #f2f9cf;
          border-radius: 1rem;
        }
        .start-button,
        .submit-button {
          margin-top: 20px;
          padding: 10px 20px;
          font-size: 1.6rem;
          font-weight: 500;
          cursor: pointer;
          color:#0B1444;
          border: none;
          outline: none;
          background-color: #C3E11D;
          border-radius: 0.5rem;
          transition: background-color 0.3s ease-in-out;
        }
        .btn-sub {
          display: flex;
          align-items: flex-end;
          justify-content: end;
        }
        .feedback-navigation {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }
        .feedback-navigation button {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 24px;
          padding: 10px;
        }
        .feedback-navigation button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        textarea {
          width: 100%;
          height: 100px;
          margin-top: 10px;
          padding: 10px;
          border: none;
          outline: none;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

FeedbackComp.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      isIntro: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default FeedbackComp;
