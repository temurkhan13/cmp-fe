import React from 'react';
import Components from '../../components';
import { ReactFlowProvider } from '@xyflow/react';

function Sitemap() {
  return (
    <div className="assessmentChat">
      <Components.Common.Header />
      <div style={{ height: '90vh', width: '100%' }}>
        <ReactFlowProvider>
          <Components.Sitemap.SitemapLayoutFlow />
        </ReactFlowProvider>
      </div>
    </div>
  );
}

export default Sitemap;
