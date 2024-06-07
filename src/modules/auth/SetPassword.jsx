import React from "react";
import Components from "../../components";
import data from "../../data";
import { Formik, Form } from "formik";

const SetPassword = () => {
  const initalValues = {
    password: "",
    confirm_Password: "",
  };
  return (
    <Components.Feature.Container className="auth signIn">
      <header>
        <Components.Feature.Heading className="primary mb_primary">
          Set Password
        </Components.Feature.Heading>
        <Components.Feature.Text className="primary--light">
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
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            resetForm();
          }}
        >
          {(formik) => (
            <Form>
              <Components.Feature.FormInput
                name="password"
                label="Email"
                place="Enter your email"
              />
              <Components.Feature.FormInput
                name="confirm_Password"
                label="Email"
                place="Enter your email"
              />
              <Components.Feature.Button className="primary">
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
