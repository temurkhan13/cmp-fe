import React from 'react';

const sitemapRoutesData = [
  {
    title: 'Sitemap',
    path: '/sitemap/list',
    element: React.lazy(() => import('../../modules/sitemap/ListSiteMap')),
  },
  {
    title: 'Sitemap New',
    path: '/sitemap/new',
    element: React.lazy(() => import('../../modules/sitemap/Sitemap')),
  },
  {
    title: 'Sitemap Detail',
    path: '/sitemap/:id',
    element: React.lazy(() => import('../../modules/sitemap/Sitemap')),
  },
  {
    title: 'Digital Playbook',
    path: '/digital-playbook/list',
    element: React.lazy(() => import('../../modules/dashboard/DigitalPlaybook')),
  },
  {
    title: 'Playbook Editor',
    path: '/playbook/:id',
    element: React.lazy(() => import('../../modules/playbook/PlaybookEditorPage')),
  },
];

export default sitemapRoutesData;
