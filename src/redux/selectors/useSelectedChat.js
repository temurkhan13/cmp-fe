// selectors.js

import { useSelector } from 'react-redux';

export const useSelectedChat = () => {
  const selectedChatId = useSelector((state) => state.chat.selectedChatId);
  const chats = useSelector((state) => state.chat.chats);
  const users = useSelector((state) => state.user.users);

  const currentChat = chats.find((chat) => chat.chatId === selectedChatId);

  return { selectedChatId, chats, users, currentChat };
};
