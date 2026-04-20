import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './common.scss';

const TOUR_STEPS = [
  {
    target: '.navlist',
    title: 'Navigation',
    content: 'Use the sidebar to navigate between features. You can collapse it for more space.',
    position: 'right',
  },
  {
    target: '.workspace-btn',
    title: 'Create Workspaces',
    content: 'Workspaces organise your change management projects. Create one to get started.',
    position: 'bottom',
  },
  {
    target: '.navlist a[href*="AiAssistant"]',
    title: 'AI Assistant',
    content: 'Chat with the AI about change management. Upload documents for contextual advice.',
    position: 'right',
  },
  {
    target: '.navlist a[href*="myAssessments"]',
    title: 'Assessments',
    content: '24 assessment types including ADKAR, Stakeholder Maps, and Readiness checks. The AI guides you through questions and generates reports.',
    position: 'right',
  },
  {
    target: '.navlist a[href*="knowledge-base"]',
    title: 'Knowledge Base',
    content: 'Upload your organisation\'s documents to train the AI with your specific context.',
    position: 'right',
  },
  {
    target: '.upgrade-plan',
    title: 'You\'re all set!',
    content: 'Explore the platform and press Ctrl+K anytime to quickly navigate between pages.',
    position: 'top',
  },
];

const STORAGE_KEY = 'changeai_onboarding_completed';

const OnboardingTour = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [targetRect, setTargetRect] = useState(null);

  useEffect(() => {
    const completed = localStorage.getItem(STORAGE_KEY);
    if (!completed) {
      const timer = setTimeout(() => setIsActive(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const updateTargetRect = useCallback(() => {
    if (!isActive || currentStep >= TOUR_STEPS.length) return;
    const step = TOUR_STEPS[currentStep];
    const el = document.querySelector(step.target);
    if (el) {
      const rect = el.getBoundingClientRect();
      setTargetRect(rect);
    } else {
      setTargetRect(null);
    }
  }, [currentStep, isActive]);

  useEffect(() => {
    updateTargetRect();
    window.addEventListener('resize', updateTargetRect);
    return () => window.removeEventListener('resize', updateTargetRect);
  }, [updateTargetRect]);

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    setIsActive(false);
    localStorage.setItem(STORAGE_KEY, 'true');
  };

  if (!isActive || currentStep >= TOUR_STEPS.length || !targetRect) return null;

  const step = TOUR_STEPS[currentStep];
  const isLast = currentStep === TOUR_STEPS.length - 1;

  // Calculate tooltip position as CSS custom properties
  let tooltipVars = {};
  const padding = 12;
  switch (step.position) {
    case 'right':
      tooltipVars = {
        '--tt-top': `${targetRect.top + targetRect.height / 2}px`,
        '--tt-left': `${targetRect.right + padding}px`,
        '--tt-transform': 'translateY(-50%)',
      };
      break;
    case 'bottom':
      tooltipVars = {
        '--tt-top': `${targetRect.bottom + padding}px`,
        '--tt-left': `${targetRect.left + targetRect.width / 2}px`,
        '--tt-transform': 'translateX(-50%)',
      };
      break;
    case 'top':
      tooltipVars = {
        '--tt-bottom': `${window.innerHeight - targetRect.top + padding}px`,
        '--tt-left': `${targetRect.left + targetRect.width / 2}px`,
        '--tt-transform': 'translateX(-50%)',
      };
      break;
    default:
      tooltipVars = {
        '--tt-top': `${targetRect.bottom + padding}px`,
        '--tt-left': `${targetRect.left}px`,
      };
  }

  return (
    <>
      <div className="onboarding-overlay" onClick={handleSkip} />

      <div
        className="onboarding-spotlight"
        style={{
          '--spot-top': `${targetRect.top - 4}px`,
          '--spot-left': `${targetRect.left - 4}px`,
          '--spot-w': `${targetRect.width + 8}px`,
          '--spot-h': `${targetRect.height + 8}px`,
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="onboarding-tooltip"
          style={{
            top: tooltipVars['--tt-top'],
            left: tooltipVars['--tt-left'],
            bottom: tooltipVars['--tt-bottom'],
            transform: tooltipVars['--tt-transform'],
          }}
        >
          <div className="onboarding-tooltip-header">
            <span className="onboarding-tooltip-counter">
              {currentStep + 1} of {TOUR_STEPS.length}
            </span>
            <button onClick={handleSkip} className="onboarding-tooltip-skip">
              Skip tour
            </button>
          </div>

          <h4 className="onboarding-tooltip-title">{step.title}</h4>
          <p className="onboarding-tooltip-content">{step.content}</p>

          <div className="onboarding-tooltip-footer">
            <div className="onboarding-tooltip-dots">
              {TOUR_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`onboarding-tooltip-dot ${i === currentStep ? 'onboarding-tooltip-dot--active' : 'onboarding-tooltip-dot--inactive'}`}
                />
              ))}
            </div>
            <button onClick={handleNext} className="onboarding-tooltip-next-btn">
              {isLast ? 'Get Started' : 'Next'}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default OnboardingTour;
