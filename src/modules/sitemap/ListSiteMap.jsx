import Components from '../../components';
import DashboardLayout from '../../layout/DashboardLayout';
import PageHeader from '../../components/common/PageHeader';

function ListSiteMap() {
  return (
    <DashboardLayout>
      <Components.Dashboard.Header />
      <PageHeader title="Sitemap" />
      <Components.Sitemap.SitemapList />
    </DashboardLayout>
  );
}

export default ListSiteMap;
