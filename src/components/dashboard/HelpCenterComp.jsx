import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { MdDashboard, MdAssistant, MdAssessment } from 'react-icons/md';
import { BsFilePlayFill } from 'react-icons/bs';
import { FaSitemap, FaQuestionCircle } from 'react-icons/fa';
import headingss from '../../assets/dashboard/heading.svg';

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
  ];

  const sections = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      content: (
        <div>
          <p>
            The Dashboard is your central hub for accessing key insights and
            navigating through the Change AI application. It provides an
            at-a-glance view of your ongoing projects, workspaces, and recent
            activities, helping you stay organized and focused on your tasks.
            Key features include: Quick Stats: Displays essential metrics for
            Workspaces, Projects, Recent AI Assistants, AI Assessments, Digital
            Playbook, and the Current Plan. Allows you to instantly assess your
            progress and identify areas that need attention. Workspace
            Management: Create and delete workspaces directly from the dashboard
            with a single click, making it easy to set up new projects or remove
            outdated ones. Keep your workspaces organized and relevant to your
            current goals. Recent Chats and Navigation: Access your recent chats
            directly from the dashboard, allowing you to quickly pick up where
            you left off. Helps streamline your workflow by minimizing the need
            to search for ongoing conversations and recent actions. With the
            Dashboard, you can manage your activities in one place, saving time
            and reducing the need to navigate through multiple sections.
          </p>
        </div>
      ),
      style: { backgroundColor: '#f0f8ff', padding: '2rem' },
    },
    {
      id: 'assistant',
      title: 'AI Assistant',
      content: (
        <div>
          <p>
            The AI Assistant is your smart, AI-powered chatbot, designed to
            support you with change management queries and provide on-the-spot
            assistance for a variety of tasks. It’s packed with features that
            enhance your interactions and improve efficiency: Real-Time
            Assistance: Get instant responses to your change management
            questions, powered by AI to deliver accurate and relevant answers.
            Offers expert support at your fingertips, minimizing the time you
            spend searching for information. Quick Action Options: Change Tone:
            Instantly adjust the tone of selected messages to align with your
            communication style or audience requirements. Comment and Bookmark:
            Add comments or bookmark key conversations for easy reference in the
            future. Switch Projects: Seamlessly switch between projects within
            the chat, helping you stay organized and manage multiple projects
            without losing track. Recent Chats Panel: View your recent
            conversations in the left drawer, enabling you to quickly jump back
            into previous discussions. Enhances productivity by keeping your
            recent activities readily accessible. The AI Assistant is designed
            to streamline your communication and optimize your workflow by
            providing contextual support as you work.
          </p>
        </div>
      ),
      style: { backgroundColor: '#faebd7', padding: '2rem' },
    },
    {
      id: 'assessment',
      title: 'AI Assessment',
      content: (
        <div>
          <p>
            The AI Assessment module helps you create, customize, and download
            comprehensive change management reports tailored to your
            organization’s needs. This tool simplifies the assessment process,
            making it easier for users to generate insightful reports with
            minimal effort. Here’s how it works: Step-by-Step Assessment
            Journey: Start by selecting an assessment from a library of 24
            change management reports. The Change AI bot will guide you through
            a series of questions to help build your report. If you’re unsure of
            any answers, use the “Inspire Me” button to get ideas and guidance.
            Customizable Report Editor: After answering the questions, the
            generated report can be opened in an intuitive editor. Modify,
            enhance, and personalize the report to better fit your
            organization's specific needs and insights. Downloadable Reports:
            Once you're satisfied with your report, download it for easy sharing
            and record-keeping. Allows you to deliver professional, data-driven
            reports that support decision-making and change management efforts
            within your team. The AI Assessment module empowers you to create
            impactful reports with AI-driven assistance, transforming complex
            assessments into user-friendly, actionable documents.
          </p>
        </div>
      ),
      style: { backgroundColor: '#F0F0F0', padding: '2rem' },
    },
    {
      id: 'playbook',
      title: 'Digital Playbook',
      content: (
        <div>
          <p>
            The Digital Playbook is your go-to resource for structuring and
            visualizing digital strategies, featuring two main modules: Sitemap
            and Wireframe. This tool helps you conceptualize and organize your
            digital plans with a high level of customization: Sitemap
            Generation: Automatically generates a comprehensive sitemap based on
            your inputs, which can be modified to suit your specific
            requirements. Provides a clear visual structure of your digital
            initiatives, making it easy to plan and present your project
            roadmap. Wireframe Playground: Drag-and-drop functionality lets you
            add and arrange elements such as text, images, graphs, and tables,
            enabling you to design and visualize your strategies interactively.
            Ideal for laying out complex ideas in a visual format, improving
            understanding and communication within your team. Playbook
            Customization and Download: The Digital Playbook includes data
            relevant to your projects, which can be edited for personalization.
            Export your finalized playbook as a PDF for easy sharing and
            presentation. The Digital Playbook makes it simple to develop,
            organize, and communicate your digital strategies, helping you
            transform ideas into actionable plans with a professional and
            visually engaging approach.
          </p>
        </div>
      ),
      style: { backgroundColor: '#faebf1', padding: '2rem' },
    },
  ];

  const heading = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      content: (
        <div className="help-Heading">Stay in Control, All in One Place</div>
      ),
    },
    {
      id: 'assistant',
      title: 'AI Assistant',
      content: (
        <div className="help-Heading">Your Smart Guide for Seamless Change</div>
      ),
    },
    {
      id: 'assessment',
      title: 'AI Assessment',
      content: (
        <div className="help-Heading">Insightful Reports Made Effortless</div>
      ),
    },
    {
      id: 'playbook',
      title: 'Digital Playbook',
      content: (
        <div className="help-Heading">
          Visualize and Build Your Digital Roadmap
        </div>
      ),
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
        {heading.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className={`content-heading ${
              activeSection === index ? 'active' : ''
            }`}
            style={activeSection === index ? section.style : {}}
          >
            {section.content}
          </section>
        ))}
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
          font-size:1.5rem;
          width: 100%;
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
          background-image: url(${headingss});
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
          .content-heading {
          display: none;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }
        .content-heading.active {
          display: block;
          margin-top: 10px;
          opacity: 1;
          width: 100%;
          font-size: 3.5rem;
          font-weight: 600;
          text-align: center;
          color: white;
          border-radius: 2rem;
          background-image: url(${heading});
          background-repeat: no-repeat;
          background-size: cover;
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
