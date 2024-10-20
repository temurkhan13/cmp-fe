import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Components from '@components';
import NewChatSidebarModal from '../customModal/NewChatSidebarModal';
import { HiOutlinePlusSm } from 'react-icons/hi';
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarLeftExpandFilled,
} from 'react-icons/tb';
import { BsThreeDots } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { RxDashboard } from 'react-icons/rx';
// import LoadingSpinner from '../../components/common/LoadingSpinner';

import {
  selectAllChats,
  selectAllFolders,
  selectCurrentChat,
  selectCurrentFolder,
  selectCurrentWorkspace,
  selectFolderById,
} from '../../redux/selectors/selectors';
import {
  setCurrentChatId,
  setSelectedFolder,
} from '../../redux/slices/workspacesSlice';
import { setChats } from '../../redux/slices/chatSlice';
import { getChatsAsync } from '../../redux/slices/workspaceSlice';

const NewChat = () => {
  const projects = useSelector(selectAllFolders);

  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState({ index: null, chatId: null });
  const chatContainerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [hoveredChatIndex, setHoveredChatIndex] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const currentWorkspace = useSelector(selectCurrentWorkspace);
  const currentFolder = useSelector(selectCurrentFolder);
  const currentChat = useSelector(selectCurrentChat);
  const selectedFolder = useSelector((state) =>
    selectFolderById(state, currentFolder._id)
  );

  const chats = useSelector(selectAllChats);
  const [showableChats, setShowableChats] = useState(chats);
  const myChats = useSelector((state) => state.chat.chats);

  useEffect(() => {
    if(selectedFolder._id && currentWorkspace.id){
      dispatch(getChatsAsync({workspaceId: currentWorkspace.id , folderId: selectedFolder._id}))
      .then((response) => {
        dispatch(setChats(response.payload.data))
      })
      .catch(error => {
        console.error(error, 'error')
      })
    }
  },[currentWorkspace, currentFolder, dispatch, selectedFolder._id])

  useEffect(() => {
    if(myChats.length > 0){
      setShowableChats(myChats)
    }
  },[myChats])
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
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
  const folderId = useSelector(selectCurrentFolder);

  const handleChatSelect = (chatId) => {
    console.log('FolderId', folderId);
    console.log('dispatch ChatId' + chatId);
    const currentUrl = window.location.pathname;
    const newUrl = currentUrl.replace(
      /\/assisstant\/chat\/[^/]+$/,
      `/assisstant/chat/${chatId}`
    );
    window.history.replaceState(null, '', newUrl);
    dispatch(setCurrentChatId(chatId));
  };

  const handleAddChat = () => {
    dispatch(setCurrentChatId(null));
    return;
  };

  const switchFolder = (folder) => {
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

  const capitalizeFirstWord = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
  }, [currentFolder, currentChat, currentWorkspace, chats, selectedFolder]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    chatContainer.addEventListener('scroll', handleScroll);
    return () => {
      chatContainer.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  return (
    <div
      className={`newChat ${sidebarCollapsed ? 'collapsed' : ''}`}
      ref={chatContainerRef}
      style={{ overflowY: 'auto', height: '80vh' }}
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
          <TbLayoutSidebarLeftCollapseFilled
            onClick={toggleSidebar}
            style={{ cursor: 'pointer' }}
          />
        ) : (
          <TbLayoutSidebarLeftExpandFilled
            onClick={toggleSidebar}
            style={{ cursor: 'pointer' }}
          />
        )}
      </div>
      {!sidebarCollapsed && (
        <>
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
                        <li key={index} onClick={() => switchFolder(project)}>
                          {project.folderName}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
          <hr className="saperator" />
        </>
      )}
      {!sidebarCollapsed && (
        <>
          {Array.isArray(showableChats) &&
            showableChats.map((chat, index) => (
              <section
                key={chat._id}
                onClick={() => handleChatSelect(chat._id)}
                onMouseEnter={() => setHoveredChatIndex(index)} // Set the hovered index on mouse enter
                onMouseLeave={() => setHoveredChatIndex(null)} // Reset the hovered index on mouse leave
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem',
                  justifyContent: 'space-between',
                  fontSize: '1.5rem !important',
                  color: currentChat?._id === chat._id ? 'black' : 'black',
                  borderRadius: '1rem',
                  backgroundColor:
                    currentChat?._id === chat._id ? '#f0f0f0' : 'transparent', // Set background color conditionally
                }}
                className="chat-item-section"
              >
                <Components.Feature.Text
                  className="middium--light"
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  {capitalizeFirstWord(chat.chatTitle)}
                </Components.Feature.Text>
                {hoveredChatIndex === index && (
                  <BsThreeDots
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(index, chat.chatId, e);
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
                      position={showMenu.position}
                    />
                  )}
              </section>
            ))}

          {/* {loading && <LoadingSpinner />} */}
        </>
      )}
    </div>
  );
};

export default NewChat;
