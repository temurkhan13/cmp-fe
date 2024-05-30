import Components from "../../components";
import data from "../../data";
import { Formik, Form } from "formik";
import { useLocation } from "react-router-dom";
import useRegister from "../../hooks/useLogin";

const VerifyEmail = () => {
  const location = useLocation();
  const { register } = useRegister();
  const { email, password, confirmPassword } = location.state;

  const initalValues = {
    verificationCode: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const { verificationCode } = values;
    setSubmitting(false);

    try {
      if (email && password && confirmPassword && verificationCode) {
        await register(email, password, verificationCode);
        resetForm();
      }
      console.log(
        "verify email",
        email,
        password,
        confirmPassword,
        verificationCode
      );
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <>
      <Components.Feature.Container className="auth signIn">
        <header>
          <Components.Feature.Heading className="primary mb_primary">
            Verify your Email
          </Components.Feature.Heading>
          <Components.Feature.Text className="primary--light mb_Tertiary">
            We sent you a six digit confirmation code to example@gmail.com.
            Please enter it below to confirm your email address.
          </Components.Feature.Text>
        </header>
        <section>
          <Formik
            initialValues={initalValues}
            validateOnMount
            validationSchema={
              data.validation.validationAuth.validationVerificationCode
            }
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form>
                <Components.Feature.FormInput
                  name="verificationCode"
                  label="Verification Code"
                  place="Enter 6-digit code"
                />
                <Components.Feature.Button className="primary" type="submit">
                  Verify and Complete
                </Components.Feature.Button>
              </Form>
            )}
          </Formik>
        </section>
      </Components.Feature.Container>
    </>
  );
};

export default VerifyEmail;
