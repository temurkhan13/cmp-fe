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
        .selected-workspace-name{
      position:absolute;
      top:2rem;
      left:4rem;
    p{
    font-size:1.5rem;
    font-weight:600;
    span{
    padding:1rem;
    background-color:#f5f5f5;
    border-radius:1rem;
    border:1px solid gray;
    }
    }
      }`}
      </style>
    </div>
  );
}

export default Sitemap;
