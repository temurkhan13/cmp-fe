import DashboardLayout from '@layout/DashboardLayout';
import FeedbackComponent from '../../components/dashboard/Feedback';
import Header from '../../components/dashboard/Header';
import PageHeader from '../../components/common/PageHeader';

const radioOptions = [
  {
    label: 'AI Assistant',
    checkboxes: [
      'Version History',
      'Gallery',
      'Comment',
      'Bookmark',
      'Share Links',
    ],
  },
  {
    label: 'AI Assessment',
    checkboxes: [
      'Version History',
      'Reports',
      'Gallery',
      'Comment',
      'Bookmark',
      'Import Reports',
    ],
  },
  {
    label: 'Digital Playbook',
    checkboxes: ['Improve Layouts', 'Improve Al Responses', 'Comments'],
  },
  // {
  //   label: 'Wireframes',
  //   checkboxes: ['-----'],
  // },
];

const Feedback = () => {
  return (
    <DashboardLayout>
      <Header />
      <PageHeader title="Feedback" />
      <FeedbackComponent
        welcomeNote="Welcome to the Feedback Form!"
        radioOptions={radioOptions}
      />
    </DashboardLayout>
  );
};

export default Feedback;
