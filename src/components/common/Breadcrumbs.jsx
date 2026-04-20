import { Link, useLocation } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import './common.scss';

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

const Breadcrumbs = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  if (pathSegments.length <= 1) return null;

  const crumbs = pathSegments.map((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/');
    const isLast = index === pathSegments.length - 1;
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}/.test(segment);
    const label = isUuid ? 'Details' : (routeLabels[segment] || segment);

    return { path, label, isLast };
  });

  return (
    <nav className="breadcrumbs-nav">
      {crumbs.map((crumb, i) => (
        <span key={crumb.path} className="breadcrumbs-segment">
          {i > 0 && <FiChevronRight size={14} className="breadcrumbs-separator" />}
          {crumb.isLast ? (
            <span className="breadcrumbs-current">{crumb.label}</span>
          ) : (
            <Link to={crumb.path} className="breadcrumbs-link">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
