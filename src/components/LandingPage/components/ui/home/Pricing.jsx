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
    <section style={{ padding: '4rem 2rem', textAlign: 'center' }}>
      <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
        Simple, Transparent Pricing
      </h2>
      <p style={{ fontSize: '1.5rem', color: '#666', marginBottom: '3rem' }}>
        Choose the plan that fits your change management needs
      </p>

      <div style={{
        display: 'flex',
        gap: '2rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {plans.map((plan) => (
          <div
            key={plan.name}
            style={{
              flex: '1 1 300px',
              maxWidth: '380px',
              border: plan.highlighted ? '2px solid #C3E11D' : '1px solid #ddd',
              borderRadius: '1.5rem',
              padding: '3rem 2rem',
              background: plan.highlighted ? '#fafff0' : 'white',
              boxShadow: plan.highlighted ? '0 8px 30px rgba(195,225,29,0.2)' : '0 2px 8px rgba(0,0,0,0.05)',
              position: 'relative',
              textAlign: 'left',
            }}
          >
            {plan.highlighted && (
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#C3E11D',
                padding: '4px 16px',
                borderRadius: '20px',
                fontSize: '1.2rem',
                fontWeight: '600',
              }}>
                Most Popular
              </div>
            )}
            <h3 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '0.5rem' }}>{plan.name}</h3>
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '3rem', fontWeight: 'bold' }}>{plan.price}</span>
              <span style={{ fontSize: '1.4rem', color: '#666' }}>{plan.period}</span>
            </div>
            <p style={{ fontSize: '1.3rem', color: '#666', marginBottom: '2rem' }}>{plan.description}</p>

            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
              {plan.features.map((feature, i) => (
                <li key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '1.3rem',
                  marginBottom: '0.75rem',
                }}>
                  <FaCheck style={{ color: '#C3E11D', flexShrink: 0 }} />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => navigate('/sign-up')}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '2rem',
                border: 'none',
                background: plan.highlighted ? '#C3E11D' : '#f0f0f0',
                fontWeight: '600',
                fontSize: '1.4rem',
                cursor: 'pointer',
              }}
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
