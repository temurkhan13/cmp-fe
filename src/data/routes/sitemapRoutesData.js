import Module from '../../modules';
const sitemapRoutesData = [
  {
    title: 'Sitemap',
    path: '/sitemap/list',
    element: Module.Sitemap.ListSiteMap,
  },
  {
    title: 'Sitemap New',
    path: '/sitemap/new',
    element: Module.Sitemap.Sitemap,
  },
  {
    title: 'Sitemap Detail',
    path: '/sitemap/:id',
    element: Module.Sitemap.Sitemap,
  },
];

export default sitemapRoutesData;
