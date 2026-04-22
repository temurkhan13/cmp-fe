import * as Auth from '../../modules/auth';
const plainRoutesData = [
  {
    title: '',
    path: 'choose-plan',
    element: Auth.ChoosePlain,
  },
  {
    title: '',
    path: 'check-out',
    element: Auth.CheckOut,
  },
  {
    title: '',
    path: 'success',
    element: Auth.PaymentSuccess,
  },
];

export default plainRoutesData;
