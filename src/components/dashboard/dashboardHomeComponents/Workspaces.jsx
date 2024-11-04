import { useState, useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsWindowStack } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch } from 'react-redux';
import { setSelectedWorkspace as setReduxSelectedWorkspace } from '../../../redux/slices/workspacesSlice';
import { useAddWorkspaceMutation, useMoveToTrashMutation } from '../../../redux/api/workspaceApi';
import NotificationBar from '../../common/NotificationBar';
import { updateWorkspace } from '../../../redux/slices/workspaceSlice.js';
import { FaFolderTree } from 'react-icons/fa6';

const Workspaces = ({ activeWorkspace, workspaces, onWorkspaceUpdated, onWorkspaceChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [isNewWorkspaceModalOpen, setIsNewWorkspaceModalOpen] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [newWorkspaceDescription, setNewWorkspaceDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false); // For NotificationBar
  const modalRef = useRef(null);

  const dispatch = useDispatch();
  const [addWorkspace] = useAddWorkspaceMutation();
  const [moveToTrash] = useMoveToTrashMutation();

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
        setIsNewWorkspaceModalOpen(false);
      }
    };
    setSelectedWorkspace(activeWorkspace)
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
      showError('Workspace name must be at least 3 characters long.');
      return;
    }
    if (newWorkspaceDescription.trim() === '') {
      showError('Workspace description cannot be empty.');
      return;
    }

    try {
      await addWorkspace({
        workspaceName: newWorkspaceName,
        workspaceDescription: newWorkspaceDescription,
      }).unwrap();

      // Clear inputs and close modal
      setNewWorkspaceName('');
      setNewWorkspaceDescription('');
      setIsNewWorkspaceModalOpen(false);
      onWorkspaceUpdated();
    } catch (error) {
      showError('Failed to add workspace.');
    }
  };

  const handleWorkspaceSwitch = (workspace) => {
    dispatch(setReduxSelectedWorkspace(workspace));
    setIsModalOpen(false);
    onWorkspaceChange(workspace);
  };

  const truncateString = (str, num) => (str.length > num ? str.slice(0, num) + '...' : str);

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
              <BsWindowStack size={30}/>
                Workspaces
            </p>
          </div>
          <button className="workspace-btn" onClick={() => setIsNewWorkspaceModalOpen(true)}>
            New Workspace <AiOutlinePlus className="icon" />
          </button>
        </div>
      {/*</div>*/}

      <div className="icons">
        {workspaces?.map((workspace, index) => (
          <div key={index} className="icon-container">
            <BsWindowStack
              onClick={() => {
                setSelectedWorkspace(workspace);
                setIsModalOpen(true);
              }}
              style={activeWorkspace?.id === workspace.id ? { color: 'black' } : { color: 'grey' }}
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
        <div className="modal" ref={modalRef}>
          <div className="modal-wrapper">
            <h3 className="modal-heading">{selectedWorkspace.workspaceName}</h3>
            <button className="modal-closebtn" onClick={() => setIsModalOpen(false)}>
              <RxCross2 />
            </button>
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
      )}

      {isNewWorkspaceModalOpen && (
        <div className="modal" ref={modalRef}>
          <div className="modal-wrapper">
            <h3 className="modal-heading">Create New Workspace</h3>
            <button className="modal-closebtn" onClick={() => setIsNewWorkspaceModalOpen(false)}>
              <RxCross2 />
            </button>
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
            <button onClick={handleNewWorkspaceSubmit} className="create-workspace-btn">
              Create
            </button>
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

      <style>{`
        .collection-heading {
          font-size: 2.5rem;
          font-weight: 500;
        }
        .workspace-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 2rem;
          border-radius: 1.5rem;
          margin: 1rem 2rem;
          border: 1px solid lightgray;
        }
        .workspace-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border: none;
          border-radius: 1rem;
          font-size: 1.5rem;
          font-weight: 600;
          padding: 1rem 2rem;
          background-color: #c3e11d;
        }
        .icons {
          padding: 5px 3rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.3rem;
          color: gray;
          font-size: 6rem;
        }
        .icon-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
        }
        .collection-icon {
          cursor: pointer;
          transition: all 0.2s linear;
        }
        .collection-icon:hover {
          transform: scaleY(1.05);
          color: #000;
        }
        .icon-label {
          font-size: 1.3rem;
        }
        .modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          padding: 20px;
          box-shadow: 0 0 24px rgba(0, 0, 0, 0.5);
          border-radius: 1rem;
          width: 400px;
          z-index: 999;
        }
        .modal-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: 1rem;
        }
        .modal-heading {
          font-size: 2rem;
          padding-bottom: 1rem;
        }
        .modal-closebtn {
          border: none;
          background-color: lightgray;
          font-size: 2rem;
          display: flex;
          align-items: center;
          padding: 0.5rem;
          margin: 0.5rem;
          border-radius: 50%;
        }
        .input-wrapper {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .workspace-input,
        .workspace-description {
          border: 1px solid #ccc;
          width: 100%;
          border-radius: 1rem;
          padding: 1rem;
          font-size: 1.5rem;
        }
        .create-workspace-btn {
          border: none;
          font-weight: 600;
          font-size: 1.5rem;
          padding: 1rem 2rem;
          border-radius: 1rem;
          background-color: #c3e11d;
        }
      `}</style>
    </div>
  );
};

const ModalSections = ({ selectedWorkspace, handleWorkspaceSwitch, moveToTrash, setIsModalOpen, showError, onWorkspaceUpdated }) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [inputValue, setInputValue] = useState(selectedWorkspace.workspaceName);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSaveRename = async () => {
    if (inputValue.trim().length < 3) {
      showError('Please enter at least 3 characters.');
      return;
    }
    try {
      // Trigger the update workspace mutation
      await updateWorkspace({ id: selectedWorkspace.id, workspaceName: inputValue }).unwrap();
      setIsRenaming(false); // Close renaming state
    } catch (error) {
      showError('Failed to rename workspace.');
    }
  };

  const handleMoveToTrash = async () => {
    try {
      await moveToTrash({ entityType: 'workspace', id: selectedWorkspace.id }).unwrap();
      setIsModalOpen(false); // Close the modal after deletion
      onWorkspaceUpdated()
    } catch (error) {
      showError('Error moving workspace to trash.');
    }
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
            <button className="cancel-button" onClick={() => setIsRenaming(false)}>
              Cancel
            </button>
            <button className="save-button" onClick={handleSaveRename}>
              Save
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="modal-buttons link_chat" onClick={() => handleWorkspaceSwitch(selectedWorkspace)}>
            Switch Workspace
          </button>
          <button className="modal-buttons delete-button" onClick={handleMoveToTrash}>
            Move to Trash
          </button>
        </div>
      )}

      <style>{`
        .rename-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .workspace-rename-input {
          border: 1px solid lightgray;
          padding: 1rem;
          border-radius: 1rem;
          width: 100%;
        }
        .workspace-rename-buttons {
          display: flex;
          justify-content: space-between;
        }
        .cancel-button,
        .save-button {
          border: none;
          font-weight: 600;
          font-size: 1.5rem;
          padding: 1rem 2rem;
          border-radius: 1rem;
          background-color: #c3e11d;
        }
        .modal-buttons{
         margin-top: 1rem;
          border: none;
          font-weight: 600;
          font-size: 1.2rem;
          padding: 1rem 2rem;
          border-radius: 1rem;
        }
        .link_chat
        {
          background-color: #c3e11d;
        }
        .delete-button {
        background-color:red;
        color:white;
        }
      `}</style>
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
