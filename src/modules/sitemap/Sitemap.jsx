import Components from '../../components';
import { ReactFlowProvider } from '@xyflow/react';
import { useParams } from 'react-router-dom';

function Sitemap() {
  let param = useParams();
  return (
    <div className="assessmentChat">
      <Components.Common.Header siteMapId={param?.id} />
      <div style={{ height: '90vh', width: '100%' }}>
        <ReactFlowProvider>
          <Components.Sitemap.SitemapLayoutFlow id={param?.id} />
        </ReactFlowProvider>
      </div>
      <style>
        {`
        .selected-workspace-name {
          position: absolute;
          top: 2rem;
          left: 4rem;
        }
        .selected-workspace-name p {
          font-size: 1.5rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .selected-workspace-name .workspace-badge {
          background-color: #C3E11D;
          color: #0B1444;
          padding: 0.25rem 0.75rem;
          border-radius: 7px;
          font-size: 1.3rem;
          font-weight: 700;
        }`}
      </style>
    </div>
  );
}

export default Sitemap;
