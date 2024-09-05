import Module from '../../modules';
const authRoutesData = [
  // singIn
  {
    title: '',
    path: 'log-in',
    element: Module.Auth.SignIn,
  },

  // sign up
  // 1. give email
  {
    title: '',
    path: 'sign-up',
    element: Module.Auth.SignUp,
  },

  // 2. business Info
  {
    title: '',
    path: 'business-info',
    element: Module.Auth.BusinessInfo,
  },

  // 3. set password
  {
    title: '',
    path: 'set-password',
    element: Module.Auth.SetPassword,
  },

  // 4. verification code
  {
    title: '',
    path: 'verify-email',
    element: Module.Auth.VerifyEmail,
  },

  //
  //
  // Forgot-Password
  // 1. Give Email
  {
    title: '',
    path: 'forgot-password/verification',
    element: Module.Auth.Verification,
  },

  // 2. Pass Verfication Code
  {
    title: '',
    path: 'forgot-password/Code',
    element: Module.Auth.VerificationCode,
  },

  // Set new Password
  {
    title: '',
    path: 'forgot-password/set-new-password',
    element: Module.Auth.SetNewPassword,
  },
];

export default authRoutesData;
