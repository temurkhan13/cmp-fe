import { useState, useEffect } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa';
import apiClient from '../../api/axios';
import config from '../../config/config';
import Components from '..';
import toast from 'react-hot-toast';

const PLAN_FEATURES = {
  Starter: [
    '1 Workspace',
    '1 Project',
    '3 Assessments/month',
    '1 Digital Playbook',
    'PDF Export',
    '10,000 AI words/month',
  ],
  Professional: [
    '5 Workspaces',
    '10 Projects',
    'Unlimited Assessments',
    'Unlimited Playbooks',
    'All Export Formats (PDF, Word, PPT, Excel)',
    'RAG Document Upload',
    '100,000 AI words/month',
    'Priority Support',
  ],
  Enterprise: [
    'Unlimited Workspaces',
    'Unlimited Projects',
    'Custom AI Training',
    'SSO & Team Management',
    'Dedicated Account Manager',
    'Custom Integrations',
    'Unlimited AI words',
    'SLA Guarantee',
  ],
};

const PlanAndBilling = () => {
  const [plans, setPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [plansRes, subsRes] = await Promise.allSettled([
        apiClient.get(`${config.apiURL}/stripe/subscription`),
        apiClient.get(`${config.apiURL}/auth/user-subscription`),
      ]);

      if (plansRes.status === 'fulfilled') {
        setPlans(plansRes.value.data?.results || plansRes.value.data || []);
      }
      if (subsRes.status === 'fulfilled' && subsRes.value.data) {
        setCurrentPlan(subsRes.value.data || 'Free');
      }
    } catch (err) {
      if (import.meta.env.DEV) console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (subscriptionId) => {
    setCheckoutLoading(subscriptionId);
    try {
      const res = await apiClient.post(`${config.apiURL}/stripe/subscription`, { subscriptionId });
      console.log(res)
      if (res.data?.redirectToCheckoutURL) {
        window.location.href = res.data.redirectToCheckoutURL;
      } else {
        toast.error(res.data?.message || 'Unable to start checkout');
      }
    } catch (err) {
      toast.error('Failed to start checkout. Please try again.');
    } finally {
      setCheckoutLoading(null);
    }
  };

  const currentPlanName = currentPlan?.name || '-';

  return (
    <div className="billing-page">
      <Components.Dashboard.Header />
      <h2 style={{ fontSize: '2.4rem', fontWeight: 600, margin: '1rem 2rem' }}>Plan & Billing</h2>

      {/* Current Plan */}
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        padding: '2rem',
        margin: '0 2rem 2rem',
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '1.3rem', color: '#6b7280' }}>Current Plan</p>
            <h3 style={{ fontSize: '2rem', fontWeight: 600 }}>{currentPlanName}</h3>
          </div>
          <span style={{
            background: 'rgba(34,197,94,0.1)',
            color: '#15803d',
            padding: '4px 12px',
            borderRadius: '9999px',
            fontSize: '1.2rem',
            fontWeight: 600,
          }}>Active</span>
        </div>
      </div>

      {/* Plans Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        margin: '0 2rem 2rem',
      }}>
        {(plans.length > 0 ? plans : [
          { id: 'free', name: 'Starter', price: 0 },
          { id: 'pro', name: 'Professional', price: 49 },
          { id: 'ent', name: 'Enterprise', price: 199 },
        ]).map((plan) => {
          const isCurrent = plan.name === currentPlanName;
          const isHighlighted = plan.name === 'Professional';
          const features = PLAN_FEATURES[plan.name] || [];

          return (
            <div key={plan.id} style={{
              background: isHighlighted ? 'linear-gradient(135deg, #fefff0, #fff)' : '#fff',
              border: isHighlighted ? '2px solid #C3E11D' : '1px solid rgba(0,0,0,0.08)',
              borderRadius: '16px',
              padding: '2rem',
              position: 'relative',
              transition: 'all 0.2s ease',
            }}>
              {isHighlighted && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#C3E11D',
                  padding: '4px 16px',
                  borderRadius: '9999px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                }}>Most Popular</div>
              )}
              <h3 style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>{plan.name}</h3>
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '2.8rem', fontWeight: 700 }}>
                  {plan.price === 0 ? 'Free' : `£${plan.price}`}
                </span>
                {plan.price > 0 && <span style={{ fontSize: '1.3rem', color: '#6b7280' }}>/month</span>}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                {features.map((f, i) => (
                  <li key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '1.25rem',
                    marginBottom: '0.5rem',
                    color: '#374151',
                  }}>
                    <FaCheck style={{ color: '#C3E11D', flexShrink: 0 }} size={12} />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                disabled={isCurrent || checkoutLoading === plan.id}
                onClick={() => !isCurrent && handleSubscribe(plan.id)}
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: isCurrent ? '#e5e7eb' : isHighlighted ? '#C3E11D' : '#f0f0f0',
                  fontWeight: 600,
                  fontSize: '1.3rem',
                  cursor: isCurrent ? 'default' : 'pointer',
                  color: '#111',
                  transition: 'all 0.2s ease',
                }}
              >
                {checkoutLoading === plan.id ? 'Redirecting...' : isCurrent ? 'Current Plan' : plan.price === 0 ? 'Downgrade' : 'Upgrade'}
              </button>
            </div>
          );
        })}
      </div>

      <style>{`
        .billing-page {
          padding: 1.25rem;
          font-size: 1.4rem;
          background-color: #f9f9f9;
        }
      `}</style>
    </div>
  );
};

export default PlanAndBilling;
