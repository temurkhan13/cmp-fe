import DashboardLayout from '@layout/DashboardLayout';
import FeedbackComponent from '../../components/dashboard/Feedback';
import Header from '../../components/dashboard/Header';

const radioOptions = [
  {
    label: 'Assisstant Chat',
    checkboxes: [
      'Version History',
      'Gallery',
      'Comment',
      'Bookmark',
      'Share Links',
    ],
  },
  {
    label: 'Assessment Chat',
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
    label: 'Sitemap',
    checkboxes: ['Improve Layouts', 'Improve Al Responses', 'Comments'],
  },
  {
    label: 'Wireframes',
    checkboxes: ['-----'],
  },
];

const Feedback = () => {
  return (
    <DashboardLayout>
      <Header />
      <FeedbackComponent
        welcomeNote="Welcome to the Feedback Form!"
        radioOptions={radioOptions}
      />
    </DashboardLayout>
  );
};

export default Feedback;
