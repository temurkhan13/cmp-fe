import Header from '../../components/dashboard/Header';
import HelpCenterComp from '../../components/dashboard/HelpCenterComp';
import DashboardLayout from '../../layout/DashboardLayout';
import PageHeader from '../../components/common/PageHeader';

const HelpCenter = () => {
  return (
    <DashboardLayout>
      <Header />
      <PageHeader title="Help Center" />
      <HelpCenterComp />
    </DashboardLayout>
  );
};

export default HelpCenter;
