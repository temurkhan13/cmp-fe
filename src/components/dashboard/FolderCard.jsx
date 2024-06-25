import { useState, useRef, useEffect } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import assets from '../../assets';
import {
  FaTrash,
  FaLink,
  FaDownload,
  FaCopy,
  FaEdit,
  FaFolderPlus,
} from 'react-icons/fa';
import TrashModal from './TrashModal'; // Adjust the import path as per your project structure
import MoveToFolderModal from './MoveToTrash'; // Adjust the import path as per your project structure

const FolderCard = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTrashModal, setShowTrashModal] = useState(false); // State for trash modal
  const [showMoveToFolderModal, setShowMoveToFolderModal] = useState(false); // State for move to folder modal
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

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleItemClick = (action) => {
    if (action === 'Move to trash') {
      setShowTrashModal(true); // Open trash modal
    } else if (action === 'Move To Folder') {
      setShowMoveToFolderModal(true); // Open move to folder modal
    } else {
      console.log(action);
      setShowDropdown(false);
    }
  };

  const closeTrashModal = () => {
    setShowTrashModal(false);
  };

  const closeMoveToFolderModal = () => {
    setShowMoveToFolderModal(false);
  };

  const handleProceedTrash = () => {
    console.log('File moved to trash');
    setShowTrashModal(false);
    // Implement logic for moving file to trash
  };

  return (
    <div style={styles.folder}>
      <img src={assets.dashboard.FolderIcon} alt="FolderIcon" />
      <div>
        <p style={styles.folderHeading}>Folder Name</p>
        <p style={styles.folderSubheading}>Modified 2 days ago</p>
      </div>
      <div style={styles.folderItems}>
        <p style={styles.item}>3 Items</p>
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <BsThreeDots onClick={toggleDropdown} style={{ cursor: 'pointer' }} />
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
                <FaDownload style={styles.dropdownIcon} /> Downloads
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
      <TrashModal
        isOpen={showTrashModal}
        onClose={closeTrashModal}
        onProceed={handleProceedTrash}
      />
      <MoveToFolderModal
        isOpen={showMoveToFolderModal}
        onClose={closeMoveToFolderModal}
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

export default FolderCard;
