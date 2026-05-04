import DashboardLayout from '../../layout/DashboardLayout';
import SettingsTabs from '../../components/dashboard/SettingsTabs';
import Header from '../../components/dashboard/Header';
import PageHeader from '../../components/common/PageHeader';

const Settings = () => {
  return (
    <DashboardLayout>
      <Header />
      <PageHeader title="Settings" />
      <SettingsTabs />
    </DashboardLayout>
  );
};

export default Settings;
