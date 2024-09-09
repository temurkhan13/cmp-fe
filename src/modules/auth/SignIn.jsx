import Components from '../../components';
import assets from '../../assets';
import data from '../../data';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
//import useLogin from '../../hooks/useLogin';

import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import { useSelector } from 'react-redux';

const SignIn = () => {
  //const { login, loading, error } = useLogin();

  const { isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initalValues = {
    email: '',
    password: '',
  };

  const handleLoginSubmit = async (email, password) => {
    // e.preventDefault();
    try {
      // Dispatch async action to register email and get verification code
      const response = await dispatch(login({ email, password }));
      console.log(response);

      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <>
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
            validationSchema={data.validation.validationAuth.validationSignIn}
            onSubmit={(values, { resetForm }) => {
              console.log(values);
              handleLoginSubmit(values.email, values.password);
              // login(values.email, values.password);
              resetForm();
            }}
          >
            {(formik) => (
              <Form>
                <Components.Feature.FormInput
                  name="email"
                  label="Email"
                  place="Enter email"
                  type="email"
                />
                <Components.Feature.FormInput
                  type="password"
                  name="password"
                  label="Password"
                  place="Enter password"
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <section className="signIn_remember  mb_Tertiary">
                  <div>
                    <input type="checkbox" />
                    <Components.Feature.Text className="secondry--light ">
                      Remember Me
                    </Components.Feature.Text>
                  </div>
                  <Link to="/forgot-password/verification">
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
            Don’t have an account? <Link to="/sign-up">Sign Up</Link>
          </Components.Feature.Text>
        </center>
      </Components.Feature.Container>
    </>
  );
};

export default SignIn;
