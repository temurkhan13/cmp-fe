import { useState } from 'react';
import styles from '../../../scss/modules/assessment/questionnaire.module.scss';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';
import { TbExclamationCircle } from 'react-icons/tb';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import data from '../../data';
import useInspire from '../../hooks/AiFeatureHooks/useInspire';
import InpireMeIcon from '../../assets/inspireBtn.svg';
import { useAddProjectSurveyMutation } from '../../redux/api/workspaceApi';
import { useDispatch, useSelector } from 'react-redux';

const Questionnaire = () => {
  const [AddProjectSurvey] = useAddProjectSurveyMutation();
  const [activeStep, setActiveStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [Questions, setQuestions] = useState('');
  const { loading, handleInspire } = useInspire();
  const dispatch = useDispatch();
  const workspaceId = useSelector(
    (state) => state.workspaces.currentWorkspaceId
  );
  const folderId = useSelector((state) => state.workspaces.currentFolderId);

  const logAnswers = () => {
    let questionnaireString = '';

    data.questionnaire.Questions.forEach((question, index) => {
      const answer = answers[`question-${question.id}`] || 'No answer provided';
      questionnaireString += `${index + 1}. ${
        question.question
      }\nAnswer: ${answer}\n`;
      setQuestions(questionnaireString);
    });
  };

  const handleSubmit = () => {
    console.log('Survey: ', Questions);
    dispatch(AddProjectSurvey(workspaceId, folderId, { survey: Questions }));
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
    const currentQuestionKey = `question-${
      data.questionnaire.Questions[activeStep - 1].id
    }`;
    const inspiredText = await handleInspire(answers[currentQuestionKey]);
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
                className={`${styles.StepStyle} ${
                  activeStep > index + 1 || isSubmitted ? 'completed' : ''
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
                <button
                  className={styles.ButtonStyleAss}
                  onClick={handleSubmit}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        ) : showQuestionnaire ? (
          <>
            <div className={styles.QuestionContainer}>
              <p>Organizational Change History</p>
              <p>{data.questionnaire.Questions[activeStep - 1].question}</p>
              <div style={{ position: 'relative' }}>
                <textarea
                  name={`question-${
                    data.questionnaire.Questions[activeStep - 1].id
                  }`}
                  value={
                    answers[
                      `question-${
                        data.questionnaire.Questions[activeStep - 1].id
                      }`
                    ] || ''
                  }
                  onChange={handleTextareaChange}
                  className={styles.InputStyle}
                  style={{ height: '150px' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={InpireMeIcon}
                    alt="Inspire Me"
                    onClick={handleInspireClick}
                  />
                  {loading && (
                    <div
                      style={{
                        border: '2px solid rgba(0, 0, 0, 0.1)',
                        borderTop: '2px solid #000',
                        borderRadius: '50%',
                        width: '16px',
                        height: '16px',
                        animation: 'spin 1s linear infinite',
                        marginLeft: '8px',
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className={styles.ButtonsContainer}>
              {activeStep > 1 && (
                <button className={styles.ButtonStylePrev} onClick={prevStep}>
                  <MdKeyboardArrowLeft />
                  Previous
                </button>
              )}
              <button
                className={styles.ButtonStyleNext}
                onClick={nextStep}
                disabled={
                  !!answers[
                    `question-${
                      data.questionnaire.Questions[activeStep - 1].id
                    }`
                  ]
                }
              >
                Next <MdKeyboardArrowRight />
              </button>
              <button
                className={styles.ButtonStyleNext}
                onClick={skipStep}
                disabled={
                  !!answers[
                    `question-${
                      data.questionnaire.Questions[activeStep - 1].id
                    }`
                  ]
                }
              >
                Skip
              </button>
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
                <button
                  className={styles.ButtonStyleNext}
                  onClick={() => setShowQuestionnaire(true)}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;
