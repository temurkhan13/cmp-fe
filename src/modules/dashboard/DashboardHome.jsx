import DashboardLayout from '@layout/DashboardLayout';
import Header from '../../components/dashboard/Header';
import DashboardHomeComp from '../../components/dashboard/dashboardHomeComponents/index';

const DashboardHome = () => {
  return (
    <DashboardLayout>
      <Header />
      <DashboardHomeComp />
    </DashboardLayout>
  );
};

export default DashboardHome;
