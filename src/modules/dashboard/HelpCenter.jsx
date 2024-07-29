import Header from '../../components/dashboard/Header';
import HelpCenterComp from '../../components/dashboard/HelpCenterComp';
import DashboardLayout from '../../layout/DashboardLayout';

const HelpCenter = () => {
  return (
    <DashboardLayout>
      <Header />
      <HelpCenterComp />
    </DashboardLayout>
  );
};

export default HelpCenter;
