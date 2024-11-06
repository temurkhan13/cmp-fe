import data from '../../data';
import Components from '../../components';

import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import {
  register,
  resetError,
  resetLoading,
} from '../../redux/slices/authSlice';
import { useSelector } from 'react-redux';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);
  const initialValues = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    companyName: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    // setIsLoading(true);
    try {
      console.log(values);
      await dispatch(register({ registrationData: values }));
      //navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }

    setSubmitting(false);
  };

  // Automatically navigate to dashboard after successful registration
  useEffect(() => {
    if (user) {
      dispatch(resetLoading());
      navigate('/dashboard');
    }
  }, [user, navigate, dispatch]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(resetError());
      }, 2000);
    }
  }, [dispatch, error]);

  return (
    <Components.Feature.Container>
      <header>
        <Components.Feature.Heading className="primary mb_primary">
          Create Your Account
        </Components.Feature.Heading>
        <Components.Feature.Text className="primary--light">
          Please enter the following information in order to sign up
        </Components.Feature.Text>
      </header>
      <section>
        <Formik
          initialValues={initialValues}
          validateOnMount
          validationSchema={data.validation.validationAuth.validationSignUp}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <Components.Feature.FormInput
                name="email"
                label="Email"
                place="Enter your email"
                type="email"
              />
              <Components.Feature.FormInput
                name="firstName"
                label="First Name"
                place="Enter your First Name"
                type="text"
              />
              <Components.Feature.FormInput
                name="lastName"
                label="Last Name"
                place="Enter your Last Name"
                type="text"
              />
              <Components.Feature.FormInput
                name="companyName"
                label="Company Name"
                place="Enter your Company Name"
                type="text"
              />
              <Components.Feature.FormInput
                type="password"
                name="password"
                label="Password"
                place="Enter Password"
              />
              <Components.Feature.FormInput
                name="confirmPassword"
                label="Confirm Password"
                place="Enter Confirm Password"
                type="password"
              />

              {error && <p style={{ color: 'red' }}>{error}</p>}
              <Components.Feature.Button
                className="primary"
                type="submit"
                disabled={isLoading || error} // Disable based on form validity, loading state, or error
              >
                {isLoading ? 'Signing up...' : 'Submit'}
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
            <span> Log In</span>
          </Link>
        </Components.Feature.Text>
      </center>
    </Components.Feature.Container>
  );
};

export default SignUp;
