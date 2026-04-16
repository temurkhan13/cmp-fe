import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { RxCross2 } from 'react-icons/rx';

const Spinner = () => (
  <span style={styles.spinner} />
);

const InputModal = ({
  isOpen,
  onConfirm,
  onCancel,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  defaultValue = '',
  placeholder = '',
}) => {
  const [value, setValue] = useState(defaultValue);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setValue(defaultValue);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isOpen, defaultValue]);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (!value.trim()) return;
    setLoading(true);
    try {
      await onConfirm(value.trim());
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading) handleConfirm();
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
        {description && <div style={styles.body}>{description}</div>}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={loading}
          style={styles.input}
        />
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
              ...(!value.trim() || loading ? styles.confirmButtonDisabled : {}),
            }}
            onClick={handleConfirm}
            disabled={!value.trim() || loading}
          >
            {loading ? <Spinner /> : confirmText}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes input-modal-spin {
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
    minWidth: '30rem',
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
    marginTop: '1.5rem',
    marginBottom: '0.5rem',
    color: '#0A0A0AAD',
  },
  input: {
    width: '100%',
    padding: '0.8rem 1rem',
    fontSize: '1.4rem',
    borderRadius: '0.8rem',
    border: '0.1rem solid #ccc',
    outline: 'none',
    marginTop: '1rem',
    marginBottom: '2rem',
    boxSizing: 'border-box',
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
    animation: 'input-modal-spin 0.6s linear infinite',
  },
  straightLine: {
    borderTop: '0.0625rem solid lightgray',
  },
};

InputModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
};

export default InputModal;
