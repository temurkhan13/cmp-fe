import Components from '../../components';
import data from '../../data';
import { Formik, Form } from 'formik';
import { useLocation } from 'react-router-dom';
import useRegister from '../../hooks/useRegister';

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { register } from '../../redux/slices/authSlice';
import { useSelector } from 'react-redux';
import { LoadingSpinner } from '../../components/common/Loaders';

const SetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const detailsBusinessInfo = location.state;

  const { isLoading, error } = useSelector((state) => state.auth);
  const initalValues = {
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(false);

    const registrationData = { ...detailsBusinessInfo, ...values };

    try {
      // Dispatch async action to register email and get verification code
      const password = values.password;
      dispatch(register({ registrationData, password }));

      navigate('/verify-email', { state: { email: registrationData.email } });
      // Store the token in localStorage
      //   localStorage.setItem('token', response.data.tokens.access.token);
      //   navigate('/verify-email', { state: { email: registrationData.email } });
    } catch (error) { if (import.meta.env.DEV) console.error(error); }

    // await register(allDetails, values.password);
    setSubmitting(false);
  };

  return (
    <Components.Feature.Container className="auth signIn">
      <header>
        <Components.Feature.Heading className="primary mb_primary">
          Set Password
        </Components.Feature.Heading>
        <Components.Feature.Text className="primary--light mb_Tertiary">
          Please enter the following information in order to sign up
        </Components.Feature.Text>
      </header>
      <section>
        <Formik
          initialValues={initalValues}
          validateOnMount
          validationSchema={
            data.validation.validationAuth.validationSetPassword
          }
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              <Components.Feature.FormInput
                type="password"
                name="password"
                label="Password"
                place="Enter password"
              />
              <Components.Feature.FormInput
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                place="Confirm password"
              />
              {error && <p className="auth-error">{error}</p>}
              <Components.Feature.Button
                className="primary"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner /> : 'Continue'}
              </Components.Feature.Button>
            </Form>
          )}
        </Formik>
      </section>
    </Components.Feature.Container>
  );
};

export default SetPassword;
