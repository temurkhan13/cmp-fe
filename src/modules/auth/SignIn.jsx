import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, googleLogin } from '../../redux/slices/authSlice';
import Components from '../../components';
import Button from '../../components/common/Button';
import { signinWithGoogle } from './SignInWithGoogle';
import assets from '../../assets/index.js';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Destructure the relevant state from the auth slice
  const { user, isLoading } = useSelector((state) => state.auth);

  // Local state for handling error display and password visibility
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Redirect user to dashboard if authenticated
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const initialValues = {
    email: '',
    password: '',
  };

  // Handle form submission
  const handleLoginSubmit = async (email, password) => {
    try {
      const response = await dispatch(login({ email, password }));

      if (response.error) {
        setApiError(response.payload.message || 'Login failed');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setApiError('Login failed due to an unexpected error.');
    }
  };

  // Handle authentication response from Google
  const handleAuthResponse = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');
    const refreshToken = urlParams.get('refreshToken');

    if (accessToken) {
      // Save tokens to localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      try {
        await dispatch(googleLogin({ accessToken, navigate, refreshToken }));
      } catch (error) { if (import.meta.env.DEV) console.error(error); }
    }
  };

  // Handle authentication response on component mount
  useEffect(() => {
    handleAuthResponse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Components.Feature.Container className="auth signIn">
      <header>
        <Components.Feature.Heading className="primary mb_primary">
          Welcome to Change AI
        </Components.Feature.Heading>
        <Components.Feature.Text className="primary--light">
          Please enter your login credentials to access your account
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
          onSubmit={(values) => {
            handleLoginSubmit(values.email, values.password);
            // resetForm();
          }}
        >
          {() => (
            <Form>
              <Components.Feature.FormInput
                name="email"
                label="Email"
                place="Enter your email"
                type="email"
              />
              <div className="password-input-wrapper">
                <Components.Feature.FormInput
                  name="password"
                  label="Password"
                  place="Enter your password"
                  type={showPassword ? 'text' : 'password'}
                />
                <span
                  className="password-toggle-icon"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </span>
              </div>
              {apiError && <p className="error-message">{apiError}</p>}
              <section className="signIn_remember mb_Tertiary">
                <label
                  className="auth-remember-label"
                  htmlFor="checkbox"
                >
                  <input id="checkbox" type="checkbox" />
                  <p className="secondary--light">
                    Remember Me
                  </p>
                </label>
                <Link
                  to="/forgot-password/verification"
                  className="forgot-password-link"
                >
                  Forgot Password?
                </Link>
              </section>
              <Button
                variant="primary"
                block
                type="submit"
                size="lg"
                loading={isLoading}
              >
                Log In
              </Button>
            </Form>
          )}
        </Formik>
      </section>

      <center>
        <Components.Feature.Text className="primary m_1">
          Don&apos;t have an account?{' '}
          <Link to="/sign-up" className="sign-up-link">
            Sign Up
          </Link>
        </Components.Feature.Text>
      </center>

    </Components.Feature.Container>
  );
};

export default SignIn;
