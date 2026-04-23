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
import { LoadingSpinner } from '../../components/common/Loaders';

import {
  selectAllAssessments,
  selectAllFolders,
} from '../../redux/selectors/selectors';
import {
  setCurrentAssessmentId,
  setSelectedFolder,
} from '../../redux/slices/workspacesSlice';

const NewChat = ({ isOverlay = false, isVisible = false, onClose }) => {
  const projects = useSelector(selectAllFolders);

  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState({ index: null, chatId: null });
  const chatContainerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [hoveredChatIndex, setHoveredChatIndex] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const chats = useSelector(selectAllAssessments);

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
  const handleChatSelect = (chatId) => {
    const currentUrl = window.location.pathname;
    const newUrl = currentUrl.replace(
      /\/assessment\/chat\/[^/]+$/,
      `/assessment/chat/${chatId}`
    );
    window.history.replaceState(null, '', newUrl);
    dispatch(setCurrentAssessmentId(chatId));
    if (isOverlay && onClose) onClose();
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
    const chatContainer = chatContainerRef.current;
    chatContainer.addEventListener('scroll', handleScroll);
    return () => {
      chatContainer.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  return (
    <div
      className={`newChat ${sidebarCollapsed && !isOverlay ? 'collapsed' : ''} newchat-hidden ${isOverlay ? 'newChat--overlay' : ''} ${isOverlay && isVisible ? 'newChat--visible' : ''}`}
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
                className="chat-item-section newchat-chat-item"
              >
                <Components.Feature.Text
                  className="middium--light newchat-chat-text"
                >
                  {chat.report[0].ReportTitle}
                </Components.Feature.Text>
                {hoveredChatIndex === index && (
                  <BsThreeDots
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(index, chat.chatId, e);
                    }}
                    className="newchat-dots-icon"
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
