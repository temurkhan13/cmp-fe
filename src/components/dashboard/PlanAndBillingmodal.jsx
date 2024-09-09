import PropTypes from 'prop-types';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ChoosePlan = ({ plans, selectedPlan, onSelectPlan }) => {
  const navigate = useNavigate();
  return (
    <div className="choose-plan">
      <h2>Compare our plans and find yours</h2>
      <p>Choose the payment plan that best suits your requirements.</p>
      <div className="toggle">
        <button
          className={selectedPlan === 'monthly' ? 'active' : ''}
          onClick={() => onSelectPlan('monthly')}
        >
          Monthly
        </button>
        <button
          className={selectedPlan === 'yearly' ? 'active' : ''}
          onClick={() => onSelectPlan('yearly')}
        >
          Yearly
        </button>
      </div>
      <div className="plans">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`plan ${plan.highlighted ? 'highlighted' : ''}`}
          >
            <h3>{plan.name}</h3>
            <p>{plan.description}</p>
            <div className="price">
              <span>
                {selectedPlan === 'monthly'
                  ? plan.monthlyPrice
                  : plan.yearlyPrice}
              </span>{' '}
              / {selectedPlan}
            </div>
            <button
              className={`get-started ${
                index === 1 ? 'black-btn' : 'white-btn'
              }`}
              onClick={() => {
                navigate('/check-out');
              }}
            >
              Get Started
            </button>
            <div className="includes">
              <h4>Includes</h4>
              {plan.features.map((feature, i) => (
                <p key={i}>
                  <FaCheckCircle className="icon" /> {feature}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .choose-plan {
          text-align: start;
        }
        .toggle {
          display: flex;
          justify-content: center;
          margin-bottom: 10px;
        }
        .toggle button {
          padding: 10px 20px;
          border: none;
          background: none;
          cursor: pointer;
          font-size: 16px;
        }
        .toggle .active {
          font-weight: bold;
          background: #f0f0f0;
          border-radius: 20px;
        }
        .plans {
          display: flex;
          justify-content: center;
          gap: 20px;
        }
        .plan {
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 20px;
          width: 300px;
          background-color: #ffffff;
        }
        .plan.highlighted {
          background-color: #9b59b6;
          color: #fff;
        }
        .price {
          font-size: 24px;
          margin: 10px 0;
        }
        .get-started {
          padding: 10px;
          border: 1px solid black;
          cursor: pointer;
          width: 100%;
          border-radius: 0.8rem;
          transition: background-color 0.3s ease;
        }
        .white-btn {
          background-color: #fff;
          color: #000;
        }
        .black-btn {
          background-color: #000;
          color: #fff;
        }
        .black-btn:hover {
          background-color: #fff;
          color: #000;
          border: 1px solid #000;
        }
        .includes h4 {
          margin-top: 10px;
        }
        .includes p {
          display: flex;
          align-items: center;
        }
        .includes p .icon {
          margin-right: 10px;
          font-size: 16px; 
        }
      `}</style>
    </div>
  );
};

ChoosePlan.propTypes = {
  plans: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      monthlyPrice: PropTypes.string.isRequired,
      yearlyPrice: PropTypes.string.isRequired,
      features: PropTypes.arrayOf(PropTypes.string).isRequired,
      highlighted: PropTypes.bool,
    })
  ).isRequired,
  selectedPlan: PropTypes.oneOf(['monthly', 'yearly']).isRequired,
  onSelectPlan: PropTypes.func.isRequired,
};

export default ChoosePlan;
