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
import DashboardCard from '../../components/dashboard/dashboardHomeComponents/DashboardCard';
import Folder from './dashboardHomeComponents/Folder';
import {
  fetchFolderData,
  resetFolderState,
  selectFolderData,
  selectSelectedFolder,
  setSelectedFolder,
  toggleFolderActivation,
  fetchWorkspaceAssessments,
} from '../../redux/slices/folderSlice';
import { RiNewspaperLine } from 'react-icons/ri';
import { select } from 'jodit/esm/plugins/select/select';

const MyAssessmentComp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedWorkspace = useSelector(selectWorkspace);
  const folderData = useSelector(selectFolderData);
  // const selectAssessmentsData = useSelector(selectAssessments);
  const selectedFolder = useSelector(selectSelectedFolder);
  const { managerData } = useManagerChat();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [assessmentData, setAssessmentData] = useState(null);

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

  const handleDataUpdated = useCallback(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="">
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
              <button
                className="assiss-btn assiss-btn--flex"
                onClick={() => {
                  dispatch(setCurrentChatId(null));
                  navigate('/assessment/chat');
                }}
              >
                Start Assessment
                <AiOutlinePlus />
              </button>
            </div>
          </div>
        </section>

        <div className="section assessment-section">
          <div className="workspace-header"></div>
          {assessmentData &&
            (assessmentData.payload.results.length > 0 ? (
              <div className="grid">
                {assessmentData.payload.results.map((item) => (
                  <DashboardCard
                    key={item.id}
                    data={{
                      ...item,
                      type: 'assessment',
                      folderData: folderData,
                      idd: item.id,
                    }}
                    onRemove={() => handleRemoveChat()}
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

      {/* Component Styles */}
      <style>{`
        .selected-workspace-name p {
          font-size: 1.5rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .selected-workspace-name .workspace-badge {
          background-color: #C3E11D;
          color: #0B1444;
          padding: 0.25rem 0.75rem;
          border-radius: 7px;
          font-size: 1.3rem;
          font-weight: 700;
        }
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
        .assessment-section {
          margin-top: 0 !important;
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
          .dropdown-menuu {
  position: absolute;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  width: 100%;
  margin-top: 5px;
  right: 0rem;
  top: 2rem;
}

.dropdown-itemm {
  padding: 8px 5px;
  cursor: pointer;
  transition: background 0.2s ease;
  font-weight: normal;
  text-align: center;
  font-size: 10px;
  color: black
}

.dropdown-itemm:hover {
  background-color: #f5f5f5;
}

.icon-container {
  position: relative; /* Required for dropdown positioning */
}
      `}</style>
    </div>
  );
};

export default MyAssessmentComp;
