// selectors.js

import { useSelector } from 'react-redux';

export const useSelectedChat = () => {

  const selectedWorkspaceId = useSelector((state) => state.workspaces.currentWorkspaceId);
  const selectedFolderId = useSelector((state) => state.workspaces.currentFolderId);
  const chats = useSelector((state) => state.workspaces.workspaces
    .find(workspace => workspace._Id === selectedWorkspaceId)
    ?.folders.find(folder => folder._Id === selectedFolderId)
    ?.chats || []);
  const selectedChatId = useSelector((state) => state.workspaces.currentChatId);
  const currentChat = chats.find((chat) => chat._Id === selectedChatId);

  //const selectedChatId = useSelector((state) => state.chat.selectedChatId);
  //const chats = useSelector((state) => state.chat.chats);
  const users = useSelector((state) => state.user.users);

  //const currentChat = chats.find((chat) => chat.chatId === selectedChatId);

  return { selectedChatId, chats, users, currentChat };
};
