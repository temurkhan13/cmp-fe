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
      } catch {
        console.log('Failed to fetch folder data.');
      }
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
        const initialWorkspace =
          dashboardStats.workspaces.find((ws) => ws.isActive) ||
          dashboardStats.workspaces[0];
        if (
          !selectedWorkspace ||
          selectedWorkspace.id !== initialWorkspace.id
        ) {
          dispatch(setSelectedWorkspace(initialWorkspace));
          handleWorkspaceChange(initialWorkspace);
        }
        setIsFetched(true); // Mark as fetched after successful load
      } catch {
        setError('Failed to fetch dashboard stats.');
      }
    };

    fetchStats();
  }, [dispatch, isFetched, selectedWorkspace, handleWorkspaceChange]);

  // <<<<<<< feature/assessmnet_design
  useEffect(() => {
    // Check if folder data is available; if not, fetch it
    if (!folderData || folderData.length === 0) {
      // Assuming selectedWorkspace and activeFolder are necessary
      if (selectedWorkspace && activeWorkspace) {
        dispatch(
          fetchFolderData({
            workspaceId: selectedWorkspace.id,
            folderId: activeWorkspace.id,
          })
        ).catch(() => setError('Failed to load folder data.'));
      }
      // =======
      //   const handleRemoveChat = useCallback(async () => {
      //     if (currentFolder) {
      //       await dispatch(
      //         fetchFolderData({
      //           workspaceId: selectedWorkspace.id,
      //           folderId: currentFolder.id,
      //         })
      //       ).unwrap();
      // >>>>>>> main
    }
  }, [dispatch, folderData, selectedWorkspace, activeWorkspace]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleDataUpdated = useCallback(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <div style={{ marginBottom: '2rem' }}>
        <Component.Dashboard.Header />
      </div>

      <div className="selected-workspace-name">
        <p>
          Workspace <span>{selectedWorkspace?.workspaceName}</span>
        </p>
      </div>
      <Folder
        activeWorkspace={selectedWorkspace}
        onFolderSelect={handleFolderSelection}
        onFolderUpdate={handleDataUpdated}
      />

      <section className="generate" style={{ marginTop: '2rem' }}>
        <div className="container">
          <div className="left-buttons">
            <p className="assistant-heading">
              <IoIosChatboxes />
              AI Assistant
            </p>
          </div>

          <div className="center-buttons">
            <button
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              className="assiss-btn"
              onClick={() => {
                dispatch(setCurrentChatId(null));
                navigate('/assistant/chat');
              }}
            >
              Create Assistant
              <AiOutlinePlus size={18} />
            </button>
          </div>
        </div>
      </section>

      <div className="section">
        <div className="workspace-header"></div>
        <div className="grid">
          {folderData?.[0]?.chats.length > 0 ? (
            folderData?.[0]?.chats?.map((item) => (
              <DashboardCard
                key={item.id}
                data={{ ...item, type: 'chats' }}
                onRemove={() => handleRemoveChat()}
                onClick={() => {
                  dispatch(setCurrentChatId(item.id));
                  navigate(`/assistant/chat/${item.id}`);
                }}
              />
            ))
          ) : (
            <NoData message="No Data Available" />
          )}
        </div>
      </div>

      <style>{`
      .selected-workspace-name{
      position:absolute;
      top:2rem;
      left:4rem;
    p{
    font-size:1.5rem;
    font-weight:600;
    span{
    padding:1rem;
    background-color:#f5f5f5;
    border-radius:1rem;
    border:1px solid gray;
    }
    }
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
      `}</style>
    </DashboardLayout>
  );
};

export default AiAssistant;
