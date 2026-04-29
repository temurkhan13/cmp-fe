import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import apiClient from '../api/axios';
import {
  fetchFolderData,
  resetFolderState,
  setSelectedFolder,
  toggleFolderActivation,
} from '../redux/slices/folderSlice.js';
import {
  fetchDashboardStats,
  selectWorkspace,
  setSelectedWorkspace,
  updateWorkspaceStatus,
} from '../redux/slices/workspacesSlice.js';

const useStartAssessment = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isReportGenerated, setIsReportGenerated] = useState(false);
  const [report, setReport] = useState(null);
  const currentWorkspace = useSelector(selectWorkspace);

  const [isFetched, setIsFetched] = useState(false);

  const handleFolderSelection = useCallback(
    async (folder, workspaceId = currentWorkspace?.id) => {
      if (!workspaceId) {
        setError('No workspace ID available.');
        return;
      }

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
      } catch { /* ignored */ }
    },
    [dispatch, currentWorkspace]
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
        const initialWorkspace =
          dashboardStats.workspaces.find((ws) => ws.isActive) ||
          dashboardStats.workspaces[0];
        if (!currentWorkspace || currentWorkspace.id !== initialWorkspace.id) {
          dispatch(setSelectedWorkspace(initialWorkspace));
          handleWorkspaceChange(initialWorkspace);
        }
        setIsFetched(true); // Mark as fetched after successful load
      } catch {
        setError('Failed to fetch dashboard stats.');
      }
    };

    fetchStats();
  }, [dispatch, isFetched, currentWorkspace, handleWorkspaceChange]);

  const StartAssessment = async (name, folderId) => {
    try {
      const response = await apiClient.post('/workspace-assessment/', {
        folderId,
        name,
      });

      // if (response.data || response.data.data.report.isGenerated) {
      //   setIsReportGenerated(true);
      //   setReport(response.data.data.report.isGenerated);
      //   return response.data.data;
      // }

      if (response.data.data?.report?.isGenerated) {
        setIsReportGenerated(true);
        setReport(response.data.data);
        return response.data.data;
      }
      return response.data.data;
    } catch (error) {
      setError(error.message);
    }
  };

  return { error, StartAssessment, isReportGenerated, report };
};

export default useStartAssessment;
