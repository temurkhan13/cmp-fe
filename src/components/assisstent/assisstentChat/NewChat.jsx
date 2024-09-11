import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Components from '@components';
import useChatHistory from '@hooks/useChatHistory';
import NewChatSidebarModal from '../../customModal/NewChatSidebarModal';
import { HiOutlinePlusSm } from 'react-icons/hi';
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from 'react-icons/ri';
import { BsThreeDots } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { RxDashboard } from 'react-icons/rx';

// import {
//   addChat,
//   updateChat,
//   removeChat,
//   setSelectedChatId,
// } from '../../../redux/slices/workspaceSlice';

//import { useAddChatMutation } from '../../../redux/api/workspaceApi';
//import { useAddMessageMutation } from '../../../redux/api/workspaceApi';
//import { useGetWorkspacesQuery } from '../../../redux/api/workspaceApi'; // Adjust the import path as needed
import {
  selectAllChats,
  selectAllFolders,
  selectAllWorkspaces,
  selectCurrentChat,
  selectCurrentFolder,
  selectCurrentWorkspace,
  selectFolderById,
} from '../../../redux/selectors/selectors';
import { setCurrentChatId, setSelectedFolder } from '../../../redux/slices/workspacesSlice';


const NewChat = () => {
  const projects = useSelector(selectAllFolders);

  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState({ index: null, chatId: null });
  //const { historyChat, error } = useChatHistory();
  const chatContainerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [hoveredChatIndex, setHoveredChatIndex] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // State for sidebar collapse

  //new Apis Implementation
  //const [addMessage] = useAddMessageMutation();

  const currentWorkspace = useSelector(selectCurrentWorkspace);
  const currentFolder = useSelector(selectCurrentFolder);
  const currentChat = useSelector(selectCurrentChat);

  const selectedFolder = useSelector((state) => selectFolderById(state, currentFolder._id));
  const chats = useSelector(selectAllChats);



useEffect(()=>{
  console.log("",currentFolder,currentChat,currentWorkspace);
  },[currentFolder, currentChat, currentWorkspace,chats, selectedFolder]);

  // const workspaceId = useSelector((state) => state.workspaces.currentWorkspaceId);
  // const folderId = useSelector((state) => state.workspaces.currentFolderId);
  // const chatId = useSelector((state) => state.workspaces.currentChatId);

  // Function to toggle sidebar collapse state
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  // const openModal = (index, chatId) => {
  //   setShowMenu({ index, chatId });
  //   setIsModalOpen(true);
  // };

  const closeModal = () => {
    setShowMenu({ index: null, chatId: null });
    setIsModalOpen(false);
  };

  const openModal = (index, chatId, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setShowMenu({
      index,
      chatId,
      position: {
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      },
    });
    setIsModalOpen(true);
  };

  // Update selectedChat if the chat data changes
  // useEffect(() => {
  //   if (selectedChatId) {
  //     dispatch(setSelectedChatId(selectedChatId));
  //     //const updatedChat = chats.find(chat => chat.chatId === selectedChatId);
  //     //dispatch(setSelectedChatId(updatedChat ? updatedChat.chatId : null));
  //   }
  // }, [chats, dispatch, selectedChatId]);
const folderId = useSelector(selectCurrentFolder);




  //chat Select
  const handleChatSelect = (chatId) => {
    console.log('FolderId', folderId);
    console.log('dispatch ChatId' + chatId);
    const currentUrl = window.location.pathname;
    const newUrl = currentUrl.replace(
      /\/assisstant\/chat\/[^/]+$/,
      `/assisstant/chat/${chatId}`
    );
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

  const switchFolder =(folder) =>{
    dispatch(setSelectedFolder(folder));
  };

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
      {!sidebarCollapsed && (
        <div
          className="explore-projects"
          onClick={toggleDropdown}
          style={{ cursor: 'pointer' }}
        >
          <p>
            <RxDashboard size={20} />
            Explore Projects
          </p>
          {!sidebarCollapsed && (
            <div
              className="explore-projects"
              onClick={toggleDropdown}
              style={{ cursor: 'pointer' }}
            >
              {/* <p>
                <RxDashboard size={20} />
                Explore Projects
              </p> */}
              {isDropdownOpen && (
                <div className="projects-dropdown">
                  <div className="dropdown-header">
                    <span>Projects</span>
                    <span className="close-icon" onClick={toggleDropdown}>
                      <RxCross2 size={20} />
                    </span>
                  </div>
                  <ul className="projects-list">
                    {projects.map((project, index) => (
                      <li key={index} onClick={() => switchFolder(project)}>{project.folderName}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {!sidebarCollapsed && (
        <>
          {Array.isArray(chats) &&
            chats.map((chat, index) => (
              <section
                key={chat._id}
                onClick={() => handleChatSelect(chat._id)}
                onMouseEnter={() => setHoveredChatIndex(index)} // Set the hovered index on mouse enter
                onMouseLeave={() => setHoveredChatIndex(null)} // Reset the hovered index on mouse leave
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem',
                  margin: '0.5rem 0',
                  justifyContent: 'space-between',
                  fontSize: '1.5rem !important',
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
                {hoveredChatIndex === index && (
                  <BsThreeDots
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(index, chat.chatId, e); // Pass the event to calculate position
                    }}
                    style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                  />
                )}

                {showMenu.index === index &&
                  showMenu.chatId === chat.chatId && (
                    <NewChatSidebarModal
                      isOpen={isModalOpen}
                      closeModal={closeModal}
                      chatId={chat.chatId}
                      position={showMenu.position} // Pass the position to the modal
                    />
                  )}
              </section>
            ))}
          {loading && <div>Loading...</div>}
        </>
      )}
      <style>{`
        .explore-projects p {
          font-size: 1.4rem !important;
          font-weight: 500 !important;
          background-color:#f0f0f0 !important;
          width:22rem;
          padding: 0.5rem !important;
          border-radius:0.8rem;
          display:flex;
          align-items:center;
          gap:0.5rem;
          color:gray !important;
        }

        .projects-dropdown {
          position: absolute;
          background: white;
          display:flex;
          width:20rem;
          flex-direction: column;
          border:none;
          border-radius:1rem;
          box-shadow: 0px 4px 24px 0px #0000003F;
          padding: 1rem;
          z-index: 10;
          font-size: 1.4rem !important;
          font-weight:500;
          color: black;
        }
        .dropdown-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-weight: bold;
          border-bottom: 1px solid #ddd;
          padding-bottom: 0.5rem;
          margin-bottom: 0.5rem;
          width:18rem;
        }
        .close-icon {
          cursor: pointer;
          font-size: 1.2rem;
          background-color:#f0f0f0;
          display:flex;
          padding:0.2rem;
          border-radius:50%;
          align-items:right;
        }
        .projects-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .projects-list li {
          padding: 0.5rem 0;
          display: flex;
          padding: 0.5rem 0.5rem;
          cursor: pointer;
          padding-left:1rem;

        }
        .projects-list li:hover {
          background-color: #f0f0f0;
          border-radius:0.8rem;
        }
      `}</style>
    </div>
  );
};

export default NewChat;
