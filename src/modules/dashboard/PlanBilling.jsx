import DashboardLayout from '../../layout/DashboardLayout';
import PlanAndBilling from '../../components/dashboard/PlanAndBilling';
import Header from '../../components/dashboard/Header';
import PageHeader from '../../components/common/PageHeader';
const PlanBilling = () => {
  return (
    <DashboardLayout>
      <Header />
      <PageHeader title="Plan & Billing" />
      <PlanAndBilling />
    </DashboardLayout>
  );
};

export default PlanBilling;
