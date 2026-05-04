import data from '../../data';
import Components from '../../components';
import Button from '../../components/common/Button';

import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { signinWithGoogle } from './SignInWithGoogle';
import assets from '../../assets/index.js';

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const initialValues = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    companyName: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(register({ registrationData: values }));
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  useEffect(() => {
    if (user) {
      dispatch(resetLoading());
      navigate('/dashboard');
    }
  }, [user, navigate, dispatch]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(resetError());
      }, 2000);
      return () => clearTimeout(timer);
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
        <section className="mbt_Tertiary">
          <Button
            variant="secondary"
            size="lg"
            block
            className="mb_Secondary"
            iconLeft={<img src={assets.auth.google} alt="" />}
            onClick={signinWithGoogle}
          >
            Continue with Google
          </Button>
        </section>
        <div className="mb_Tertiary">
          <span></span>
          <Components.Feature.Text className="secondary--light">
            or
          </Components.Feature.Text>
          <span></span>
        </div>
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
              <div className="password-input-wrapper">
                <Components.Feature.FormInput
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  label="Password"
                  place="Enter Password"
                />
                <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </span>
              </div>
              <div className="password-input-wrapper">
                <Components.Feature.FormInput
                  name="confirmPassword"
                  label="Confirm Password"
                  place="Enter Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                />
                <span className="password-toggle-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </span>
              </div>

              {error && <p className="auth-error">{error}</p>}
              <Button
                variant="primary"
                size="lg"
                block
                type="submit"
                disabled={!!error}
                loading={isLoading}
              >
                Create Account
              </Button>
            </Form>
          )}
        </Formik>
      </section>
      <center>
        <Components.Feature.Text className="primary m_1">
          Already have an account?
          <Link
            to="/log-in"
            className="auth-login-link"
          >
            <span> Log In</span>
          </Link>
        </Components.Feature.Text>
      </center>
    </Components.Feature.Container>
  );
};

export default SignUp;
