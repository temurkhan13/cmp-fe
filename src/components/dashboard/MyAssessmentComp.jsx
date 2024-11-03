import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IoPeople } from 'react-icons/io5';
import { HiDotsHorizontal } from 'react-icons/hi';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaFolderTree } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import {
  fetchDashboardStats,
  selectWorkspace,
  setCurrentChatId,
  setSelectedWorkspace,
  updateWorkspaceStatus,
} from '../../redux/slices/workspacesSlice';
import useManagerChat from '@hooks/useManagerChat';
import DashboardCard from '../../components/dashboard/dashboardHomeComponents/DashboardCard';
import Folder from './dashboardHomeComponents/Folder';
import { fetchFolderData, resetFolderState, selectFolderData, selectSelectedFolder, setSelectedFolder, toggleFolderActivation } from '../../redux/slices/folderSlice';
import { RiNewspaperLine } from 'react-icons/ri';

const MyAssessmentComp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedWorkspace = useSelector(selectWorkspace);
  const folderData = useSelector(selectFolderData);
  const selectedFolder = useSelector(selectSelectedFolder);

  const { managerData } = useManagerChat();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [isFetched, setIsFetched] = useState(false);

  const activeWorkspace = useMemo(() => {
    return (
      selectedWorkspace?.folders?.find((folder) => folder.isActive) ||
      selectedWorkspace?.folders?.[0]
    );
  }, [selectedWorkspace]);

  const handleFolderSelection = useCallback(
    async (folder, workspaceId = selectedWorkspace?.id) => {
      if (!workspaceId) {
        setError('No workspace ID available.');
        return;
      }

      setCurrentFolder(folder);
      dispatch(setSelectedFolder(folder));
      dispatch(toggleFolderActivation({ workspaceId, folderId: folder.id, isActive: true }));

      try {
        await dispatch(fetchFolderData({ workspaceId, folderId: folder.id })).unwrap();
      } catch {
        setError('Failed to fetch folder data.');
      }
    },
    [dispatch, selectedWorkspace]
  );

  const handleWorkspaceChange = useCallback(
    (workspace) => {
      dispatch(setSelectedWorkspace(workspace));
      dispatch(updateWorkspaceStatus({ workspaceId: workspace.id, isActive: true }));
      dispatch(resetFolderState());

      const firstFolder = workspace.folders.find((folder) => folder.isActive) || workspace.folders[0];
      handleFolderSelection(firstFolder, workspace.id);
    },
    [dispatch, handleFolderSelection]
  );

  useEffect(() => {
    const fetchStats = async () => {
      if (isFetched) return;
      try {
        const dashboardStats = await dispatch(fetchDashboardStats()).unwrap();
        const initialWorkspace = dashboardStats.workspaces.find((ws) => ws.isActive) || dashboardStats.workspaces[0];
        if (!selectedWorkspace || selectedWorkspace.id !== initialWorkspace.id) {
          dispatch(setSelectedWorkspace(initialWorkspace));
          handleWorkspaceChange(initialWorkspace);
        }
        setIsFetched(true);
      } catch {
        setError('Failed to fetch dashboard stats.');
      }
    };
    fetchStats();
  }, [dispatch, isFetched, selectedWorkspace, handleWorkspaceChange]);

  useEffect(() => {
    if (managerData) setIsLoading(false);
  }, [managerData]);

  const handleRemoveChat = useCallback(async () => {
    if (currentFolder) {
      await dispatch(fetchFolderData({ workspaceId: selectedWorkspace.id, folderId: currentFolder.id })).unwrap();
    }
  }, [dispatch, selectedWorkspace, currentFolder]);

  const handleDataUpdated = useCallback(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="">
      <div className="section">
        <div className="center-buttons">
          <Folder activeWorkspace={selectedWorkspace} onFolderSelect={handleFolderSelection} onFolderUpdate={handleDataUpdated} />
        </div>

        <section className="generate" style={{ marginTop: '2rem' }}>
          <div className="container">
            <div className="left-buttons">
              <p className="assistant-heading">
                <RiNewspaperLine size={30} /> Assessments
              </p>
            </div>
            <div className="center-buttons">
              <button
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                className="assiss-btn"
                onClick={() => {
                  dispatch(setCurrentChatId(null));
                  navigate('/assessment/chat');
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
            {folderData &&
              folderData[0]?.assessments?.map((item) => (
                <DashboardCard
                  key={item.id}
                  data={{ ...item, type: 'chat' }}
                  onRemove={() => handleRemoveChat()}
                  onClick={() => {
                    dispatch(setCurrentChatId(item.id));
                    navigate(`/assessment/chat/${item.id}`);
                  }}
                />
              ))}
          </div>
        </div>
      </div>

      {/* Component Styles */}
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

        .userName, .fileName {
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
        
        .folderName {
          color: #0066ff;
          font-size: 1.1rem;
          margin-left: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default MyAssessmentComp;
