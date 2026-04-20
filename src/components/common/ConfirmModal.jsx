import { useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { RxCross2 } from 'react-icons/rx';
import './common.scss';

const Spinner = () => (
  <span className="confirm-modal-spinner" />
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
    <div className="confirm-modal-overlay" onClick={loading ? undefined : onCancel}>
      <div className="confirm-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-modal-header">
          <p className="confirm-modal-heading">{title}</p>
          <button className="confirm-modal-close-button" onClick={onCancel} disabled={loading}>
            <RxCross2 className="confirm-modal-cross-icon" />
          </button>
        </div>
        <hr className="confirm-modal-straight-line" />
        <div className="confirm-modal-body">{description}</div>
        <div className="confirm-modal-actions">
          <button
            className="confirm-modal-btn confirm-modal-cancel-btn"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </button>
          <button
            className={`confirm-modal-btn confirm-modal-confirm-btn ${loading ? 'confirm-modal-confirm-btn--disabled' : ''}`}
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? <Spinner /> : confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
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
