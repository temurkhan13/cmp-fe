import DashboardLayout from '../../layout/DashboardLayout';
import Header from '../../components/dashboard/Header';
import RAGUpload from '../../components/dashboard/RAGUpload';
import PageHeader from '../../components/common/PageHeader';

const KnowledgeBase = () => {
  return (
    <DashboardLayout>
      <Header />
      <PageHeader title="Knowledge Base" />
      <RAGUpload />
    </DashboardLayout>
  );
};

export default KnowledgeBase;
