import { footerLogo } from '../../assets';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-sections">
          <div className="footer-brand">
            <img
              className="footer-logo"
              src={footerLogo}
              alt="Change.ai Logo"
            />
            <h2 className="footer-title">Change.ai</h2>
          </div>
          {footerLinks.map((section) => (
            <ul key={section.title} className="footer-section">
              <li className="footer-section-title">{section.title}</li>
              {section.links.map((link, index) => (
                <a key={index} href={link.href}>
                  {link.label}
                </a>
              ))}
            </ul>
          ))}
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-links">
            {bottomLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </div>
          <div className="footer-socials">
            <SocialIcon href="#" icon={<FaFacebook />} label="Facebook" />
            <SocialIcon href="#" icon={<FaInstagram />} label="Instagram" />
            <SocialIcon href="#" icon={<FaTwitter />} label="Twitter" />
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ href, icon, label }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="footer-icon" aria-label={label}>
    {icon}
  </a>
);

const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'Login', href: '/log-in' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'AI Assistant', href: '/log-in' },
      { label: 'Assessments', href: '/log-in' },
      { label: 'Digital Playbook', href: '/log-in' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/log-in' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms' },
    ],
  },
  {
    title: 'Contact Us',
    links: [
      { label: '+45 987 164 681', href: 'tel:+45987164681' },
      { label: 'support@changeai.com', href: 'mailto:support@changeai.com' },
      { label: '12th Ave, Main St, LA', href: '#' },
    ],
  },
];

const bottomLinks = [
  { label: '© 2026 ChangeAI Inc', href: '#' },
  { label: 'Privacy Notice', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms' },
];

export default Footer;
