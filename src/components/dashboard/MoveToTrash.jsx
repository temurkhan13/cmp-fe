import { FaTimes, FaSearch, FaArrowRight } from 'react-icons/fa';
import assets from '../../assets';
import { FiPlus } from 'react-icons/fi';

const MoveToTrash = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.modalBackdrop}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalHeading}>Move to folder</h2>
          <FaTimes style={styles.closeIcon} onClick={onClose} />
        </div>
        <hr />
        <div style={styles.searchBar}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search..."
            style={styles.searchInput}
          />
        </div>
        <hr />
        <h3 style={{ ...styles.suggestedHeading, textAlign: 'left' }}>
          Suggested
        </h3>
        <div style={styles.suggestedItems}>
          {/* Suggested item */}
          <div style={styles.suggestedItem}>
            <FaArrowRight style={styles.arrowIcon} />
            <div style={styles.suggestContainer}>
              <img
                src={assets.dashboard.FolderIcon}
                alt="Folder Icon"
                style={styles.folderIcon}
              />
              <p>Testing Folders II</p>
            </div>
          </div>
          <div style={styles.suggestedItem}>
            <FaArrowRight style={styles.arrowIcon} />
            <div style={styles.suggestContainer}>
              <img
                src={assets.dashboard.FolderIcon}
                alt="Folder Icon"
                style={styles.folderIcon}
              />
              <p>Testing Folders II</p>
            </div>
          </div>
          <div style={styles.suggestedItem}>
            <FaArrowRight style={styles.arrowIcon} />
            <div style={styles.suggestContainer}>
              <img
                src={assets.dashboard.FolderIcon}
                alt="Folder Icon"
                style={styles.folderIcon}
              />
              <p>Testing Folders II</p>
            </div>
          </div>
          <div style={styles.suggestedItem}>
            <FaArrowRight style={styles.arrowIcon} />
            <div style={styles.suggestContainer}>
              <img
                src={assets.dashboard.FolderIcon}
                alt="Folder Icon"
                style={styles.folderIcon}
              />
              <p>Testing Folders II</p>
            </div>
          </div>
          {/* Add more suggested items as needed */}
        </div>
        <hr />
        <div style={styles.newFolderWrapper}>
          <button style={styles.newFolderButton}>
            <FiPlus style={styles.plusIcon} /> New Folder
          </button>
        </div>
        <hr />
        <div style={styles.modalButtons}>
          <button
            style={{ ...styles.button, ...styles.cancelButton }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            style={{ ...styles.button, ...styles.moveButton }}
            onClick={() => {
              /* Handle move action */
            }}
          >
            Move
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  suggestContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  modalBackdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    width: '350px',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    padding: '10px',
  },
  modalHeading: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: 0,
  },
  closeIcon: {
    cursor: 'pointer',
    color: 'rgba(10, 10, 10, 0.6)',
    fontSize: '20px',
  },
  searchBar: {
    border: '2px solid rgba(10, 10, 10, 0.2)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    margin: '10px',
    padding: '5px',
  },
  searchIcon: {
    margin: '5px',
    color: 'rgba(10, 10, 10, 0.6)',
    fontSize: '20px', // Increased size
  },
  searchInput: {
    flex: 1,
    borderRadius: '5px',
    padding: '8px',
    fontSize: '14px',
    outline: 'none',
    border: 'none',
  },
  suggestedHeading: {
    fontSize: '16px',
    margin: '10px 0',
    padding: '10px 20px',
  },
  suggestedItems: {
    marginBottom: '10px',
    padding: '10px 20px',
  },
  suggestedItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
  },
  arrowIcon: {
    marginRight: '10px',
    color: 'rgba(10, 10, 10, 0.6)',
  },
  folderIcon: {
    marginRight: '10px',
    height: '20px', // Decreased height
  },
  newFolderWrapper: {
    padding: '10px',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  newFolderButton: {
    border: 'none',
    backgroundColor: 'white',
    color: 'rgba(0, 102, 255, 1)',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color 0.3s',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '14px',
  },
  plusIcon: {
    marginRight: '8px',
    color: 'rgba(0, 102, 255, 1)',
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
    padding: '20px',
  },
  button: {
    flex: '1 0 50%',
    maxWidth: '50%',
    padding: '10px 0',
    borderRadius: '5px',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    transition: 'background-color 0.3s',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '14px',
  },
  cancelButton: {
    backgroundColor: 'white',
    border: '1px solid black',
    color: 'black',
    marginRight: '5px',
  },
  moveButton: {
    backgroundColor: 'rgba(195, 225, 29, 1)',
    color: 'white',
    marginLeft: '5px',
  },
};

export default MoveToTrash;
