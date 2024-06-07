import { useState } from "react";
import styles from "../../../scss/modules/assessment/questionnaire.module.scss";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { TbExclamationCircle } from "react-icons/tb";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { FaEquals } from "react-icons/fa";

const questions = [
  {
    id: 1,
    question: "What is your favorite color?",
    options: ["Red", "Blue", "Green", "Yellow", "Other"],
  },
  {
    id: 2,
    question: "What is your favorite animal?",
    options: ["Dog", "Cat", "Bird", "Fish", "Other"],
  },
  {
    id: 3,
    question: "What is your favorite food?",
    options: ["Pizza", "Burger", "Pasta", "Salad", "Other"],
  },
  {
    id: 4,
    question: "What is your favorite hobby?",
    options: ["Reading", "Traveling", "Cooking", "Gaming", "Other"],
  },
  {
    id: 5,
    question: "What is your favorite food?",
    options: ["Pizza", "Burger", "Pasta", "Salad", "Other"],
  },
  {
    id: 6,
    question: "What ",
    options: ["Reading", "Traveling", "Cooking", "Gaming", "Other"],
  },
  // Add more questions as needed
];

const Questionnaire = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setAnswers({
      ...answers,
      [name]: value,
    });
  };

  const totalSteps = questions.length;
  const width = `${(100 / (totalSteps - 1)) * (activeStep - 1)}%`;

  return (
    <div className={styles.MainContainer}>
      <div className={styles.header}>
        <p>User Questionnaire</p>
        <button>Exit</button>
      </div>

      <div className={styles.Container}>
        <div className={styles.StepContainer} style={{ "--width": width }}>
          {questions.map((_, index) => (
            <div key={index} className={styles.StepWrapper}>
              <div
                className={`${styles.StepStyle} ${
                  activeStep > index + 1 ? "completed" : ""
                }  ${activeStep === index + 1 ? styles.ActiveStep : ""}`}
              >
                {activeStep > index + 1 ? (
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
        {activeStep === totalSteps && (
          <div className={styles.InitialContianer}>
            <div className={styles.iconContainer}>
              <BsFillCheckCircleFill />
            </div>
            <div className={styles.content}>
              <p className={styles.heading}>Questionnaire Submitted</p>
              <p className={styles.subheading}>
              You have successfully submitted your questionnaire.
              </p>
              <div className={styles.InitialBtn}>
                <button className={styles.ButtonStyleAss}>Start Assessment</button>
              </div>
            </div>
          </div>
        )}
        {showQuestionnaire ? (
          <>
            <div className={styles.QuestionContainer}>
              <p>Organizational Change History</p>
              <p>{questions[activeStep - 1].question}</p>
              <select
                name={`question-${questions[activeStep - 1].id}`}
                value={
                  answers[`question-${questions[activeStep - 1].id}`] || ""
                }
                onChange={handleSelectChange}
                className={styles.InputStyle}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {questions[activeStep - 1].options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.ButtonsContainer}>
              {activeStep > 1 && (
                <button className={styles.ButtonStylePrev} onClick={prevStep}>
                  <MdKeyboardArrowLeft />
                  Previous
                </button>
              )}
              <button className={styles.ButtonStyleNext} onClick={nextStep}>
                Next <MdKeyboardArrowRight />
              </button>
            </div>
          </>
        ) : (
          <div className={styles.InitialContianer}>
            <div className={styles.iconContainer}>
              <FaEquals />
            </div>
            <div className={styles.content}>
              <p className={styles.heading}>User Qurstionnaire</p>
              <p className={styles.subheading}>
                Complete this questionnaire to provide data for personalized
                assessment insights.
              </p>
              <div className={styles.InitialBtn}>
                <button className={styles.ButtonStyleNext}>Skip</button>
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
