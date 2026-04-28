import Components from '../../components';
import Button from '../../components/common/Button';
import data from '../../data';
import { Formik, Form } from 'formik';
import { useLocation } from 'react-router-dom';
import useRegister from '../../hooks/useRegister';

const SetNewPassword = () => {
  const location = useLocation();
  const detailsBusinessInfo = location.state;
  const initalValues = {
    password: '',
    confirmPassword: '',
  };
  const { register, error, loading } = useRegister();

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(false);

    const allDetails = { ...detailsBusinessInfo, ...values };
    await register(allDetails, values.password);
    setSubmitting(false);
  };

  return (
    <Components.Feature.Container className="auth signIn">
      <header>
        <Components.Feature.Heading className="primary mb_primary">
          Set New Password
        </Components.Feature.Heading>
        <Components.Feature.Text className="primary--light mb_Tertiary">
          Please enter the following information in order to forgot password
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
                name="password"
                label="Password"
                place="Enter password"
              />
              <Components.Feature.FormInput
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
                loading={loading}
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

export default SetNewPassword;
