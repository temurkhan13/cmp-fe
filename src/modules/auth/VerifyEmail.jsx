import Components from '../../components';
import { Formik, Form } from 'formik';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { verify, resendVerification } from '../../redux/slices/authSlice';

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const { email } = location.state || {};
  const initialValues = { number: '' };

  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [resendMessage, setResendMessage] = useState('');

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResend = useCallback(() => {
    if (!email) return;
    setCanResend(false);
    setCountdown(60);
    setResendMessage('');
    dispatch(resendVerification(email))
      .then(() => setResendMessage('Code resent successfully!'))
      .catch(() => setResendMessage('Failed to resend code.'));
  }, [dispatch, email]);
  //const { verifyEmail, error } = useVerifyEmail();

  return (
    <Components.Feature.Container className="auth signIn">
      <header className="auth-header--spaced">
        <Components.Feature.Heading className="primary mb_primary">
          Verify your Email
        </Components.Feature.Heading>
        <Components.Feature.Text className="primary--light">
          We sent you a six-digit confirmation code to {email}. Please enter it
          below to confirm your email address.
        </Components.Feature.Text>
      </header>
      <section>
        <Formik
          initialValues={initialValues}
          validateOnMount
          onSubmit={(values, { resetForm }) => {
            resetForm();
          }}
        >
          {() => (
            <Form>
              <Components.Feature.VerifyCode
                name="number"
                type="number"
                label="Verification Code"
                place="Enter 6-digit code"
                handleVerification={async (value) => {
                  try {
                    await dispatch(verify(value)).unwrap();
                    //  if (response.success) {
                    navigate('/choose-plan');
                    //  }
                  } catch (error) {
                    // Handle error appropriately (e.g., show an error message to the user)
                  }
                }}
              />
              {/*error && (
                <div
                  style={{
                    color: 'red',
                  }}
                >
                  {error}
                </div>
              )*/}{' '}
              <p className="auth-resend-text">
                Didn&apos;t receive a code?{' '}
                {canResend ? (
                  <span
                    className="auth-resend-link"
                    onClick={handleResend}
                  >
                    Resend
                  </span>
                ) : (
                  <span className="auth-resend-countdown">
                    Resend in {countdown}s
                  </span>
                )}
              </p>
              {resendMessage && (
                <p className={resendMessage.includes('success') ? 'auth-resend-message--success' : 'auth-resend-message--error'}>
                  {resendMessage}
                </p>
              )}
            </Form>
          )}
        </Formik>
      </section>
    </Components.Feature.Container>
  );
};

export default VerifyEmail;
