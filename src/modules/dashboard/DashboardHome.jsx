import DashboardLayout from '@layout/DashboardLayout';
import Header from '../../components/dashboard/Header';
import DashboardHomeComp from '../../components/dashboard/DashboardHomeComp';
import EmailVerificationHandler from '../auth/EmailVerificationHandler';

const DashboardHome = () => {
  return (
    <DashboardLayout>
      <EmailVerificationHandler />
      <Header />
      <DashboardHomeComp />
    </DashboardLayout>
  );
};

export default DashboardHome;
