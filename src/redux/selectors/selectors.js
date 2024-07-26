// src/redux/selectors/chatSelectors.js
import { createSelector } from '@reduxjs/toolkit';

export const selectChats = (state) => state.chat.chats;
export const selectActiveWorkspaceId = (state) => state.chat.selectedWorkspaceId;
export const selectActiveFolderId = (state) => state.chat.selectedFolderId;
export const selectActiveChatId = (state) => state.chat.selectedChatId;

export const selectActiveWorkspace = createSelector(
  [selectChats, selectActiveWorkspaceId],
  (chats, activeWorkspaceId) => chats.find((workspace) => workspace.workspaceId === activeWorkspaceId)
);

export const selectActiveFolder = createSelector(
  [selectActiveWorkspace, selectActiveFolderId],
  (activeWorkspace, activeFolderId) => {
    if (activeWorkspace) {
      return activeWorkspace.folders.find((folder) => folder.folderId === activeFolderId);
    }
    return null;
  }
);

export const selectChatsForActiveFolder = createSelector(
  [selectActiveFolder],
  (activeFolder) => {
    if (activeFolder) {
      return activeFolder.chats;
    }
    return [];
  }
);

export const selectActiveChat = createSelector(
  [selectChatsForActiveFolder, selectActiveChatId],
  (chats, activeChatId) => chats.find((chat) => chat.chatId === activeChatId)
);
