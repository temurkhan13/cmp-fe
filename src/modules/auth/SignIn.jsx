import Components from '../../components';
import assets from '../../assets';
import data from '../../data';
import { signinWithGoogle } from './SignInWithGoogle';
import { Formik, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import { useEffect } from 'react';

const SignIn = () => {
  //const { isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading ,error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);
  
  const initialValues = {
    email: '',
    password: '',
  };

  const handleLoginSubmit = async (email, password) => {
    try {
      const response = await dispatch(login({ email, password }));
      console.log(response);
     // navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
    }
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
          validateOnMount
          validationSchema={data.validation.validationAuth.validationSignIn}
          onSubmit={(values, { resetForm }) => {
            handleLoginSubmit(values.email, values.password);
            resetForm();
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
              <Components.Feature.FormInput
                name="password"
                label="Password"
                place="Enter your password"
                type="password"
              />
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <section className="signIn_remember mb_Tertiary">
                <div>
                  <input type="checkbox" />
                  <Components.Feature.Text className="secondary--light">
                    Remember Me
                  </Components.Feature.Text>
                </div>
                <Link to="/forgot-password/verification">Forgot Password?</Link>
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
          Don&apos;t have an account? <Link to="/sign-up">Sign Up</Link>
        </Components.Feature.Text>
      </center>
    </Components.Feature.Container>
  );
};

export default SignIn;
