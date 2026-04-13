import * as Yup from "yup";

const email = Yup.string().email("Email is invalid").required("Required");
const password = Yup.string()
  .required("Required")
  .min(8, "Password must be at least 8 characters long")
  .matches(
    /^(?=.*[!@#$%^&*])/,
    "Password must contain at least one special character"
  );
const confirmPassword = Yup.string()
  .required("Required")
  .oneOf([Yup.ref("password")], "Passwords must match");

const name = Yup.string()
  .required("Required")
  .matches(/^[a-zA-Z\s]*$/, "Name must contain only letters and spaces")
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must be at most 50 characters")
  .notOneOf(
    ["", null, undefined, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    "Name cannot be a number"
  );

// Sign IN
const validationSignIn = Yup.object({
  email,
  password,
});
// Sign Up
const signupValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .required('Last name is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*[!@#$%^&*])/, 'Password must contain at least one special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  companyName: Yup.string()
    .min(2, 'Company name must be at least 2 characters')
    .required('Company name is required'),
});
const validationSignUp = signupValidationSchema;
// Sign IN
const validationForgetPassword = Yup.object({
  email
});
// Set Password
const validationSetPassword = Yup.object({
  password,
  confirmPassword,
});     

// Verification code

const validationVerificationCode = Yup.object({
  verificationCode: Yup.string()
    .required("Verification code is required")
    .matches(/^\d{6}$/, "Verification code must be exactly 6 digits"),
});
// Reset Password 
const validationResetPassword = Yup.object({
  otp: Yup.string()
    .required("Verification code is required")
    .matches(/^\d{6}$/, "Verification code must be exactly 6 digits"),
    password
});
// Pay with Card

const validationPayWithCard = Yup.object().shape({
  email,
  name,
  cardNumber: Yup.string()
    .matches(/^\d{16}$/, "Invalid card number")
    .required("Required"),
  expiryDate: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date")
    .required("Required"),
  cvc: Yup.string()
    .matches(/^\d{3}$/, "Invalid CVC")
    .required("Required"),
  country: Yup.string().required("Required"),
  zipCode: Yup.string().required("Required"),
});

// Business Info
const validationBusinessInfo = Yup.object().shape({
  name,
  lastName: Yup.string()
    .required("Required")
    .matches(/^[a-zA-Z\s]*$/, "Last name must contain only letters and spaces")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be at most 50 characters")
    .notOneOf(
      ["", null, undefined, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      "Last name cannot be a number"
    ),
  role: Yup.string()
    .required("Required")
    .matches(/^[a-zA-Z\s]*$/, "Role must contain only letters and spaces")
    .min(2, "Role must be at least 2 characters")
    .max(50, "Role must be at most 50 characters")
    .notOneOf(
      ["", null, undefined, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      "Role cannot be a number"
    ),
  industry: Yup.string()
    .required("Required")
    .matches(/^[a-zA-Z\s]*$/, "Role must contain only letters and spaces")
    .min(2, "Role must be at least 2 characters")
    .max(50, "Role must be at most 50 characters")
    .notOneOf(
      ["", null, undefined, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      "Role cannot be a number"
    ),
  companySize: Yup.number()
    .required("Required")
    .typeError("Size must be a number")
    .positive("Size must be a positive number")
    .integer("Size must be an integer")
    .min(10, "Company must have at least 10 employees"),
  companyName: Yup.string()
    .required("Required")
    .matches(
      /^[a-zA-Z\s]*$/,
      "Company name must contain only letters and spaces"
    )
    .min(2, "Company name must be at least 2 characters")
    .max(50, "Company name must be at most 50 characters")
    .notOneOf(
      ["", null, undefined, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      "Company name cannot be a number"
    ),
  websiteURL: Yup.string().required("Required").url("Invalid URL format"),
  jobTitle: Yup.string()
    .required("Required")
    .matches(/^[a-zA-Z\s]*$/, "Job title must contain only letters and spaces")
    .min(2, "Job title must be at least 2 characters")
    .max(50, "Job title must be at most 50 characters")
    .notOneOf(
      ["", null, undefined, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      "Job title cannot be a number"
    ),
});

const validationAuth = {
  validationSignIn,
  validationSignUp,
  validationVerificationCode,
  validationSetPassword,
  validationPayWithCard,
  validationBusinessInfo,
  validationForgetPassword,
  validationResetPassword
};

export default validationAuth;