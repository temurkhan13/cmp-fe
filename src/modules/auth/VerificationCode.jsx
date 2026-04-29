import Components from '../../components';
import Button from '../../components/common/Button';
import { Formik, Form } from 'formik';
import data from '../../data';
import { useNavigate } from 'react-router-dom';
import { ResetforgetPasswordWithCode, forgetPasswordGetCode } from '../../redux/slices/authSlice.js';
import { useDispatch } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';

const VerificationCode = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = { OTP: '', newPassword: '' };
  const [error, setError] = useState('');
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
    const email = localStorage.getItem('forgetEmail');
    if (!email) return;
    setCanResend(false);
    setCountdown(60);
    setResendMessage('');
    dispatch(forgetPasswordGetCode(email))
      .then(() => setResendMessage('Code resent successfully!'))
      .catch(() => setResendMessage('Failed to resend code.'));
  }, [dispatch]);

  const handleSubmit = async (values) => {
    try {
      await dispatch(
        ResetforgetPasswordWithCode({
          email: localStorage.getItem('forgetEmail'),
          OTP: parseInt(values.otp, 10),
          newPassword: values.password,
        })
      ).unwrap();
      localStorage.removeItem('forgetEmail');
      navigate('/log-in');
    } catch (err) {
      setError(err?.message || 'Invalid OTP or something went wrong. Please try again.');
    }
  };

  return (
    <Components.Feature.Container className="auth signIn">
      <header className="auth-header--spaced">
        <Components.Feature.Heading className="primary mb_primary">
          Verify your Email
        </Components.Feature.Heading>
        <Components.Feature.Text className="primary--light">
          We sent you a six-digit confirmation code to . Please enter it below
          to confirm your email address.
        </Components.Feature.Text>
      </header>
      <section>
        <Formik
          initialValues={initialValues}
          validateOnMount
          validationSchema={
            data.validation.validationAuth.validationResetPassword
          }
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values);
            resetForm();
          }}
        >
          {() => (
            <Form>
              <Components.Feature.FormInput name="otp" label="" place="OTP" />
              <Components.Feature.FormInput
                name="password"
                label=""
                place="Enter New Password"
              />
              {error && (
                <div className="auth-error">
                  {error}
                </div>
              )}{' '}
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
              <Button variant="primary" size="lg" block type="submit">
                Reset Password
              </Button>
            </Form>
          )}
        </Formik>
      </section>
    </Components.Feature.Container>
  );
};

export default VerificationCode;
