import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Components from '@components';
import NewChatSidebarModal from '../customModal/NewChatSidebarModal';
import InputModal from '../common/InputModal';
import { useUpdateChatMutation } from '../../redux/api/workspaceApi';
import { truncateText } from '../../utils/helperFunction.js';
import { HiOutlinePlusSm } from 'react-icons/hi';
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarLeftExpandFilled,
} from 'react-icons/tb';
import { BsThreeDots } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import './assistant.scss';
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
import { getChatsAsync } from '../../redux/slices/chatSlice';
import {
  selectFolderData,
  selectSelectedFolder,
  setSelectedFolder,
} from '../../redux/slices/folderSlice.js';

const NewChat = ({ isOverlay = false, isVisible = false, onClose }) => {
  const navigate = useNavigate();
  const projects = useSelector(selectAllFolders);

  const [loading, setLoading] = useState(false);
  const [chatsLoading, setChatsLoading] = useState(true);
  const [showMenu, setShowMenu] = useState({ index: null, chatId: null });
  const [searchQuery, setSearchQuery] = useState('');
  const chatContainerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [renameChat, setRenameChat] = useState({ open: false, chatId: null, chatTitle: '', folderId: null });
  const [updateChatMutation] = useUpdateChatMutation();
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
    if (!fId || !wId) {
      setChatsLoading(false);
      return;
    }

    // Ensure the selected folder belongs to the current workspace to avoid cross-workspace mismatches
    const folderBelongsToWorkspace = currentWorkspace.folders?.some(
      (f) => (f._id || f.id) === fId
    );
    if (!folderBelongsToWorkspace) {
      setChatsLoading(false);
      return;
    }

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
    if (isOverlay && onClose) onClose();
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
      className={`newChat ${sidebarCollapsed && !isOverlay ? 'collapsed' : ''} asst-newchat-scroll ${isOverlay ? 'newChat--overlay' : ''} ${isOverlay && isVisible ? 'newChat--visible' : ''}`}
      ref={chatContainerRef}
    >
      <div
        className={`sidebar-header ${sidebarCollapsed ? 'header-collapsed' : ''
          }`}
      >
        <div
          onClick={handleAddChat}

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
            className="sidebar-toggle-icon"
          />
        ) : (
          <TbLayoutSidebarLeftExpandFilled
            onClick={toggleSidebar}
            className="sidebar-toggle-icon"
          />
        )}
      </div>
      {!sidebarCollapsed && (
        <>
          <div
            className="explore-projects"
            onClick={toggleDropdown}

          >
            <p>
              <RxDashboard size={20} />
              Explore Projects
            </p>
            {!sidebarCollapsed && (
              <div
                className="explore-projects"
                onClick={toggleDropdown}

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
          <div className="asst-search-wrapper">
            <input
              type="text"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="asst-search-input"
            />
          </div>
          {chatsLoading ? (
            <div className="asst-loading-center">
              <Spinner />
            </div>
          ) : (
            <div className="asst-chat-list">
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
                      className={`chat-item-section asst-chat-item ${currentChatId === (chat._id || chat.id) ? 'asst-chat-item--active' : ''}`}
                    >
                      <Components.Feature.Text
                        className={`middium--light asst-chat-text ${currentChatId === (chat._id || chat.id) ? 'asst-chat-text--active' : ''}`}
                      >
                        {truncateText(capitalizeFirstWord(chat.chatTitle || chat.chat_title || chat.title || 'Untitled'), 25)}
                      </Components.Feature.Text>
                      {hoveredChatIndex === index && (
                        <BsThreeDots
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(index, chat._id || chat.id, e);
                          }}
                          className="asst-dots-icon"
                        />
                      )}

                      {showMenu.index === index &&
                        showMenu.chatId === (chat._id || chat.id) && (
                          <NewChatSidebarModal
                            isOpen={isModalOpen}
                            closeModal={closeModal}
                            chatId={chat._id || chat.id}
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
                            onRename={() => {
                              setRenameChat({
                                open: true,
                                chatId: chat._id || chat.id,
                                chatTitle: chat.chatTitle || chat.chat_title || '',
                                folderId: chat.folder_id || selectedFolder?._id || selectedFolder?.id,
                              });
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
      <InputModal
        isOpen={renameChat.open}
        title="Rename Chat"
        confirmText="Rename"
        cancelText="Cancel"
        defaultValue={renameChat.chatTitle}
        placeholder="Enter chat name"
        onConfirm={async (newName) => {
          try {
            await updateChatMutation({
              workspaceId: currentWorkspace?.id,
              folderId: renameChat.folderId,
              chatId: renameChat.chatId,
              chat: { chatTitle: newName },
            }).unwrap();
            const updated = (myChats || []).map(c =>
              (c._id || c.id) === renameChat.chatId
                ? { ...c, chatTitle: newName, chat_title: newName }
                : c
            );
            dispatch(setChats(updated));
          } catch (error) {
            import.meta.env.DEV && console.error('Failed to rename chat:', error);
          }
          setRenameChat({ open: false, chatId: null, chatTitle: '', folderId: null });
        }}
        onCancel={() => setRenameChat({ open: false, chatId: null, chatTitle: '', folderId: null })}
      />
    </div>
  );
};

export default NewChat;
