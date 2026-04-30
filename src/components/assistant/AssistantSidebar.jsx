import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { SideBarModal } from '../modal';
import PropTypes from 'prop-types';

import Media from '../chat/Media';
import Comments from './assistantModal/Comments';
import ChatBookmark from './assistantModal/ChatBookmark';
import VersionHistory from './assistantModal/VersionHistory';
import { IoIosChatboxes } from 'react-icons/io';
import { FaBookmark, FaImages } from 'react-icons/fa';
import { selectWorkspace } from '../../redux/slices/workspacesSlice';
import { selectSelectedFolder } from '../../redux/slices/folderSlice';
import {
  useGetChatQuery,
  useGetChatMediaQuery,
  useGetChatDocumentsQuery,
  useGetChatLinksQuery,
} from '../../redux/api/workspaceApi';

const AssistantSidebar = ({ isOverlay = false, isVisible = false, ...props }) => {
  const currentChat = props?.currentChat;
  const [bookmarksShow, setBookmarksShow] = useState([]);

  // Read chat directly from RTK Query cache for fresh comments
  const selectedWorkspace = useSelector(selectWorkspace);
  const selectedFolder = useSelector(selectSelectedFolder);
  const chatId = useSelector((state) => state.workspaces.currentChatId);
  const workspaceId = selectedWorkspace?.id;
  const folderId = selectedFolder?._id || selectedFolder?.id;

  const [isVersionHistoryModalOpen, setIsVersionHistoryModalOpen] =
    useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);

  const { data: liveChat } = useGetChatQuery(
    { workspaceId, folderId, chatId },
    { skip: !workspaceId || !folderId || !chatId }
  );

  const skipMedia = !workspaceId || !folderId || !chatId || !isMediaModalOpen;
  const { data: mediaData } = useGetChatMediaQuery(
    { workspaceId, folderId, chatId },
    { skip: skipMedia, refetchOnMountOrArgChange: true }
  );
  const { data: documentsData } = useGetChatDocumentsQuery(
    { workspaceId, folderId, chatId },
    { skip: skipMedia, refetchOnMountOrArgChange: true }
  );
  const { data: linksData } = useGetChatLinksQuery(
    { workspaceId, folderId, chatId },
    { skip: skipMedia, refetchOnMountOrArgChange: true }
  );

  // Use liveChat from RTK Query (always fresh), fallback to prop
  const chatData = liveChat || currentChat;

  // Transform media data for the Media component
  const images = (mediaData || []).map((m) => m.url);
  const documents = (documentsData || []).map((d) => ({
    name: d.file_name || d.name || 'Unknown',
    url: d.url || '',
    date: d.date ? new Date(d.date).toLocaleDateString() : '',
    size: d.size ? `${(d.size / 1024).toFixed(1)} KB` : '',
  }));
  const links = (linksData || []).map((l) => ({
    name: l.name || l.url || 'Link',
    url: l.url || '',
  }));

  // Aggregate comments from all messages (backend attaches them per-message)
  const allComments = useMemo(() => {
    if (!chatData?.generalMessages) return [];
    return chatData.generalMessages
      .filter((msg) => msg.comments && msg.comments.length > 0)
      .flatMap((msg) =>
        msg.comments.map((c) => ({
          ...c,
          commentId: c._id || c.id,
          userName: c.userName || c.user_name || 'User',
          text: c.text || c.comment || '',
          timestamp: c.created_at || c.createdAt || '',
          replies: c.replies || [],
        }))
      );
  }, [chatData?.generalMessages]);

  const closeModal = () => {
    setIsVersionHistoryModalOpen(false);
    setIsMediaModalOpen(false);
    setIsCommentsModalOpen(false);
    setIsBookmarkModalOpen(false);
  };

  useEffect(() => {
    const source = chatData;
    if (!source?.bookmarks || !source?.generalMessages) {
      setBookmarksShow([]);
      return;
    }
    const findingAllbookmarks = source.bookmarks
      .map((item) => {
        const foundMessage = source.generalMessages.find(
          (message) => (message._id || message.id) === (item.messageId || item.message_id)
        );
        if (foundMessage) {
          const date = new Date(foundMessage.createdAt || foundMessage.created_at);
          return { ...foundMessage, localDate: date.toLocaleString() };
        }
        return null;
      })
      .filter(Boolean);
    setBookmarksShow(findingAllbookmarks);
  }, [chatData]);

  return (
    <>
      <section className={`asst-iconSection ${isOverlay ? 'asst-iconSection--overlay' : ''} ${isOverlay && isVisible ? 'asst-iconSection--visible' : ''}`}>
        <div className="asst-iconContainer">
          {/* <span
            className={`asst-iconButton ${
              isVersionHistoryModalOpen ? 'active' : ''
            }`}
            onClick={() => setIsVersionHistoryModalOpen(true)}
          >
            <FaHistory className="asst-icon" size={20} />
            <span className="asst-tooltip">Version History</span>
          </span> */}
          <span
            className={`asst-iconButton ${isMediaModalOpen ? 'active' : ''}`}
            onClick={() => setIsMediaModalOpen(true)}
          >
            <FaImages className="asst-icon" size={20} />
            <span className="asst-tooltip">Media</span>
          </span>
          <span
            className={`asst-iconButton ${isCommentsModalOpen ? 'active' : ''}`}
            onClick={() => setIsCommentsModalOpen(true)}
          >
            <IoIosChatboxes className="asst-icon" size={22} />
            <span className="asst-tooltip">Comments</span>
          </span>
          <span
            className={`asst-iconButton ${isBookmarkModalOpen ? 'active' : ''}`}
            onClick={() => setIsBookmarkModalOpen(true)}
          >
            <FaBookmark className="asst-icon" size={20} />
            <span className="asst-tooltip">Bookmark</span>
          </span>
        </div>
      </section>

      {isVersionHistoryModalOpen && (
        <SideBarModal
          title="Version History"
          bodyContent={<VersionHistory versions={currentChat?.versions || []} />}
          onClose={closeModal}
        />
      )}
      {isMediaModalOpen && (
        <SideBarModal
          title="Media"
          bodyContent={
            <Media
              images={images}
              documents={documents}
              links={links}
            />
          }
          onClose={closeModal}
        />
      )}
      {isCommentsModalOpen && (
        <SideBarModal
          title="Comments"
          bodyContent={<Comments comments={allComments} />}
          onClose={closeModal}
        />
      )}
      {isBookmarkModalOpen && (
        <SideBarModal
          title="Bookmark"
          bodyContent={
            <div>
              <ChatBookmark date={Date.now()} messages={bookmarksShow} />
            </div>
          }
          onClose={closeModal}
        />
      )}

    </>
  );
};

AssistantSidebar.propTypes = {
  isOverlay: PropTypes.bool,
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
  currentChat: PropTypes.shape({
    bookmarks: PropTypes.arrayOf(
      PropTypes.shape({
        messageId: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
      })
    ),
    generalMessages: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        text: PropTypes.string,
        from: PropTypes.string,
        createdAt: PropTypes.string,
      })
    ),
  }),
};

AssistantSidebar.defaultProps = {
  currentChat: {
    bookmarks: [],
    generalMessages: [],
    comments: [],
    versions: [],
  },
};

export default AssistantSidebar;
