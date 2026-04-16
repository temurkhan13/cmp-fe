import { useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { RxCross2 } from 'react-icons/rx';

const Spinner = () => (
  <span style={styles.spinner} />
);

const ConfirmModal = ({
  isOpen,
  onConfirm,
  onCancel,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div style={styles.overlay} onClick={loading ? undefined : onCancel}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <p style={styles.heading}>{title}</p>
          <button style={styles.closeButton} onClick={onCancel} disabled={loading}>
            <RxCross2 style={styles.crossIcon} />
          </button>
        </div>
        <hr style={styles.straightLine} />
        <div style={styles.body}>{description}</div>
        <div style={styles.actions}>
          <button
            style={{ ...styles.button, ...styles.cancelButton }}
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </button>
          <button
            style={{
              ...styles.button,
              ...styles.confirmButton,
              ...(loading ? styles.confirmButtonDisabled : {}),
            }}
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? <Spinner /> : confirmText}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes confirm-modal-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>,
    document.body
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
    backdropFilter: 'blur(4px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    padding: '2rem',
    boxShadow: '0 0.125rem 0.3rem rgba(0, 0, 0, 0.1)',
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
  confirmButton: {
    backgroundColor: '#C3E11D',
    color: '#0B1444',
    fontWeight: '500',
    border: 'none',
    outline: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonDisabled: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
  spinner: {
    display: 'inline-block',
    width: '1.4rem',
    height: '1.4rem',
    border: '0.2rem solid #0B1444',
    borderTopColor: 'transparent',
    borderRadius: '50%',
    animation: 'confirm-modal-spin 0.6s linear infinite',
  },
  straightLine: {
    borderTop: '0.0625rem solid lightgray',
  },
};

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
};

export default ConfirmModal;
