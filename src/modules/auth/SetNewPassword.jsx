import Components from '../../components';
import data from '../../data';
import { Formik, Form } from 'formik';
import { useLocation } from 'react-router-dom';
import useResetPassword from '../../hooks/useResetPassword';
const SetNewPassword = () => {
  const location = useLocation();
  const {email, code} = location.state;
  const {ResetPassword} = useResetPassword()
  const initalValues = {
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("Set new password ----> ", email, code, values.password)
    await ResetPassword(email,code,values)
    setSubmitting(false)
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
              {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
              {/*  disabled={loading} */}
              <Components.Feature.Button className="primary" type="submit">
              {/* {loading ? 'Loading...' : 'Continue'} */}
              continue
              </Components.Feature.Button>
            </Form>
          )}
        </Formik>
      </section>
    </Components.Feature.Container>
  );
};

export default SetNewPassword;
