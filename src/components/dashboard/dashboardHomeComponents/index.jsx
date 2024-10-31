import { useEffect, useState } from 'react';
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

const SectionGrid = ({ title, items, itemType, onRemove }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
            onClick={() => {
              if (itemType === 'assessments') {
                navigate(`/assessment/chat/${item.id}`);
              } else if (itemType === 'chats') {
                dispatch(setCurrentChatId(item.id));
                navigate(`/assistant/chat/${item.id}`);
              }
            }}
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

  // Set the workspace only on the first render or if there's no selected workspace
  useEffect(() => {
    if (dashboardStats?.workspaces?.length > 0 && !selectedWorkspace) {
      const activeWorkspace = dashboardStats.workspaces.find(workspace => workspace.isActive) || dashboardStats.workspaces[0];

      if (!selectedWorkspace || selectedWorkspace.id !== activeWorkspace.id) {
        dispatch(setSelectedWorkspace(activeWorkspace));
        handleWorkspaceChange(activeWorkspace);
      }
    } else if (!dashboardStats?.workspaces?.length) {
      handleError("No workspaces available.");
    }
  }, [dashboardStats, selectedWorkspace, dispatch]);

  useEffect(() => {
    if (selectedWorkspace?.folders?.length > 0 && !currentFolder) {
      const activeFolder = selectedWorkspace.folders.find(folder => folder.isActive) || selectedWorkspace.folders[0];
      handleFolderSelection(activeFolder, selectedWorkspace.id);
    }
  }, [folderData, currentFolder, selectedWorkspace]);

  const handleError = (message) => {
    setError(message);
    setShowNotification(true);
  };

  const handleFolderSelection = async (folder, workspaceId = null) => {
    const activeWorkspaceId = workspaceId || selectedWorkspace?.id;
    if (!activeWorkspaceId) {
      handleError("No workspace ID available.");
      return;
    }

    setCurrentFolder(folder);
    dispatch(setSelectedFolder(folder));
    dispatch(toggleFolderActivation({ workspaceId: activeWorkspaceId, folderId: folder.id, isActive: true }));

    try {
      await dispatch(fetchFolderData({ workspaceId: activeWorkspaceId, folderId: folder.id })).unwrap();
    } catch (err) {
      handleError('Failed to fetch folder data.');
    }
  };

  const handleWorkspaceChange = (workspace) => {
    dispatch(setSelectedWorkspace(workspace));
    dispatch(updateWorkspaceStatus({ workspaceId: selectedWorkspace.id, isActive: true }));
    setCurrentFolder(null);
    dispatch(resetFolderState());

    if (workspace?.folders?.length > 0) {
      const firstFolder = workspace.folders.find(folder => folder.isActive) || workspace.folders[0];
      handleFolderSelection(firstFolder, workspace.id);
    }
  };

  const handleRemoveItem = (itemId, itemType) => {
    setCurrentFolder((prevFolder) => ({
      ...prevFolder,
      [itemType]: prevFolder[itemType].filter((item) => item.id !== itemId),
    }));
  };

  const handleDataUpdated = () => {
    dispatch(fetchDashboardStats());
  };

  return (
    <div className="dashboard">
      {/*{dashboardStats ? (*/}
        <CountingCards
          activeWorkspace={dashboardStats?.activeWorkspace}
          totalWorkspaces={dashboardStats?.totalWorkspaces}
          totalProjects={dashboardStats?.totalProjects}
        />
      {/*// ) : (*/}
      {/*//   <div>No data available for dashboard stats.</div>*/}
      {/*// )}*/}

      <Account />

      {/*{dashboardStats?.workspaces?.length > 0 ? (*/}
        <Workspaces
          activeWorkspace={selectedWorkspace}
          workspaces={dashboardStats?.workspaces}
          onWorkspaceUpdated={handleDataUpdated}
          onWorkspaceChange={handleWorkspaceChange}
        />
      {/*) : (*/}
      {/*  <div className="no-projects">*/}
      {/*    <p>No workspaces available.</p>*/}
      {/*  </div>*/}
      {/*)}*/}

      <Folder
        activeWorkspace={selectedWorkspace}
        onFolderSelect={handleFolderSelection}
        onFolderUpdate={handleDataUpdated}
      />

      <section className="folder-details">
        <div className="container">
          {folderData?.[0]?.chats?.length > 0 ? (
            <SectionGrid
              title="AI Assistant"
              items={folderData[0].chats}
              itemType="chats"
              onRemove={(id) => handleRemoveItem(id, 'chats')}
            />
          ) : (
            <>
              <div className="container-heading">
                <div className="left-buttons">
                  <p className="assistant-heading">
                    <IoIosChatboxes />
                    AI Assistant
                  </p>
                </div>
              </div>
              <div className="no-projects">
                <p>No AI Assistant associated with this workspace.</p>
              </div>
            </>
          )}

          {folderData?.[0]?.assessments?.length > 0 ? (
            <SectionGrid
              title="Assessments"
              items={folderData[0].assessments}
              itemType="assessments"
              onRemove={(id) => handleRemoveItem(id, 'assessments')}
            />
          ) : (
            <>
              <div className="container-heading">
                <div className="left-buttons">
                  <p className="assistant-heading">
                    <RiNewspaperLine />
                    Assessments
                  </p>
                </div>
              </div>
              <div className="no-projects">
                <p>No Assessment associated with this workspace.</p>
              </div>
            </>
          )}

          {folderData?.[0]?.sitemaps?.length > 0 ? (
            <SectionGrid
              title="Sitemaps"
              items={folderData[0].sitemaps}
              itemType="sitemaps"
              onRemove={(id) => handleRemoveItem(id, 'sitemaps')}
            />
          ) : (
            <>
              <div className="container-heading">
                <div className="left-buttons">
                  <p className="assistant-heading">
                    <FaFolderTree />
                    Sitemaps
                  </p>
                </div>
              </div>
              <div className="no-projects">
                <p>No Sitemaps associated with this workspace.</p>
              </div>
            </>
          )}

          {folderData?.[0]?.wireframes?.length > 0 ? (
            <SectionGrid
              title="Wireframes"
              items={folderData[0].wireframes}
              itemType="wireframes"
              onRemove={(id) => handleRemoveItem(id, 'wireframes')}
            />
          ) : (
            <>
              <div className="container-heading">
                <div className="left-buttons">
                  <p className="assistant-heading">
                    <FaFolderTree />
                    Wireframes
                  </p>
                </div>
              </div>
              <div className="no-projects">
                <p>No Wireframes associated with this workspace.</p>
              </div>
            </>
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
          margin: 0px 20px;
        }

        .section {
          margin-top: 2rem;
        }

        .container-heading {
          display: flex;
          text-align: center;
          align-items: center;
          justify-content: space-between;
          padding: 2%;
          height: 10vh;
          border: 1px solid lightgray;
          background-color: white;
          width: 95%;
          border-radius: 1.5rem;
          margin: 0 3rem;
        }

        .assistant-heading {
          font-family: 'Poppins';
          font-weight: 600;
          line-height: 36px;
          letter-spacing: 0.12px;
          font-size: 2rem;
          text-align: left;
          color: black;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
      `}</style>
    </div>
  );
};

export default DashboardHomeComp;
