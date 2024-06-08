import PropTypes from "prop-types";

const StartAssessmentPopup = ({ data, showStartAssessment }) => {
  return (
    <div className="assessmentPopupContainer">
      <p>{data}</p>
      <p>
        Evaluate the key aspects of a change initiative: objectives, benefits,
        risks, and success metrics.
      </p>
      <button onClick={() => showStartAssessment(true)}>Start Assessment</button>
    </div>
  );
};

StartAssessmentPopup.propTypes = {
  data: PropTypes.string.isRequired,
  showStartAssessment: PropTypes.func.isRequired,
};

export default StartAssessmentPopup;
