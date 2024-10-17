import { createSelector } from '@reduxjs/toolkit';
import { workspaceApi } from '../api/workspaceApi';

// Selector for all workspaces
//export const selectAllWorkspaces = (state) => state.workspaceApi.queries['getWorkspaces(undefined)']?.data || [];
export const selectAllWorkspaces = (state) => state.workspaces.workspaces;

// Selector for the current workspace
export const selectCurrentWorkspace = createSelector(
  selectAllWorkspaces,
  (state) => state.workspaces.currentWorkspaceId,
  (workspaces, currentWorkspaceId) => {
    console.log("selector workspace: ",currentWorkspaceId)
    if (!Array.isArray(workspaces)) {
      return null; // Handle the case where workspaces is not an array
    }
    // Find the workspace by id or return the first one if not found
    return workspaces.find((ws) => ws._id === currentWorkspaceId) || workspaces[0] || null;
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
  (folders, currentFolderId) => {
    console.log("FolderId Selector", currentFolderId)
    return folders.find((folder) => folder._id === currentFolderId) || folders[0] || null}
);

//Selector by ID
export const selectFolderById = createSelector(
  [selectAllFolders, (state, folderId) => folderId],
  (folders, folderId) => {
    console.log("FolderId Selector", folderId);
    return folders.find((folder) => folder._id === folderId) || folders[0] || null;
  }
);

// Selector for all chats in the current folder that are not soft deleted
export const selectAllChats = createSelector(
  selectCurrentFolder,
  (currentFolder) =>
    currentFolder?.chats?.filter(chat => chat.isSoftDeleted === false) || []
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

// Selector to get chat data
const selectChatData = (state) => state[workspaceApi.reducerPath]?.data;

// Selector to get a message by ID
export const selectMessageById = (messageId) =>
  createSelector(
    [selectChatData],
    (chatData) => {
      if (!chatData) return null;

      // Iterate through each chat data to find the message
      for (const chat of Object.values(chatData)) {
        const message = chat.generalMessages.find((msg) => msg._id === messageId);
        if (message) return message;
      }
      return null;
    }
  );