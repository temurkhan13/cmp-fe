import TrashModule from '../../components/dashboard/TrashModule';
import Header from '../../components/dashboard/Header';
import DashboardLayout from '../../layout/DashboardLayout';
const Trash = () => {
  return (
    <DashboardLayout>
      <Header />
      <TrashModule />
    </DashboardLayout>
  );
};

export default Trash;
