import Components from '../../components';
import { Formik, Form } from 'formik';
import { useLocation } from 'react-router-dom';
import data from '../../data';
import { useNavigate } from 'react-router-dom';
import { ResetforgetPasswordWithCode } from '../../redux/slices/authSlice.js';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const verification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = { OTP: '', newPassword: '' };
  const [error, setError] = useState('');

  const handleSubmit = async (values) => {
    dispatch(
      ResetforgetPasswordWithCode({
        email: localStorage.getItem('forgetEmail'),
        OTP: values.otp,
        newPassword: values.password,
      })
    )
      .then((response) => {
        if (response.payload.code) {
          setError('Something went wrong, please try again.');
          return;
        }

        localStorage.removeItem('forgetEmail');
        navigate('/log-in');
      })
      .catch((error) => {
        setError('Something went wrong, please try again.');
      });
  };

  return (
    <Components.Feature.Container className="auth signIn">
      <header style={{ marginBottom: '10%' }}>
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
          {(formik) => (
            <Form>
              <Components.Feature.FormInput name="otp" label="" place="OTP" />
              <Components.Feature.FormInput
                name="password"
                label=""
                place="Enter New Password"
              />
              {error && (
                <div
                  style={{
                    color: 'red',
                  }}
                >
                  {error}
                </div>
              )}{' '}
              <p
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: '400',
                  fontSize: '16px',
                  lineHeight: '24px',
                  letterSpacing: '0.24px',
                  color: 'rgba(10, 10, 10, 0.68)',
                  cursor: 'pointer',
                  marginBottom: '1rem',
                }}
                onClick={() => navigate(-1)}
              >
                Didn&apos;t receive a code?
                <span
                  style={{
                    fontFamily: 'Poppins',
                    fontWeight: '600',
                    fontSize: '16px',
                    lineHeight: '20px',
                    letterSpacing: '0.12px',
                    color: 'rgba(11, 20, 68, 1)',
                  }}
                >
                  Resend
                </span>
              </p>
              <Components.Feature.Button className="primary" type="submit">
                Reset Password
              </Components.Feature.Button>
            </Form>
          )}
        </Formik>
      </section>
    </Components.Feature.Container>
  );
};

export default verification;
