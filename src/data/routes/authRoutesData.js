import * as Auth from '../../modules/auth';
const authRoutesData = [
  {
    title: '',
    path: 'log-in',
    element: Auth.SignIn,
  },
  {
    title: '',
    path: 'sign-up',
    element: Auth.SignUp,
  },
  {
    title: '',
    path: 'business-info',
    element: Auth.BusinessInfo,
  },
  {
    title: '',
    path: 'set-password',
    element: Auth.SetPassword,
  },
  {
    title: '',
    path: 'verify-email',
    element: Auth.VerifyEmail,
  },
  {
    title: '',
    path: 'forgot-password/verification',
    element: Auth.Verification,
  },
  {
    title: '',
    path: 'forgot-password/Code',
    element: Auth.VerificationCode,
  },
  {
    title: '',
    path: 'forgot-password/set-new-password',
    element: Auth.SetNewPassword,
  },
];

export default authRoutesData;
