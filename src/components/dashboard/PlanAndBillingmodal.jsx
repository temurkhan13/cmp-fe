import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BsFillStarFill } from 'react-icons/bs';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import { MdCheck } from 'react-icons/md';

const PlanAndBillingmodal = ({ isOpen, onClose }) => {
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
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <IoClose size={24} />
        </button>
        <div className="pricing-component">
          <div className="plan-billing-tabs">
            <button
              className={selectedTab === 'personal' ? 'active' : ''}
              onClick={() => handleTabChange('personal')}
            >
              Personal
            </button>
            <button
              className={selectedTab === 'business' ? 'active' : ''}
              onClick={() => handleTabChange('business')}
            >
              Business
            </button>
          </div>
          <div className="cards-container">
            {plansData[selectedTab].map((plan, index) => (
              <Card key={index} plan={plan} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .plan-billing-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.3);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background-color: gray;
          color: white;
          padding: 30px;
          // border-radius: 10px;
          position: relative;
          // max-width: 800px;
          width: 100%;
          height:100%;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
        }
        .pricing-component {
          text-align: center;
        }
        .plan-billing-tabs {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        .plan-billing-tabs button {
          background: none;
          border: none;
          color: #fff;
          padding: 10px 20px;
          margin: 0;
          cursor: pointer;
          font-size: 1.4rem;
          // border-bottom: 2px solid transparent;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .plan-billing-tabs button.active {
          border-bottom: 1px solid white;
        }
        .cards-container {
          display: flex;
          justify-content: center;
          gap: 20px;
        }
      `}</style>
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
        <button className="current-plan-button">Your Current Plan</button>
      ) : (
        <button className="upgrade-button">
          {plan.buttonText} <AiOutlineArrowRight />
        </button>
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

      <style>{`
        .plan-billing-card {
          background-color: white;
          border-radius: 1rem;
          width: 40rem;
          height: 45rem;
          text-align: left;
          color: black;
          font-size: 1.4rem;
          padding: 2rem;
          position: relative; /* Added for the limit-apply positioning */
        }
        .plan-billing-card h2 {
          font-size: 24px;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .plan-billing-card p {
          font-size: 18px;
          margin-bottom: 15px;
        }
        .current-plan-button {
          background-color: transparent;
          padding: 10px 20px;
          border: 1px solid gray;
          border-radius: 1rem;
          color: black;
          text-align: center;
          cursor: not-allowed;
          margin-bottom: 10px;
          width: 100%;
        }
        .upgrade-button {
          background-color: #C3E11D;
          color: #00316F;
          padding: 10px 20px;
          border: none;
          border-radius: 1rem;
          cursor: pointer;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          width: 100%;
        }
        .plan-billing-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .plan-billing-card ul li {
          text-align: left;
          margin: 5px 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .limit-apply {
          font-size: 1.2rem !important;
          text-decoration: underline;
          position: absolute;
          bottom: 1rem; /* Adjusted for better positioning */
        }
      `}</style>
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

PlanAndBillingmodal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PlanAndBillingmodal;
