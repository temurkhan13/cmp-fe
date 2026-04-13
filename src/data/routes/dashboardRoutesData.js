import React from 'react';

const dashboardRoutesData = [
  {
    title: '',
    path: '/dashboard',
    element: React.lazy(() => import('../../modules/dashboard/DashboardHome')),
  },
  {
    title: '',
    path: '/dashboard/aiAssistant',
    element: React.lazy(() => import('../../modules/dashboard/AiAssistant')),
  },
  {
    title: '',
    path: '/dashboard/DigitalPlaybook',
    element: React.lazy(() => import('../../modules/dashboard/DigitalPlaybook')),
  },
  {
    title: '',
    path: '/dashboard/feedback',
    element: React.lazy(() => import('../../modules/dashboard/Feedback')),
  },
  {
    title: '',
    path: '/dashboard/HelpCenter',
    element: React.lazy(() => import('../../modules/dashboard/HelpCenter')),
  },
  {
    title: '',
    path: '/dashboard/myAssessments',
    element: React.lazy(() => import('../../modules/dashboard/MyAssessments')),
  },
  {
    title: '',
    path: '/dashboard/PlanBilling',
    element: React.lazy(() => import('../../modules/dashboard/PlanBilling')),
  },
  {
    title: '',
    path: '/dashboard/trash',
    element: React.lazy(() => import('../../modules/dashboard/Trash')),
  },
  {
    title: '',
    path: '/dashboard/settings',
    element: React.lazy(() => import('../../modules/dashboard/Settings')),
  },
  {
    title: '',
    path: '/dashboard/knowledge-base',
    element: React.lazy(() => import('../../modules/dashboard/KnowledgeBase')),
  },
];

export default dashboardRoutesData;
