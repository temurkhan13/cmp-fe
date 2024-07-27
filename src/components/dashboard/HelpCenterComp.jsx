import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { MdDashboard, MdAssistant, MdAssessment } from 'react-icons/md';
import { BsFilePlayFill } from 'react-icons/bs';
import { FaSitemap, FaQuestionCircle } from 'react-icons/fa';
import heading from '../../assets/dashboard/heading.svg';

const HelpCenterComp = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const options = [
    { name: 'Dashboard', href: '#dashboard', icon: <MdDashboard /> },
    { name: 'Assistant Chat', href: '#assistant', icon: <MdAssistant /> },
    {
      name: 'Assessments/Reports',
      href: '#assessments',
      icon: <MdAssessment />,
    },
    { name: 'Digital Playbook', href: '#playbook', icon: <BsFilePlayFill /> },
    { name: 'Sitemaps', href: '#sitemaps', icon: <FaSitemap /> },
    {
      name: 'Frequently asked questions',
      href: '#faqs',
      icon: <FaQuestionCircle />,
    },
  ];

  const sections = [
    {
      id: 'dashboard',
      title: 'AI Introduction',
      content: (
        <div>
          <p>Artificial Intelligence (AI) refers to the simulation...</p>
          <img
            src="path/to/image1.jpg"
            alt="AI"
            style={{ width: '100%', borderRadius: '8px' }}
          />
          <a href="#" style={{ color: '#007bff', textDecoration: 'underline' }}>
            Learn more
          </a>
        </div>
      ),
      style: { backgroundColor: '#f0f8ff', padding: '2rem' },
    },
    {
      id: 'assistant',
      title: 'Assistant Chat',
      content: (
        <div>
          <p>Discover how AI can assist in real-time conversations...</p>
          <ul>
            <li>Real-time responses</li>
            <li>Seamless integration</li>
          </ul>
          <img
            src="path/to/image2.jpg"
            alt="Chat"
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </div>
      ),
      style: { backgroundColor: '#faebd7', padding: '2rem' },
    },
  ];

  const handleOptionClick = (index) => {
    setActiveSection(index);
    // setSidebarOpen(false);
  };

  return (
    <div className="helpcenter-wrapper">
      <div
        className={`helpcenter-sidebar ${sidebarOpen ? 'open' : ''}`}
        onClick={!sidebarOpen ? toggleSidebar : null}
      >
        <button onClick={toggleSidebar} className="sidebar-toggle">
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        {options.map((option, index) => (
          <div
            key={index}
            className={`sidebar-option ${index === 0 ? 'first' : ''} ${
              index === options.length - 1 ? 'last' : ''
            }`}
            onClick={() => handleOptionClick(index)}
          >
            <span
              style={{
                marginLeft: '0.5rem',
                marginRight: '0.5rem',
                color: 'gray',
                fontSize: '1.8rem',
              }}
            >
              {option.icon}
            </span>
            <a href={option.href}>{option.name}</a>
          </div>
        ))}
      </div>
      <div
        className={`section-content ${
          sidebarOpen ? 'sidebar-open' : 'sidebar-closed'
        }`}
      >
        <div className="help-Heading">
          Revolutionizing world through smart Innovation
        </div>
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className={`content-section ${
              activeSection === index ? 'active' : ''
            }`}
            style={activeSection === index ? section.style : {}}
          >
            <h2>{section.title}</h2>
            {section.content}
          </section>
        ))}
      </div>
      <style>{`
        .helpcenter-wrapper {
          display: flex;
          align-items: flex-start;
          position: relative;
        }
        .help-Heading {
          padding: 5rem;
          width: 100%;
          font-size: 3.5rem;
          font-weight: 600;
          text-align: center;
          margin-bottom: 2rem;
          color: white;
          border-radius: 2rem;
          background-image: url(${heading});
          background-repeat: no-repeat;
          background-size: cover;
        }
        .helpcenter-sidebar {
          position: fixed;
          top: 50%;
          right: 0;
          width: 25rem;
          height: 80vh;
          overflow-y: auto;
          z-index: 1000;
          display: flex;
          border-radius: 1rem;
          flex-direction: column;
          transition: transform 0.3s ease;
          transform: translateY(-50%) translateX(84%);
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        }
        .helpcenter-sidebar.open {
          transform: translateY(-50%) translateX(0);
        }
        .sidebar-toggle {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.7rem;
          z-index: 1001;
        }
        .sidebar-option {
          display: flex;
          align-items: center;
          padding-left: 1rem;
          width: 100%;
          transition: all 0.2s ease-in-out;
          padding: 1rem 0.8rem;
          border-radius: 0.8rem;
          span {
            display: flex;
          }
        }
        .sidebar-option:hover {
          background-color: #ccc;
          color: #0B1444;
          cursor: pointer;
        }
        .sidebar-option.first {
          margin-top: 4rem;
        }
        .sidebar-option.last {
          margin-bottom: 3rem;
        }
        .sidebar-option a {
          text-decoration: none;
          font-size: 1.4rem;
          color: #0B1444;
          margin-left: 0.5rem;
        }
        .section-content {
          margin-right: 25rem; 
          text-align: justify;
          margin-left: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          flex-grow: 1;
          overflow-y: auto;
          transition: margin-right 0.3s ease;
        }
        .section-content.sidebar-closed {
          margin-right: 6rem; 
        }
        .content-section {
          display: none;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }
        .content-section.active {
          display: block;
          opacity: 1;
        }
        .helpcenter-sidebar::-webkit-scrollbar {
          width: 8px;
        }
        .helpcenter-sidebar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .helpcenter-sidebar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default HelpCenterComp;
