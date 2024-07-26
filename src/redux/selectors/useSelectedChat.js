// selectors.js

import { useSelector } from 'react-redux';

export const useSelectedChat = () => {

  const selectedWorkspaceId = useSelector((state) => state.workspace.selectedWorkspaceId);
  const selectedFolderId = useSelector((state) => state.workspace.selectedFolderId);
  const chats = useSelector((state) => state.workspace.workspaces
    .find(workspace => workspace.workspaceId === selectedWorkspaceId)
    ?.folders.find(folder => folder.folderId === selectedFolderId)
    ?.chats || []);
  const selectedChatId = useSelector((state) => state.workspace.selectedChatId);
  const currentChat = chats.find((chat) => chat.chatId === selectedChatId);

  //const selectedChatId = useSelector((state) => state.chat.selectedChatId);
  //const chats = useSelector((state) => state.chat.chats);
  const users = useSelector((state) => state.user.users);

  //const currentChat = chats.find((chat) => chat.chatId === selectedChatId);

  return { selectedChatId, chats, users, currentChat };
};
