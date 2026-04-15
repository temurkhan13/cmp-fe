import { Link, useLocation } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

const routeLabels = {
  'dashboard': 'Dashboard',
  'aiAssistant': 'AI Assistant',
  'AiAssistant': 'AI Assistant',
  'myAssessments': 'My Assessments',
  'DigitalPlaybook': 'Digital Playbook',
  'digital-playbook': 'Digital Playbook',
  'PlanBilling': 'Plan & Billing',
  'HelpCenter': 'Help Center',
  'knowledge-base': 'Knowledge Base',
  'feedback': 'Feedback',
  'Trash': 'Trash',
  'trash': 'Trash',
  'settings': 'Settings',
  'assistant': 'AI Assistant',
  'chat': 'Chat',
  'assessment': 'Assessment',
  'sitemap': 'Sitemap',
  'playbook': 'Playbook',
  'list': 'List',
  'new': 'New',
};

const PageHeader = ({ title }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const crumbs = pathSegments.map((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/');
    const isLast = index === pathSegments.length - 1;
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}/.test(segment);
    const label = isUuid ? 'Details' : (routeLabels[segment] || segment);

    return { path, label, isLast };
  });

  return (
    <div className="page-header">
      <h1 className="page-header__title">{title}</h1>
      {crumbs.length > 1 && (
        <nav className="page-header__breadcrumbs">
          {crumbs.map((crumb, i) => (
            <span key={crumb.path} className="page-header__crumb">
              {i > 0 && <FiChevronRight size={14} className="page-header__separator" />}
              {crumb.isLast ? (
                <span className="page-header__crumb--active">{crumb.label}</span>
              ) : (
                <Link to={crumb.path} className="page-header__crumb-link">
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </nav>
      )}

      <style>{`
        .page-header {
          padding: 1rem 3rem;
        }
        .page-header__title {
          font-size: 3rem;
          font-weight: bold;
          color: #333;
          margin: 0;
        }
        .page-header__breadcrumbs {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 0.25rem;
          font-size: 1.3rem;
          color: #6b7280;
          font-family: Poppins, sans-serif;
        }
        .page-header__crumb {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .page-header__separator {
          color: #d1d5db;
        }
        .page-header__crumb--active {
          color: #111;
          font-weight: 500;
        }
        .page-header__crumb-link {
          color: #6b7280;
          text-decoration: none;
        }
        .page-header__crumb-link:hover {
          color: #111;
        }
      `}</style>
    </div>
  );
};

export default PageHeader;
