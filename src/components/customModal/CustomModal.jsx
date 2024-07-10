import PropTypes from 'prop-types';
import { RxCross2 } from 'react-icons/rx';

const CustomModal = ({
  isOpen,
  onClose,
  onProceed,
  heading,
  bodyContent,
  cancelText,
  proceedText,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <p style={styles.heading}>{heading}</p>
          <button style={styles.closeButton} onClick={onClose}>
            <RxCross2 style={styles.crossIcon} />
          </button>
        </div>
        <hr style={styles.straightLine} />
        <div style={styles.body}>{bodyContent}</div>
        <div style={styles.actions}>
          <button
            style={{ ...styles.button, ...styles.cancelButton }}
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            style={{ ...styles.button, ...styles.proceedButton }}
            onClick={onProceed}
          >
            {proceedText}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    padding: '2rem 2rem 2rem 2rem',
    boxShadow: '0 0.125rem 0.625rem rgba(0, 0, 0, 0.1)',
  },
  header: {
    fontSize: '1.125rem',
    marginBottom: '0.625rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    color: 'black',
    fontSize: '2rem',
    fontWeight: '600',
  },
  body: {
    fontSize: '1.5rem',
    marginTop: '2rem',
    marginBottom: '2rem',
    textAlign: 'center',
    color: '#0A0A0AAD',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    padding: '0.8rem 1.5rem',
    width: '48%',
    fontSize: '1.5rem',
    borderRadius: '1rem',
    cursor: 'pointer',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.2rem',
  },
  crossIcon: {
    fontSize: '2rem',
    color: 'rgba(0, 0, 0, 0.6)',
    backgroundColor: 'lightgray',
    borderRadius: '50%',
    padding: '0.2rem',
    marginLeft: '0.3125rem',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    border: '0.1rem solid #0B1444',
    color: '#0B1444',
    fontWeight: '500',
    outline: 'none',
  },
  proceedButton: {
    backgroundColor: '#C3E11D',
    color: '#0B1444',
    fontWeight: '500',
    border: 'none',
    outline: 'none',
  },
  straightLine: {
    borderTop: '0.0625rem solid lightgray',
  },
};

CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onProceed: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
  bodyContent: PropTypes.node.isRequired,
  cancelText: PropTypes.string.isRequired,
  proceedText: PropTypes.string.isRequired,
};

export default CustomModal;
