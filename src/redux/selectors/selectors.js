import { createSelector } from '@reduxjs/toolkit';

// Selector for all workspaces
//export const selectAllWorkspaces = (state) => state.workspaceApi.queries['getWorkspaces(undefined)']?.data || [];
export const selectAllWorkspaces = (state) => state.workspaces.workspaces;

// Selector for the current workspace
export const selectCurrentWorkspace = createSelector(
  selectAllWorkspaces,
  (state) => state.workspaces.currentWorkspaceId,
  (workspaces, currentWorkspaceId) => {
    if (!Array.isArray(workspaces)) {
      return null; // Handle the case where workspaces is not an array
    }
    // Find the workspace by id or return the first one if not found
    return workspaces.find((ws) => ws.id === currentWorkspaceId) || workspaces[0] || null;
  }
);

// Selector for all folders in the current workspace
export const selectAllFolders = createSelector(
  selectCurrentWorkspace,
  (currentWorkspace) => currentWorkspace?.folders || []
);

// Selector for the current folder
// export const selectCurrentFolder = createSelector(
//   selectAllFolders,
//   (state) => state.workspaces.currentFolderId,
//   (folders, currentFolderId) => folders.find((folder) => folder.id === currentFolderId) || folders[0]
// );

export const selectCurrentFolder = createSelector(
  [selectAllFolders, (state) => state.workspaces.currentFolderId],
  (folders, currentFolderId) => folders.find((folder) => folder.id === currentFolderId) || folders[0]
);

// Selector for all chats in the current folder
export const selectAllChats = createSelector(
  selectCurrentFolder,
  (currentFolder) => currentFolder?.chats || []
);


export const selectCurrentChat = createSelector(
  selectAllChats,
  (state) => state.workspaces.currentChatId,
  (chats, currentChatId) => {
    console.log("Chats:", chats);
    console.log("Current Chat ID:", currentChatId);
    
    return chats.find((chat) => chat._id === currentChatId) || null;
  }
);

// Selector for all assessments in the current folder
export const selectAllAssessments = createSelector(
  selectCurrentFolder,
  (currentFolder) => currentFolder?.assessments || []
);

export const selectCurrentAssessment = createSelector(
  selectAllChats,
  (state) => state.workspaces.currentAssessmentId,
  (assessments, currentAssessmentId) => {
    console.log("Chats:", assessments);
    console.log("Current Chat ID:", currentAssessmentId);
    
    return assessments.find((chat) => chat._id === currentAssessmentId) || null;
  }
);


// Selector for all comments in the current chat
export const selectAllComments = createSelector(
  selectCurrentChat,
  (currentChat) => {
    if (!currentChat || !currentChat.Comments) {
      return [];
    }
    console.log("Total Comments:",currentChat.comments);
    // Flatten the comments from all generalMessages
    // return currentChat.generalMessages.reduce((allComments, message) => {
    //   return allComments.concat(message.comments);
    // }, []);
    return currentChat.comments;
  }
);

// Selector for all comments in the current chat
export const selectAllBookmarks = createSelector(
  selectCurrentChat,
  (currentChat) => {
    if (!currentChat || !currentChat.generalMessages) {
      return [];
    }
    // Flatten the comments from all generalMessages
    return currentChat.generalMessages.reduce((allBookmarks, message) => {
      return allBookmarks.concat(message.bookmarks);
    }, []);
  }
);

