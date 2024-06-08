import DashboardLayout from '../../layout/DashboardLayout';
import Component from '../../components';

const DashboardHome = () => {
  return (
    <DashboardLayout>
      <Component.Dashboard.Header />
      <Component.Dashboard.AssistantBar />
      <Component.Dashboard.FileStructure />
      <Component.Dashboard.FolderStructure />
    </DashboardLayout>
  );
};

export default DashboardHome;
