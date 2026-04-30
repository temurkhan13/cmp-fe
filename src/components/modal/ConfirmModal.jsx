import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button';
import Modal from './Modal';

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

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) onCancel();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      width={'500px'}
      footer={
        <>
          <Button variant="secondary" onClick={onCancel} disabled={loading}>
            {cancelText}
          </Button>
          <Button variant="primary" onClick={handleConfirm} loading={loading}>
            {confirmText}
          </Button>
        </>
      }
    >
      {description}
    </Modal>
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
