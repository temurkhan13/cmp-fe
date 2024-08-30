import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import DeleteModal from './DeleteModal';

import { FaTrash, FaFileAlt } from 'react-icons/fa';
import { RxAvatar } from 'react-icons/rx';
import {
  MdDelete,
  MdOutlineEdit,
  MdOutlineSettingsBackupRestore,
} from 'react-icons/md';
import { CiBookmark } from 'react-icons/ci';
import { TfiReload } from 'react-icons/tfi';
import { ImFilesEmpty } from 'react-icons/im';
import { HiDotsHorizontal } from 'react-icons/hi';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';

const DeletedItems = () => {
  return (
    <div className="file-content">
      <FaTrash size={50} />
      <p className="trash-activity">No recent activity here</p>
      <p>
        Any file you trash will end up here. You&apos;ll have 30 days <br />
        to restore them before they are automatically deleted <br />
        from your Trash.
      </p>
      <style>{`
        .file-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #666;
        }
        p {
          margin: 0.3125rem 0; 
          font-size: 1.2rem;
        }
        .trash-activity {
          font-size: 1.4rem;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

const TrashFileTab = ({ cardData }) => {
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleRestore = (id) => {
    console.log(`Restore item with id: ${id}`);
    // Add your restore logic here
  };

  const handleDeletePermanently = () => {
    setDropdownIndex(null);
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };
  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    // Add your delete logic here
    console.log('Deleted');
  };

  return (
    <div className="deletedItemsContainer">
      {cardData.length === 0 ? (
        <DeletedItems />
      ) : (
        <div className="deletedCardWrapper">
          {cardData.map((card, index) => (
            <div key={card.id}>
              <div className="deletedCard">
                <div className="deletedCardHeader">
                  <h2 className="deletedUserName">
                    <RxAvatar className="deletedIcon" /> {card.userName}
                  </h2>
                  <p className="deletedContent">{card.userContent}</p>
                  <MdOutlineEdit className="deletedEditIcon" />
                </div>
                <div className="deletedContentSection">
                  <h3 className="deletedAiHeading">
                    <RxAvatar className="deletedIcon" /> ChangeAI
                  </h3>
                  <p className="deletedChatContent">{card.aiContent}</p>
                </div>
                <div className="deletedFooter">
                  <div className="deletedIconsContainer">
                    <ImFilesEmpty className="deletedFooterIcon" />
                    <AiOutlineLike className="deletedFooterIcon" />
                    <AiOutlineDislike className="deletedFooterIcon" />
                    <CiBookmark className="deletedFooterIcon" />
                    <TfiReload className="deletedFooterIcon" />
                  </div>
                  <FaFileAlt className="deletedLargeFileIcon" />
                </div>
              </div>
              <div className="deletedFileDetails">
                <div className="deletedFileName">Assistant 1</div>
                <div className="file-details-content">
                  <span>Deleted by</span>
                  <span className="deletedFolderName">Imran</span>
                  <span>
                    2 days ago
                    <HiDotsHorizontal
                      className="deletedDotsIcon"
                      onClick={() => handleDropdownToggle(index)}
                    />
                    {dropdownIndex === index && (
                      <div ref={dropdownRef} className="dropdownMenu">
                        <button
                          onClick={() => handleRestore(card.id)}
                          className="restore-delete"
                        >
                          <MdOutlineSettingsBackupRestore size={18} />
                          Restore
                        </button>
                        <button
                          className="delete-perm-button"
                          onClick={() => handleDeletePermanently(card.id)}
                        >
                          <MdDelete size={18} />
                          Delete Permanently
                        </button>
                      </div>
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showDeleteModal && (
        <DeleteModal
          folderName=""
          onCancel={handleCancelDelete}
          onDelete={handleConfirmDelete}
        />
      )}

      <style>{`
        .deletedCardWrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 20px;
        }
        .deletedCard {
          width: 30rem;
          margin: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 1.3rem;
          background-color: white;
          padding: 2rem;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: background-color 0.1s ease-in-out;
        }
        .deletedCard:hover {
          background-color: #f9f9f9;
        }
        .restore-delete, 
        .delete-perm-button{
        display:flex;
        gap:0.5rem;
        font-size:1.4rem;
        }
        .deletedCardHeader {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }
        .deletedUserName,
        .deletedFileName {
          text-align: start;
          font-size: 1.2rem;
          font-weight: 600;
        }
        .file-details-content {
          text-align: start;
        }
        .deletedContentSection {
          margin-top: 1rem;
        }
        .deletedAiHeading {
          display: flex;
        }
        .deletedContent {
          text-align: start;
        }
        .deletedChatContent {
          font-size: 1.2rem;
          margin: 0.5rem 0;
          text-align: start;
        }
        .deletedFooter {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        .deletedIconsContainer {
          display: flex;
          gap: 0.5rem;
        }
        .deletedFooterIcon {
          font-size: 1.5rem;
        }
        .deletedLargeFileIcon {
          font-size: 4rem;
          color: gray;
        }
        .deletedFileDetails {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;
          margin: 0.2rem 1.5rem;
          font-size: 1rem;
        }
        .deletedFolderName {
          margin: 0 0.5rem;
          font-weight: bold;
        }
        .deletedDotsIcon {
          cursor: pointer;
          font-size: 2rem;
          color: #888;
        }
        .dropdownMenu {
          position: relative;
          background-color: white;
          border-radius: 0.5rem;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
          width: fit-content;
          top: 0rem;
          display: flex;
          flex-direction: column;
        }
        .dropdownMenu button {
          padding: 0.5rem 1rem;
          border: none;
          background: none;
          cursor: pointer;
          text-align: left;
        }
        .dropdownMenu button:hover {
          background-color: #f0f0f0;
        }
      `}</style>
    </div>
  );
};

TrashFileTab.propTypes = {
  cardData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
      userContent: PropTypes.string.isRequired,
      aiContent: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TrashFileTab;
