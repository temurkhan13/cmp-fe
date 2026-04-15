import DashboardLayout from '@layout/DashboardLayout';
import Header from '../../components/dashboard/Header';
import MyAssessmentComp from '../../components/dashboard/MyAssessmentComp';
import PageHeader from '../../components/common/PageHeader';

const MyAssessments = () => {
  return (
    <DashboardLayout>
      <Header />
      <PageHeader title="My Assessments" />
      <MyAssessmentComp />
    </DashboardLayout>
  );
};

export default MyAssessments;
