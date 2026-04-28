import { useCallback, useEffect, useState, useMemo } from 'react';
import Component from '@components';
import DashboardLayout from '@layout/DashboardLayout';
import Folder from '../../components/dashboard/dashboardHomeComponents/Folder';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDashboardStats,
  selectWorkspace,
  setCurrentChatId,
  setSelectedWorkspace,
  updateWorkspaceStatus,
} from '../../redux/slices/workspacesSlice';
import DashboardCard from '../../components/dashboard/dashboardHomeComponents/DashboardCard.jsx';
import NoData from '../../components/common/NoDataAvailable.jsx';
import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import {
  fetchFolderData,
  resetFolderState,
  selectFolderData,
  setSelectedFolder,
  toggleFolderActivation,
} from '../../redux/slices/folderSlice.js';
import { IoIosChatboxes } from 'react-icons/io';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import './ai-assistant.scss';

const AiAssistant = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Selectors
  const selectedWorkspace = useSelector(selectWorkspace);
  const folderData = useSelector(selectFolderData);

  // Local States
  const [error, setError] = useState(null);
  const [currentFolder, setCurrentFolder] = useState(null);

  // Memoize Active Workspace
  const activeWorkspace = useMemo(() => {
    return (
      selectedWorkspace?.folders?.find((folder) => folder.isActive) ||
      selectedWorkspace?.folders?.[0]
    );
  }, [selectedWorkspace]);

  const [isFetched, setIsFetched] = useState(false);

  const handleFolderSelection = useCallback(
    async (folder, workspaceId = selectedWorkspace?.id) => {
      if (!workspaceId) {
        setError('No workspace ID available.');
        return;
      }

      setCurrentFolder(folder);
      dispatch(setSelectedFolder(folder));
      dispatch(
        toggleFolderActivation({
          workspaceId,
          folderId: folder.id,
          isActive: true,
        })
      );

      try {
        await dispatch(
          fetchFolderData({ workspaceId, folderId: folder.id })
        ).unwrap();
      } catch {}
    },
    [dispatch, selectedWorkspace]
  );

  const handleWorkspaceChange = useCallback(
    (workspace) => {
      dispatch(setSelectedWorkspace(workspace));
      dispatch(
        updateWorkspaceStatus({ workspaceId: workspace.id, isActive: true })
      );
      dispatch(resetFolderState());

      if (workspace?.folders?.length > 0) {
        const firstFolder =
          workspace.folders.find((folder) => folder.isActive) ||
          workspace.folders[0];
        handleFolderSelection(firstFolder, workspace.id);
      }
    },
    [dispatch, handleFolderSelection]
  );

  // Function to Fetch Stats - Runs Only Once
  useEffect(() => {
    const fetchStats = async () => {
      if (isFetched) return; // Prevent further calls if already fetched

      try {
        const dashboardStats = await dispatch(fetchDashboardStats()).unwrap();

        // Only initialize workspace if none is selected yet
        if (!selectedWorkspace) {
          const initialWorkspace =
            dashboardStats.workspaces.find((ws) => ws.isActive) ||
            dashboardStats.workspaces[0];
          dispatch(setSelectedWorkspace(initialWorkspace));
          handleWorkspaceChange(initialWorkspace);
        } else if (selectedWorkspace?.folders?.length > 0) {
          const firstFolder =
            selectedWorkspace.folders.find((folder) => folder.isActive) ||
            selectedWorkspace.folders[0];
          handleFolderSelection(firstFolder, selectedWorkspace.id);
        }
        setIsFetched(true); // Mark as fetched after successful load
      } catch {
        setError('Failed to fetch dashboard stats.');
      }
    };

    fetchStats();
  }, [dispatch, isFetched, selectedWorkspace, handleWorkspaceChange]);

  useEffect(() => {
    if (!folderData || folderData.length === 0) {
      if (selectedWorkspace && activeWorkspace) {
        dispatch(
          fetchFolderData({
            workspaceId: selectedWorkspace.id,
            folderId: activeWorkspace.id,
          })
        ).catch(() => setError('Failed to load folder data.'));
      }
    }
  }, [dispatch, folderData, selectedWorkspace, activeWorkspace]);

  const handleRemoveChat = useCallback(async () => {
    if (currentFolder) {
      await dispatch(
        fetchFolderData({
          workspaceId: selectedWorkspace.id,
          folderId: currentFolder.id,
        })
      ).unwrap();
    }
  }, [dispatch, selectedWorkspace, currentFolder]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleDataUpdated = useCallback(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <Component.Dashboard.Header />
      <PageHeader title="AI Assistant" />

      <div className="selected-workspace-name">
        <p>
          Workspace <span className="workspace-badge">{selectedWorkspace?.workspaceName}</span>
        </p>
      </div>
      <Folder
        activeWorkspace={selectedWorkspace}
        onFolderSelect={handleFolderSelection}
        onFolderUpdate={handleDataUpdated}
      />

      <section className="generate generate--spaced">
        <div className="container">
          <div className="left-buttons">
            <p className="assistant-heading">
              <IoIosChatboxes />
              AI Assistant
            </p>
          </div>

          <div className="center-buttons">
            <Button
              variant="primary"
              className="assiss-btn assiss-btn--flex"
              iconRight={<AiOutlinePlus size={18} />}
              onClick={() => {
                dispatch(setCurrentChatId(null));
                navigate('/assistant/chat');
              }}
            >
              Create Assistant
            </Button>
          </div>
        </div>
      </section>

      <div className="section assistant-section">
        <div className="workspace-header"></div>
        {folderData?.[0]?.chats.length > 0 ? (
          <div className="assistant-grid">
            {folderData?.[0]?.chats?.map((item) => (
              <DashboardCard
                key={item.id}
                data={{ ...item, type: 'chat' }}
                onRemove={() => handleRemoveChat()}
                onClick={() => {
                  dispatch(setCurrentChatId(item.id));
                  navigate(`/assistant/chat/${item.id}`);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="ai-assistant-nodata">
            <NoData message="No Data Available" />
          </div>
        )}
      </div>

    </DashboardLayout>
  );
};

export default AiAssistant;
