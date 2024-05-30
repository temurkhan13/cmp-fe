import Components from "../../components";
import assets from "../../assets";
import data from "../../data";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const SignIn = () => {
  const { login, loading, error } = useLogin();
  const initalValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const { email, password } = values;
    await login(email, password);
    setSubmitting(false);
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
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form>
                <Components.Feature.FormInput
                  name="email"
                  label="Email"
                  place="Enter your email"
                />
                <Components.Feature.FormInput
                  name="password"
                  label="Password"
                  place="Enter password"
                  type="password"
                />
                <section className="signIn_remember  mb_Tertiary">
                  <div>
                    <input type="checkbox" />
                    <Components.Feature.Text className="secondry--light ">
                      Remember Me
                    </Components.Feature.Text>
                  </div>
                  <Link to="/set-password">Forgot Password?</Link>
                </section>
                <Components.Feature.Button
                  className="primary"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Logging In..." : "Log In"}
                </Components.Feature.Button>
                {error && (
                  <div
                    style={{
                      color: "red",
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    {error}
                  </div>
                )}
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
