import PropTypes from "prop-types";
import Button from "../common/Button";

const StartAssessmentPopup = ({ data, showStartAssessment }) => {
  return (
    <div className="assessmentPopupContainer">
      <p>{data}</p>
      <p>
        Evaluate the key aspects of a change initiative: objectives, benefits,
        risks, and success metrics.
      </p>
      <Button variant="primary" onClick={() => showStartAssessment(true)}>
        Start Assessment
      </Button>
    </div>
  );
};

StartAssessmentPopup.propTypes = {
  data: PropTypes.string.isRequired,
  showStartAssessment: PropTypes.func.isRequired,
};

export default StartAssessmentPopup;
