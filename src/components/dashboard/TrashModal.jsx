import { FaTimes } from 'react-icons/fa'; // Import the close icon from react-icons/fa

const TrashModal = ({ isOpen, onClose, onProceed }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.modalBackdrop}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalHeading}>Move to trash</h2>
          <FaTimes style={styles.closeIcon} onClick={onClose} />
        </div>
        <hr />
        <p style={styles.modalSubheading}>
          Are you sure you want to move this file to the trash? It will remain
          there for 30 days before being permanently deleted.
        </p>
        <hr />
        <div style={styles.modalButtons}>
          <button style={{ ...styles.button, ...styles.cancelButton }} onClick={onClose}>
            Cancel
          </button>
          <button style={{ ...styles.button, ...styles.proceedButton }} onClick={onProceed}>
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
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
    width: '400px',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    padding: '5px 10px',
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
  modalSubheading: {
    fontSize: '14px',
    marginBottom: '20px',
    marginTop: '20px',
    padding: '10px 20px',
    color: 'rgba(10, 10, 10, 0.8)',
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'center',
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
  proceedButton: {
    backgroundColor: 'rgba(195, 225, 29, 1)',
    color: 'white',
    marginLeft: '5px',
  },
};

export default TrashModal;
