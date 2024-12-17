import DashboardLayout from '@layout/DashboardLayout';
import Components from '../../components';
const DigitalPlaybook = () => {
  return (
    <DashboardLayout>
      <Components.Dashboard.Header />
      <Components.Sitemap.PlaybookList />
    </DashboardLayout>
  );
};

export default DigitalPlaybook;
