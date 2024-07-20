import React from 'react';
import {
  FaUser,
  FaEnvelope,
  FaSms,
  FaMailBulk,
  FaAddressBook,
  FaCog,
} from 'react-icons/fa';

const cardData = [
  {
    icon: <FaUser size={40} />,
    title: 'My account',
    description: 'Create and manage your Brevo account',
  },
  {
    icon: <FaEnvelope size={40} />,
    title: 'Email campaigns',
    description:
      'Engage your contacts using the best mobile-friendly email design tools',
  },
  {
    icon: <FaSms size={40} />,
    title: 'WhatsApp & SMS',
    description:
      'Connect directly with your contacts using targeted WhatsApp & SMS messages',
  },
  {
    icon: <FaMailBulk size={40} />,
    title: 'Transactional emails',
    description:
      'Send one-to-one emails with optimal deliverability and powerful tracking',
  },
  {
    icon: <FaAddressBook size={40} />,
    title: 'Contacts',
    description:
      'Manage and segment your contacts for perfectly targeted campaigns',
  },
  {
    icon: <FaCog size={40} />,
    title: 'Automation',
    description:
      'Automate your marketing using emails, SMS, website tracking & more',
  },
];

const HelpCenterComp = () => {
  return (
    <div className="help-center">
      <h2>We&apos;re here to help</h2>
      <input type="text" placeholder="Search" />
      <div className="cards">
        {cardData.map((card, index) => (
          <div key={index} className="card">
            {card.icon}
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
      <style>{`
        .help-center {
          text-align: center;
          font-size: 2rem;
          margin-top: 3rem;
        }
        .help-center input {
          margin: 20px auto;
          padding: 10px;
          width: 300px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        .cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          justify-content: center;
          margin:2rem;
        }
        .card {
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          color:black;
          transition: background-color 0.3s, color 0.3s;
          
        }
        .card:hover {
          background-color: #C3E11D;
          color: black;
        }
        .card h3 {
          margin-top: 10px;
          font-size: 18px;
        }
        .card p {
          font-size: 14px;
          color: #666;
        }
      `}</style>
    </div>
  );
};

export default HelpCenterComp;
