import DashboardLayout from '@layout/DashboardLayout';
import Components from '../../components';
const DigitalPlaybook = () => {
  return (
    <DashboardLayout>
      <Components.Common.Header />
      <Components.Sitemap.PlaybookList />
    </DashboardLayout>
  );
};

export default DigitalPlaybook;
