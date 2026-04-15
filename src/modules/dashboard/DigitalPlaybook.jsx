import DashboardLayout from '@layout/DashboardLayout';
import Components from '../../components';
import PageHeader from '../../components/common/PageHeader';
const DigitalPlaybook = () => {
  return (
    <DashboardLayout>
      <Components.Dashboard.Header />
      <PageHeader title="Digital Playbook" />
      <Components.Sitemap.PlaybookList />
    </DashboardLayout>
  );
};

export default DigitalPlaybook;
