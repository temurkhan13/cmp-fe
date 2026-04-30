import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { RxCross2 } from 'react-icons/rx';
import Button from '../common/Button';
import '../common/common.scss';

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
          <Button
            variant="icon"
            ariaLabel="Close"
            onClick={onCancel}
            disabled={loading}
          >
            <RxCross2 className="confirm-modal-cross-icon" />
          </Button>
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
          <Button
            variant="secondary"
            className="confirm-modal-btn"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            variant="primary"
            className="confirm-modal-btn"
            onClick={handleConfirm}
            disabled={!value.trim()}
            loading={loading}
          >
            {confirmText}
          </Button>
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
