import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import config from '../config/config';
import {
  fetchFolderData,
  resetFolderState,
  selectSelectedFolder,
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
  const businessInfo = useSelector((state) => state.businessInfo);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [isReportGenerated, setIsReportGenerated] = useState(false);
  const [report, setReport] = useState(null);

  //const currentWorkspaceId = '66dc950e740af833ee34b3c5';// useSelector(selectCurrentWorkspace);
  //const currentFolderId = '66dc950e740af833ee34b3c6';// useSelector(selectCurrentFolder)
  const workspaceId = useSelector(
    (state) => state.workspaces.currentWorkspaceId
  );
  const currentWorkspace = useSelector(selectWorkspace);

  // const folderId = useSelector((state) => state.workspaces.currentFolderId);
  // const selectedWorkspace = useSelector(selectWorkspace);

  const folderId = useSelector(selectSelectedFolder);

  const [isFetched, setIsFetched] = useState(false);

  const handleFolderSelection = useCallback(
    async (folder, workspaceId = currentWorkspace?.id) => {
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
      } catch {
        console.log('Failed to fetch folder data.');
      }
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

  const handleDataUpdated = useCallback(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  const StartAssessment = async (message, assessmentName, Questions) => {
    try {
      console.log('assessmentName', assessmentName);
      console.log('Questions', Questions);
      console.log('businessInfo', businessInfo);

      const businessInfoData = {
        companyName: businessInfo.companyName,
        companySize: businessInfo.companySize,
        industry: businessInfo.industry,
        jobTitle: businessInfo.jobTitle,
        lastName: businessInfo.lastName,
        firstName: businessInfo.firstName,
        role: businessInfo.role,
        webURL: businessInfo.websiteURL,
      };
      const token = localStorage.getItem('token');
      console.log(folderId, 'folderID..............');
      const response = await axios.post(
        `${config.apiURL}/workspace/${currentWorkspace.id}/folder/${
          folderId?._id || folderId?.id
        }/assessment/`,
        {
          // message: message || '',
          // history: [],
          // generalInfo: `5 Comprehensive Pre-Assessment ${Questions}`,
          // businessInfo: businessInfoData,
          assessmentName: assessmentName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && response.data.isReportGenerated) {
        setIsReportGenerated(true);
        setReport(response.data.report[0].finalReport);
        return response.data;
      }
      console.log('hook response: A:', response.data);
      console.log('hook response: B', response.data.report[0]);
      console.log(
        'hook response: C',
        response.data.report[0].subReport[0].questionAnswer
      );
      console.log(
        'hook response:',
        response.data.report[0].subReport[0].questionAnswer[0].question
      );
      return response.data;
    } catch (error) {
      console.log('assessment error', error.message);
      setError(error.message);
    }
  };

  return { error, StartAssessment, isReportGenerated, report };
};

export default useStartAssessment;
