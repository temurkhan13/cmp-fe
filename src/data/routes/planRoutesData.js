import * as Auth from '../../modules/auth';
const planRoutesData = [
  {
    title: '',
    path: 'choose-plan',
    element: Auth.ChoosePlan,
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

export default planRoutesData;
