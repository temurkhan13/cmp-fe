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
    <div style={styles.folder}>
      <img src={assets.dashboard.FolderIcon} alt="FolderIcon" />
      <div>
        <p style={styles.folderHeading}>{name}</p>
        <p style={styles.folderSubheading}>Modified 2 days ago</p>
      </div>
      <div style={styles.folderItems}>
        <p style={styles.item}>{id} Items</p>
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <BsThreeDots
            onClick={() => setShowDropdown(!showDropdown)}
            style={{ cursor: 'pointer', fontSize: '2rem' }}
          />
          {showDropdown && (
            <div style={styles.dropdown}>
              <p
                style={styles.dropdownItem}
                onClick={() => handleItemClick('Move To Folder')}
              >
                <FaFolderPlus style={styles.dropdownIcon} /> Move To Folder
              </p>
              <p
                style={styles.dropdownItem}
                onClick={() => handleItemClick('Duplicate')}
              >
                <FaCopy style={styles.dropdownIcon} /> Duplicate
              </p>
              <p
                style={styles.dropdownItem}
                onClick={() => handleItemClick('Rename')}
              >
                <FaEdit style={styles.dropdownIcon} /> Rename
              </p>
              <p
                style={styles.dropdownItem}
                onClick={() => handleItemClick('Downloads')}
              >
                <FaDownload style={styles.dropdownIcon} /> Download As Zip
              </p>
              <p
                style={styles.dropdownItem}
                onClick={() => handleItemClick('Copy Link')}
              >
                <FaLink style={styles.dropdownIcon} /> Copy Link
              </p>
              <p
                style={styles.dropdownItem}
                onClick={() => handleItemClick('Move to trash')}
              >
                <FaTrash style={styles.dropdownIcon} /> Move to trash
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
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

const styles = {
  folder: {
    backgroundColor: 'rgba(249, 249, 249, 1)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    gap: '15px',
    marginBottom: '10px',
  },
  folderHeading: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.12px',
    color: 'rgba(10, 10, 10, 1)',
    margin: '0',
  },
  folderSubheading: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '18px',
    letterSpacing: '0.24px',
    color: 'rgba(10, 10, 10, 0.46)',
    margin: '0',
  },
  folderItems: {
    display: 'flex',
    alignItems: 'center',
  },
  item: {
    fontFamily: 'Mono, monospace',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '18.23px',
    letterSpacing: '0.24px',
    color: 'rgba(10, 10, 10, 0.46)',
    marginRight: '10px',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: '0',
    backgroundColor: 'white',
    boxShadow: '0px 8px 16px rgba(10, 10, 10, 0.1)',
    borderRadius: '8px',
    zIndex: '100',
    minWidth: '190px',
    padding: '8px 0',
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '14px',
    color: 'rgba(10, 10, 10, 0.8)',
  },
  dropdownIcon: {
    marginRight: '8px',
  },
};

// Prop types validation
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
