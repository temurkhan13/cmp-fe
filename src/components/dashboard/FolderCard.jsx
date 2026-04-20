import { useState, useRef, useEffect } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import {
  FaTrash,
  FaLink,
  FaDownload,
  FaCopy,
  FaEdit,
  FaFolderPlus,
} from 'react-icons/fa';
import assets from '@assets';
import CustomModal from '../customModal/CustomModal';
import MoveToModal from '../customModal/MoveToModal';
import PropTypes from 'prop-types';
import useManagerChat from '@hooks/useManagerChat';
import { downloadFolderAsZip } from '@utils/ExportAs';
import './dashboard-inline.scss';

const FolderCard = ({ folder }) => {
  if (!folder) return null;

  const { id, name } = folder;
  const { moveChatToFolder, renameFolder, deleteFolder } = useManagerChat;

  const [showDropdown, setShowDropdown] = useState(false);
  const [isMoveToModalOpen, setMoveToModalOpen] = useState(false);
  const [isMoveToTrashModalOpen, setMoveToTrashModalOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleItemClick = (action) => {
    switch (action) {
      case 'Move to trash':
        setMoveToTrashModalOpen(true);
        break;
      case 'Move To Folder':
        setMoveToModalOpen(true);
        break;
      case 'Downloads':
        downloadFolderAsZip(folder);
        break;
      default:
        setShowDropdown(false);
        break;
    }
  };

  const folders = [
    {
      name: 'NeuralNet',
      subfolders: [{ name: 'DeepLearning 1' }, { name: 'DeepLearning 2' }],
    },
    {
      name: 'MachineLearning',
      subfolders: [
        { name: 'SupervisedLearning 1' },
        { name: 'SupervisedLearning 2' },
      ],
    },
    {
      name: 'AI Model',
      subfolders: [
        { name: 'UnsupervisedLearning 1' },
        { name: 'UnsupervisedLearning 2' },
      ],
    },
    {
      name: 'Algorithm',
      subfolders: [
        { name: 'ReinforcementLearning 1' },
        { name: 'ReinforcementLearning 2' },
      ],
    },
    {
      name: 'ArtificialIntelligence',
      subfolders: [{ name: 'NeuralNetwork 1' }, { name: 'NeuralNetwork 2' }],
    },
    { name: 'DataScience', subfolders: [] },
  ];

  return (
    <div className="folder-card">
      <img src={assets.dashboard.FolderIcon} alt="FolderIcon" />
      <div>
        <p className="folder-card__heading">{name}</p>
        <p className="folder-card__subheading">Modified 2 days ago</p>
      </div>
      <div className="folder-card__items">
        <p className="folder-card__item-count">{id} Items</p>
        <div ref={dropdownRef} className="folder-card__dots-wrapper">
          <BsThreeDots
            onClick={() => setShowDropdown(!showDropdown)}
            className="folder-card__dots-icon"
          />
          {showDropdown && (
            <div className="folder-card__dropdown">
              <p
                className="folder-card__dropdown-item"
                onClick={() => handleItemClick('Move To Folder')}
              >
                <FaFolderPlus className="folder-card__dropdown-icon" /> Move To Folder
              </p>
              <p
                className="folder-card__dropdown-item"
                onClick={() => handleItemClick('Duplicate')}
              >
                <FaCopy className="folder-card__dropdown-icon" /> Duplicate
              </p>
              <p
                className="folder-card__dropdown-item"
                onClick={() => handleItemClick('Rename')}
              >
                <FaEdit className="folder-card__dropdown-icon" /> Rename
              </p>
              <p
                className="folder-card__dropdown-item"
                onClick={() => handleItemClick('Downloads')}
              >
                <FaDownload className="folder-card__dropdown-icon" /> Download As Zip
              </p>
              <p
                className="folder-card__dropdown-item"
                onClick={() => handleItemClick('Copy Link')}
              >
                <FaLink className="folder-card__dropdown-icon" /> Copy Link
              </p>
              <p
                className="folder-card__dropdown-item"
                onClick={() => handleItemClick('Move to trash')}
              >
                <FaTrash className="folder-card__dropdown-icon" /> Move to trash
              </p>
            </div>
          )}
        </div>
      </div>

      <CustomModal
        isOpen={isMoveToTrashModalOpen}
        onClose={() => setMoveToTrashModalOpen(false)}
        onProceed={() => setMoveToTrashModalOpen(false)}
        heading="Move to trash"
        bodyContent={
          <div>
            Are you sure you want to move this file to the
            <br /> trash? It will remain there for 30 days before being
            <br />
            permanently deleted.
          </div>
        }
        cancelText="Cancel"
        proceedText="Proceed"
      />
      <CustomModal
        isOpen={isMoveToModalOpen}
        onClose={() => setMoveToModalOpen(false)}
        onProceed={() => setMoveToModalOpen(false)}
        heading="Move to folder"
        bodyContent={<MoveToModal folders={folders} />}
        cancelText="Cancel"
        proceedText="Move"
      />
    </div>
  );
};

FolderCard.propTypes = {
  folder: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    chats: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default FolderCard;
