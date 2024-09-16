import { useState } from 'react';
import PropTypes from 'prop-types';
import FolderTab from './TrashFolderTab';
import TrashFileTab from './TrashFileTab';
import TrashWorkspaceTab from './TrashWorkspaceTab';

const TrashModule = () => {
  const sampleCardData = [
    {
      id: 1,
      userName: 'John Doe',
      userContent:
        'This is the content of the card. It can be any text related to the user’s activity.',
      aiContent:
        'AI generated content related to this card. Example text for illustration.',
    },
    {
      id: 2,
      userName: 'Jane Smith',
      userContent:
        'Another piece of content showing how the card data is displayed.',
      aiContent:
        'Additional AI content to demonstrate the component’s functionality.',
    },
    {
      id: 3,
      userName: 'Alice Johnson',
      userContent:
        'Sample content for a third card. Helps to visualize the data display.',
      aiContent: 'More AI-generated content to show the variety of data.',
    },
  ];

  const [activeTab, setActiveTab] = useState('Workspace');

  return (
    <div className="trash-container">
      <h1 className="heading">Trash</h1>
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'Workspace' ? 'active' : ''}`}
          onClick={() => setActiveTab('Workspace')}
        >
          Workspaces
        </button>
        <button
          className={`tab ${activeTab === 'Folder' ? 'active' : ''}`}
          onClick={() => setActiveTab('Folder')}
        >
          Projects
        </button>
        <button
          className={`tab ${activeTab === 'File' ? 'active' : ''}`}
          onClick={() => setActiveTab('File')}
        >
          Files
        </button>
      </div>
      <div className="content">
        {activeTab === 'Workspace' && <TrashWorkspaceTab />}
        {activeTab === 'Folder' && <FolderTab />}
        {activeTab === 'File' && <TrashFileTab cardData={sampleCardData} />}
      </div>
      <style>{`
        .trash-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .heading {
          position: absolute;
          top: 2rem;
          left: 1.25rem;
          font-size: 1.5rem;
        }
        .tabs {
          display: flex;
          position: absolute;
          top: 5rem;
          left: 3rem;
        }
        .tab {
          margin-right: 0.625rem;
          padding: 0.625rem 1.25rem;
          cursor: pointer;
          background: none;
          border: none;
          outline: none;
          font-size: 1.4rem;
          font-weight:600;
        }
        .tab.active {
          border-bottom: 0.1rem solid black;
        }
        .content {
          margin-top: 6.25rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

TrashModule.propTypes = {
  activeTab: PropTypes.string,
};

export default TrashModule;
