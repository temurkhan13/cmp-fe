import DashboardLayout from '@layout/DashboardLayout';
import Header from '../../components/dashboard/Header';
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
