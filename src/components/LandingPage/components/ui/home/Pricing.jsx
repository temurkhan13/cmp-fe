import { useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    period: '',
    description: 'Get started with AI-powered change management',
    features: [
      'AI Assistant (limited)',
      '3 Assessments per month',
      '1 Digital Playbook',
      '1 Workspace',
      'PDF Export',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '\u00A349',
    period: '/month',
    description: 'For change management professionals',
    features: [
      'Unlimited AI Assistant',
      'Unlimited Assessments',
      'Unlimited Digital Playbooks',
      '5 Workspaces',
      'All Export Formats (PDF, Word, PPT, Excel)',
      'RAG Document Upload',
      'Priority Support',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For organisations with advanced needs',
    features: [
      'Everything in Professional',
      'Unlimited Workspaces',
      'Custom AI Training',
      'SSO & Team Management',
      'Dedicated Account Manager',
      'Custom Integrations',
      'SLA Guarantee',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <section className="pricing-section">
      <h2 className="pricing-heading">
        Simple, Transparent Pricing
      </h2>
      <p className="pricing-subheading">
        Choose the plan that fits your change management needs
      </p>

      <div className="pricing-grid">
        {plans.map((plan, index) => (
          <div
            key={plan.name}
            className={`pricing-card ${plan.highlighted ? 'pricing-card--highlighted' : ''}`}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            {plan.highlighted && (
              <div className="pricing-badge">
                Most Popular
              </div>
            )}
            <h3 className="pricing-plan-name">{plan.name}</h3>
            <div className="pricing-price-row">
              <span className="pricing-price">{plan.price}</span>
              <span className="pricing-period">{plan.period}</span>
            </div>
            <p className="pricing-description">{plan.description}</p>

            <ul className="pricing-features">
              {plan.features.map((feature, i) => (
                <li key={i} className="pricing-feature-item">
                  <FaCheck className="pricing-check-icon" />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => navigate('/sign-up')}
              className={`pricing-cta ${plan.highlighted ? 'pricing-cta--primary' : ''}`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      <style>{`
        .pricing-section {
          padding: 4rem 2rem;
          text-align: center;
        }

        .pricing-heading {
          font-size: clamp(2rem, 3vw, 3rem);
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .pricing-subheading {
          font-size: 1.5rem;
          color: #6b7280;
          margin-bottom: 3rem;
        }

        .pricing-grid {
          display: flex;
          gap: 2rem;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 1200px;
          margin: 0 auto;
          align-items: stretch;
        }

        .pricing-card {
          flex: 1 1 300px;
          max-width: 380px;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 1.5rem;
          padding: 3rem 2rem;
          background: white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06);
          position: relative;
          text-align: left;
          transition: all 0.25s ease;
        }

        .pricing-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        }

        .pricing-card--highlighted {
          border: 2px solid #C3E11D;
          background: linear-gradient(135deg, #fefff0, #fff);
          box-shadow: 0 8px 30px rgba(195,225,29,0.15);
          transform: scale(1.02);
        }

        .pricing-card--highlighted:hover {
          transform: scale(1.02) translateY(-4px);
          box-shadow: 0 12px 36px rgba(195,225,29,0.25);
        }

        .pricing-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: #C3E11D;
          padding: 4px 16px;
          border-radius: 9999px;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .pricing-plan-name {
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .pricing-price-row {
          margin-bottom: 1rem;
        }

        .pricing-price {
          font-size: 3rem;
          font-weight: bold;
        }

        .pricing-period {
          font-size: 1.4rem;
          color: #6b7280;
        }

        .pricing-description {
          font-size: 1.3rem;
          color: #6b7280;
          margin-bottom: 2rem;
        }

        .pricing-features {
          list-style: none;
          padding: 0;
          margin-bottom: 2rem;
        }

        .pricing-feature-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.3rem;
          margin-bottom: 0.75rem;
        }

        .pricing-cta {
          width: 100%;
          padding: 1rem;
          border-radius: 2rem;
          border: none;
          background: #f0f0f0;
          font-weight: 600;
          font-size: 1.4rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .pricing-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .pricing-cta:active {
          transform: translateY(0) scale(0.98);
        }

        .pricing-cta--primary {
          background: #C3E11D;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }

        .pricing-cta--primary:hover {
          box-shadow: 0 4px 12px rgba(195,225,29,0.4);
        }
      `}</style>
    </section>
  );
};

export default Pricing;
