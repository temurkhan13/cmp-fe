import DashboardLayout from '@layout/DashboardLayout';
import Header from '../../components/common/Header';
import MyAssessmentComp from '../../components/dashboard/MyAssessmentComp';

const MyAssessments = () => {
  return (
    <DashboardLayout>
      <Header />
      <MyAssessmentComp />
    </DashboardLayout>
  );
};

export default MyAssessments;
