import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Components from '../../components';
import '../../components/assessment/assessment.scss';
import { useGetWorkspacesQuery } from '../../redux/api/workspaceApi';
import useMediaQuery from '../../hooks/useMediaQuery';
import { FaImages } from 'react-icons/fa';
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
  setSelectedFolder,
  toggleFolderActivation,
} from '../../redux/slices/folderSlice';
import { selectAllWorkspaces } from '../../redux/selectors/selectors';
import {
  AssistantSidebar,
  MessagesSection,
  NewChat,
} from '../../components/assistant/index.js';
import { QuestionnaireModal } from '../../components/modal';
import Button from '../../components/common/Button';

const AiAssistantChat = () => {
  const dispatch = useDispatch();
  const { chatId } = useParams();
  const userId =
    useSelector((state) => state.auth.user?.id || state.auth.user?._id) ||
    localStorage.getItem('userId');
  const { error } = useGetWorkspacesQuery(userId, { skip: !userId });
  const selectedWorkspace = useSelector(selectWorkspace);
  const allWorkspaces = useSelector(selectAllWorkspaces);
  const selectedFolder = useSelector((state) => state.folder.selectedFolder);

  const isResponsive = useMediaQuery('(max-width: 1080px)');
  const [showLeftSidebar, setShowLeftSidebar] = useState(false);
  const [showRightSidebar, setShowRightSidebar] = useState(false);

  const [currentChat, setCurrentChat] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage] = useState('');
  const [isFetched, setIsFetched] = useState(false);
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);

  // Sync Redux chatId with URL param to prevent stale ID API calls
  const reduxChatId = useSelector((state) => state.workspaces.currentChatId);
  useEffect(() => {
    if (chatId && chatId !== reduxChatId) {
      dispatch(setCurrentChatId(chatId));
    } else if (!chatId && reduxChatId) {
      dispatch(setCurrentChatId(null));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  // Memoize active workspace for optimization
  const activeWorkspace = useMemo(
    () => selectedWorkspace || allWorkspaces?.[0],
    [selectedWorkspace, allWorkspaces]
  );

  const handleFolderSelection = useCallback(
    async (folder, workspaceId = activeWorkspace?.id) => {
      if (!workspaceId) return;

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
      } catch (err) {
        console.error('Failed to fetch folder data:', err);
      }
    },
    [dispatch, activeWorkspace]
  );

  const handleWorkspaceChange = useCallback(
    (workspace) => {
      dispatch(setSelectedWorkspace(workspace));
      dispatch(
        updateWorkspaceStatus({ workspaceId: workspace.id, isActive: true })
      );
      dispatch(resetFolderState());

      const firstFolder =
        workspace.folders.find((folder) => folder.isActive) ||
        workspace.folders[0];
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

        // Only initialize workspace if none is selected yet
        if (!selectedWorkspace) {
          const initialWorkspace =
            dashboardStats.workspaces.find((ws) => ws.isActive) ||
            dashboardStats.workspaces[0];
          handleWorkspaceChange(initialWorkspace);
        } else if (selectedWorkspace?.folders?.length > 0) {
          // Respect persisted folder if it still belongs to the active workspace;
          // otherwise fall back to the active/first folder
          const persistedFolderId = selectedFolder?._id || selectedFolder?.id;
          const persistedFolderBelongs =
            persistedFolderId &&
            selectedWorkspace.folders.some(
              (f) => (f._id || f.id) === persistedFolderId
            );

          if (!persistedFolderBelongs) {
            const firstFolder =
              selectedWorkspace.folders.find((folder) => folder.isActive) ||
              selectedWorkspace.folders[0];
            handleFolderSelection(firstFolder, selectedWorkspace.id);
          }
        }

        setIsFetched(true);
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
      }
    };

    initializeWorkspaceAndFolder();
  }, [
    dispatch,
    isFetched,
    selectedWorkspace,
    selectedFolder,
    handleWorkspaceChange,
    handleFolderSelection,
  ]);

  // Lock body scroll when a responsive drawer is open
  useEffect(() => {
    if (isResponsive && (showLeftSidebar || showRightSidebar)) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isResponsive, showLeftSidebar, showRightSidebar]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="assessmentChat assessmentChat--responsive">
      <Components.Common.Header
        activeWorkspace={selectedWorkspace}
        workspaces={allWorkspaces}
        onMenuToggle={() => setShowLeftSidebar(true)}
      />
      <section>
        <NewChat
          isOverlay={isResponsive}
          isVisible={showLeftSidebar}
          onClose={() => setShowLeftSidebar(false)}
        />
        {/* Backdrop for left sidebar */}
        {isResponsive && showLeftSidebar && (
          <div
            className="sidebar-backdrop sidebar-backdrop--visible"
            onClick={() => setShowLeftSidebar(false)}
          />
        )}

        <MessagesSection setCurrentChat={setCurrentChat} />

        <AssistantSidebar
          currentChat={currentChat}
          isOverlay={isResponsive}
          isVisible={showRightSidebar}
          onClose={() => setShowRightSidebar(false)}
        />
        {/* Backdrop for right sidebar */}
        {isResponsive && showRightSidebar && (
          <div
            className="sidebar-backdrop sidebar-backdrop--visible"
            onClick={() => setShowRightSidebar(false)}
          />
        )}
      </section>

      {/* Floating button to open right sidebar on responsive */}
      {isResponsive && (
        <Button
          variant="icon"
          ariaLabel="Open sidebar panel"
          className="responsive-fab"
          onClick={() => setShowRightSidebar(true)}
        >
          <FaImages />
        </Button>
      )}

      {showNotification && (
        <Components.Common.NotificationBar
          message={notificationMessage}
          type="error"
          onClose={() => setShowNotification(false)}
        />
      )}
      <QuestionnaireModal
        isOpen={isSurveyOpen}
        onClose={() => setIsSurveyOpen(false)}
      />
    </div>
  );
};

export default AiAssistantChat;
