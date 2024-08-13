import React from 'react';
import Components from '../../components';
import DashboardLayout from '../../layout/DashboardLayout';

function ListSiteMap() {
  return (
    <DashboardLayout>
      <Components.Common.Header />
      <Components.Sitemap.SitemapList />
    </DashboardLayout>
  );
}

export default ListSiteMap;
