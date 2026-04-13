import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
      // Delay start to let page render
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

  // Calculate tooltip position
  let tooltipStyle = {};
  const padding = 12;
  switch (step.position) {
    case 'right':
      tooltipStyle = {
        top: targetRect.top + targetRect.height / 2,
        left: targetRect.right + padding,
        transform: 'translateY(-50%)',
      };
      break;
    case 'bottom':
      tooltipStyle = {
        top: targetRect.bottom + padding,
        left: targetRect.left + targetRect.width / 2,
        transform: 'translateX(-50%)',
      };
      break;
    case 'top':
      tooltipStyle = {
        bottom: window.innerHeight - targetRect.top + padding,
        left: targetRect.left + targetRect.width / 2,
        transform: 'translateX(-50%)',
      };
      break;
    default:
      tooltipStyle = {
        top: targetRect.bottom + padding,
        left: targetRect.left,
      };
  }

  return (
    <>
      {/* Overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 10000,
          pointerEvents: 'auto',
        }}
        onClick={handleSkip}
      />

      {/* Spotlight on target */}
      <div
        style={{
          position: 'fixed',
          top: targetRect.top - 4,
          left: targetRect.left - 4,
          width: targetRect.width + 8,
          height: targetRect.height + 8,
          borderRadius: '8px',
          boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)',
          zIndex: 10001,
          pointerEvents: 'none',
        }}
      />

      {/* Tooltip */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed',
            ...tooltipStyle,
            zIndex: 10002,
            background: '#fff',
            borderRadius: '12px',
            padding: '20px 24px',
            width: '300px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          {/* Step counter */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 500 }}>
              {currentStep + 1} of {TOUR_STEPS.length}
            </span>
            <button
              onClick={handleSkip}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '12px',
                color: '#9ca3af',
                cursor: 'pointer',
                padding: '2px 6px',
              }}
            >
              Skip tour
            </button>
          </div>

          <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#111', marginBottom: '6px' }}>
            {step.title}
          </h4>
          <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.5, marginBottom: '16px' }}>
            {step.content}
          </p>

          {/* Progress dots + Next button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              {TOUR_STEPS.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: i === currentStep ? '16px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    background: i === currentStep ? '#C3E11D' : '#e5e7eb',
                    transition: 'all 0.2s ease',
                  }}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              style={{
                background: '#C3E11D',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 20px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                color: '#111',
              }}
            >
              {isLast ? 'Get Started' : 'Next'}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default OnboardingTour;
