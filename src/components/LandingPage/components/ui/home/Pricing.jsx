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
    </section>
  );
};

export default Pricing;
