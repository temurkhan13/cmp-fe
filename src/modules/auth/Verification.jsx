import Components from '../../components';
import data from '../../data';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { forgetPasswordGetCode } from '../../redux/slices/authSlice.js';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const verification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  const initalValues = {
    email: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await dispatch(forgetPasswordGetCode(values.email)).unwrap();
      localStorage.setItem('forgetEmail', values.email);
      setSubmitting(false);
      navigate('/forgot-password/Code');
    } catch (err) {
      setError(err?.message || 'Something went wrong, please try again.');
      setSubmitting(false);
    }
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
          validationSchema={
            data.validation.validationAuth.validationForgetPassword
          }
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              <Components.Feature.FormInput
                name="email"
                label=""
                place="Enter your email"
              />
              {error && <div style={{ color: 'red' }}>{error}</div>}

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
