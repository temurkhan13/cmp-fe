import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, googleLogin } from '../../redux/slices/authSlice';
import Components from '../../components';
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
      console.error('Login failed:', err);
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
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  // Handle authentication response on component mount
  useEffect(() => {
    handleAuthResponse();
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
          <Components.Feature.Button
            className="auth mb_Secondary"
            icon={assets.auth.google}
            onClick={signinWithGoogle}
          >
            Continue with Google
          </Components.Feature.Button>
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
                  style={{ display: 'flex', gap: '1rem' }}
                  htmlFor="checkbox"
                >
                  <input id="checkbox" type="checkbox" />
                  <Components.Feature.Text className="secondary--light">
                    Remember Me
                  </Components.Feature.Text>
                </label>
                <Link
                  to="/forgot-password/verification"
                  className="forgot-password-link"
                >
                  Forgot Password?
                </Link>
              </section>
              <Components.Feature.Button
                className="primary"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Log In'}
              </Components.Feature.Button>
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

      {/* Custom styles */}
      <style>
        {`
          .error-message {
            color: red;
            font-weight: bold;
            margin-bottom: 5px;
          }
          .forgot-password-link {
            color: #1e90ff;
            text-decoration: none;
          }
          .forgot-password-link:hover {
            text-decoration: underline;
          }
          .sign-up-link {
            color: #1e90ff;
            text-decoration: none;
            font-weight: bold;
          }
          .sign-up-link:hover {
            text-decoration: underline;
          }
          .password-input-wrapper {
            position: relative;
          }
          .password-toggle-icon {
            position: absolute;
            top: 70%;
            right: 10px;
            cursor: pointer;
            transform: translateY(-50%);
            font-size: 1.2rem;
            color: #555;
          }
          .password-toggle-icon:hover {
            color: #1e90ff;
          }
        `}
      </style>
    </Components.Feature.Container>
  );
};

export default SignIn;
