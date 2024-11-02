import { useState, useEffect } from 'react';
import { SideBarModal } from '../common';
import PropTypes from 'prop-types';

import Media from './assistantModal/Media';
import Comments from './assistantModal/Comments';
import ChatBookmark from './assistantModal/ChatBookmark';
import VersionHistory from './assistantModal/VersionHistory';
import { IoIosChatboxes } from 'react-icons/io';
import { FaHistory, FaBookmark, FaImages } from 'react-icons/fa';

const AssistantSidebar = (props) => {
  const currentChat =  props?.currentChat;
  const [bookmarksShow, setBookmarksShow] = useState([]);

  const [isVersionHistoryModalOpen, setIsVersionHistoryModalOpen] =
    useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);

  const closeModal = () => {
    setIsVersionHistoryModalOpen(false);
    setIsMediaModalOpen(false);
    setIsCommentsModalOpen(false);
    setIsBookmarkModalOpen(false);
  };

  useEffect(() => {
    const findingAllbookmarks = currentChat ? currentChat.bookmarks.map((item) => {
      const foundMessage = currentChat.generalMessages.find(
        (message) => message._id === item.messageId
      )

      if (foundMessage) {
        const date = new Date(foundMessage.createdAt);
        const localDate = date.toLocaleString(); 
        return {
          ...foundMessage,
          localDate,
        };
      }
    }) : []
    if (findingAllbookmarks.length > 0) {
      setBookmarksShow(findingAllbookmarks);
    }
  }, [currentChat]);

  return (
    <>
      <section className="iconSection">
        <div className="iconContainer">
          <span
            className={`iconButton ${
              isVersionHistoryModalOpen ? 'active' : ''
            }`}
            onClick={() => setIsVersionHistoryModalOpen(true)}
          >
            <FaHistory className="icon" size={20} />
            <span className="tooltip">Version History</span>
          </span>
          {/*<span*/}
          {/*  className={`iconButton ${isMediaModalOpen ? 'active' : ''}`}*/}
          {/*  onClick={() => setIsMediaModalOpen(true)}*/}
          {/*>*/}
          {/*  <FaImages className="icon" size={20} />*/}
          {/*  <span className="tooltip">Media</span>*/}
          {/*</span>*/}
          <span
            className={`iconButton ${isCommentsModalOpen ? 'active' : ''}`}
            onClick={() => setIsCommentsModalOpen(true)}
          >
            <IoIosChatboxes className="icon" size={22} />
            <span className="tooltip">Comments</span>
          </span>
          <span
            className={`iconButton ${isBookmarkModalOpen ? 'active' : ''}`}
            onClick={() => setIsBookmarkModalOpen(true)}
          >
            <FaBookmark className="icon" size={20} />
            <span className="tooltip">Bookmark</span>
          </span>
        </div>
      </section>

      {isVersionHistoryModalOpen && (
        <SideBarModal
          title="Version History"
          bodyContent={<VersionHistory versions={currentChat.versions} />}
          onClose={closeModal}
        />
      )}
      {/*{isMediaModalOpen && (*/}
      {/*  <SideBarModal*/}
      {/*    title="Media"*/}
      {/*    bodyContent={*/}
      {/*      <Media*/}
      {/*        images={currentChat.images}*/}
      {/*        documents={currentChat.documents}*/}
      {/*        links={currentChat.links}*/}
      {/*      />*/}
      {/*    }*/}
      {/*    onClose={closeModal}*/}
      {/*  />*/}
      {/*)}*/}
      {isCommentsModalOpen && (
        <SideBarModal
          title="Comments"
          bodyContent={<Comments comments={currentChat.comments} />}
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

      <style>{`
        .iconSection {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .iconContainer {
          padding-top: 1rem;
          padding-bottom: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          border: 1px solid lightgray;
          border-radius: 10px;
          align-items: center;
          justify-content: center;
          width: 5rem;
        }
        .iconButton {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 8px;
          position: relative;
        }
        .iconButton:hover {
          background: #d9d9d9;
        }
        .iconButton.active {
          background: black;
          transition: opacity 0.5s;
        }
        .iconButton.active .icon {
          color: white;
        }
        .icon {
          color: #595959;
        }
         .tooltip {
          visibility: hidden;
          background-color: black;
          color: #fff;
          text-align: center;
          border-radius: 6px;
          padding: 1rem;
          font-size: 1.2rem;
          position: absolute;
          z-index: 1;
          bottom: 0%; 
          right: 135%;
          opacity: 0;
          transition: opacity 0.5s;
          white-space: nowrap;
        }
        .iconButton:hover .tooltip {
          visibility: visible;
          opacity: 1;
        }
        .tooltip::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 100%;
          margin-top: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: transparent transparent transparent black;
        }
      `}</style>
    </>
  );
};

AssistantSidebar.propTypes = {
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
  },
};

export default AssistantSidebar;
