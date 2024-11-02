import { useEffect, useState, useCallback } from 'react';
import Workspaces from './Workspaces';
import CountingCards from './CountingCards';
import Folder from './Folder';
import Account from './Account';
import NotificationBar from '../../common/NotificationBar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDashboardStats,
  selectDashboardStats,
  selectWorkspace, setCurrentChatId,
  setSelectedWorkspace, updateWorkspaceStatus
} from '../../../redux/slices/workspacesSlice';
import {
  fetchFolderData,
  resetFolderState,
  selectFolderData,
  setSelectedFolder, toggleFolderActivation
} from '../../../redux/slices/folderSlice';
import DashboardCard from './DashboardCard.jsx';
import { FaFolderTree } from 'react-icons/fa6';
import { RiNewspaperLine } from 'react-icons/ri';
import { IoIosChatboxes } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import './styles/DashboardHome.css'

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
            {itemType === 'assessments' ? <RiNewspaperLine /> : itemType === 'chats' ? <IoIosChatboxes /> : <FaFolderTree />}
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

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const dashboardStats = await dispatch(fetchDashboardStats()).unwrap();
        console.log(dashboardStats,'dashboardStatas')
        const activeWorkspace = dashboardStats.workspaces.find(workspace => workspace.isActive) || dashboardStats.workspaces[0];
        console.log(activeWorkspace,'activeWorksapce')
        // if (!selectedWorkspace || selectedWorkspace.id !== activeWorkspace.id) {
          console.log('changing workspace')
          dispatch(setSelectedWorkspace(activeWorkspace));
          setActiveWorkspace(activeWorkspace)
          handleWorkspaceChange(activeWorkspace);
        // }
      } catch {
        setError('Failed to fetch dashboard stats.');
        setShowNotification(true);
      }
    };
    fetchStats();
  }, [dispatch]);

  const handleFolderSelection = useCallback(
    async (folder, workspaceId = null) => {
      const activeWorkspaceId = workspaceId || activeWorkspace?.id;
      if (!activeWorkspaceId) {
        setError("No workspace ID available.");
        setShowNotification(true);
        return;
      }

      if(folder) {
        setCurrentFolder(folder);
        dispatch(setSelectedFolder(folder));
        dispatch(toggleFolderActivation({ workspaceId: activeWorkspaceId, folderId: folder.id, isActive: true }));

        try {
          await dispatch(fetchFolderData({ workspaceId: activeWorkspaceId, folderId: folder.id })).unwrap();
        } catch {
          setError('Failed to fetch folder data.');
          setShowNotification(true);
        }
      }
    },
    [dispatch, selectedWorkspace]
  );

  const handleWorkspaceChange = useCallback(
    (workspace) => {
      dispatch(setSelectedWorkspace(workspace));
      setActiveWorkspace(workspace)
      dispatch(updateWorkspaceStatus({ workspaceId: workspace.id, isActive: true }));
      setCurrentFolder(null);
      dispatch(resetFolderState());

      if (workspace?.folders?.length > 0) {
        const firstFolder = workspace.folders.find(folder => folder.isActive) || workspace.folders[0];
        handleFolderSelection(firstFolder, workspace.id);
      }
    },
    [dispatch, handleFolderSelection]
  );

  useEffect(() => {
    if (dashboardStats?.workspaces?.length > 0 && !selectedWorkspace) {
      const activeWorkspace = dashboardStats.workspaces.find(workspace => workspace.isActive) || dashboardStats.workspaces[0];
      console.log(activeWorkspace,'activeWorksapce')
      setActiveWorkspace(activeWorkspace)
      if (!selectedWorkspace || selectedWorkspace.id !== activeWorkspace.id) {
        dispatch(setSelectedWorkspace(activeWorkspace));
        handleWorkspaceChange(activeWorkspace);
      }
    }
    // } else if (!dashboardStats?.workspaces?.length) {
    //   setError("No workspaces available.");
    //   setShowNotification(true);
    // }
  }, [dashboardStats, selectedWorkspace, dispatch]);

  useEffect(() => {
    if (selectedWorkspace?.folders?.length > 0 && !currentFolder) {
      const activeFolder = selectedWorkspace.folders.find(folder => folder.isActive) || selectedWorkspace.folders[0];
      handleFolderSelection(activeFolder, selectedWorkspace.id);
    }
  }, [selectedWorkspace, currentFolder]);


  const handleRemoveItem = useCallback((itemId, itemType) => {
    setCurrentFolder((prevFolder) => ({
      ...prevFolder,
      [itemType]: prevFolder[itemType].filter((item) => item.id !== itemId),
    }));
  }, []);

  const handleDataUpdated = useCallback(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  console.log(activeWorkspace,'activeeeeeee')

  return (
    <div className="dashboard">
      <CountingCards
        activeWorkspace={activeWorkspace?.workspaceName}
        totalWorkspaces={dashboardStats?.totalWorkspaces}
        totalProjects={dashboardStats?.totalProjects}
      />

      <Account />

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
        <div className="container">
          {/* Rendering SectionGrid Components Conditionally */}
          {folderData?.[0]?.chats?.length > 0 ? (
            <SectionGrid
              title="AI Assistant"
              items={folderData[0].chats}
              itemType="chats"
              onRemove={(id) => handleRemoveItem(id, 'chats')}
            />
          ) : (
            <NoDataMessage title="AI Assistant" icon={<IoIosChatboxes />} />
          )}

          {folderData?.[0]?.assessments?.length > 0 ? (
            <SectionGrid
              title="Assessments"
              items={folderData[0].assessments}
              itemType="assessments"
              onRemove={(id) => handleRemoveItem(id, 'assessments')}
            />
          ) : (
            <NoDataMessage title="Assessments" icon={<RiNewspaperLine />} />
          )}

          {folderData?.[0]?.sitemaps?.length > 0 ? (
            <SectionGrid
              title="Sitemaps"
              items={folderData[0].sitemaps}
              itemType="sitemaps"
              onRemove={(id) => handleRemoveItem(id, 'sitemaps')}
            />
          ) : (
            <NoDataMessage title="Sitemaps" icon={<FaFolderTree />} />
          )}

          {folderData?.[0]?.wireframes?.length > 0 ? (
            <SectionGrid
              title="Wireframes"
              items={folderData[0].wireframes}
              itemType="wireframes"
              onRemove={(id) => handleRemoveItem(id, 'wireframes')}
            />
          ) : (
            <NoDataMessage title="Wireframes" icon={<FaFolderTree />} />
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
