import { useEffect, useState } from 'react';
import Workspaces from './Workspaces';
import CountingCards from './CountingCards';
import Folder from './Folder';
import Account from './Account';
import NotificationBar from '../../common/NotificationBar.jsx';  // Import the NotificationBar component
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDashboardStats,
  selectDashboardStats,
  selectWorkspace,
  setSelectedWorkspace,
} from '../../../redux/slices/workspacesSlice';
import {
  fetchFolderData,
  resetFolderState,
  selectFolderData,
  setSelectedFolder,
} from '../../../redux/slices/folderSlice';
import DashboardCard from './DashboardCard.jsx';

// Reusable Section Grid Component
const SectionGrid = ({ title, items, itemType, onRemove }) => (
  <div className="section">
    <div className="workspace-header">
      <p className="collection-heading">{title}</p>
    </div>
    <div className="grid">
      {items.map((item) => (
        <DashboardCard
          key={item.id}
          data={{ ...item, type: itemType }}
          onRemove={onRemove}
        />
      ))}
    </div>
  </div>
);

const DashboardHomeComp = () => {
  const dispatch = useDispatch();
  const dashboardStats = useSelector(selectDashboardStats);
  const selectedWorkspace = useSelector(selectWorkspace);
  const folderData = useSelector(selectFolderData);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [error, setError] = useState(null);  // State to handle errors
  const [showNotification, setShowNotification] = useState(false); // Control notification visibility

  // Fetch dashboard stats when component mounts
  useEffect(() => {
    const fetchStats = async () => {
      try {
        await dispatch(fetchDashboardStats()).unwrap();
      } catch (err) {
        handleError('Failed to fetch dashboard stats.');
      }
    };
    fetchStats();
  }, [dispatch]);

  // Automatically select the first workspace if none is selected
  useEffect(() => {
    if (dashboardStats?.workspaces?.length > 0 && !selectedWorkspace) {
      dispatch(setSelectedWorkspace(dashboardStats.workspaces[0]));
      setCurrentFolder(null);
      dispatch(resetFolderState());
    }
  }, [dashboardStats, selectedWorkspace, dispatch]);

  // Automatically select the first folder within the selected workspace
  useEffect(() => {
    if (folderData?.length > 0 && !currentFolder) {
      handleFolderSelection(folderData[0]);
    }
  }, [folderData, currentFolder]);

  // Error handler
  const handleError = (message) => {
    setError(message);
    setShowNotification(true);
  };

  // Folder selection handler
  const handleFolderSelection = async (folder, workspaceId = null) => {
    const activeWorkspaceId = workspaceId || selectedWorkspace?.id;
    if (!activeWorkspaceId) {
      handleError("No workspace ID available.");
      return;
    }

    setCurrentFolder(folder);
    dispatch(setSelectedFolder(folder)); // Set the selected folder in Redux store

    try {
      await dispatch(fetchFolderData({ workspaceId: activeWorkspaceId, folderId: folder.id })).unwrap();
    } catch (err) {
      handleError('Failed to fetch folder data.');
    }
  };

  // Handle workspace change
  const handleWorkspaceChange = (workspace) => {
    dispatch(setSelectedWorkspace(workspace));
    setCurrentFolder(null);
    dispatch(resetFolderState());

    if (workspace?.folders?.length > 0) {
      const firstFolder = workspace.folders[0];
      handleFolderSelection(firstFolder, workspace.id);
    }
  };

  // Remove item handler (for assessments, chats, etc.)
  const handleRemoveItem = (itemId, itemType) => {
    setCurrentFolder((prevFolder) => ({
      ...prevFolder,
      [itemType]: prevFolder[itemType].filter((item) => item.id !== itemId),
    }));
  };

  // Triggered when data needs to be re-fetched or updated
  const handleDataUpdated = () => {
    dispatch(fetchDashboardStats());
  };

  return (
    <div className="dashboard">
      {/* Counting cards to display workspace/project stats */}
      <CountingCards
        activeWorkspace={dashboardStats.activeWorkspace}
        totalWorkspaces={dashboardStats.totalWorkspaces}
        totalProjects={dashboardStats.totalProjects}
      />

      {/* Account details */}
      <Account />

      {/* Workspace selector component */}
      <Workspaces
        activeWorkspace={selectedWorkspace}
        workspaces={dashboardStats.workspaces}
        onWorkspaceUpdated={handleDataUpdated}
        onWorkspaceChange={handleWorkspaceChange}
      />

      {/* Folder selector component */}
      <Folder
        activeWorkspace={selectedWorkspace}
        onFolderSelect={handleFolderSelection}
        onFolderUpdate={handleDataUpdated}
      />

      {/* Render folder data */}
      {selectedWorkspace?.folders?.length > 0 && currentFolder && folderData?.length > 0 && (
        <section className="folder-details">
          <div className="container">
            {folderData[0]?.assessments?.length > 0 && (
              <SectionGrid
                title="Assessments"
                items={folderData[0].assessments}
                itemType="assessments"
                onRemove={(id) => handleRemoveItem(id, 'assessments')}
              />
            )}
            {folderData[0]?.chats?.length > 0 && (
              <SectionGrid
                title="Chats"
                items={folderData[0].chats}
                itemType="chats"
                onRemove={(id) => handleRemoveItem(id, 'chats')}
              />
            )}
            {folderData[0]?.sitemaps?.length > 0 && (
              <SectionGrid
                title="Sitemaps"
                items={folderData[0].sitemaps}
                itemType="sitemaps"
                onRemove={(id) => handleRemoveItem(id, 'sitemaps')}
              />
            )}
            {folderData[0]?.wireframes?.length > 0 && (
              <SectionGrid
                title="Wireframes"
                items={folderData[0].wireframes}
                itemType="wireframes"
                onRemove={(id) => handleRemoveItem(id, 'wireframes')}
              />
            )}
          </div>
        </section>
      )}

      {/* Error Notification */}
      {showNotification && (
        <NotificationBar
          message={error}
          type="error"
          onClose={() => setShowNotification(false)}
        />
      )}

      <style>{`
        .dashboard {
          display: flex;
          flex-direction: column;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          grid-gap: 1rem;
          justify-items: center;
          align-items: start;
          padding: 15px;
        }

        .section {
          margin-top: 2rem;
        }

        .collection-heading {
          font-size: 1.5rem;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default DashboardHomeComp;
