import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Components from '../../components';
import { useGetWorkspacesQuery } from '../../redux/api/workspaceApi';
import {
  setSelectedWorkspace,
  selectWorkspace,
  setCurrentChatId,
  updateWorkspaceStatus,
  fetchDashboardStats,
} from '../../redux/slices/workspacesSlice';
import {
  fetchFolderData,
  resetFolderState,
  selectFolderData,
  setSelectedFolder,
  toggleFolderActivation,
} from '../../redux/slices/folderSlice';
import { selectAllWorkspaces } from '../../redux/selectors/selectors';
import { AssistantSidebar, MessagesSection, NewChat } from '../../components/assisstent/index.js';

const AiAssistantChat = () => {
  const dispatch = useDispatch();
  const { chatId } = useParams();
  const userId = useSelector((state) => state.auth.user?.id) || localStorage.getItem('userId');
  const { data: workspaces, error } = useGetWorkspacesQuery(userId);
  const selectedWorkspace = useSelector(selectWorkspace);
  const allWorkspaces = useSelector(selectAllWorkspaces);
  const selectedFolder = useSelector((state) => state.folder.selectedFolder);

  const [currentChat, setCurrentChat] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isFetched, setIsFetched] = useState(false);

  // Memoize active workspace for optimization
  const activeWorkspace = useMemo(() => selectedWorkspace || allWorkspaces?.[0], [selectedWorkspace, allWorkspaces]);

  const showError = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
  };

  const handleFolderSelection = useCallback(
    async (folder, workspaceId = activeWorkspace?.id) => {
      if (!workspaceId) return;

      dispatch(setSelectedFolder(folder));
      dispatch(toggleFolderActivation({ workspaceId, folderId: folder.id, isActive: true }));
      try {
        await dispatch(fetchFolderData({ workspaceId, folderId: folder.id })).unwrap();
      } catch {
        showError('Failed to fetch folder data.');
      }
    },
    [dispatch, activeWorkspace]
  );

  const handleWorkspaceChange = useCallback(
    (workspace) => {
      dispatch(setSelectedWorkspace(workspace));
      dispatch(updateWorkspaceStatus({ workspaceId: workspace.id, isActive: true }));
      dispatch(resetFolderState());

      const firstFolder = workspace.folders.find((folder) => folder.isActive) || workspace.folders[0];
      if (firstFolder) handleFolderSelection(firstFolder, workspace.id);
    },
    [dispatch, handleFolderSelection]
  );

  // Initial fetch and setup for workspace and folder
  useEffect(() => {
    const initializeWorkspaceAndFolder = async () => {
      if (isFetched) return;

      try {
        const dashboardStats = await dispatch(fetchDashboardStats()).unwrap();
        const initialWorkspace = dashboardStats.workspaces.find((ws) => ws.isActive) || dashboardStats.workspaces[0];

        if (!selectedWorkspace || selectedWorkspace.id !== initialWorkspace.id) {
          handleWorkspaceChange(initialWorkspace);
        } else if (selectedWorkspace?.folders?.length > 0) {
          const firstFolder = selectedWorkspace.folders.find((folder) => folder.isActive) || selectedWorkspace.folders[0];
          handleFolderSelection(firstFolder, selectedWorkspace.id);
        }

        setIsFetched(true);
      } catch {
        showError('Failed to fetch dashboard stats.');
      }
    };

    initializeWorkspaceAndFolder();
  }, [dispatch, isFetched, selectedWorkspace, handleWorkspaceChange, handleFolderSelection]);

  // Show error if no folders available in the selected workspace
  useEffect(() => {
    if (activeWorkspace?.folders?.length === 0) {
      showError("No folders available in the selected workspace.");
    }
  }, [activeWorkspace]);

  const handleDataUpdated = useCallback(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="assessmentChat">
      <Components.Common.Header activeWorkspace={activeWorkspace} workspaces={allWorkspaces} />

      <section>
        <NewChat />
        <MessagesSection setCurrentChat={setCurrentChat} />
        <AssistantSidebar currentChat={currentChat} />
      </section>

      {showNotification && (
        <Components.Common.NotificationBar
          message={notificationMessage}
          type="error"
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default AiAssistantChat;
