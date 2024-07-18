import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Components from '@components';
import useChatHistory from '@hooks/useChatHistory';
import NewChatSidebarModal from '../../customModal/NewChatSidebarModal';
import { HiOutlinePlusSm } from 'react-icons/hi';
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from 'react-icons/ri';
import { BsThreeDots } from 'react-icons/bs';
import { fetchSharedUsers, setCurrentChat } from '@store/chatSlice';

import {
  addChat,
  updateChat,
  deleteChat,
  addComment,
  updateComment,
  deleteComment,
  addReply,
  updateReply,
  deleteReply,
  addBookmark,
  deleteBookmark,
  addMedia,
  deleteMedia,
  addTask,
  updateTask,
  deleteTask,
  addVersion,
  deleteVersion,
  addImage,
  deleteImage,
  addDocument,
  deleteDocument,
  addLink,
  deleteLink,
  setSelectedChatId,
} from '../../../redux/slices/chatSlice';


const NewChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [showMenu, setShowMenu] = useState({ index: null, msgIndex: null });
  const { historyChat, error } = useChatHistory();
  const chatContainerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  //const sharedUsers = useSelector((state) => state.chat.sharedUsers);
  //const currentChatId = useSelector((state) => state.chat.currentChat);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // State for sidebar collapse

  //full-redux
  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChat);
  const selectedChatId = useSelector((state) => state.chat.selectedChatId);




  // Function to toggle sidebar collapse state
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const openModal = (index, msgIndex) => {
    setShowMenu({ index, msgIndex });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setShowMenu({ index: null, msgIndex: null });
    setIsModalOpen(false);
  };

  //this is the older function for fetching chat data from api
  // useEffect(() => {
  //   const fetchInitialChatHistory = async () => {
  //     setLoading(true);
  //     try {
  //       const initialHistory = await historyChat();
  //       setChatHistory(Array.isArray(initialHistory) ? initialHistory : []);
  //     } catch (error) {
  //       console.error('Error occurred while fetching initial chat history:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchInitialChatHistory();
  // }, []);

  // useEffect(() => {
  //   if (Array.isArray(chatHistory) && chatHistory.length > 0) {
  //     setMessages(chatHistory);
  //   }
  // }, [chatHistory]);


  // Update selectedChat if the chat data changes
  useEffect(() => {
    if (selectedChat) {
      const updatedChat = chats.find(chat => chat.chatId === selectedChat.chatId);
      setSelectedChatId(updatedChat || null);
    }
  }, [chats]);

  // useEffect(() => {
  //   if (currentChatId) {
  //     console.log('Current chat ID:', currentChatId.chatId);
  //     dispatch(fetchSharedUsers(currentChatId.chatId));
  //   }
  // }, [currentChatId, dispatch]);


  const handleChatSelect = (chatId) => {
    console.log(chatId);
   setSelectedChatId(chatId);
   dispatch(setSelectedChatId(chatId));
   
   // dispatch(setCurrentChat({ chatId })); //previous Implementation
  };


  // full-redux fun
  const handleAddChat = () => {
    const newChat = {
      chatId: `chatId${chats.length + 1}`,
      chatTitle : "How to Change Management",
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
    console.log(newChat.chatId);
    
    dispatch(addChat(newChat));
    dispatch(setSelectedChatId(newChat.chatId));
   // setSelectedChatId(newChat.chatId);
    
  };

  const handleAddMessage = (content) => {
    if (selectedChatId) {
      const newMessage = {
        messageId: `msg${Date.now()}`,
        userId: 'currentUserId', // Replace with actual user ID
        content,
        timestamp: new Date().toISOString(),
      };
      dispatch(addMessage({ chatId: selectedChatId, message: newMessage }));
    }
  };

const selectedChat = chats.find((chat) => chat.chatId === selectedChatId);


  const handleScroll = async () => {
    const chatContainer = chatContainerRef.current;
    if (
      chatContainer.scrollHeight - chatContainer.scrollTop <=
        chatContainer.clientHeight * 1.1 &&
      !loading
    ) {
      setLoading(true);
//TODO - onScroll will be implemented based on redux fetching we will try lazy load

      // try {
      //   const newHistoryItem = await historyChat();
      //   setChatHistory((prevHistory) => [...prevHistory, ...newHistoryItem]);
      // } catch (error) {
      //   console.error('Error occurred while loading more chat history:', error);
      // } finally {
      //   setLoading(false);
      // }
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

        {/* Click handler to toggle sidebar */}
      </div>
      {!sidebarCollapsed && ( // Render chat messages only if sidebar is not collapsed
        <>
          {Array.isArray(chats) &&
            chats.map((chat, index) => (
              <section key={index}  onClick={() => handleChatSelect(chat.chatId)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',                
              }}
              >
                <Components.Feature.Text className="middium--light"
                style={{
                  cursor: "pointer",
                }}
                >
                {chat.chatTitle}
                </Components.Feature.Text>
                <BsThreeDots
                          onClick={() => openModal(index, chat.chatId)}
                          style={{ cursor: 'pointer' }}
                        />
                        {showMenu.index === index &&
                          showMenu.msgIndex === chat.chatId && (
                            <NewChatSidebarModal
                              isOpen={isModalOpen}
                              closeModal={closeModal}
                              chatId= {chat.chatId}
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
