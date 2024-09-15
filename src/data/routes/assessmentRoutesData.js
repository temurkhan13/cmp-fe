import React from 'react';

const assessmentRoutesData = [
  {
    title: '',
    path: '/assessment/chat',
    element: React.lazy(() => import('../../modules/assessment/Chat')),
  },
  {
    title: '',
    path: '/questionnaire',
    element: React.lazy(() => import('../../modules/assessment/Questionnaire')),
  },
];

export default assessmentRoutesData;
