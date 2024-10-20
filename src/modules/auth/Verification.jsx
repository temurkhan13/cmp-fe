import Components from '../../components';
import assets from '../../assets';
import data from '../../data';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const verification = () => {
  const navigate = useNavigate();
  const initalValues = {
    email: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(false);
    navigate('/forgot-password/Code');
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
          initialValues={initalValues}
          validateOnMount
          validationSchema={data.validation.validationAuth.validationSignUp}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              <Components.Feature.FormInput
                name="email"
                label=""
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
          <Link
            to="/log-in"
            style={{
              textDecoration: 'none',
              fontWeight: 'bold',
              color: '#0B1444',
            }}
          >
            <span /> Log In
          </Link>
        </Components.Feature.Text>
      </center>
    </Components.Feature.Container>
  );
};

export default verification;
