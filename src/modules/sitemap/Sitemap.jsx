import React from 'react';
import Components from '../../components';
import { ReactFlowProvider } from '@xyflow/react';
import { useParams } from 'react-router-dom';

function Sitemap() {
  let param = useParams();
  return (
    <div className="assessmentChat">
      <Components.Common.Header />
      <div style={{ height: '90vh', width: '100%' }}>
        <ReactFlowProvider>
          <Components.Sitemap.SitemapLayoutFlow id={param?.id} />
        </ReactFlowProvider>
      </div>
    </div>
  );
}

export default Sitemap;
