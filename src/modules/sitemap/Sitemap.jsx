import Components from '../../components';
import { ReactFlowProvider } from '@xyflow/react';
import { useParams } from 'react-router-dom';
import styles from '../../../scss/modules/sitemap/sitemap.module.scss';
import '../../components/assessment/assessment.scss';

function Sitemap() {
  let param = useParams();
  return (
    <div className="assessmentChat">
      <Components.Common.Header siteMapId={param?.id} />
      <div className={styles['flow-container']}>
        <ReactFlowProvider>
          <Components.Sitemap.SitemapLayoutFlow id={param?.id} />
        </ReactFlowProvider>
      </div>
    </div>
  );
}

export default Sitemap;
