import DashboardLayout from '@layout/DashboardLayout';
import Component from '@components';

const DashboardHome = () => {
  return (
    <DashboardLayout>
      <section className='recentFiles'>
        
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </section>
      {/* <Component.Dashboard.Header /> */}
      {/* <Component.Dashboard.AssistantBar /> */}
      {/* <Component.Dashboard.FileStructure /> */}
      {/* <Component.Dashboard.FolderStructure /> */}
    </DashboardLayout>
  );
};

export default DashboardHome;
