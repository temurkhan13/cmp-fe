import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { RxCross2 } from 'react-icons/rx';
import './common.scss';

const Spinner = () => (
  <span className="input-modal-spinner" />
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
    <div className="confirm-modal-overlay" onClick={loading ? undefined : onCancel}>
      <div className="input-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-modal-header">
          <p className="confirm-modal-heading">{title}</p>
          <button className="confirm-modal-close-button" onClick={onCancel} disabled={loading}>
            <RxCross2 className="confirm-modal-cross-icon" />
          </button>
        </div>
        <hr className="confirm-modal-straight-line" />
        {description && <div className="input-modal-body">{description}</div>}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={loading}
          className="input-modal-input"
        />
        <div className="confirm-modal-actions">
          <button
            className="confirm-modal-btn confirm-modal-cancel-btn"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </button>
          <button
            className={`confirm-modal-btn confirm-modal-confirm-btn ${!value.trim() || loading ? 'confirm-modal-confirm-btn--disabled' : ''}`}
            onClick={handleConfirm}
            disabled={!value.trim() || loading}
          >
            {loading ? <Spinner /> : confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
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
