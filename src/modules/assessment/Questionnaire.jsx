import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../scss/modules/assessment/questionnaire.module.scss';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';
import { TbExclamationCircle } from 'react-icons/tb';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import Button from '../../components/common/Button';
import data from '../../data';
import useInspire from '../../hooks/AiFeatureHooks/useInspire';
import InpireMeIcon from '../../assets/inspireBtn.svg';
import { useAddProjectSurveyMutation } from '../../redux/api/workspaceApi';
import { useSelector } from 'react-redux';
import { selectWorkspace } from '../../redux/slices/workspacesSlice';
import { selectSelectedFolder } from '../../redux/slices/folderSlice';

const Questionnaire = ({ handleCloseImproveResponseModal }) => {
  const [AddProjectSurvey] = useAddProjectSurveyMutation();
  const [activeStep, setActiveStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [Questions, setQuestions] = useState('');
  const [submitError, setSubmitError] = useState('');
  const { loading, handleInspire } = useInspire();
  const currentWorkspace = useSelector(selectWorkspace);
  const selectedFolder = useSelector(selectSelectedFolder);
  const workspaceId = currentWorkspace?.id;
  const folderId = selectedFolder?._id || selectedFolder?.id;
  const logAnswers = () => {
    const questionsArray = data.questionnaire.Questions.map((question) => {
      const answer = answers[`question-${question.id}`] || 'No answer provided';
      return {
        question: question.question,
        answer: answer,
      };
    });
    // Now questionsArray will be an array of objects
    setQuestions(questionsArray);
  };

  const handleSubmit = async () => {
    const hasAtLeastOneAnswer = Questions && Questions.some(
      (q) => q.answer && q.answer.trim() && q.answer !== 'No answer provided'
    );
    if (!hasAtLeastOneAnswer) {
      setSubmitError('Please answer at least one question before submitting.');
      return;
    }
    setSubmitError('');
    await AddProjectSurvey({ workspaceId, folderId, survey: Questions });
    handleCloseImproveResponseModal(false);
  };

  const nextStep = () => {
    if (activeStep === totalSteps) {
      setIsSubmitted(true);
      logAnswers();
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const skipStep = () => {
    if (activeStep === totalSteps) {
      setIsSubmitted(true);
      logAnswers();
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };

  const handleTextareaChange = (event) => {
    const { name, value } = event.target;
    setAnswers({
      ...answers,
      [name]: value,
    });
  };

  const handleInspireClick = async () => {
    const currentQuestionKey = `question-${data.questionnaire.Questions[activeStep - 1].id
      }`;
    const inspiredText = await handleInspire(
      data.questionnaire.Questions[activeStep - 1].question
    );
    setAnswers({
      ...answers,
      [currentQuestionKey]: inspiredText,
    });
  };

  const totalSteps = data.questionnaire.Questions.length;
  const width = `${(100 / (totalSteps - 1)) * (activeStep - 1)}%`;

  return (
    <div className={styles.MainContainer}>
      <div className={styles.Container}>
        <div className={styles.StepContainer} style={{ '--width': width }}>
          {data.questionnaire.Questions.map((_, index) => (
            <div key={index} className={styles.StepWrapper}>
              <div
                className={`${styles.StepStyle} ${activeStep > index + 1 || isSubmitted ? 'completed' : ''
                  }  ${activeStep === index + 1 ? styles.ActiveStep : ''}`}
              >
                {activeStep > index + 1 || isSubmitted ? (
                  <div className={styles.CheckMark}>
                    <BsFillCheckCircleFill />
                  </div>
                ) : (
                  <span className={styles.StepCount}></span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.ErrorMessage}>
        <span>
          <TbExclamationCircle />
        </span>
        <p>
          You can customize this assessment once, but you can modify it anytime
          by clicking the Customize button.
        </p>
        <span>
          <IoMdClose />
        </span>
      </div>
      <div className={styles.Questionnaire}>
        {isSubmitted ? (
          <div className={styles.InitialContainer}>
            <div className={styles.iconContainer}>
              <BsFillCheckCircleFill />
            </div>
            <div className={styles.content}>
              <p className={styles.heading}>Questionnaire Submitted</p>
              <p className={styles.subheading}>
                You have successfully submitted your questionnaire.
              </p>
              <div className={styles.InitialBtn}>
                <Button
                  variant="primary"
                  className={styles.ButtonStyleAss}
                  onClick={handleSubmit}
                >
                  Done
                </Button>
              </div>
              {submitError && (
                <p className={styles.submitError}>
                  {submitError}
                </p>
              )}
            </div>
          </div>
        ) : showQuestionnaire ? (
          <>
            <div className={styles.QuestionContainer}>
              <p>Organizational Change History</p>
              <p>{data.questionnaire.Questions[activeStep - 1].question}</p>
              <div className={styles.textareaWrapper}>
                <textarea
                  name={`question-${data.questionnaire.Questions[activeStep - 1].id
                    }`}
                  value={
                    answers[
                    `question-${data.questionnaire.Questions[activeStep - 1].id
                    }`
                    ] || ''
                  }
                  rows={7}
                  onChange={handleTextareaChange}
                  className={`${styles.InputStyle} ${styles.textareaInput}`}
                />
                <div className={styles.inspireContainer}>
                  <img
                    src={InpireMeIcon}
                    alt="Inspire Me"
                    onClick={handleInspireClick}
                  />
                  {loading && (
                    <div className={styles.inspireSpinner} />
                  )}
                </div>
              </div>
            </div>

            <div className={styles.ButtonsContainer}>
              {activeStep > 1 && (
                <Button
                  variant="secondary"
                  className={styles.ButtonStylePrev}
                  iconLeft={<MdKeyboardArrowLeft />}
                  onClick={prevStep}
                >
                  Previous
                </Button>
              )}
              <Button
                variant="primary"
                className={styles.ButtonStyleNext}
                iconRight={<MdKeyboardArrowRight />}
                onClick={nextStep}
              >
                Next
              </Button>
              <Button
                variant="primary"
                className={styles.ButtonStyleNext}
                disabled={
                  !!answers[
                  `question-${data.questionnaire.Questions[activeStep - 1].id
                  }`
                  ]
                }
                onClick={skipStep}
              >
                Skip
              </Button>
            </div>
          </>
        ) : (
          <div className={styles.InitialContainer}>
            <div className={styles.iconContainer}>
              <FaEquals />
            </div>
            <div className={styles.content}>
              <p className={styles.heading}>User Questionnaire</p>
              <p className={styles.subheading}>
                Complete this questionnaire to provide data for personalized
                assessment insights.
              </p>
              <div className={styles.InitialBtn}>
                <Button
                  variant="primary"
                  className={styles.ButtonStyleNext}
                  onClick={() => setShowQuestionnaire(true)}
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
Questionnaire.propTypes = {
  handleCloseImproveResponseModal: PropTypes.func.isRequired,
};
export default Questionnaire;
