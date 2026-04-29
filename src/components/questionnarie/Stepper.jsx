// src/components/Stepper.js
// import './Stepper.scss';

const Stepper = ({ currentStep, totalSteps }) => {
  return (
    <div className="stepper">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`step ${index === currentStep ? 'active' : ''}`}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
