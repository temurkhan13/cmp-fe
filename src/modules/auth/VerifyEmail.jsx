import React from "react";
import Components from "../../components";
import data from "../../data";
import { Formik, Form } from "formik";

const VerifyEmail = () => {
  const initalValues = {
    verificationCode: "",
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
            onSubmit={(values, { resetForm }) => {
              console.log(values);
              resetForm();
            }}
          >
            {(formik) => (
              <Form>
                <Components.Feature.FormInput
                  name="verificationCode"
                  label="Verification Code"
                  place="Enter 6-digit code"
                />
              </Form>
            )}
          </Formik>
        </section>
      </Components.Feature.Container>
    </>
  );
};

export default VerifyEmail;
