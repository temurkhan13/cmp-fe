import * as Yup from "yup";

const email = Yup.string().email("Email is invalid").required("Required");
const password = Yup.string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters long")
  .matches(
    /^(?=.*[!@#$%^&*])/,
    "Password must contain at least one special character"
  );
const confirmPassword = Yup.string()
  .required("Confirm Password is required")
  .oneOf([Yup.ref("password")], "Passwords must match");

// Sign IN
const validationSignIn = Yup.object({
  email,
  password,
});
// Sign Up
const validationSignUp = Yup.object({
  email,
});
// Set Password
const validationSetPassword = Yup.object({
  password,
  confirmPassword,
});     

const validationAuth = {
  validationSignIn,
  validationSignUp,
  validationSetPassword,
};

export default validationAuth;
