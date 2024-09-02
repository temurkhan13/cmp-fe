import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Components from '@components';
import useChatHistory from '@hooks/useChatHistory';
import NewChatSidebarModal from '../../customModal/NewChatSidebarModal';
import { HiOutlinePlusSm } from 'react-icons/hi';
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from 'react-icons/ri';
import { BsThreeDots } from 'react-icons/bs';

// import {
//   addChat,
//   updateChat,
//   removeChat,
//   setSelectedChatId,
// } from '../../../redux/slices/workspaceSlice';


//import { useAddChatMutation } from '../../../redux/api/workspaceApi';
//import { useAddMessageMutation } from '../../../redux/api/workspaceApi';
//import { useGetWorkspacesQuery } from '../../../redux/api/workspaceApi'; // Adjust the import path as needed
import { selectAllChats, selectAllWorkspaces, selectCurrentWorkspace } from '../../../redux/selectors/selectors';
import {setCurrentChatId} from '../../../redux/slices/workspacesSlice';

const NewChat = () => {
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState({ index: null, chatId: null });
  //const { historyChat, error } = useChatHistory();
  const chatContainerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // State for sidebar collapse

    //new Apis Implementation
    //const [addMessage] = useAddMessageMutation();
    const chats = useSelector(selectAllChats);
  
   // const workspaceId = useSelector((state) => state.workspaces.currentWorkspaceId);
   // const folderId = useSelector((state) => state.workspaces.currentFolderId);
   // const chatId = useSelector((state) => state.workspaces.currentChatId);
  

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
  // useEffect(() => {
  //   if (selectedChatId) {
  //     dispatch(setSelectedChatId(selectedChatId));
  //     //const updatedChat = chats.find(chat => chat.chatId === selectedChatId);
  //     //dispatch(setSelectedChatId(updatedChat ? updatedChat.chatId : null));
  //   }
  // }, [chats, dispatch, selectedChatId]);

  //chat Select
  const handleChatSelect = (chatId) => {
    console.log("dispatch ChatId" + chatId);
    const currentUrl = window.location.pathname;
    const newUrl = currentUrl.replace(/\/assisstant\/chat\/[^/]+$/, `/assisstant/chat/${chatId}`);
    window.history.replaceState(null, '', newUrl);
   // setSearchParams( chatId );
    dispatch(setCurrentChatId(chatId));
   // dispatch(setSelectedChatId(chatId));
  };

  const handleAddChat = () => {
    dispatch(setCurrentChatId(null));
    return;
    // const newChat = {
    //   chatId: `chatId${Date.now()}`,
    //   chatTitle: 'How to Change Management',
    //   version: 1,
    //   generalMessages: [],
    //   sharedUsers: [],
    //   comments: [],
    //   bookmarks: [],
    //   media: [],
    //   tasks: [],
    //   versions: [],
    //   images: [],
    //   documents: [],
    //   links: [],
    //   bookmarkData: [],
    //   commentingUsers: [],
    //   commentReplies: [],
    // };
    // dispatch(addChat({ workspaceId, folderId, chat: newChat }));
    // dispatch(setSelectedChatId(newChat.chatId));
  };

  // const handleAddMessage = (content) => {
  //   if (selectedChatId) {
  //     const newMessage = {
  //       messageId: `msg${Date.now()}`,
  //       userId: 'currentUserId', // Replace with actual user ID
  //       content,
  //       timestamp: new Date().toISOString(),
  //     };
  //     dispatch(addMessage({ workspaceId, folderId, chatId: selectedChatId, message: newMessage }));
  //   }
  // };

  

  //const selectedChat = chats.find(chat => chat.chatId === selectedChatId);

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
        </>
      )}
    </div>
  );
};

export default NewChat;
