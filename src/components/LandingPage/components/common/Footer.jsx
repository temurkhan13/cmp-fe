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
      <style>{`
        .footer-container {
          display: flex;
          flex-direction: column;
          padding: 1rem;
        }

        .footer-content {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          margin-bottom: 2.5rem;
          font-size: 1.4rem;
          font-weight: 500;
        }

        .footer-logo {
          background-color: #c3e11d;
          padding: 1rem 0.5rem;
          margin-left: 1.5rem;
          border-radius: 10px;
        }

        .footer-title {
          font-size: 2.5rem;
          margin-top: -0.4rem;
          margin-left: 1.5rem;
          font-weight: bold;
        }

        .footer-sections {
          display: grid;
          gap: 2.5rem;
          margin-bottom: 2.5rem;
        }

        @media screen and (min-width: 460px) {
          .footer-sections {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media screen and (min-width: 786px) {
          .footer-sections {
            grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr;
          }
        }
        .footer-brand{
        display: flex;
          flex-direction: column;
          align-items: center;
        }

        .footer-section {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.25rem;
        }

        .footer-section-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 0.75rem;
          list-style: none;
        }

        .footer-section a {
          text-decoration: none;
          color: #6b7280;
          transition: color 0.2s ease;
          font-size: 1.3rem;
          line-height: 2;
        }

        .footer-section a:hover {
          color: #111;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1.25rem;
          border-top: 2px solid #ddd;
        }

        .footer-bottom-links {
          display: flex;
          gap: 1rem;
          font-size: 1.4rem;
        }

        .footer-bottom-links li {
          color: black;
          text-decoration: none;
          transition: color 0.2s ease;
          list-style: none;
        }

        .footer-bottom-links a:hover {
          text-decoration: underline;
        }

        .footer-socials {
          display: flex;
          gap: 0.75rem;
          margin-right: 3rem;
        }

        .footer-socials a {
        color:black;
          font-size: 2.5rem;
          transition: color 0.2s ease;
        }

        .footer-socials a:hover {
          color: #000;
        }
        .footer-bottom-links a {
          color: #333;
          text-decoration: none;
        }
        .footer-bottom-links a:hover {
          text-decoration: underline;
        }
      `}</style>
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
