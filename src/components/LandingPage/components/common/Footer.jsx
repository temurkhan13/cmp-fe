import { footerLogo } from '../../assets';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="footer-container">
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
              <a key={index} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
          <div className="footer-socials">
            <SocialIcon href="#" icon={<FaFacebook />} />
            <SocialIcon href="#" icon={<FaInstagram />} />
            <SocialIcon href="#" icon={<FaTwitter />} />
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
            grid-template-columns: repeat(2, 1fr);
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
          align-items: center;
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
          color: black;
          transition: color 0.2s ease;
        }

        .footer-section a:hover {
          text-decoration: underline;
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

        .footer-bottom-links a {
          color: black;
          text-decoration: none;
          transition: color 0.2s ease;
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
      `}</style>
    </div>
  );
};

const SocialIcon = ({ href, icon }) => (
  <a href={href} className="footer-icon">
    {icon}
  </a>
);

const footerLinks = [
  // {
  //   title: 'Product',
  //   links: [
  //     { label: 'Login', href: '#' },
  //     { label: 'Pricing', href: '#' },
  //     { label: 'Copy AI Reviews', href: '#' },
  //     { label: 'Free AI Tools', href: '#' },
  //     { label: 'GPL licenses', href: '#' },
  //   ],
  // },
  // {
  //   title: 'Company',
  //   links: [
  //     { label: 'Blog', href: '#' },
  //     { label: 'Careers', href: '#' },
  //     { label: 'Community', href: '#' },
  //     { label: 'Twitter', href: '#' },
  //     { label: 'LinkedIn', href: '#' },
  //     { label: 'Affiliate Program', href: '#' },
  //   ],
  // },
  // {
  //   title: 'Support',
  //   links: [
  //     { label: 'Weekly Demos', href: '#' },
  //     { label: 'Report a Bug', href: '#' },
  //     { label: 'Report an Outage', href: '#' },
  //     { label: 'Privacy Policy', href: '#' },
  //     { label: 'Terms & Conditions', href: '#' },
  //   ],
  // },
  {
    title: 'Contact Us',
    links: [
      { label: '+45 987 164 681', href: '#' },
      { label: 'support@changeai.com', href: '#' },
      { label: '12th Ave, Main St, LA', href: '#' },
    ],
  },
];

const bottomLinks = [
  { label: '© 2024 Change.ai Inc', href: '#' },
  { label: 'Privacy Notice', href: '#' },
  { label: 'Terms of Service', href: '#' },
];

export default Footer;
