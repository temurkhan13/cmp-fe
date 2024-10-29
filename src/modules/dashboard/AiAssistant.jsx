import { useEffect, useState } from 'react';
import Component from '@components';
import DashboardLayout from '@layout/DashboardLayout';
import Folder from '../../components/dashboard/dashboardHomeComponents/Folder';
import { useDispatch, useSelector } from 'react-redux';
import { selectWorkspace, setCurrentChatId } from '../../redux/slices/workspacesSlice';
import DashboardCard from '../../components/dashboard/dashboardHomeComponents/DashboardCard.jsx';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaFolderTree } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import {
  fetchFolderData,
  resetFolderState,
  selectFolderData,
  selectSelectedFolder, setSelectedFolder
} from '../../redux/slices/folderSlice.js';

const AiAssistant = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedWorkspace = useSelector(selectWorkspace);
  const folderData = useSelector(selectFolderData);
  const selectedFolder = useSelector(selectSelectedFolder)
  const activeFolder = useSelector((state) => state.workspaces.selectedFolder);

  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState('grid');
  const [currentFolder, setCurrentFolder] = useState(null);
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Reset folder and set first folder if available
    setCurrentFolder(null);
    dispatch(resetFolderState());

    if (selectedWorkspace?.folders?.length > 0) {
      const firstFolder = selectedWorkspace.folders[0];
      handleFolderSelection(firstFolder, selectedWorkspace.id);
    }
  }, [selectedWorkspace]);

  useEffect(() => {

  }, [selectedFolder]);

  const handleFolderSelection = async (folder, workspaceId = null) => {
    const activeWorkspaceId = workspaceId || selectedWorkspace?.id;
    if (!activeWorkspaceId) {
      handleError("No workspace ID available.");
      return;
    }

    setCurrentFolder(folder);
    dispatch(setSelectedFolder(folder)); // Set the selected folder in Redux store

    try {
      await dispatch(fetchFolderData({ workspaceId: activeWorkspaceId, folderId: folder._id })).unwrap();
    } catch (err) {
      handleError('Failed to fetch folder data.');
    }
  };

  const handleError = (message) => {
    setError(message);
    setShowNotification(true);
  };

  // Handle removing chat from the current folder
  const handleRemoveChat = async () => {
    const activeWorkspaceId =  selectedWorkspace?.id;
    await dispatch(fetchFolderData({ workspaceId: activeWorkspaceId, folderId: currentFolder.id })).unwrap();

  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <DashboardLayout>
      <div style={{ marginBottom: '2rem' }}>
        <Component.Dashboard.Header />
      </div>

      <Folder activeWorkspace={selectedWorkspace} />

      <section className="generate" style={{ marginTop: '2rem' }}>
        <div className="container">
          <div className="left-buttons">
            <p className="assistant-heading">
              <FaFolderTree />
              Assistant
            </p>
          </div>

          <div className="center-buttons">
            <button
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              className="assiss-btn"
              onClick={() => {
                dispatch(setCurrentChatId(null));
                navigate('/assisstant/chat');
              }}
            >
              New Assistant
              <AiOutlinePlus className="icon" />
            </button>
          </div>
        </div>
      </section>

      <div className="section">
        <div className="workspace-header"></div>
        <div className="grid">
          {folderData && folderData[0]?.chats?.map((item) => (
            <DashboardCard
              key={item.id}
              data={{ ...item, type: 'chat' }}
              onRemove={(id) => handleRemoveChat(id)} // Handle chat removal
            />
          ))}
        </div>
      </div>

      <style>{`
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          grid-gap: 1rem;
          justify-items: center;
          align-items: start;
          padding: 15px;
        }

        .section {
          margin-top: 2rem;
        }

        .userName {
          font-size: 1.125rem;
          font-weight: bold;
        }
        .chatContent {
          font-size: 1.2rem;
          margin: 0.5rem 0;
        }
        .footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .fileDetails {
          margin-bottom: 3rem;
        }
        
        .fileName {
          font-size: 1.125rem;
          font-weight: bold;
          margin-top: 1rem;
        }

        .folderName {
          color: #0066ff;
          font-size: 1.1rem;
          margin-left: 0.5rem;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default AiAssistant;
