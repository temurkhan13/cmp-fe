import { useState, useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
import { AiOutlinePlus } from 'react-icons/ai';
import {
  BsThreeDots,
  BsThreeDotsVertical,
  BsWindowStack,
} from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch } from 'react-redux';
import { setSelectedWorkspace as setReduxSelectedWorkspace } from '../../../redux/slices/workspacesSlice';
import {
  useAddWorkspaceMutation,
  useMoveToTrashMutation,
  useUpdateWorkspaceMutation,
} from '../../../redux/api/workspaceApi';
import NotificationBar from '../../common/NotificationBar';
import { FaFolderTree } from 'react-icons/fa6';
import InputModal from '../../common/InputModal';
import ConfirmModal from '../../common/ConfirmModal';
import Button from '../../common/Button';

const Workspaces = ({
  activeWorkspace,
  workspaces,
  onWorkspaceUpdated,
  onWorkspaceChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [isNewWorkspaceModalOpen, setIsNewWorkspaceModalOpen] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [newWorkspaceDescription, setNewWorkspaceDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false); // For NotificationBar
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const modalRef = useRef(null);
  const [openDropdown, setOpenDropdown] = useState(null); // State to toggle dropdown visibility
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
  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
        setIsNewWorkspaceModalOpen(false);
      }
    };
    setSelectedWorkspace(activeWorkspace);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const showError = (message) => {
    setErrorMessage(message);
    setShowNotification(true);
  };

  const handleNewWorkspaceSubmit = async (e) => {
    e.preventDefault();
    if (newWorkspaceName.trim().length < 3) {
      return;
    }
    if (newWorkspaceDescription.trim() === '') {
      return;
    }

    try {
      await addWorkspace({
        workspaceName: newWorkspaceName,
        workspaceDescription: newWorkspaceDescription,
      }).unwrap();

      setNewWorkspaceName('');
      setNewWorkspaceDescription('');
      setIsNewWorkspaceModalOpen(false);
      onWorkspaceUpdated();

      // Show success message
      showSuccess('Workspace created successfully!');
    } catch (error) { if (import.meta.env.DEV) console.error(error); }
  };

  const handleWorkspaceSwitch = (workspace) => {
    dispatch(setReduxSelectedWorkspace(workspace));
    setIsModalOpen(false);
    onWorkspaceChange(workspace);
  };

  const truncateString = (str, num) =>
    str.length > num ? str.slice(0, num) + '...' : str;

  const handleRenameWorkspace = (workspace) => {
    if (workspace.workspaceName === 'Default Workspace') {
      showError('Default workspace cannot be renamed.');
      return;
    }
    setRenameModal({ open: true, workspace });
    setOpenDropdown(null);
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
    } catch (error) {
      if (import.meta.env.DEV) console.error(error);
      showError('Failed to rename workspace.');
    }
  };

  const handleMoveToTrash = async (workspaceId) => {
    try {
      await moveToTrash({
        entityType: 'workspace',
        id: workspaceId,
      }).unwrap();
      setOpenDropdown(false);
      onWorkspaceUpdated();
      showSuccess('Workspace moved to trash successfully!');
    } catch (error) { if (import.meta.env.DEV) console.error(error); }
  };
  const toggleDropdown = (index) => {
    setOpenDropdown((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="collection">
      {/*<div className="workspace-header">*/}
      {/*  <p className="collection-heading">Workspaces</p>*/}
      {/*  <button className="workspace-btn" onClick={() => setIsNewWorkspaceModalOpen(true)}>*/}
      {/*    New Workspace <AiOutlinePlus className="icon" />*/}
      {/*  </button>*/}

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
      {/*</div>*/}

      <div className="icons">
        {workspaces?.map((workspace, index) => (
          <div key={workspace.id || index} className="icon-container">
            <BsThreeDotsVertical
              size={18}
              className="three-dots-vertical cursor-pointer"
              onClick={() => toggleDropdown(index)}
            />
            {openDropdown === index && (
              <div className="dropdown-menuu">
                <div
                  className="dropdown-itemm"
                  onClick={(e) => { e.stopPropagation(); handleRenameWorkspace(workspace); }}
                >
                  Rename
                </div>
                <div
                  className="dropdown-itemm deletee"
                  onClick={() => { setOpenDropdown(null); setTrashConfirm({ open: true, id: workspace.id }); }}
                >
                  Delete
                </div>
              </div>
            )}
            <BsWindowStack
              onClick={() => handleWorkspaceSwitch(workspace)}
              style={
                activeWorkspace?.id === workspace.id
                  ? { color: 'black', width: '5rem', height: '5rem', marginBottom: '0.5rem' }
                  : { color: 'grey', width: '5rem', height: '5rem', marginBottom: '0.5rem' }
              }
              className="collection-icon"
            />
            <span className="icon-label" title={workspace.workspaceName}>
              {truncateString(workspace.workspaceName, 8)}
            </span>
          </div>
        ))}

        {workspaces?.length <= 0 && (
          <div className="no-projects">
            <p>No Workspace available.</p>
          </div>
        )}
      </div>

      {isModalOpen && selectedWorkspace && (
        <div className="workspace-modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
            <div className="modal-wrapper">
              <h3 className="modal-heading">{selectedWorkspace.workspaceName}</h3>
              <Button
                variant="icon"
                ariaLabel="Close"
                className="modal-closebtn"
                onClick={() => setIsModalOpen(false)}
              >
                <RxCross2 />
              </Button>
            </div>
            <div className="modal-content">
              <ModalSections
                selectedWorkspace={selectedWorkspace}
                handleWorkspaceSwitch={handleWorkspaceSwitch}
                moveToTrash={moveToTrash}
                setIsModalOpen={setIsModalOpen}
                showError={showError} // Pass error handler to modal
                onWorkspaceUpdated={onWorkspaceUpdated}
              />
            </div>
          </div>
        </div>
      )}

      {isNewWorkspaceModalOpen && (
        <div className="workspace-modal-backdrop" onClick={() => setIsNewWorkspaceModalOpen(false)}>
          <div className="modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
            <div className="modal-wrapper">
              <h3 className="modal-heading">Create New Workspace</h3>
              <Button
                variant="icon"
                ariaLabel="Close"
                className="modal-closebtn"
                onClick={() => setIsNewWorkspaceModalOpen(false)}
              >
                <RxCross2 />
              </Button>
            </div>
            <div className="input-wrapper">
              <input
                type="text"
                className="workspace-input"
                value={newWorkspaceName}
                onChange={(e) => setNewWorkspaceName(e.target.value)}
                placeholder="Enter workspace name"
              />
              <textarea
                className="workspace-description"
                value={newWorkspaceDescription}
                onChange={(e) => setNewWorkspaceDescription(e.target.value)}
                placeholder="Enter workspace description"
              />
              <Button
                variant="primary"
                className="create-workspace-btn"
                onClick={handleNewWorkspaceSubmit}
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      )}

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

const ModalSections = ({
  selectedWorkspace,
  handleWorkspaceSwitch,
  moveToTrash,
  setIsModalOpen,
  showError,
  onWorkspaceUpdated,
}) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [inputValue, setInputValue] = useState(selectedWorkspace.workspaceName);
  const [errorMessage, setErrorMessage] = useState('');
  const [updateWorkspace] = useUpdateWorkspaceMutation();

  const handleSaveRename = async () => {
    if (inputValue.trim().length < 3) {
      return;
    }
    try {
      await updateWorkspace({
        workspaceId: selectedWorkspace.id,
        workspaceName: inputValue,
      }).unwrap();
      setIsRenaming(false);
      showSuccess('Workspace renamed successfully!'); // Show success message
    } catch (error) { if (import.meta.env.DEV) console.error(error); }
  };

  const handleMoveToTrash = async () => {
    try {
      await moveToTrash({
        entityType: 'workspace',
        id: selectedWorkspace.id,
      }).unwrap();
      setIsModalOpen(false);
      onWorkspaceUpdated();
      showSuccess('Workspace moved to trash successfully!'); // Show success message
    } catch (error) { if (import.meta.env.DEV) console.error(error); }
  };

  return (
    <div>
      {isRenaming ? (
        <div className="rename-section">
          <input
            type="text"
            value={inputValue}
            className="workspace-rename-input"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="workspace-rename-buttons">
            <Button
              variant="secondary"
              className="cancel-button"
              onClick={() => setIsRenaming(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              className="save-button"
              onClick={handleSaveRename}
            >
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="confirm-modal-actions">
          <Button
            variant="primary"
            className="modal-buttons link_chat"
            onClick={() => handleWorkspaceSwitch(selectedWorkspace)}
          >
            Switch Workspace
          </Button>
          <Button
            variant="destructive"
            className="modal-buttons delete-button"
            onClick={handleMoveToTrash}
          >
            Move to Trash
          </Button>
        </div>
      )}

    </div>
  );
};

// ModalSections.propTypes = {
//   selectedWorkspace: PropTypes.object.isRequired,
//   handleWorkspaceSwitch: PropTypes.func.isRequired,
//   moveToTrash: PropTypes.func.isRequired,
//   setIsModalOpen: PropTypes.func.isRequired,
//   onWorkspaceUpdated: PropTypes.func.isRequired,
//   showError: PropTypes.func.isRequired, // New error handler prop
// };
//
// Workspaces.propTypes = {
//   activeWorkspace: PropTypes.object,
//   workspaces: PropTypes.array.isRequired,
//   onWorkspaceUpdated: PropTypes.func.isRequired,
//   onWorkspaceChange: PropTypes.func.isRequired,
// };

export default Workspaces;
