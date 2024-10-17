import { useState } from 'react';
import PropTypes from 'prop-types';
import FolderTab from './TrashFolderTab';
import TrashWorkspaceTab from './TrashWorkspaceTab';
import TrashAssistant from './TrashAssistant';
import TrashAssessment from './TrashAssessment';
import TrashSitemap from './TrashSitemap';

const TrashModule = () => {
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
          className={`tab ${activeTab === 'Assistant' ? 'active' : ''}`}
          onClick={() => setActiveTab('Assistant')}
        >
          Assistant
        </button>
        <button
          className={`tab ${activeTab === 'Assessment' ? 'active' : ''}`}
          onClick={() => setActiveTab('Assessment')}
        >
          Assessment
        </button>{' '}
        <button
          className={`tab ${activeTab === 'Sitemap' ? 'active' : ''}`}
          onClick={() => setActiveTab('Sitemap')}
        >
          Sitemap
        </button>
      </div>
      <div className="content">
        {activeTab === 'Workspace' && <TrashWorkspaceTab />}
        {activeTab === 'Folder' && <FolderTab />}
        {activeTab === 'Assistant' && <TrashAssistant />}
        {activeTab === 'Assessment' && <TrashAssessment />}
        {activeTab === 'Sitemap' && <TrashSitemap />}
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
