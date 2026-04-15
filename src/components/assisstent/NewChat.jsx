import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Components from '@components';
import NewChatSidebarModal from '../customModal/NewChatSidebarModal';
import { truncateText } from '../../utils/helperFunction.js';
import { HiOutlinePlusSm } from 'react-icons/hi';
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarLeftExpandFilled,
} from 'react-icons/tb';
import { BsThreeDots } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { RxDashboard } from 'react-icons/rx';
import Spinner from '../dashboard/Spinner/Spinner';

import {
  selectAllChats,
  selectAllFolders,
  selectCurrentChat,
  selectCurrentFolder,
  selectCurrentWorkspace,
  selectFolderById,
} from '../../redux/selectors/selectors';
import {
  selectWorkspace,
  setCurrentChatId,
} from '../../redux/slices/workspacesSlice';
import { setChats } from '../../redux/slices/chatSlice';
import { getChatsAsync } from '../../redux/slices/workspaceSlice';
import {
  selectFolderData,
  selectSelectedFolder,
  setSelectedFolder,
} from '../../redux/slices/folderSlice.js';

const NewChat = () => {
  const navigate = useNavigate();
  const projects = useSelector(selectAllFolders);

  const [loading, setLoading] = useState(false);
  const [chatsLoading, setChatsLoading] = useState(true);
  const [showMenu, setShowMenu] = useState({ index: null, chatId: null });
  const [searchQuery, setSearchQuery] = useState('');
  const chatContainerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [hoveredChatIndex, setHoveredChatIndex] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  // const currentWorkspace = useSelector(selectCurrentWorkspace);
  const currentWorkspace = useSelector(selectWorkspace);
  const currentFolder = useSelector(selectCurrentFolder);
  const currentChat = useSelector(selectCurrentChat);
  const currentChatId = useSelector((state) => state.workspaces.currentChatId);
  const selectedFolder = useSelector(selectSelectedFolder);

  const CHATS_PER_PAGE = 20;
  const chats = useSelector(selectAllChats);
  const [showableChats, setShowableChats] = useState([]);
  const [visibleCount, setVisibleCount] = useState(CHATS_PER_PAGE);
  const myChats = useSelector((state) => state.chat.chats);

  const normalizeChats = (chats) =>
    (chats || []).map((c) => ({
      ...c,
      _id: c._id || c.id,
      chatTitle: c.chatTitle || c.chat_title || c.title || 'Untitled',
    }));

  useEffect(() => {
    const fId = selectedFolder?._id || selectedFolder?.id;
    const wId = currentWorkspace?.id;
    if (!fId || !wId) return;

    // Ensure the selected folder belongs to the current workspace to avoid cross-workspace mismatches
    const folderBelongsToWorkspace = currentWorkspace.folders?.some(
      (f) => (f._id || f.id) === fId
    );
    if (!folderBelongsToWorkspace) return;

    setChatsLoading(true);
    dispatch(
      getChatsAsync({
        workspaceId: wId,
        folderId: fId,
      })
    )
      .then((response) => {
        dispatch(setChats(normalizeChats(response.payload.data)));
      })
      .catch((error) => { })
      .finally(() => setChatsLoading(false));
  }, [currentWorkspace, currentFolder, dispatch, selectedFolder]);

  useEffect(() => {
    if (myChats) {
      setShowableChats(myChats.slice(0, visibleCount));
    }
  }, [myChats, visibleCount]);
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
    dispatch(setCurrentChatId(chatId));
    navigate(`/assistant/chat/${chatId}`, { replace: true });
  };

  const handleAddChat = () => {
    dispatch(setCurrentChatId(null));
    // Navigate with unique state key to force re-render even on same path
    navigate('/assistant/chat', { state: { newChat: Date.now() } });
  };

  const switchFolder = (folder) => {
    dispatch(setSelectedFolder(folder));
    if ((folder._id || folder.id) && currentWorkspace?.id) {
      setChatsLoading(true);
      dispatch(
        getChatsAsync({
          workspaceId: currentWorkspace.id,
          folderId: folder._id || folder.id,
        })
      )
        .then((response) => {
          dispatch(setChats(normalizeChats(response.payload.data)));
        })
        .catch((error) => { })
        .finally(() => setChatsLoading(false));
    }
  };

  const handleScroll = async () => {
    const chatContainer = chatContainerRef.current;
    if (
      chatContainer.scrollHeight - chatContainer.scrollTop <=
      chatContainer.clientHeight * 1.1 &&
      !loading
    ) {
      if (myChats && visibleCount < myChats.length) {
        setLoading(true);
        setVisibleCount((prev) => prev + CHATS_PER_PAGE);
        setLoading(false);
      }
    }
  };

  const capitalizeFirstWord = (str = '') => {
    return str.charAt(0).toUpperCase() + str.slice(1);
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
      className={`newChat ${sidebarCollapsed ? 'collapsed' : ''}`}
      ref={chatContainerRef}
      style={{ overflowY: 'auto', height: 'calc(100vh - 121px)' }}
    >
      <div
        className={`sidebar-header ${sidebarCollapsed ? 'header-collapsed' : ''
          }`}
      >
        <div
          onClick={handleAddChat}
          style={{ cursor: 'pointer' }}
          className={`sidebar-header-title ${sidebarCollapsed ? 'header-collapsed-title' : ''
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
                      {currentWorkspace?.folders?.map((project, index) => (
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
          <div style={{ padding: '0 1rem', marginBottom: '0.5rem' }}>
            <input
              type="text"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '1.2rem',
                outline: 'none',
              }}
            />
          </div>
          {chatsLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
              <Spinner />
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}>
              {Array.isArray(showableChats) &&
                showableChats
                  .filter((chat) => {
                    if (!searchQuery.trim()) return true;
                    const q = searchQuery.toLowerCase();
                    const title = String(chat.chatTitle || chat.chat_title || chat.title || '').toLowerCase();
                    return title.includes(q);
                  })
                  .map((chat, index) => (
                    <section
                      key={chat._id || chat.id}
                      onClick={() => handleChatSelect(chat._id || chat.id)}
                      onMouseEnter={() => setHoveredChatIndex(index)}
                      onMouseLeave={() => setHoveredChatIndex(null)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '1rem',
                        justifyContent: 'space-between',
                        fontSize: '1.5rem !important',
                        borderRadius: '1rem',
                        backgroundColor:
                          currentChatId === (chat._id || chat.id) ? '#c3e11d' : 'transparent',
                      }}
                      className="chat-item-section"
                    >
                      <Components.Feature.Text
                        className="middium--light"
                        style={{
                          cursor: 'pointer',
                          color: currentChatId === (chat._id || chat.id) ? '#000' : 'inherit',
                        }}
                      >
                        {truncateText(capitalizeFirstWord(chat.chatTitle || chat.chat_title || chat.title || 'Untitled'), 25)}
                      </Components.Feature.Text>
                      {hoveredChatIndex === index && (
                        <BsThreeDots
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(index, chat._id || chat.id, e);
                          }}
                          style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                        />
                      )}

                      {showMenu.index === index &&
                        showMenu.chatId === (chat._id || chat.id) && (
                          <NewChatSidebarModal
                            isOpen={isModalOpen}
                            closeModal={closeModal}
                            chatId={chat._id || chat.id}
                            chatTitle={chat.chatTitle || chat.chat_title || ''}
                            workspaceId={currentWorkspace?.id}
                            folderId={chat.folder_id || selectedFolder?._id || selectedFolder?.id}
                            onDeleted={(deletedId) => {
                              const updated = (myChats || []).filter(c => (c._id || c.id) !== deletedId);
                              dispatch(setChats(updated));
                              if (deletedId === currentChatId) {
                                dispatch(setCurrentChatId(null));
                                navigate('/assistant/chat', { replace: true });
                              }
                            }}
                            onRenamed={(renamedId, newTitle) => {
                              const updated = (myChats || []).map(c =>
                                (c._id || c.id) === renamedId
                                  ? { ...c, chatTitle: newTitle, chat_title: newTitle }
                                  : c
                              );
                              dispatch(setChats(updated));
                            }}
                            position={showMenu.position}
                          />
                        )}
                    </section>
                  ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NewChat;
