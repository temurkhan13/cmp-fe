import DashboardLayout from '@layout/DashboardLayout';
import Header from '../../components/dashboard/Header';
import DashboardHomeComp from '../../components/dashboard/dashboardHomeComponents/index';
import EmailVerificationHandler from '../auth/EmailVerificationHandler';
import PageHeader from '../../components/common/PageHeader';

const DashboardHome = () => {
  return (
    <DashboardLayout>
      <EmailVerificationHandler />
      <Header />
      <PageHeader title="Dashboard" />
      <DashboardHomeComp />
    </DashboardLayout>
  );
};

export default DashboardHome;
