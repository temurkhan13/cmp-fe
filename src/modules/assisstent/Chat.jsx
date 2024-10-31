import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Components from '../../components';
import { useGetWorkspacesQuery } from '../../redux/api/workspaceApi';
import {
  setSelectedWorkspace,
  selectWorkspace,
  setCurrentChatId,
} from '../../redux/slices/workspacesSlice';
import {
  selectAllWorkspaces,
} from '../../redux/selectors/selectors';
import {
  fetchFolderData,
  resetFolderState, selectSelectedFolder,
  setSelectedFolder
} from '../../redux/slices/folderSlice';
import { AssistantSidebar, MessagesSection, NewChat } from '../../components/assisstent';

const AiAssistantChat = () => {
  const dispatch = useDispatch();
  const { chatId } = useParams(); // Extract chatId from the URL

  const userId = useSelector((state) => state.auth.user?.id) || localStorage.getItem('userId');
  const { data: workspaces, error, isLoading } = useGetWorkspacesQuery(userId);
  const selectedWorkspace = useSelector(selectWorkspace);
    const selectedFolder = useSelector(selectSelectedFolder);
  const workspacess = useSelector(selectAllWorkspaces);

  const [currentChat, setCurrentChat] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // // Persist selected workspace and folder in localStorage
  // useEffect(() => {
  //   if (selectedWorkspace) {
  //     localStorage.setItem('selectedWorkspace', JSON.stringify(selectedWorkspace));
  //   }
  //
  //   if (selectedFolder) {
  //     localStorage.setItem('selectedFolder', JSON.stringify(selectedFolder));
  //   }
  // }, [selectedWorkspace, selectedFolder]);

  // Retrieve persisted workspace and folder from localStorage on mount
  // useEffect(() => {
  //   const storedWorkspace = JSON.parse(localStorage.getItem('selectedWorkspace'));
  //   const storedFolder = JSON.parse(localStorage.getItem('selectedFolder'));
  //
  //   if (storedWorkspace) {
  //     dispatch(setSelectedWorkspace(storedWorkspace));
  //   }
  //   if (storedFolder) {
  //     dispatch(setSelectedFolder(storedFolder));
  //   }
  // }, [dispatch]);

  // Handle initial data loading and workspace selection
  useEffect(() => {
    if (chatId) {
      dispatch(setCurrentChatId(chatId));
    }

    if (workspaces && workspaces.length > 0 && !selectedWorkspace) {
      dispatch(setSelectedWorkspace(workspaces[0]));
    }

    if (selectedWorkspace?.folders?.length > 0) {
      handleFolderSelection(selectedWorkspace.folders[0], selectedWorkspace.id);
    }

    // If no workspaces are available, throw an error
    if (workspaces?.length === 0) {
      handleError("No workspaces available.");
    }
  }, [workspaces, selectedWorkspace, dispatch, chatId]);

  useEffect(() => {
    // If no folder is available, throw an error
    if (selectedWorkspace && selectedWorkspace?.folders?.length === 0) {
      handleError("No folders available in the selected workspace.");
    }
  }, [selectedWorkspace]);

  // Handle folder selection and fetching folder data
  const handleFolderSelection = async (folder, workspaceId = null) => {
    const activeWorkspaceId = workspaceId || selectedWorkspace?.id;
    if (!activeWorkspaceId) {
      handleError("No workspace ID available.");
      return;
    }

    dispatch(setSelectedFolder(folder)); // Set the selected folder in Redux store

    try {
      await dispatch(fetchFolderData({ workspaceId: activeWorkspaceId, folderId: folder._id })).unwrap();
    } catch (err) {
      handleError('Failed to fetch folder data.');
    }
  };

  // Handle errors and show notifications
  const handleError = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    console.error(message);
  };

  return (
    <div className="assessmentChat">
      <Components.Common.Header
        activeWorkspace={selectedWorkspace}
        workspaces={workspacess}
      />
      <section>
        <NewChat />
        <MessagesSection setCurrentChat={setCurrentChat} />
        <AssistantSidebar currentChat={currentChat} />
      </section>

      {showNotification && (
        <Components.Common.NotificationBar
          message={notificationMessage}
          type="error"
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default AiAssistantChat;
