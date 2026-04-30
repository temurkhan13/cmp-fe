import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button';
import Modal from './Modal';

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

  const handleClose = () => {
    if (!loading) onCancel();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      footer={
        <>
          <Button variant="secondary" onClick={onCancel} disabled={loading}>
            {cancelText}
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirm}
            disabled={!value.trim()}
            loading={loading}
          >
            {confirmText}
          </Button>
        </>
      }
    >
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
    </Modal>
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
