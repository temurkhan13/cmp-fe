import Components from '../../components';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetWorkspacesQuery } from '../../redux/api/workspaceApi';
import data from '../../data';

import {
  setSelectedWorkspace,
  selectWorkspace,
  setCurrentAssessmentId,
  setCurrentChatId,
  fetchDashboardStats,
  updateWorkspaceStatus,
  setCurrentSelectedTitle,
} from '../../redux/slices/workspacesSlice';
import { selectAllWorkspaces } from '../../redux/selectors/selectors';
import {
  Assessments,
  MessagesSection,
  NewChat,
} from '../../components/assessment';
import {
  fetchFolderData,
  resetFolderState,
  selectFolderData,
  setSelectedFolder,
  toggleFolderActivation,
} from '../../redux/slices/folderSlice.js';

const Chat = () => {
  const dispatch = useDispatch();
  const { chatId } = useParams(); // Extract chatId from the URL
  const userId =
    useSelector((state) => state.auth.user?.id) ||
    localStorage.getItem('userId');

  const { data: workspaces, error, isLoading } = useGetWorkspacesQuery(userId);
  const workspacess = useSelector(selectAllWorkspaces);
  const selectedWorkspace = useSelector(selectWorkspace);
  const folderData = useSelector(selectFolderData);

  const [selectedAssessment, setSelectedAssessment] = useState(null);

  const handleAssessmentSelect = (assessment) => {
    if (assessment) {
      const title = typeof assessment === 'string'
        ? assessment
        : assessment.ReportTitle || assessment.name || assessment.report?.[0]?.subReport?.[0]?.ReportTitle || assessment.report?.[0]?.ReportTitle || assessment;
      dispatch(setCurrentSelectedTitle(title));
    }
    setSelectedAssessment(assessment);
  };

  const [currentFolder, setCurrentFolder] = useState(null);
  const [folderID, setFolderID] = useState(null);

  // Memoize Active Workspace
  const activeWorkspace = useMemo(() => {
    setCurrentFolder(selectWorkspace?.folders);
    return (
      selectedWorkspace?.folders?.find((folder) => folder.isActive) ||
      selectedWorkspace?.folders?.[0]
    );
  }, [selectedWorkspace]);

  const [isFetched, setIsFetched] = useState(false);

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

      setFolderID(folder.id);

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

      if (workspace?.folders?.length > 0) {
        const firstFolder =
          workspace.folders.find((folder) => folder.isActive) ||
          workspace.folders[0];
        handleFolderSelection(firstFolder, workspace.id);
      }
    },
    [dispatch, handleFolderSelection]
  );

  useEffect(() => {
    const fetchStats = async () => {
      if (isFetched) return; // Prevent further calls if already fetched

      try {
        const dashboardStats = await dispatch(fetchDashboardStats()).unwrap();
        const initialWorkspace =
          dashboardStats.workspaces.find((ws) => ws.isActive) ||
          dashboardStats.workspaces[0];
        if (
          !selectedWorkspace ||
          selectedWorkspace.id !== initialWorkspace.id
        ) {
          dispatch(setSelectedWorkspace(initialWorkspace));
          handleWorkspaceChange(initialWorkspace);
        } else {
          if (selectedWorkspace?.folders?.length > 0) {
            const firstFolder =
              selectedWorkspace.folders.find((folder) => folder.isActive) ||
              selectedWorkspace.folders[0];
            handleFolderSelection(firstFolder, selectedWorkspace.id);
          }
        }
        setIsFetched(true); // Mark as fetched after successful load
      } catch {
        // setError('Failed to fetch dashboard stats.');
      }
    };

    fetchStats();
  }, [dispatch, isFetched, selectedWorkspace, handleWorkspaceChange]);

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
    <div className="assessmentChat">
      <Components.Common.Header
        activeWorkspace={selectedWorkspace}
        workspaces={workspacess}
      />
      <section>
        <NewChat data={data.chat.newChatDummyData} />

        <MessagesSection
          handleAssessmentSelect={handleAssessmentSelect}
          selectedAssessment={selectedAssessment}
        />

        <Assessments
          folderID={folderID}
          handleAssessmentSelect={handleAssessmentSelect}
        />
      </section>
    </div>
  );
};

export default Chat;
