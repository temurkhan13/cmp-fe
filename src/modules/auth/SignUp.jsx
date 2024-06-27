import Components from '../../components';
import assets from '../../assets';
import data from '../../data';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const initalValues = {
    email: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(false);
    navigate('/business-info', { state: { email: values.email } });
  };

  return (
    <Components.Feature.Container className="">
      <header>
        <Components.Feature.Heading className="primary mb_primary">
          Create Your Account
        </Components.Feature.Heading>
        <Components.Feature.Text className="primary--light">
          Please enter the following information in order to sign up
        </Components.Feature.Text>
        <section className="mbt_Tertiary">
          <Components.Feature.Button
            className="auth mb_Secondry"
            icon={assets.auth.google}
          >
            Continue with Google
          </Components.Feature.Button>
          <Components.Feature.Button
            className="auth"
            icon={assets.auth.linkedIn}
          >
            Continue with LinkedIn
          </Components.Feature.Button>
        </section>
        <div className="mb_Tertiary">
          <span></span>
          <Components.Feature.Text className="secondry--light captilize">
            or
          </Components.Feature.Text>
          <span></span>
        </div>
      </header>
      <section>
        <Formik
          initialValues={initalValues}
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
              <Components.Feature.Button className="primary" type="submit">
                Continue
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

export default SignUp;
