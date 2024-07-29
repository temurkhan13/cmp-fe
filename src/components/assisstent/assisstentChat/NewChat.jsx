import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Components from '@components';
import useChatHistory from '@hooks/useChatHistory';
import NewChatSidebarModal from '../../customModal/NewChatSidebarModal';
import { HiOutlinePlusSm } from 'react-icons/hi';
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from 'react-icons/ri';
import { BsThreeDots } from 'react-icons/bs';

import {
  addChat,
  updateChat,
  removeChat,
  setSelectedChatId,
} from '../../../redux/slices/workspaceSlice';

const NewChat = () => {
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState({ index: null, chatId: null });
  const { historyChat, error } = useChatHistory();
  const chatContainerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const workspaceId = useSelector((state) => state.workspace.selectedWorkspaceId);
  const folderId = useSelector((state) => state.workspace.selectedFolderId);
  const chats = useSelector((state) => {
    const workspace = state.workspace.workspaces.find(w => w.workspaceId === workspaceId);
    if (workspace) {
      const folder = workspace.folders.find(f => f.folderId === folderId);
      return folder ? folder.chats : [];
    }
    return [];
  });
  const selectedChatId = useSelector((state) => state.workspace.selectedChatId);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // State for sidebar collapse

  // Function to toggle sidebar collapse state
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const openModal = (index, chatId) => {
    setShowMenu({ index, chatId });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setShowMenu({ index: null, chatId: null });
    setIsModalOpen(false);
  };

  // Update selectedChat if the chat data changes
  useEffect(() => {
    if (selectedChatId) {
      dispatch(setSelectedChatId(selectedChatId));
      //const updatedChat = chats.find(chat => chat.chatId === selectedChatId);
      //dispatch(setSelectedChatId(updatedChat ? updatedChat.chatId : null));
    }
  }, [chats, dispatch, selectedChatId]);

  const handleChatSelect = (chatId) => {
    dispatch(setSelectedChatId(chatId));
  };

  const handleAddChat = () => {
    const newChat = {
      chatId: `chatId${Date.now()}`,
      chatTitle: 'How to Change Management',
      version: 1,
      generalMessages: [],
      sharedUsers: [],
      comments: [],
      bookmarks: [],
      media: [],
      tasks: [],
      versions: [],
      images: [],
      documents: [],
      links: [],
      bookmarkData: [],
      commentingUsers: [],
      commentReplies: [],
    };
    dispatch(addChat({ workspaceId, folderId, chat: newChat }));
    dispatch(setSelectedChatId(newChat.chatId));
  };

  const handleAddMessage = (content) => {
    if (selectedChatId) {
      const newMessage = {
        messageId: `msg${Date.now()}`,
        userId: 'currentUserId', // Replace with actual user ID
        content,
        timestamp: new Date().toISOString(),
      };
      dispatch(addMessage({ workspaceId, folderId, chatId: selectedChatId, message: newMessage }));
    }
  };

  const selectedChat = chats.find(chat => chat.chatId === selectedChatId);

  const handleScroll = async () => {
    const chatContainer = chatContainerRef.current;
    if (
      chatContainer.scrollHeight - chatContainer.scrollTop <=
        chatContainer.clientHeight * 1.1 &&
      !loading
    ) {
      setLoading(true);
      // TODO: Implement lazy loading for chat history
    }
  };

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    chatContainer.addEventListener('scroll', handleScroll);
    return () => {
      chatContainer.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  return (
    <div
      className={`newChat ${sidebarCollapsed ? 'collapsed' : ''}`} // Conditionally apply 'collapsed' class
      ref={chatContainerRef}
      style={{ overflowY: 'auto', height: '100vh' }}
    >
      <div
        className={`sidebar-header ${
          sidebarCollapsed ? 'header-collapsed' : ''
        }`}
      >
        <div
          onClick={handleAddChat}
          style={{ cursor: 'pointer' }}
          className={`sidebar-header-title ${
            sidebarCollapsed ? 'header-collapsed-title' : ''
          }`}
        >
          {!sidebarCollapsed && (
            <>
              <HiOutlinePlusSm />
              <Components.Feature.Text className="secondry">
                New Chat
              </Components.Feature.Text>
            </>
          )}
          {sidebarCollapsed && <HiOutlinePlusSm />}
        </div>
        {!sidebarCollapsed ? (
          <RiArrowLeftDoubleLine
            onClick={toggleSidebar}
            style={{ cursor: 'pointer' }}
          />
        ) : (
          <RiArrowRightDoubleLine
            onClick={toggleSidebar}
            style={{ cursor: 'pointer' }}
          />
        )}
      </div>
      {!sidebarCollapsed && ( // Render chat messages only if sidebar is not collapsed
        <>
          {Array.isArray(chats) &&
            chats.map((chat, index) => (
              <section
                key={chat.chatId}
                onClick={() => handleChatSelect(chat.chatId)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem',
                  margin: '0.5rem 0',
                  justifyContent: 'space-between',
                }}
                className="chat-item-section"
              >
                <Components.Feature.Text
                  className="middium--light"
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  {chat.chatTitle}
                </Components.Feature.Text>
                <BsThreeDots
                  onClick={() => openModal(index, chat.chatId)}
                  style={{ cursor: 'pointer', fontSize: '1.5rem ' }}
                />
                {showMenu.index === index &&
                  showMenu.chatId === chat.chatId && (
                    <NewChatSidebarModal
                      isOpen={isModalOpen}
                      closeModal={closeModal}
                      chatId={chat.chatId}
                    />
                  )}
              </section>
            ))}
          {loading && <div>Loading...</div>}
          {error && <div>Error: {error}</div>}
        </>
      )}
    </div>
  );
};

export default NewChat;
