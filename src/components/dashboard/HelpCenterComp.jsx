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

const HelpCenterComp = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const options = [
    {
      name: 'Introduction to AI',
      href: '#section1',
      icon: <FaApple size={26} style={{ marginRight: '1rem' }} />,
    },
    {
      name: 'Machine Learning Overview',
      href: '#section2',
      icon: <FaAndroid size={26} style={{ marginRight: '1rem' }} />,
    },
    {
      name: 'Deep Learning Basics',
      href: '#section3',
      icon: <FaWindows size={26} style={{ marginRight: '1rem' }} />,
    },
    {
      name: 'Neural Networks',
      href: '#section4',
      icon: <FaLinux size={26} style={{ marginRight: '1rem' }} />,
    },
    {
      name: 'AI Applications',
      href: '#section5',
      icon: <FaChrome size={26} style={{ marginRight: '1rem' }} />,
    },
    {
      name: 'Future of AI',
      href: '#section6',
      icon: <FaFirefox size={26} style={{ marginRight: '1rem' }} />,
    },
    {
      name: 'AI in Healthcare',
      href: '#section7',
      icon: <FaSafari size={26} style={{ marginRight: '1rem' }} />,
    },
    {
      name: 'AI in Finance',
      href: '#section8',
      icon: <FaEdge size={26} style={{ marginRight: '1rem' }} />,
    },
    {
      name: 'AI in Robotics',
      href: '#section9',
      icon: <FaInternetExplorer size={26} style={{ marginRight: '1rem' }} />,
    },
    {
      name: 'Ethics in AI',
      href: '#section10',
      icon: <FaOpera size={26} style={{ marginRight: '1rem' }} />,
    },
    {
      name: 'AI Research',
      href: '#section11',
      icon: <FaMicrosoft size={26} style={{ marginRight: '1rem' }} />,
    },
    {
      name: 'AI Startups',
      href: '#section12',
      icon: <FaApple size={26} style={{ marginRight: '1rem' }} />,
    },
    {
      name: 'AI Conferences',
      href: '#section13',
      icon: <FaAndroid size={26} style={{ marginRight: '1rem' }} />,
    },
    {
      name: 'AI Tools',
      href: '#section14',
      icon: <FaWindows size={26} style={{ marginRight: '1rem' }} />,
    },
    {
      name: 'Getting Started with AI',
      href: '#section15',
      icon: <FaLinux size={26} style={{ marginRight: '1rem' }} />,
    },
  ];

  return (
    <div className="helpcenter-wrapper">
      <div className={`helpcenter-sidebar ${sidebarOpen ? 'open' : ''}`}>
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
            {option.icon}
            <a href={option.href}>{option.name}</a>
          </div>
        ))}
      </div>
      <div
        className={`section-content ${
          sidebarOpen ? 'sidebar-open' : 'sidebar-closed'
        }`}
      >
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
            networks are integral to AI... Artificial Intelligence (AI) refers
            to the simulation of human intelligence in machines... AI involves
            creating systems that can perform tasks that typically require human
            intelligence... The concept of AI dates back to ancient history,
            with myths and stories about intelligent automata... AI has various
            applications across different industries, including healthcare,
            finance, and more... Technologies such as machine learning, deep
            learning, and neural networks are integral to AI... Artificial
            Intelligence (AI) refers to the simulation of human intelligence in
            machines... AI involves creating systems that can perform tasks that
            typically require human intelligence... The concept of AI dates back
            to ancient history, with myths and stories about intelligent
            automata... AI has various applications across different industries,
            including healthcare, finance, and more... Technologies such as
            machine learning, deep learning, and neural networks are integral to
            AI... Artificial Intelligence (AI) refers to the simulation of human
            intelligence in machines... AI involves creating systems that can
            perform tasks that typically require human intelligence... The
            concept of AI dates back to ancient history, with myths and stories
            about intelligent automata... AI has various applications across
            different industries, including healthcare, finance, and more...
            Technologies such as machine learning, deep learning, and neural
            networks are integral to AI...
          </p>
        </section>
        <section id="section2">
          <h2>AI Introduction</h2>
          <p>
            Artificial Intelligence (AI) refers to the simulation of human
            intelligence in machines... AI involves creating systems that can
            perform tasks that typically require human intelligence... The
            concept of AI dates back to ancient history, with myths and stories
            about intelligent automata... AI has various applications across
            different industries, including healthcare, finance, and more...
            Technologies such as machine learning, deep learning, and neural
            networks are integral to AI... Artificial Intelligence (AI) refers
            to the simulation of human intelligence in machines... AI involves
            creating systems that can perform tasks that typically require human
            intelligence... The concept of AI dates back to ancient history,
            with myths and stories about intelligent automata... AI has various
            applications across different industries, including healthcare,
            finance, and more... Technologies such as machine learning, deep
            learning, and neural networks are integral to AI... Artificial
            Intelligence (AI) refers to the simulation of human intelligence in
            machines... AI involves creating systems that can perform tasks that
            typically require human intelligence... The concept of AI dates back
            to ancient history, with myths and stories about intelligent
            automata... AI has various applications across different industries,
            including healthcare, finance, and more... Technologies such as
            machine learning, deep learning, and neural networks are integral to
            AI... Artificial Intelligence (AI) refers to the simulation of human
            intelligence in machines... AI involves creating systems that can
            perform tasks that typically require human intelligence... The
            concept of AI dates back to ancient history, with myths and stories
            about intelligent automata... AI has various applications across
            different industries, including healthcare, finance, and more...
            Technologies such as machine learning, deep learning, and neural
            networks are integral to AI...
          </p>
        </section>
        <section id="section3">
          <h2>AI Introduction</h2>
          <p>
            Artificial Intelligence (AI) refers to the simulation of human
            intelligence in machines... AI involves creating systems that can
            perform tasks that typically require human intelligence... The
            concept of AI dates back to ancient history, with myths and stories
            about intelligent automata... AI has various applications across
            different industries, including healthcare, finance, and more...
            Technologies such as machine learning, deep learning, and neural
            networks are integral to AI... Artificial Intelligence (AI) refers
            to the simulation of human intelligence in machines... AI involves
            creating systems that can perform tasks that typically require human
            intelligence... The concept of AI dates back to ancient history,
            with myths and stories about intelligent automata... AI has various
            applications across different industries, including healthcare,
            finance, and more... Technologies such as machine learning, deep
            learning, and neural networks are integral to AI... Artificial
            Intelligence (AI) refers to the simulation of human intelligence in
            machines... AI involves creating systems that can perform tasks that
            typically require human intelligence... The concept of AI dates back
            to ancient history, with myths and stories about intelligent
            automata... AI has various applications across different industries,
            including healthcare, finance, and more... Technologies such as
            machine learning, deep learning, and neural networks are integral to
            AI... Artificial Intelligence (AI) refers to the simulation of human
            intelligence in machines... AI involves creating systems that can
            perform tasks that typically require human intelligence... The
            concept of AI dates back to ancient history, with myths and stories
            about intelligent automata... AI has various applications across
            different industries, including healthcare, finance, and more...
            Technologies such as machine learning, deep learning, and neural
            networks are integral to AI...
          </p>
        </section>{' '}
        <section id="section4">
          <h2>AI Introduction</h2>
          <p>
            Artificial Intelligence (AI) refers to the simulation of human
            intelligence in machines... AI involves creating systems that can
            perform tasks that typically require human intelligence... The
            concept of AI dates back to ancient history, with myths and stories
            about intelligent automata... AI has various applications across
            different industries, including healthcare, finance, and more...
            Technologies such as machine learning, deep learning, and neural
            networks are integral to AI... Artificial Intelligence (AI) refers
            to the simulation of human intelligence in machines... AI involves
            creating systems that can perform tasks that typically require human
            intelligence... The concept of AI dates back to ancient history,
            with myths and stories about intelligent automata... AI has various
            applications across different industries, including healthcare,
            finance, and more... Technologies such as machine learning, deep
            learning, and neural networks are integral to AI... Artificial
            Intelligence (AI) refers to the simulation of human intelligence in
            machines... AI involves creating systems that can perform tasks that
            typically require human intelligence... The concept of AI dates back
            to ancient history, with myths and stories about intelligent
            automata... AI has various applications across different industries,
            including healthcare, finance, and more... Technologies such as
            machine learning, deep learning, and neural networks are integral to
            AI... Artificial Intelligence (AI) refers to the simulation of human
            intelligence in machines... AI involves creating systems that can
            perform tasks that typically require human intelligence... The
            concept of AI dates back to ancient history, with myths and stories
            about intelligent automata... AI has various applications across
            different industries, including healthcare, finance, and more...
            Technologies such as machine learning, deep learning, and neural
            networks are integral to AI...
          </p>
        </section>{' '}
        <section id="section5">
          <h2>AI Introduction</h2>
          <p>
            Artificial Intelligence (AI) refers to the simulation of human
            intelligence in machines... AI involves creating systems that can
            perform tasks that typically require human intelligence... The
            concept of AI dates back to ancient history, with myths and stories
            about intelligent automata... AI has various applications across
            different industries, including healthcare, finance, and more...
            Technologies such as machine learning, deep learning, and neural
            networks are integral to AI... Artificial Intelligence (AI) refers
            to the simulation of human intelligence in machines... AI involves
            creating systems that can perform tasks that typically require human
            intelligence... The concept of AI dates back to ancient history,
            with myths and stories about intelligent automata... AI has various
            applications across different industries, including healthcare,
            finance, and more... Technologies such as machine learning, deep
            learning, and neural networks are integral to AI... Artificial
            Intelligence (AI) refers to the simulation of human intelligence in
            machines... AI involves creating systems that can perform tasks that
            typically require human intelligence... The concept of AI dates back
            to ancient history, with myths and stories about intelligent
            automata... AI has various applications across different industries,
            including healthcare, finance, and more... Technologies such as
            machine learning, deep learning, and neural networks are integral to
            AI... Artificial Intelligence (AI) refers to the simulation of human
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
        .helpcenter-sidebar {
          position: fixed;
          top: 50%;
          right: 0;
          width: 25rem;
          height: 80vh;
          // background-color: #f4f4f4;
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
          overflow-y: auto;
          transition: transform 0.3s ease;
          transform: translateY(-50%) translateX(82%);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          border-radius: 1rem;
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
        }
        .sidebar-option:hover {
          background-color: #ccc;
          color: black;
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
