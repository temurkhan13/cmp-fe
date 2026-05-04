import Components from '../../components';
import Button from '../../components/common/Button';
import data from '../../data';
import { Formik, Form } from 'formik';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { register } from '../../redux/slices/authSlice';
import { useSelector } from 'react-redux';

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
      dispatch(register({ registrationData, password: values.password }));
      navigate('/verify-email', { state: { email: registrationData.email } });
    } catch (err) {
      console.error(err);
    }

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
          {() => (
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
              <Button
                variant="primary"
                size="lg"
                block
                type="submit"
                loading={isLoading}
              >
                Continue
              </Button>
            </Form>
          )}
        </Formik>
      </section>
    </Components.Feature.Container>
  );
};

export default SetPassword;
