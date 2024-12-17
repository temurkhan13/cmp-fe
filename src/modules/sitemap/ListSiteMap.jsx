import Components from '../../components';
import DashboardLayout from '../../layout/DashboardLayout';

function ListSiteMap() {
  return (
    <DashboardLayout>
      <Components.Dashboard.Header />
      <Components.Sitemap.SitemapList />
    </DashboardLayout>
  );
}

export default ListSiteMap;
