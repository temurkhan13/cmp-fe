import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BsFillStarFill } from 'react-icons/bs';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import { MdCheck } from 'react-icons/md';
import Button from '../common/Button';

const PlanAndBillingModal = ({ isOpen, onClose }) => {
  const [selectedTab, setSelectedTab] = useState('personal');

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const plansData = {
    personal: [
      {
        title: 'Free',
        price: '£0/month',
        description: 'Your current plan',
        features: [
          'Unlimited Queries: 1,000 AI words max per query.',
          '2 Modules: 1,000 AI words each.',
          '1 Project: 1,000 AI words max.',
          'PDF Export: With ChangeAI branding.',
          'AI Words: 2,000 monthly (up to 3,000).',
        ],
        buttonText: 'Your current plan',
        isCurrentPlan: true,
      },
      {
        title: 'Starter',
        price: '£29/month',
        buttonText: 'Upgrade to Plus',
        features: [
          'Unlimited: 30,000 AI words.',
          'Projects: 2 Assessments, 2 Playbooks.',
          'Users: 3 users, 2 workspaces.',
          'Export: PPT, Word, Excel, PDF (no watermark).',
          'Design: Icons, images, shapes, tables.',
          'Monthly Limit: 30,000 AI words, Email support.`',
        ],
        isCurrentPlan: false,
      },
    ],
    business: [
      {
        title: 'Business',
        price: '£49/month*',
        buttonText: 'Upgrade to Team',
        features: [
          'AI Usage: 60,000 words/month.',
          'Projects: 5 assessments, 5 playbooks, export no watermark.',
          'Data: Restore history/data up to 30 days.',
          'Editing: Full access to layouts, icons, images, and tables.',
          'Regenerate: Instant AI response refresh.',
          'Support: Priority, 5 users, 3 workspaces.',
        ],
        isCurrentPlan: false,
      },
    ],
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  if (!isOpen) return null;

  return (
    <div className="plan-billing-modal-overlay">
      <div className="plan-billing-modal-content">
        <Button
          variant="icon"
          ariaLabel="Close"
          className="plan-billing-modal-close"
          onClick={onClose}
        >
          <IoClose size={24} />
        </Button>
        <div className="plan-billing-pricing">
          <div className="plan-billing-tabs">
            <Button
              variant="toggle"
              active={selectedTab === 'personal'}
              className={selectedTab === 'personal' ? 'active' : ''}
              onClick={() => handleTabChange('personal')}
            >
              Personal
            </Button>
            <Button
              variant="toggle"
              active={selectedTab === 'business'}
              className={selectedTab === 'business' ? 'active' : ''}
              onClick={() => handleTabChange('business')}
            >
              Business
            </Button>
          </div>
          <div className="plan-billing-cards">
            {plansData[selectedTab].map((plan, index) => (
              <Card key={index} plan={plan} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({ plan }) => {
  return (
    <div className="plan-billing-card">
      <p>
        <BsFillStarFill size={16} /> {plan.title}
      </p>
      <p>{plan.price}</p>
      {plan.isCurrentPlan ? (
        <Button
          variant="secondary"
          className="plan-billing-current-plan-btn"
          disabled
        >
          Your Current Plan
        </Button>
      ) : (
        <Button
          variant="primary"
          className="plan-billing-upgrade-btn"
          iconRight={<AiOutlineArrowRight />}
        >
          {plan.buttonText}
        </Button>
      )}
      <ul>
        {plan.features.map((feature, idx) => (
          <li key={idx}>
            <MdCheck size={16} />
            {feature}
          </li>
        ))}
      </ul>

      <p className="limit-apply">Limits Apply</p>
    </div>
  );
};

Card.propTypes = {
  plan: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    isCurrentPlan: PropTypes.bool,
    description: PropTypes.string,
  }).isRequired,
};

PlanAndBillingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PlanAndBillingModal;
