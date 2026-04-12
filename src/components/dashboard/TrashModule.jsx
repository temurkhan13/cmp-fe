import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FolderTab from './TrashFolderTab';
import TrashWorkspaceTab from './TrashWorkspaceTab';
import TrashAssistant from './TrashAssistant';
import TrashAssessment from './TrashAssessment';
import TrashSitemap from './TrashSitemap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrashItems } from '../../redux/slices/trashSlice.js';

const TrashModule = () => {
  const dispatch = useDispatch();

  // Ensure the state is not undefined
  const trashState = useSelector((state) => state.trash || {});
  const {
    workspaces = [],
    folders = [],
    assessments = [],
    chats = [],
  } = trashState.trashItems || {};
  const isLoading = trashState.isLoading || false;
  const error = trashState.error || null;

  const [activeTab, setActiveTab] = useState('Workspace');

  // Fetch trash items on component mount
  useEffect(() => {
    dispatch(fetchTrashItems());
  }, [dispatch]);

  // Log the state after it updates
  useEffect(() => {}, [trashState]);

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
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!isLoading && !error && (
          <>
            {activeTab === 'Workspace' && (
              <TrashWorkspaceTab workspaces={workspaces} />
            )}
            {activeTab === 'Folder' && <FolderTab folders={folders} />}
            {activeTab === 'Assistant' && <TrashAssistant chats={chats} />}
            {activeTab === 'Assessment' && (
              <TrashAssessment assessments={assessments} />
            )}
            {activeTab === 'Sitemap' && <TrashSitemap />}
          </>
        )}
      </div>
      <style>{`
        .trash-container {
          display: flex;
          flex-direction: column;
          margin-top:2rem;
          text-align: center;
          }
          .heading {
            position: absolute;
            // top: 4rem;
            margin-bottom:2rem;
          left: 1.25rem;
          font-size: 3rem;
          font-weight: bold;
          color: #333;
        }
        .tabs {
          display: flex;
          position: absolute;
          top: 12rem;
          left: 3rem;
          gap: 1.5rem;
        }
        .tab {
          padding: 0.75rem 1.5rem;
          cursor: pointer;
          background: none;
          border: none;
          outline: none;
          font-size: 1.6rem;
          font-weight: 500;
          color: #6b7280;
          border-bottom: 2px solid transparent;
          transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
          border-radius: 6px 6px 0 0;
        }
        .tab:hover {
          color: #111;
          background: rgba(0,0,0,0.03);
        }
        .tab.active {
          color: #111;
          font-weight: 600;
          border-bottom: 2px solid #C3E11D;
        }
        .content {
          margin-top: 9rem;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
};

TrashModule.propTypes = {
  activeTab: PropTypes.string,
};

export default TrashModule;
