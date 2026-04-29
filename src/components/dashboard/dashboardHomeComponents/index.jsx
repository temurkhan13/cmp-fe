import { useEffect, useState, useCallback } from 'react';
import Workspaces from './Workspaces';
import CountingCards from './CountingCards';
import Folder from './Folder';
import NotificationBar from '../../common/NotificationBar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDashboardStats,
  selectDashboardStats,
  selectWorkspace,
  setCurrentChatId,
  setSelectedWorkspace,
  updateWorkspaceStatus,
} from '../../../redux/slices/workspacesSlice';
import {
  fetchFolderData,
  resetFolderState,
  selectFolderData,
  setSelectedFolder,
  toggleFolderActivation,
} from '../../../redux/slices/folderSlice';
import DashboardCard from './DashboardCard.jsx';
import { FaFolderTree } from 'react-icons/fa6';
import { RiNewspaperLine } from 'react-icons/ri';
import { GiWireframeGlobe } from 'react-icons/gi';
import { IoIosChatboxes } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { BsFilePlayFill } from 'react-icons/bs';

import './styles/dashboard-home.scss';
import { SkeletonCard, SkeletonStatCards } from '../../common/Skeleton';

const SectionGrid = ({ title, items, itemType, onRemove }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCardClick = (item) => {
    if (itemType === 'assessments') {
      navigate(`/assessment/chat/${item.id}`);
    } else if (itemType === 'chats') {
      dispatch(setCurrentChatId(item.id));
      navigate(`/assistant/chat/${item.id}`);
    }
  };

  return (
    <div className="section">
      <div className="container-heading">
        <div className="left-buttons">
          <p className="assistant-heading">
            {itemType === 'assessment' ? (
              <RiNewspaperLine />
            ) : itemType === 'chats' ? (
              <IoIosChatboxes />
            ) : itemType === 'wireframes' ? (
              <GiWireframeGlobe />
            ) : (
              <FaFolderTree />
            )}
            {title}
          </p>
        </div>
      </div>
      <div className="grid">
        {items.map((item) => (
          <DashboardCard
            key={item.id}
            data={{ ...item, type: itemType }}
            onRemove={onRemove}
            onClick={() => handleCardClick(item)}
          />
        ))}
      </div>
    </div>
  );
};

const DashboardHomeComp = () => {
  const dispatch = useDispatch();
  const dashboardStats = useSelector(selectDashboardStats);
  const selectedWorkspace = useSelector(selectWorkspace);
  const folderData = useSelector(selectFolderData);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setIsFetching(true);
      try {
        const dashboardStats = await dispatch(fetchDashboardStats()).unwrap();
        const activeWorkspace =
          dashboardStats.workspaces.find((workspace) => workspace.isActive) ||
          dashboardStats.workspaces[0];
        if (!selectedWorkspace) {
          dispatch(setSelectedWorkspace(activeWorkspace));
          setActiveWorkspace(activeWorkspace);
          handleWorkspaceChange(activeWorkspace);
        } else {
          // Refresh local state with already-selected workspace from Redux
          const currentWs = dashboardStats.workspaces.find(
            (ws) => ws.id === selectedWorkspace.id
          ) || activeWorkspace;
          setActiveWorkspace(currentWs);
          handleWorkspaceChange(currentWs);
        }
      } catch (err) { if (import.meta.env.DEV) console.error(err); }
      finally { setIsFetching(false); }
    };
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleFolderSelection = useCallback(
    async (folder, workspaceId = null) => {
      const activeWorkspaceId =
        workspaceId || activeWorkspace?.id || selectedWorkspace.id;
      if (!activeWorkspaceId) {
        setError('No workspace ID available.');
        setShowNotification(true);
        return;
      }

      if (folder) {
        setCurrentFolder(folder);
        dispatch(setSelectedFolder(folder));
        dispatch(
          toggleFolderActivation({
            workspaceId: activeWorkspaceId,
            folderId: folder.id,
            isActive: true,
          })
        );

        try {
          await dispatch(
            fetchFolderData({
              workspaceId: activeWorkspaceId,
              folderId: folder.id,
            })
          ).unwrap();
        } catch { /* ignored */ }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, selectedWorkspace]
  );

  const handleWorkspaceChange = useCallback(
    (workspace) => {
      dispatch(setSelectedWorkspace(workspace));
      setActiveWorkspace(workspace);
      dispatch(
        updateWorkspaceStatus({ workspaceId: workspace.id, isActive: true })
      );
      setCurrentFolder(null);
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
    if (dashboardStats?.workspaces?.length > 0 && !selectedWorkspace) {
      const activeWorkspace =
        dashboardStats.workspaces.find((workspace) => workspace.isActive) ||
        dashboardStats.workspaces[0];
      setActiveWorkspace(activeWorkspace);
      if (!selectedWorkspace || selectedWorkspace.id !== activeWorkspace.id) {
        dispatch(setSelectedWorkspace(activeWorkspace));
        handleWorkspaceChange(activeWorkspace);
      }
    }
    // } else if (!dashboardStats?.workspaces?.length) {
    //   setError("No workspaces available.");
    //   setShowNotification(true);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardStats, selectedWorkspace, dispatch]);

  useEffect(() => {
    if (selectedWorkspace?.folders?.length > 0 && !currentFolder) {
      const activeFolder =
        selectedWorkspace.folders.find((folder) => folder.isActive) ||
        selectedWorkspace.folders[0];
      handleFolderSelection(activeFolder, selectedWorkspace.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWorkspace, currentFolder]);

  const handleRemoveItem = useCallback(() => {
    // Refetch folder data from backend so Redux state updates
    const folder = currentFolder;
    const wsId = activeWorkspace?.id || selectedWorkspace?.id;
    if (folder && wsId) {
      dispatch(fetchFolderData({ workspaceId: wsId, folderId: folder.id }));
    }
  }, [dispatch, currentFolder, activeWorkspace, selectedWorkspace]);

  const handleDataUpdated = useCallback(async () => {
    const stats = await dispatch(fetchDashboardStats()).unwrap();
    const refreshedWorkspace = stats.workspaces.find(
      (ws) => ws.id === activeWorkspace?.id
    ) || stats.workspaces.find((ws) => ws.isActive) || stats.workspaces[0];
    if (refreshedWorkspace) {
      setActiveWorkspace(refreshedWorkspace);
    }
  }, [dispatch, activeWorkspace?.id]);

  if (isFetching) {
    return (
      <div className="dashboard">
        <SkeletonStatCards />
        <div className="dashboard-home-padding">
          <SkeletonCard count={3} />
          <SkeletonCard count={3} />
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="selected-workspace-name">
        <p>
          Workspace <span className="workspace-badge">{selectedWorkspace?.workspaceName}</span>
        </p>
      </div>

      <CountingCards
        activeWorkspace={activeWorkspace?.workspaceName}
        totalWorkspaces={dashboardStats?.totalWorkspaces}
        totalProjects={dashboardStats?.totalProjects}
      />

      {/* <Account /> */}

      <Workspaces
        activeWorkspace={activeWorkspace}
        workspaces={dashboardStats?.workspaces}
        onWorkspaceUpdated={handleDataUpdated}
        onWorkspaceChange={handleWorkspaceChange}
      />

      <Folder
        activeWorkspace={activeWorkspace}
        onFolderSelect={handleFolderSelection}
        onFolderUpdate={handleDataUpdated}
      />

      <section className="folder-details">
        <div className="dashboard-home-padding--sm">
          {/* Rendering SectionGrid Components Conditionally */}
          {folderData?.[0]?.chats?.length > 0 ? (
            <SectionGrid
              title="AI Assistant"
              items={folderData[0].chats}
              itemType="chat"
              onRemove={(id) => handleRemoveItem(id, 'chat')}
            />
          ) : (
            <NoDataMessage title="AI Assistant" icon={<IoIosChatboxes />} />
          )}

          {folderData?.[0]?.assessments?.length > 0 ? (
            <SectionGrid
              title="Assessments"
              items={folderData[0].assessments}
              itemType="assessment"
              onRemove={(id) => handleRemoveItem(id, 'assessment')}
            />
          ) : (
            <NoDataMessage title="Assessments" icon={<RiNewspaperLine />} />
          )}

          {folderData?.[0]?.sitemaps?.length > 0 ? (
            <SectionGrid
              title="Sitemaps"
              items={folderData[0].sitemaps}
              itemType="sitemap"
              onRemove={(id) => handleRemoveItem(id, 'sitemap')}
            />
          ) : (
            <NoDataMessage title="Sitemaps" icon={<FaFolderTree />} />
          )}

          {folderData?.[0]?.sitemaps?.length > 0 ? (
            <SectionGrid
              title="Digital PlayBook"
              items={folderData[0].sitemaps}
              itemType="sitemap"
              onRemove={(id) => handleRemoveItem(id, 'sitemap')}
            />
          ) : (
            <NoDataMessage title="Digital PlayBook" icon={<BsFilePlayFill />} />
          )}
        </div>
      </section>

      {showNotification && (
        <NotificationBar
          message={error}
          type="error"
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

const NoDataMessage = ({ title, icon }) => (
  <>
    <div className="container-heading">
      <div className="left-buttons">
        <p className="assistant-heading">
          {icon}
          {title}
        </p>
      </div>
    </div>
    <div className="no-projects">
      <p>No {title} associated with this workspace.</p>
    </div>
  </>
);

export default DashboardHomeComp;
