import { useState, useEffect } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa';
import apiClient from '../../api/axios';
import config from '../../config/config';
import Components from '..';
import toast from 'react-hot-toast';
import './dashboard-inline.scss';

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
      setCurrentPlan('Free');
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

      {/* Current Plan */}
      <div className="billing-current-plan">
        <div className="billing-current-plan__row">
          <div>
            <p className="billing-current-plan__label">Current Plan</p>
            <h3 className="billing-current-plan__name">{currentPlanName}</h3>
          </div>
          <span className="billing-active-badge">Active</span>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="billing-plans-grid">
        {(plans.length > 0 ? plans : [
          { id: 'free', name: 'Starter', price: 0 },
          { id: 'pro', name: 'Professional', price: 49 },
          { id: 'ent', name: 'Enterprise', price: 199 },
        ]).map((plan) => {
          const isCurrent = plan.name === currentPlanName;
          const isHighlighted = plan.name === 'Professional';
          const features = PLAN_FEATURES[plan.name] || [];

          return (
            <div key={plan.id} className={`billing-plan-card ${isHighlighted ? 'billing-plan-card--highlighted' : ''}`}>
              {isHighlighted && (
                <div className="billing-plan-card__popular-badge">Most Popular</div>
              )}
              <h3 className="billing-plan-card__title">{plan.name}</h3>
              <div className="billing-plan-card__price-section">
                <span className="billing-plan-card__price">
                  {plan.price === 0 ? 'Free' : `£${plan.price}`}
                </span>
                {plan.price > 0 && <span className="billing-plan-card__period">/month</span>}
              </div>
              <ul className="billing-plan-card__features">
                {features.map((f, i) => (
                  <li key={i} className="billing-plan-card__feature">
                    <FaCheck className="billing-plan-card__check-icon" size={12} />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                disabled={isCurrent || checkoutLoading === plan.id}
                onClick={() => !isCurrent && handleSubscribe(plan.id)}
                className={`billing-plan-card__btn ${isCurrent ? 'billing-plan-card__btn--current' : isHighlighted ? 'billing-plan-card__btn--highlighted' : 'billing-plan-card__btn--default'}`}
              >
                {checkoutLoading === plan.id ? 'Redirecting...' : isCurrent ? 'Current Plan' : plan.price === 0 ? 'Downgrade' : 'Upgrade'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlanAndBilling;
