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
export const selectCurrentFolder = createSelector(
  selectAllFolders,
  (state) => state.workspace.currentFolderId,
  (folders, currentFolderId) => folders.find((folder) => folder.id === currentFolderId) || folders[0]
);

// Selector for all chats in the current folder
export const selectAllChats = createSelector(
  selectCurrentFolder,
  (currentFolder) => currentFolder?.chats || []
);

// Selector for the current chat
// export const selectCurrentChat = createSelector(
//   selectAllChats,
//   (state) => state.workspace.currentChatId,
//   (chats, currentChatId) => chats.find((chat) => chat._id === currentChatId) || null
// );


export const selectCurrentChat = createSelector(
  selectAllChats,
  (state) => state.workspaces.currentChatId,
  (chats, currentChatId) => {
    console.log("Chats:", chats);
    console.log("Current Chat ID:", currentChatId);
    
    return chats.find((chat) => chat._id === currentChatId) || null;
  }
);

// Selector for all comments in the current chat
export const selectAllComments = createSelector(
  selectCurrentChat,
  (currentChat) => currentChat?.comments || []
);

