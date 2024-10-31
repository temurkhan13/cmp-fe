import React, { useEffect, useState } from 'react';
import { IoPeople } from 'react-icons/io5';
import { HiDotsHorizontal } from 'react-icons/hi';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaFolderTree } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { selectWorkspace, setCurrentChatId } from '../../redux/slices/workspacesSlice';
import useManagerChat from '@hooks/useManagerChat';
import DashboardCard from '../../components/dashboard/dashboardHomeComponents/DashboardCard.jsx';
import Folder from './dashboardHomeComponents/Folder';
import { truncateText } from '../../utils/helperFunction';
import {
  fetchFolderData,
  resetFolderState,
  selectFolderData, selectSelectedFolder,
  setSelectedFolder, toggleFolderActivation
} from '../../redux/slices/folderSlice.js';

const MyAssessmentComp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedWorkspace = useSelector(selectWorkspace);
  const folderData = useSelector(selectFolderData);
  const selectedFolder = useSelector(selectSelectedFolder)

  const { managerData, error } = useManagerChat();
  const [isLoading, setIsLoading] = useState(true);

  const [currentFolder, setCurrentFolder] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Reset folder and set first folder if available
    setCurrentFolder(null);
    dispatch(resetFolderState());

    if (selectedWorkspace?.folders?.length > 0) {
      const firstFolder = selectedWorkspace.folders[0];
      handleFolderSelection(firstFolder, selectedWorkspace.id);
    }
  }, [selectedWorkspace]);

  useEffect(() => {

  }, [selectedFolder]);

  const handleFolderSelection = async (folder, workspaceId = null) => {
    const activeWorkspaceId = workspaceId || selectedWorkspace?.id;
    if (!activeWorkspaceId) {
      // handleError("No workspace ID available.");
      return;
    }

    setCurrentFolder(folder);
    dispatch(setSelectedFolder(folder)); // Set the selected folder in Redux store
    dispatch(toggleFolderActivation({ workspaceId: activeWorkspaceId, folderId: folder?._id || folder?.id, isActive: true }));

    try {
      await dispatch(fetchFolderData({ workspaceId: activeWorkspaceId, folderId: folder._id || folder.id })).unwrap();
    } catch (err) {
      // handleError('Failed to fetch folder data.');
    }
  };


  useEffect(() => {
    if (managerData) {
      setIsLoading(false);
    }
  }, [managerData]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  // const cardData = [
  //   {
  //     userName: 'You',
  //     content: truncateText(
  //       'Lorem ipsum dolor sit sapiente quae nobis porro, sed cum molestiae!',
  //       55
  //     ),
  //   },
  //   {
  //     userName: 'John Doe',
  //     content: truncateText(
  //       'Lorem ipsum dolor sit sapiente quae nobis porro, sed cum molestiae!',
  //       55
  //     ),
  //   },
  //   {
  //     userName: 'Jane Smith',
  //     content: truncateText(
  //       'Lorem ipsum dolor sit sapiente quae nobis porro, sed cum molestiae!',
  //       55
  //     ),
  //   },
  // ];

  const handleRemoveChat = async () => {
    const activeWorkspaceId =  selectedWorkspace?.id;
    await dispatch(fetchFolderData({ workspaceId: activeWorkspaceId, folderId: currentFolder._id || currentFolder.id })).unwrap();

  };

  return (
    <div className="container">
      {/* AI Assessment Section */}
      <div className="section">
        <p className="sectionTitle">AI Assessment</p>
        <div className="center-buttons">
          <Folder activeWorkspace={selectedWorkspace} />
        </div>

        {/* New Assistant Button */}
        <section className="generate" style={{ marginTop: '2rem' }}>
          <div className="container">
            <div className="left-buttons">
              <p className="assistant-heading">
                <FaFolderTree /> Assistant
              </p>
            </div>

            <div className="center-buttons">
              <button
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                className="assiss-btn"
                onClick={() => {
                  dispatch(setCurrentChatId(null));
                  navigate('/assessment/chat');
                }}
              >
                New Assistant
                <AiOutlinePlus className="icon" />
              </button>
            </div>
          </div>
        </section>

        {/* Assessment Cards */}
        {/*<div className="cardWrapper">*/}
        {/*  {cardData.map((card, index) => (*/}
        {/*    <div key={index}>*/}
        {/*      <DashboardCard chat={card.content} />*/}
        {/*      <div className="fileDetails">*/}
        {/*        <div className="fileName">*/}
        {/*          File Name*/}
        {/*          <IoPeople className="peopleIcon" />*/}
        {/*        </div>*/}
        {/*        <div>*/}
        {/*          <span>in</span>*/}
        {/*          <span className="folderName">folderName</span>*/}
        {/*          <span>*/}
        {/*            • Modified 2 days ago*/}
        {/*            <HiDotsHorizontal className="dotsIcon" />*/}
        {/*          </span>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  ))}*/}
        {/*</div>*/}
        <div className="section">
          <div className="workspace-header"></div>
          <div className="grid">
            {folderData && folderData[0]?.assessments?.map((item) => (
              <DashboardCard
                key={item.id}
                data={{ ...item, type: 'chat' }}
                onRemove={(id) => handleRemoveChat(id)} // Handle chat removal
                OnClick={() => {
                  console.log('heloooooooooooooooo');
                  dispatch(setCurrentChatId(item.id));
                  navigate(`/assessment/chat/${item.id}`);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Component Styles */}
      <style>{`
        .container {
          padding: 1rem 2rem;
        }

        .section {
          margin-top: 2rem;
        }

        .sectionTitle {
          font-weight: 500;
          font-size: 2rem;
          margin-bottom: 2rem;
        }

        .cardWrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 20px;
        }

        .fileDetails {
          margin: 0.2rem 1.5rem;
          font-size: 1rem;
          margin-bottom: 3rem;
        }

        .fileName {
          font-size: 1.125rem;
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .folderName {
          color: #0066ff;
          font-size: 1.1rem;
          margin-left: 0.5rem;
        }

        .dotsIcon {
          cursor: pointer;
          font-size: 1.4rem;
          color: gray;
        }

        .peopleIcon {
          font-size: 1.5rem;
          color: black;
        }
      `}</style>
    </div>
  );
};

export default MyAssessmentComp;
