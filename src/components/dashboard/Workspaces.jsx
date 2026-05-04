import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsWindowStack } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { setSelectedWorkspace as setReduxSelectedWorkspace } from '../../redux/slices/workspacesSlice';
import {
  useAddWorkspaceMutation,
  useMoveToTrashMutation,
  useUpdateWorkspaceMutation,
} from '../../redux/api/workspaceApi';
import { IconCard, Button, NotificationBar } from '../common';
import { InputModal, ConfirmModal, NewWorkspaceModal } from '../modal';

const Workspaces = ({
  activeWorkspace,
  workspaces,
  onWorkspaceUpdated,
  onWorkspaceChange,
}) => {
  const [isNewWorkspaceModalOpen, setIsNewWorkspaceModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [renameModal, setRenameModal] = useState({ open: false, workspace: null });
  const [trashConfirm, setTrashConfirm] = useState({ open: false, id: null });

  const dispatch = useDispatch();
  const [addWorkspace] = useAddWorkspaceMutation();
  const [moveToTrash] = useMoveToTrashMutation();
  const [updateWorkspaceMutation] = useUpdateWorkspaceMutation();

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessNotification(true);
  };

  const showError = (message) => {
    setErrorMessage(message);
    setShowNotification(true);
  };

  const handleCreateWorkspace = async (name, description) => {
    try {
      await addWorkspace({
        workspaceName: name,
        workspaceDescription: description,
      }).unwrap();
      setIsNewWorkspaceModalOpen(false);
      onWorkspaceUpdated();
      showSuccess('Workspace created successfully!');
    } catch (err) {
      console.error(err);
      showError('Failed to create workspace.');
    }
  };

  const handleWorkspaceSwitch = (workspace) => {
    dispatch(setReduxSelectedWorkspace(workspace));
    onWorkspaceChange(workspace);
  };

  const handleRenameWorkspace = (workspace) => {
    if (workspace.workspaceName === 'Default Workspace') {
      showError('Default workspace cannot be renamed.');
      return;
    }
    setRenameModal({ open: true, workspace });
  };

  const handleDeleteWorkspace = (workspace) => {
    if (workspace.workspaceName === 'Default Workspace') {
      showError('Default workspace cannot be moved to trash.');
      return;
    }
    setTrashConfirm({ open: true, id: workspace.id });
  };

  const handleRenameConfirm = async (newName) => {
    if (newName.length < 3) {
      showError('Workspace name must be at least 3 characters.');
      return;
    }
    try {
      await updateWorkspaceMutation({
        workspaceId: renameModal.workspace.id,
        workspaceName: newName,
      }).unwrap();
      onWorkspaceUpdated();
      showSuccess('Workspace renamed successfully!');
      setRenameModal({ open: false, workspace: null });
    } catch (err) {
      console.error(err);
      showError('Failed to rename workspace.');
    }
  };

  const handleMoveToTrash = async (workspaceId) => {
    try {
      await moveToTrash({
        entityType: 'workspace',
        id: workspaceId,
      }).unwrap();
      onWorkspaceUpdated();
      showSuccess('Workspace moved to trash successfully!');
    } catch (err) {
      console.error(err);
      showError('Failed to move workspace to trash.');
    }
  };

  return (
    <div className="collection">
      <div className="container-heading">
        <div className="left-buttons">
          <p className="assistant-heading">
            <BsWindowStack size={30} />
            Workspaces
          </p>
        </div>
        <Button
          variant="primary"
          className="workspace-btn"
          iconRight={<AiOutlinePlus />}
          onClick={() => setIsNewWorkspaceModalOpen(true)}
        >
          New Workspace
        </Button>
      </div>

      <div className="icons">
        {workspaces?.map((workspace, index) => (
          <IconCard
            key={workspace.id || index}
            icon={
              <BsWindowStack
                onClick={() => handleWorkspaceSwitch(workspace)}
                className={`${activeWorkspace?.id === workspace.id ? 'active' : ''}`}
              />
            }
            label={workspace.workspaceName}
            truncateAt={10}
            hoverFadeKebab
            menuItems={[
              {
                key: 'rename',
                label: 'Rename',
                onClick: () => handleRenameWorkspace(workspace),
              },
              {
                key: 'delete',
                label: 'Delete',
                variant: 'danger',
                onClick: () => handleDeleteWorkspace(workspace),
              },
            ]}
          />
        ))}

        {workspaces?.length <= 0 && (
          <div className="no-projects">
            <p>No Workspace available.</p>
          </div>
        )}
      </div>

      <NewWorkspaceModal
        isOpen={isNewWorkspaceModalOpen}
        onClose={() => setIsNewWorkspaceModalOpen(false)}
        onSubmit={handleCreateWorkspace}
      />

      {showNotification && (
        <NotificationBar
          message={errorMessage}
          type="error"
          duration={5000}
          onClose={() => setShowNotification(false)}
        />
      )}
      {showSuccessNotification && (
        <NotificationBar
          message={successMessage}
          type="success"
          duration={5000}
          onClose={() => setShowSuccessNotification(false)}
        />
      )}

      <InputModal
        isOpen={renameModal.open}
        title="Rename Workspace"
        confirmText="Rename"
        cancelText="Cancel"
        defaultValue={renameModal.workspace?.workspaceName || ''}
        placeholder="Enter workspace name"
        onConfirm={handleRenameConfirm}
        onCancel={() => setRenameModal({ open: false, workspace: null })}
      />

      <ConfirmModal
        isOpen={trashConfirm.open}
        title="Move to Trash"
        description="This workspace will be moved to trash. You can restore it from the Trash page."
        confirmText="Move to Trash"
        cancelText="Cancel"
        onConfirm={async () => {
          await handleMoveToTrash(trashConfirm.id);
          setTrashConfirm({ open: false, id: null });
        }}
        onCancel={() => setTrashConfirm({ open: false, id: null })}
      />

    </div>
  );
};

export default Workspaces;
