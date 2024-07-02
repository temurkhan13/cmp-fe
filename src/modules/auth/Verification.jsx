import Components from '../../components';
import data from '../../data';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import useForgotPassword from '../../hooks/useForgotPassword';

const Verification = () => {
  const { forgotPassword, loading, error } = useForgotPassword();
  const initialValues = {
    email: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    await forgotPassword(values.email);
    setSubmitting(false);
  };

  return (
    <Components.Feature.Container className="">
      <header>
        <Components.Feature.Heading className="primary mb_primary">
          Enter Your Email
        </Components.Feature.Heading>
        <Components.Feature.Text className="primary--light">
          Please enter the following information in order to forgot password
        </Components.Feature.Text>
      </header>
      <section>
        <Formik
          initialValues={initialValues}
          validateOnMount
          validationSchema={data.validation.validationAuth.validationSignUp}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              <Components.Feature.FormInput
                name="email"
                label="Email"
                place="Enter your email"
              />
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <Components.Feature.Button className="primary" type="submit">
                {loading ? <p>loading...</p> : <p> Continue</p>}
              </Components.Feature.Button>
            </Form>
          )}
        </Formik>
      </section>
      <center>
        <Components.Feature.Text className="primary m_1">
          Already have an account?
          <Link to="/"> Log In</Link>
        </Components.Feature.Text>
      </center>
    </Components.Feature.Container>
  );
};

export default Verification;
