import React from 'react';

const assistantRoutesData = [
  {
    title: '',
    path: '/assistant/chat',
    element: React.lazy(() => import('../../modules/assistant/Chat')),
  },
  {
    title: '',
    path: '/assistant/chat/:id',
    element: React.lazy(() => import('../../modules/assistant/Chat')),
  },
];

export default assistantRoutesData;
