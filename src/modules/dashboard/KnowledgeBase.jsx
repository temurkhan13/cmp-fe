import DashboardLayout from '../../layout/DashboardLayout';
import Header from '../../components/dashboard/Header';
import RAGUpload from '../../components/dashboard/RAGUpload';

const KnowledgeBase = () => {
  return (
    <DashboardLayout>
      <Header />
      <RAGUpload />
    </DashboardLayout>
  );
};

export default KnowledgeBase;
