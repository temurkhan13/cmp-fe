import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
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
import {
  AssistantSidebar,
  MessagesSection,
  NewChat,
} from '../../components/assisstent/index.js';
import Modal from '../../components/common/Modal';
import Questionnaire from '../../modules/assessment/Questionnaire';

const AiAssistantChat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { chatId } = useParams();
  const userId =
    useSelector((state) => state.auth.user?.id) ||
    localStorage.getItem('userId');
  const { data: workspaces, error } = useGetWorkspacesQuery(userId);
  const selectedWorkspace = useSelector(selectWorkspace);
  const allWorkspaces = useSelector(selectAllWorkspaces);
  const selectedFolder = useSelector((state) => state.folder.selectedFolder);

  const [currentChat, setCurrentChat] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isFetched, setIsFetched] = useState(false);
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);

  // Memoize active workspace for optimization
  const activeWorkspace = useMemo(
    () => selectedWorkspace || allWorkspaces?.[0],
    [selectedWorkspace, allWorkspaces]
  );

  const showError = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
  };

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
      } catch {}
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
        const initialWorkspace =
          dashboardStats.workspaces.find((ws) => ws.isActive) ||
          dashboardStats.workspaces[0];

        if (
          !selectedWorkspace ||
          selectedWorkspace.id !== initialWorkspace.id
        ) {
          handleWorkspaceChange(initialWorkspace);
        } else if (selectedWorkspace?.folders?.length > 0) {
          const firstFolder =
            selectedWorkspace.folders.find((folder) => folder.isActive) ||
            selectedWorkspace.folders[0];
          handleFolderSelection(firstFolder, selectedWorkspace.id);
        }

        setIsFetched(true);
      } catch {}
    };

    initializeWorkspaceAndFolder();
  }, [
    dispatch,
    isFetched,
    selectedWorkspace,
    handleWorkspaceChange,
    handleFolderSelection,
  ]);

  // Show error if no folders available in the selected workspace
  useEffect(() => {
    if (activeWorkspace?.folders?.length === 0) {
    }
  }, [activeWorkspace]);

  const handleDataUpdated = useCallback(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="assessmentChat">
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.5rem 1rem', borderBottom: '1px solid #eee', background: '#fff',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <IoArrowBack
            size={20}
            style={{ cursor: 'pointer', color: '#555' }}
            onClick={() => navigate(-1)}
          />
          <span style={{ fontSize: '0.9rem', color: '#555' }}>Back</span>
        </div>
        <span
          style={{
            fontSize: '1.2rem',
            fontWeight: '500',
            color: '#00316E',
            cursor: 'pointer',
            padding: '0.5rem 1.2rem',
            borderRadius: '0.6rem',
            border: '1px solid #ddd',
            background: '#f9f9f9',
          }}
          onClick={() => setIsSurveyOpen(true)}
        >
          Survey Info
        </span>
      </div>
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
      {isSurveyOpen && (
        <Modal
          title="User Questionnaire"
          isOpen={isSurveyOpen}
          onClose={() => setIsSurveyOpen(false)}
        >
          <Questionnaire
            handleCloseImproveResponseModal={() => setIsSurveyOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default AiAssistantChat;
