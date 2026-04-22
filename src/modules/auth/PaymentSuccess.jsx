import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Components from '../../components';
import apiClient from '../../api/axios';
import { getUser } from '../../redux/slices/authSlice';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [status, setStatus] = useState('loading'); // loading | success | error

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await apiClient.post('/stripe/subscription/verify-session', {
          session_id: sessionId,
        });
        if (res.data?.status) {
          // Refresh user data so subscription is reflected in Redux/localStorage
          const user = JSON.parse(localStorage.getItem('user'));
          if (user?.id) {
            await dispatch(getUser(user.id));
          }
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch {
        setStatus('error');
      }
    };

    verifyPayment();
  }, [sessionId, dispatch]);

  return (
    <div className="paymentSuccess">
      {status === 'loading' && (
        <div className="paymentSuccess__card">
          <div className="paymentSuccess__spinner" />
          <Components.Feature.Heading className="primary mb_Primary">
            Verifying your payment
          </Components.Feature.Heading>
          <Components.Feature.Text className="primary--light">
            Please wait while we confirm your subscription...
          </Components.Feature.Text>
        </div>
      )}

      {status === 'success' && (
        <div className="paymentSuccess__card">
          <div className="paymentSuccess__icon paymentSuccess__icon--success">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <Components.Feature.Heading className="primary mb_Primary">
            Payment Successful
          </Components.Feature.Heading>
          <Components.Feature.Text className="primary--light mb_Secondary">
            Your subscription has been activated. You now have access to all your plan features.
          </Components.Feature.Text>
          <Components.Feature.Button
            className="primary"
            onClick={() => window.location.href = '/dashboard'}
          >
            Go to Dashboard
          </Components.Feature.Button>
        </div>
      )}

      {status === 'error' && (
        <div className="paymentSuccess__card">
          <div className="paymentSuccess__icon paymentSuccess__icon--error">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <Components.Feature.Heading className="primary mb_Primary">
            Something went wrong
          </Components.Feature.Heading>
          <Components.Feature.Text className="primary--light mb_Secondary">
            We couldn&apos;t verify your payment. Please contact support if you were charged.
          </Components.Feature.Text>
          <Components.Feature.Button
            className="primary"
            onClick={() => navigate('/dashboard/PlanBilling')}
          >
            Back to Plans
          </Components.Feature.Button>
        </div>
      )}

    </div>
  );
};

export default PaymentSuccess;
