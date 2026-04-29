import Components from '../../components';
import '../../components/assessment/assessment.scss';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetWorkspacesQuery } from '../../redux/api/workspaceApi';
import useMediaQuery from '../../hooks/useMediaQuery';
import { RiNewspaperLine } from 'react-icons/ri';

import {
  setSelectedWorkspace,
  selectWorkspace,
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
  setSelectedFolder,
  toggleFolderActivation,
} from '../../redux/slices/folderSlice.js';
import Button from '../../components/common/Button';

const Chat = () => {
  const dispatch = useDispatch();
  const userId =
    useSelector((state) => state.auth.user?.id) ||
    localStorage.getItem('userId');

  const { error } = useGetWorkspacesQuery(userId);
  const workspacess = useSelector(selectAllWorkspaces);
  const selectedWorkspace = useSelector(selectWorkspace);
  const isResponsive = useMediaQuery('(max-width: 1080px)');
  const [showLeftSidebar, setShowLeftSidebar] = useState(false);
  const [showRightSidebar, setShowRightSidebar] = useState(false);

  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [chatMedia, setChatMedia] = useState({ images: [], documents: [], links: [] });
  const [assessmentBookmarks, setAssessmentBookmarks] = useState([]);

  const handleAssessmentSelect = (assessment) => {
    if (assessment) {
      const title = typeof assessment === 'string'
        ? assessment
        : assessment.ReportTitle || assessment.name || assessment.report?.[0]?.subReport?.[0]?.ReportTitle || assessment.report?.[0]?.ReportTitle || assessment;
      dispatch(setCurrentSelectedTitle(title));
    }
    setSelectedAssessment(assessment);
  };

  const [, setCurrentFolder] = useState(null);
  const [folderID, setFolderID] = useState(null);

  // Memoize Active Workspace
  const activeWorkspace = useMemo(() => {
    return (
      selectedWorkspace?.folders?.find((folder) => folder.isActive) ||
      selectedWorkspace?.folders?.[0]
    );
  }, [selectedWorkspace]);

  useEffect(() => {
    if (selectedWorkspace?.folders?.length > 0) {
      const folder =
        selectedWorkspace.folders.find((f) => f.isActive) ||
        selectedWorkspace.folders[0];
      setCurrentFolder(folder);
    }
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
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
      }
    };

    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isFetched, selectedWorkspace, handleWorkspaceChange]);

  // Lock body scroll when a responsive drawer is open
  useEffect(() => {
    if (isResponsive && (showLeftSidebar || showRightSidebar)) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isResponsive, showLeftSidebar, showRightSidebar]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="assessmentChat assessmentChat--responsive">
      <Components.Common.Header
        activeWorkspace={selectedWorkspace}
        workspaces={workspacess}
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

        <MessagesSection
          handleAssessmentSelect={handleAssessmentSelect}
          selectedAssessment={selectedAssessment}
          onMediaUpdate={setChatMedia}
          onBookmarksUpdate={setAssessmentBookmarks}
        />

        <Assessments
          folderID={folderID}
          handleAssessmentSelect={handleAssessmentSelect}
          chatMedia={chatMedia}
          bookmarkData={assessmentBookmarks}
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
          ariaLabel="Open assessments panel"
          className="responsive-fab"
          onClick={() => setShowRightSidebar(true)}
        >
          <RiNewspaperLine />
        </Button>
      )}
    </div>
  );
};

export default Chat;
