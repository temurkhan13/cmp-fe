import Components from "../../components";
import data from "../../data";
import { Formik, Form } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
const SetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email; 

  const initalValues = {
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(false);
    navigate("/verify-email", { state: { ...values, email } });
  };

  
  return (
    <Components.Feature.Container className="auth signIn">
      <header>
        <Components.Feature.Heading className="primary mb_primary">
          Set Password
        </Components.Feature.Heading>
        <Components.Feature.Text className="primary--light mb_Tertiary">
          Please enter the following information in order to sign up
        </Components.Feature.Text>
      </header>
      <section>
        <Formik
          initialValues={initalValues}
          validateOnMount
          validationSchema={
            data.validation.validationAuth.validationSetPassword
          }
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              <Components.Feature.FormInput
                name="password"
                label="Password"
                place="Enter password"
              />
              <Components.Feature.FormInput
                name="confirmPassword"
                label="Confirm Password"
                place="Confirm password"
              />
                <Components.Feature.Button className="primary" type="submit">
                  Continue
                </Components.Feature.Button>
            </Form>
          )}
        </Formik>
      </section>
    </Components.Feature.Container>
  );
};

export default SetPassword;
