import React from 'react';
import Module from '../../modules/index.js';

const assessmentRoutesData = [
  {
    title: '',
    path: '/assessment/chat',
    element: React.lazy(() => import('../../modules/assessment/Chat')),
  },
  {
    title: '',
    path: '/assessment/chat/:id',
    element: React.lazy(() => import('../../modules/assessment/Chat')),
  },
  {
    title: '',
    path: '/questionnaire',
    element: React.lazy(() => import('../../modules/assessment/Questionnaire')),
  },
];

export default assessmentRoutesData;
