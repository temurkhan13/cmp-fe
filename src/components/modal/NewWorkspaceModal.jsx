import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button';
import Modal from './Modal';

const NewWorkspaceModal = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName('');
      setDescription('');
      setSubmitting(false);
    }
  }, [isOpen]);

  const isValid = name.trim().length >= 3 && description.trim().length > 0;

  const handleCreate = async () => {
    if (!isValid) return;
    setSubmitting(true);
    try {
      await onSubmit(name.trim(), description.trim());
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={submitting ? () => {} : onClose}
      title="Create New Workspace"
      footer={
        <Button
          variant="primary"
          onClick={handleCreate}
          disabled={!isValid}
          loading={submitting}
        >
          Create
        </Button>
      }
    >
      <input
        type="text"
        className="workspace-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter workspace name"
        disabled={submitting}
      />
      <textarea
        className="workspace-description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter workspace description"
        disabled={submitting}
        rows={4}
      />
    </Modal>
  );
};

NewWorkspaceModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default NewWorkspaceModal;
