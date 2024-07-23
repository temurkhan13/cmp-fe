import { useState } from 'react';
import {
  FaBars,
  FaTimes,
  FaApple,
  FaAndroid,
  FaWindows,
  FaLinux,
  FaChrome,
  FaFirefox,
  FaSafari,
  FaEdge,
  FaInternetExplorer,
  FaOpera,
  FaMicrosoft,
} from 'react-icons/fa';
import heading from '../../assets/dashboard/heading.svg';

const HelpCenterComp = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const options = [
    {
      name: 'Introduction to AI',
      href: '#section1',
      icon: <FaApple />,
    },
    {
      name: 'Machine Learning Overview',
      href: '#section2',
      icon: <FaAndroid />,
    },
    {
      name: 'Deep Learning Basics',
      href: '#section3',
      icon: <FaWindows />,
    },
    {
      name: 'Neural Networks',
      href: '#section4',
      icon: <FaLinux />,
    },
    {
      name: 'AI Applications',
      href: '#section5',
      icon: <FaChrome />,
    },
    {
      name: 'Future of AI',
      href: '#section6',
      icon: <FaFirefox />,
    },
    {
      name: 'AI in Healthcare',
      href: '#section7',
      icon: <FaSafari />,
    },
    {
      name: 'AI in Finance',
      href: '#section8',
      icon: <FaEdge />,
    },
    {
      name: 'AI in Robotics',
      href: '#section9',
      icon: <FaInternetExplorer />,
    },
    {
      name: 'Ethics in AI',
      href: '#section10',
      icon: <FaOpera />,
    },
    {
      name: 'AI Research',
      href: '#section11',
      icon: <FaMicrosoft />,
    },
    {
      name: 'AI Startups',
      href: '#section12',
      icon: <FaApple />,
    },
    {
      name: 'AI Conferences',
      href: '#section13',
      icon: <FaAndroid />,
    },
    {
      name: 'AI Tools',
      href: '#section14',
      icon: <FaWindows />,
    },
    {
      name: 'Getting Started with AI',
      href: '#section15',
      icon: <FaLinux />,
    },
  ];

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
        <section id="section1">
          <h2>AI Introduction</h2>
          <p>
            Artificial Intelligence (AI) refers to the simulation of human
            intelligence in machines... AI involves creating systems that can
            perform tasks that typically require human intelligence... The
            concept of AI dates back to ancient history, with myths and stories
            about intelligent automata... AI has various applications across
            different industries, including healthcare, finance, and more...
            Technologies such as machine learning, deep learning, and neural
            networks are integral to AI...
          </p>
        </section>
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
          span{
          display:flex;
          }
        }
        .sidebar-option:hover {
          background-color: #ccc;
          color: black;
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
          color: #333;
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
