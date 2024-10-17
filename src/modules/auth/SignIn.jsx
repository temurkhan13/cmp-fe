import Components from '../../components';
import assets from '../../assets';
import data from '../../data';
import { signinWithGoogle } from './SignInWithGoogle';
import { Formik, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, googleLogin } from '../../redux/slices/authSlice';
import { useEffect } from 'react';
import axios from 'axios';

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
     navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

   // Function to handle the response once redirected back
   const handleAuthResponse = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');
    const refreshToken = urlParams.get('refreshToken');

    console.log("accessToken: ",accessToken);
    console.log("accessToken: ",refreshToken);

    if (accessToken ) {
      // Save tokens to localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // Hit the API with the access token to get the user data
      try {
        await dispatch(googleLogin({ accessToken,navigate, refreshToken }));
        // const response = await axios.post(
        //   'https://be.changeai.ai/api/auth/get-user-from-token',
        //   {}, // Empty body
        //   {
        //     headers: {
        //       Authorization: `Bearer ${accessToken}`,
        //     },
        //   }
        // );

        // const user = response.data;
        // // Save user data in localStorage
        // localStorage.setItem('user', JSON.stringify(user));

        // // Redirect to dashboard after successful login
        // navigate('/dashboard');
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Redirect to login if there's an error fetching the user
       // navigate('/');
      }
    }
    //  else {
    //   // Redirect to login if no tokens are present
    //   navigate('/');
    // }
  };

  // Handle authentication response on component mount
  useEffect(() => {
    handleAuthResponse();
  }, []);


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


// google Test SignIn
//http://localhost:5173/log-in?accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmU3MDAyZTY3MDhhYmY5YzE3ZWY0YzMiLCJpYXQiOjE3MjcxMzQyNDgsImV4cCI6MjY3Mzg0MDY0OCwidHlwZSI6ImFjY2VzcyJ9.4BGy6eCMBtOP3TMBB-EIeIdk9cuJmshsHTB5BbXylkw
//refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmU3MDAyZTY3MDhhYmY5YzE3ZWY0YzMiLCJpYXQiOjE3MjcxMzQyNDgsImV4cCI6MTcyNzI0MjI0OCwidHlwZSI6InJlZnJlc2gifQ.AekFwuZU8AxtlZQPZgIGIVsL28MtXxMGxTvqxws4cBU