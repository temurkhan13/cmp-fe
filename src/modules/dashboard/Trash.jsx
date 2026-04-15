import TrashModule from '../../components/dashboard/TrashModule';
import Header from '../../components/dashboard/Header';
import DashboardLayout from '../../layout/DashboardLayout';
import PageHeader from '../../components/common/PageHeader';
const Trash = () => {
  return (
    <DashboardLayout>
      <Header />
      <PageHeader title="Trash" />
      <TrashModule />
    </DashboardLayout>
  );
};

export default Trash;
