import React from 'react';

const assisstantRoutesData = [
  {
    title: '',
    path: '/assistant/chat',
    element: React.lazy(() => import('../../modules/assisstent/Chat')),
  },
  {
    title: '',
    path: '/assistant/chat/:id',
    element: React.lazy(() => import('../../modules/assisstent/Chat')),
  },
];

export default assisstantRoutesData;
