import DashboardLayout from '../../layout/DashboardLayout';
import SettingsTabs from '../../components/dashboard/DashboardSettings/index';
import Header from '../../components/dashboard/Header';

const Settings = () => {
  return (
    <DashboardLayout>
      <Header />
      <SettingsTabs />
    </DashboardLayout>
  );
};

export default Settings;
