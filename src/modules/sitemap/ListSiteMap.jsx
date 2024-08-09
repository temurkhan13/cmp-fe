import React from 'react';
import Components from '../../components';

function ListSiteMap() {
  return (
    <div className="assessmentChat">
      <Components.Common.Header />
      <div style={{ height: '90vh', width: '100%' }}>
        <Components.Sitemap.SitemapList />
      </div>
    </div>
  );
}

export default ListSiteMap;
