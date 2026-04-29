import { useCallback, useEffect, useMemo, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import NoData from '../../components/common/NoDataAvailable';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../../components/common/Loaders';
import {
  fetchDashboardStats,
  selectWorkspace,
  setCurrentChatId,
  setSelectedWorkspace,
  updateWorkspaceStatus,
} from '../../redux/slices/workspacesSlice';
import useManagerChat from '@hooks/useManagerChat';
import Card from '../../components/common/Card';
import AvatarGroup from '../../components/common/AvatarGroup';
import ConfirmModal from '../../components/common/ConfirmModal';
import NotificationBar from '../../components/common/NotificationBar';
import { useMoveToTrashMutation } from '../../redux/api/workspaceApi';
import Folder from './dashboardHomeComponents/Folder';
import {
  fetchFolderData,
  resetFolderState,
  setSelectedFolder,
  fetchWorkspaceAssessments,
} from '../../redux/slices/folderSlice';
import { RiNewspaperLine } from 'react-icons/ri';
import Button from '../../components/common/Button';

const titleFor = (item) =>
  item.name ||
  item.title ||
  item.chatTitle ||
  (item.report && item.report[0] ? item.report[0].ReportTitle : '') ||
  'Unknown Item';

const metaFor = (item) => {
  const rawDate = item.createdAt || item.created_at || item.updatedAt || item.updated_at;
  return rawDate ? `Created on: ${new Date(rawDate).toLocaleDateString()}` : null;
};

const badgeFor = (item) => {
  if (item.status === 'completed') return <div className="card-badge card-badge--green">Completed</div>;
  if (item.status === 'in-progress') return <div className="card-badge card-badge--blue">In Progress</div>;
  if (item.status === 'pending') return <div className="card-badge card-badge--yellow">Pending</div>;
  return null;
};

const MyAssessmentComp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedWorkspace = useSelector(selectWorkspace);
  // const selectAssessmentsData = useSelector(selectAssessments);
  const { managerData } = useManagerChat();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [assessmentData, setAssessmentData] = useState(null);
  const [moveToTrash] = useMoveToTrashMutation();
  const [confirmId, setConfirmId] = useState(null);
  const [showError, setShowError] = useState(false);

  const activeWorkspace = useMemo(() => {
    return (
      selectedWorkspace?.folders?.find((folder) => folder.isActive) ||
      selectedWorkspace?.folders?.[0]
    );
  }, [selectedWorkspace]);

  const handleFolderSelection = async (folder = activeWorkspace) => {
    if (!folder || !selectedWorkspace?.id) {
      setError('No folder or workspace ID available.');
      return;
    }

    const workspaceId = selectedWorkspace.id;

    setCurrentFolder(folder);
    dispatch(setSelectedFolder(folder));
    const assessmentData = await dispatch(
      // toggleFolderActivation({
      //   workspaceId,
      //   folderId: folder.id,
      //   isActive: true,
      // })
      fetchWorkspaceAssessments({
        folderId: folder.id || folder._id,
      })
    );
    setAssessmentData(assessmentData);

    try {
      await dispatch(
        fetchFolderData({ workspaceId, folderId: folder.id })
      ).unwrap();
    } catch {
      setError('Failed to fetch folder data.');
    }
  };

  useEffect(() => {
    if (activeWorkspace) handleFolderSelection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeWorkspace, selectedWorkspace, dispatch]);

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
      handleFolderSelection(firstFolder);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch]
  );

  useEffect(() => {
    const fetchStats = async () => {
      if (isFetched) return;
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
          handleFolderSelection(firstFolder);
        }
        setIsFetched(true);
      } catch {
        setError('Failed to fetch dashboard stats.');
      }
    };
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isFetched, selectedWorkspace, handleWorkspaceChange]);

  useEffect(() => {
    if (managerData) setIsLoading(false);
  }, [managerData]);

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

  const handleConfirmTrash = async () => {
    if (!confirmId) return;
    try {
      await moveToTrash({ entityType: 'assessment', id: confirmId }).unwrap();
      setConfirmId(null);
      handleRemoveChat();
    } catch {
      setConfirmId(null);
      setShowError(true);
    }
  };

  const handleDataUpdated = useCallback(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="my-assessment">
      <div className="section">
        <div className="selected-workspace-name">
          <p>
            Workspace <span className="workspace-badge">{selectedWorkspace?.workspaceName}</span>
          </p>
        </div>
        <div className="center-buttons">
          <Folder
            activeWorkspace={selectedWorkspace}
            onFolderSelect={handleFolderSelection}
            onFolderUpdate={handleDataUpdated}
          />
        </div>

        <section className="generate generate--spaced">
          <div className="container">
            <div className="left-buttons">
              <p className="assistant-heading">
                <RiNewspaperLine size={30} /> Assessments
              </p>
            </div>
            <div className="">
              <Button
                variant="primary"
                className="assiss-btn assiss-btn--flex"
                iconRight={<AiOutlinePlus />}
                onClick={() => {
                  dispatch(setCurrentChatId(null));
                  navigate('/assessment/chat');
                }}
              >
                Start Assessment
              </Button>
            </div>
          </div>
        </section>

        <div className="section assessment-section">
          <div className="workspace-header"></div>
          {assessmentData &&
            (assessmentData.payload.results.length > 0 ? (
              <div className="grid">
                {assessmentData.payload.results.map((item) => (
                  <Card
                    key={item.id}
                    variant="horizontal"
                    icon={<RiNewspaperLine size={20} color="grey" />}
                    title={titleFor(item)}
                    meta={metaFor(item)}
                    badge={badgeFor(item)}
                    footerRight={
                      item.sharedUsers?.length > 0 ? (
                        <AvatarGroup users={item.sharedUsers} max={3} size={24} />
                      ) : null
                    }
                    menuItems={[
                      {
                        key: 'trash',
                        label: 'Move to Trash',
                        onClick: () => setConfirmId(item.id),
                      },
                    ]}
                    onClick={() => {
                      dispatch(setCurrentChatId(item.id));
                      navigate(`/assessment/chat/${item.id}`);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="ai-assistant-nodata">
                <NoData message="No Data Available" />
              </div>
            ))}
        </div>
      </div>

      <ConfirmModal
        isOpen={!!confirmId}
        title="Move to Trash"
        description="This item will be moved to trash. You can restore it from the Trash page."
        confirmText="Move to Trash"
        cancelText="Cancel"
        onConfirm={handleConfirmTrash}
        onCancel={() => setConfirmId(null)}
      />
      {showError && (
        <NotificationBar
          message="Failed to move to trash. Please try again."
          type="error"
          onClose={() => setShowError(false)}
        />
      )}
    </div>
  );
};

export default MyAssessmentComp;
