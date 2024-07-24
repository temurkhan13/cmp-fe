import Components from '../../components';
import { Formik, Form } from 'formik';
import useVerifyEmail from '../../hooks/useVerifyEmail';
import { useLocation } from 'react-router-dom';


import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { verify } from '../../redux/slices/authSlice';

const VerifyEmail = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate();


  const location = useLocation();
  const { email } = location.state;
  const initialValues = { number: '' };
  //const { verifyEmail, error } = useVerifyEmail();



  return (
    <Components.Feature.Container className="auth signIn">
      <header style={{ marginBottom: '10%' }}>
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
            console.log(values);
            resetForm();
          }}
        >
          {(formik) => (
            <Form>
              <Components.Feature.VerifyCode
                name="number"
                type="number"
                label="Verification Code"
                place="Enter 6-digit code"
                //handleVerification={(value) => verifyEmail({ value })}
                handleVerification={(value) => 
                 {
                  const response = dispatch(verify(value));
                  console.log(response.data);
                  if(response.data){
                    navigate('/choose-plain');
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
              <p
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: '400',
                  fontSize: '16px',
                  lineHeight: '24px',
                  letterSpacing: '0.24px',
                  color: 'rgba(10, 10, 10, 0.68)',
                }}
              >
                Didn&apos;t receive a code?{' '}
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
            </Form>
          )}
        </Formik>
      </section>
    </Components.Feature.Container>
  );
};

export default VerifyEmail;
