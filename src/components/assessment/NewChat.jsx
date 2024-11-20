import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Components from '@components';
import NewChatSidebarModal from '../customModal/NewChatSidebarModal';
import { HiOutlinePlusSm } from 'react-icons/hi';
import { BsThreeDots } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { RxDashboard } from 'react-icons/rx';
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarLeftExpandFilled,
} from 'react-icons/tb';
import LoadingSpinner from '../../components/common/LoadingSpinner';

import {
  selectAllAssessments,
  selectAllFolders,
  selectCurrentAssessment,
  selectCurrentFolder,
  selectCurrentWorkspace,
  selectFolderById,
} from '../../redux/selectors/selectors';
import {
  setCurrentAssessmentId,
  setSelectedFolder,
} from '../../redux/slices/workspacesSlice';

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
  const currentChat = useSelector(selectCurrentAssessment);
  console.log(currentFolder, 'currentFolder');
  // const selectedFolder = useSelector((state) =>
  //   selectFolderById(state, currentFolder._id)
  // );
  const chats = useSelector(selectAllAssessments);

  const capitalizeFirstWord = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

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
      /\/assessment\/chat\/[^/]+$/,
      `/assessment/chat/${chatId}`
    );
    window.history.replaceState(null, '', newUrl);
    dispatch(setCurrentAssessmentId(chatId));
  };

  const handleAddChat = () => {
    dispatch(setCurrentAssessmentId(null));
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

  useEffect(() => {
    console.log('', currentFolder, currentChat, currentWorkspace);
  }, [currentFolder, currentChat, currentWorkspace, chats]);

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
      style={{ overflowY: 'auto', height: '80vh', display: 'none' }}
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
          {chats &&
            Array.isArray(chats) &&
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
                  // margin: '0.5rem 0',
                  justifyContent: 'space-between',
                  fontSize: '1.5rem !important',
                  color: 'black',
                }}
                className="chat-item-section"
              >
                <Components.Feature.Text
                  className="middium--light"
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  {
                    //console.log("Assessments: ",chat.report)
                    chat.report[0].ReportTitle
                  }
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
          {loading && <LoadingSpinner />}
        </>
      )}
    </div>
  );
};

export default NewChat;
