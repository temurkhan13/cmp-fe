import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import {
  MdDashboard,
  MdAssistant,
  MdAssessment,
} from 'react-icons/md';
import { BsFilePlayFill } from 'react-icons/bs';
import headingss from '../../assets/dashboard/heading.svg';
import Button from '../common/Button';

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
          <p>The Dashboard is your central hub for accessing key insights and navigating through ChangeAI.</p>
          <h4 className="help-section-subtitle">Quick Stats</h4>
          <ul className="help-section-list">
            <li>View metrics for Workspaces, Projects, AI Assistants, Assessments, and Digital Playbooks</li>
            <li>Monitor your current plan and usage at a glance</li>
          </ul>
          <h4 className="help-section-subtitle">Workspace Management</h4>
          <ul className="help-section-list">
            <li>Create and delete workspaces with a single click</li>
            <li>Keep workspaces organised and relevant to your current goals</li>
          </ul>
          <h4 className="help-section-subtitle">Recent Activity</h4>
          <ul className="help-section-list">
            <li>Access recent chats directly from the dashboard</li>
            <li>Quickly pick up where you left off without navigating through multiple sections</li>
          </ul>
        </div>
      ),
      style: { backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '8px' },
    },
    {
      id: 'assistant',
      title: 'AI Assistant',
      content: (
        <div>
          <p>The AI Assistant is your smart, AI-powered chatbot for change management support.</p>
          <h4 className="help-section-subtitle">Real-Time Assistance</h4>
          <ul className="help-section-list">
            <li>Get instant, AI-powered responses to change management questions</li>
            <li>Upload documents for contextual analysis and guidance</li>
          </ul>
          <h4 className="help-section-subtitle">Quick Actions</h4>
          <ul className="help-section-list">
            <li><strong>Change Tone:</strong> Adjust message tone for different audiences</li>
            <li><strong>Comment & Bookmark:</strong> Annotate and save key conversations</li>
            <li><strong>Inspire Me:</strong> Get AI-generated suggestions and prompts</li>
          </ul>
          <h4 className="help-section-subtitle">Chat Management</h4>
          <ul className="help-section-list">
            <li>Switch between projects within the chat</li>
            <li>Access recent conversations from the left panel</li>
            <li>Search and filter your chat history</li>
          </ul>
        </div>
      ),
      style: { backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '8px' },
    },
    {
      id: 'assessment',
      title: 'AI Assessment',
      content: (
        <div>
          <p>
            The AI Assessment module helps you create, customize, and download
            comprehensive change management reports tailored to your
            organization&apos;s needs. This tool simplifies the assessment process,
            making it easier for users to generate insightful reports with
            minimal effort. Here&apos;s how it works: Step-by-Step Assessment
            Journey: Start by selecting an assessment from a library of 24
            change management reports. The Change AI bot will guide you through
            a series of questions to help build your report. If you&apos;re unsure of
            any answers, use the &quot;Inspire Me&quot; button to get ideas and guidance.
            Customizable Report Editor: After answering the questions, the
            generated report can be opened in an intuitive editor. Modify,
            enhance, and personalize the report to better fit your
            organization&apos;s specific needs and insights. Downloadable Reports:
            Once you&apos;re satisfied with your report, download it for easy sharing
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
            visually engaging approach.
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
        <div className="help-Heading" style={{ backgroundImage: `url("${headingss}")` }}>Stay in Control, All in One Place</div>
      ),
    },
    {
      id: 'assistant',
      title: 'AI Assistant',
      content: (
        <div className="help-Heading" style={{ backgroundImage: `url("${headingss}")` }}>Your Smart Guide for Seamless Change</div>
      ),
    },
    {
      id: 'assessment',
      title: 'AI Assessment',
      content: (
        <div className="help-Heading" style={{ backgroundImage: `url("${headingss}")` }}>Insightful Reports Made Effortless</div>
      ),
    },
    {
      id: 'playbook',
      title: 'Digital Playbook',
      content: (
        <div className="help-Heading" style={{ backgroundImage: `url("${headingss}")` }}>
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
        <Button
          variant="icon"
          ariaLabel="Toggle sidebar"
          className="sidebar-toggle"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </Button>
        {options.map((option, index) => (
          <div
            key={index}
            className={`sidebar-option ${index === 0 ? 'first' : ''} ${
              index === options.length - 1 ? 'last' : ''
            }`}
            onClick={() => handleOptionClick(index)}
          >
            <span className="sidebar-option-icon">
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
    </div>
  );
};

export default HelpCenterComp;
