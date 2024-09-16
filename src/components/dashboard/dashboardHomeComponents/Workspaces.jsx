import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsWindowStack } from 'react-icons/bs';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';
import { IoFolderOpen } from 'react-icons/io5';

import { useDispatch } from 'react-redux';
import { setSelectedWorkspace as setReduxSelectedWorkspace } from '../../../redux/slices/workspacesSlice';
import { useAddWorkspaceMutation } from '../../../redux/api/workspaceApi';
import CustomModal from '../../customModal/CustomModal';

const Workspaces = ({ activeWorkspace, workspaces }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [isNewWorkspaceModalOpen, setIsNewWorkspaceModalOpen] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const modalRef = useRef(null);

  const dispatch = useDispatch();
  const [addWorkspace] = useAddWorkspaceMutation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
        setIsNewWorkspaceModalOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNewWorkspaceSubmit = async (e) => {
    e.preventDefault();
    if (newWorkspaceName.trim().length < 3) {
      setErrorMessage('Workspace name must be at least 3 characters long.');
      return;
    }

    try {
      await addWorkspace({ workspaceName: newWorkspaceName }).unwrap();
      setNewWorkspaceName('');
      setIsNewWorkspaceModalOpen(false);
      setErrorMessage(''); // Clear the error message after successful submission
    } catch (error) {
      console.error('Failed to add workspace:', error);
    }
  };

  const handleWorkspaceSwitch = (workspace) => {
    dispatch(setReduxSelectedWorkspace(workspace));
  };

  const truncateString = (str, num) =>
    str.length > num ? str.slice(0, num) + '...' : str;

  return (
    <div className="collection">
      <div className="workspace-header">
        <p className="collection-heading">Workspaces</p>
        <button
          className="workspace-btn"
          onClick={() => setIsNewWorkspaceModalOpen(true)}
        >
          New Workspace <AiOutlinePlus className="icon" />
        </button>
      </div>

      <div className="icons">
        {workspaces.map((workspace, index) => (
          <div key={index} className="icon-container">
            <BsWindowStack
              onClick={() => {
                setSelectedWorkspace(workspace);
                setIsModalOpen(true);
              }}
              className="collection-icon"
            />
            <span className="icon-label" title={workspace.workspaceName}>
              {truncateString(workspace.workspaceName, 8)}
            </span>
          </div>
        ))}
      </div>

      {isModalOpen && selectedWorkspace && (
        <div className="modal" ref={modalRef}>
          <div className="modal-wrapper">
            <h3 className="modal-heading">{selectedWorkspace.workspaceName}</h3>
            <button
              className="modal-closebtn"
              onClick={() => setIsModalOpen(false)}
            >
              <RxCross2 />
            </button>
          </div>
          <div className="modal-content">
            <ModalSections
              selectedWorkspace={selectedWorkspace}
              handleWorkspaceSwitch={handleWorkspaceSwitch}
            />
          </div>
        </div>
      )}

      {isNewWorkspaceModalOpen && (
        <div className="modal" ref={modalRef}>
          <div className="modal-wrapper">
            <h3 className="modal-heading">Create New Workspace</h3>
            <button
              className="modal-closebtn"
              onClick={() => setIsNewWorkspaceModalOpen(false)}
            >
              <RxCross2 />
            </button>
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              className="workspace-input"
              value={newWorkspaceName}
              onChange={(e) => {
                setNewWorkspaceName(e.target.value);
                if (e.target.value.length >= 3) {
                  setErrorMessage('');
                }
              }}
              placeholder="Enter workspace name"
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button
              onClick={handleNewWorkspaceSubmit}
              className="create-workspace-btn"
            >
              Create
            </button>
          </div>
        </div>
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
        .icon {
          font-size: 2rem;
          color:black;
        }
        .icons {
          padding: 0 3rem;
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
          display:flex;
          align-items:center;
          padding: 0.5rem;
          margin:0.5rem;
          border-radius: 50%;
        }
        .modal-content {

        }
        .section{
        margin-right:1rem;
        margin-left:1rem;
        }
        .modal-sections{
          display: flex;
          flex-direction: column;
        }
          .section-folders {
    display: flex;
    gap: 0.5rem;
    width: 30rem;
    overflow-x: auto;
    scrollbar-width:thin;
}
           .link_chat{
           display:flex;
           align-items: center;
           justify-content:center;
           gap:0.3rem;
           border:none;
           font-size:1.4rem;
           font-weight:600;
           color:#0B1444;
           border-radius:1rem;
           padding:1rem 1rem;
           background-color:#C3E11D;
           text-decoration:none;
           }
           .section-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size:1.7rem;
    font-weight: 600;
}
        .folder-wrapper {
    height: 18rem;
    margin: 1rem 0;
    overflow-y: auto;
    border: 1px solid lightgray;
    border-radius: 1rem;
    scrollbar-width:thin;

}
        .folder-icon{
        font-size: 1.2rem;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content: center;
        padding:0.5rem;
        border-radius:0.8rem;
        &:hover{
        background-color:#f1f1f1;
        cursor:pointer;

        }
        }
        .section-list-item{
        list-style:none;
        display:flex;
        align-items:center;
        gap:0.5rem;
        font-size:1.5rem;
        padding:1rem;
        border-radius:1rem;
        margin:0 0.5rem;
        &:hover{
        background-color:#f1f1f1;
        cursor:pointer;
        }
        }
        .section-list-item:first-child{
        margin-top:0.5rem;
        }
        .workspace-input {
          border: 1px solid #ccc;
          border-radius: 1rem;
          padding: 1rem;
        }
        .create-workspace-btn {
          border: none;
          font-weight: 600;
          font-size: 1.5rem;
          padding: 1rem 2rem;
          border-radius: 1rem;
          background-color: #c3e11d;
        }
        .input-wrapper {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
          .workspace-dropdown{
          position:relative;
          display: flex;
          font-size:1.3rem;
          position:absolute;
          background-color:white;
          border-radius:1rem;
          z-index:1;
          top:25%;
          left:-20%;
          box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
          }
          .workspace-dropdown ul li{
          cursor:pointer;
          padding:1rem 1rem;
          list-style:none;
          &:hover{
          background-color:#f0f0f0;
          border-radius:1rem;
          }
          }
          .workspace-rename-input{
          border:1px solid lightgray;
          padding:1rem;
          border-radius:1rem;
          width:100%;
          outline:none;
          }
          .cancel-button, 
          .save-button{
          border:none;
          font-weight:600;
          font-size:1.5rem;
          padding:1rem 2rem;
          border-radius:1rem;
          background-color: #c3e11d;
          }
          .rename-section{
          display: flex;
          // align-items: center;
          flex-direction: column;
          gap:1rem;
          }
          .workspace-rename-buttns{
          display:flex;
          // align-items: center;
          justify-content:space-between; 
          margin-bottom:1rem;
          }
          .error-message{
          color: red;
          font-size:1.1rem;
          }
      `}</style>
    </div>
  );
};

const ModalSections = ({ selectedWorkspace, handleWorkspaceSwitch }) => {
  const [workspaceDropdownOpen, setWorkspaceDropdownOpen] = useState(false);
  const [isMoveToTrashModalOpen, setMoveToTrashModalOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dropdownRef = useRef(null);

  // Set the input value to the workspace name when the modal opens
  useEffect(() => {
    if (selectedWorkspace) {
      setInputValue(selectedWorkspace.workspaceName);
    }
  }, [selectedWorkspace]);

  const handleWorkspaceDropdown = () => {
    setWorkspaceDropdownOpen(!workspaceDropdownOpen);
  };

  const handleRenameClick = () => {
    setIsRenaming(true);
    setWorkspaceDropdownOpen(false); // Close dropdown when renaming starts
  };

  const handleCancelRename = () => {
    setIsRenaming(false);
    setErrorMessage('');
    setInputValue(selectedWorkspace.workspaceName); // Reset to the current workspace name
  };

  const handleSaveRename = () => {
    if (inputValue.trim().length < 3) {
      setErrorMessage('Please enter at least 3 characters.');
    } else {
      // Save the new workspace name logic here
      setIsRenaming(false); // Close rename mode
      setErrorMessage('');
      // Update workspace name here in the main component if necessary
    }
  };

  const truncateString = (str, num) =>
    str.length > num ? str.slice(0, num) + '...' : str;

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setWorkspaceDropdownOpen(false);
    }
  };
  const handleCloseMoveToTrashModal = () => {
    setMoveToTrashModalOpen(false);
  };
  const handleProceedMoveToTrash = () => {
    setMoveToTrashModalOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <ul className="modal-sections">
      <BiDotsVerticalRounded
        size={22}
        onClick={handleWorkspaceDropdown}
        style={{ cursor: 'pointer', marginBottom: '1rem' }}
      />
      {workspaceDropdownOpen && (
        <div className="workspace-dropdown" ref={dropdownRef}>
          <ul>
            <li className="workspace-menu-item" onClick={handleRenameClick}>
              Rename
            </li>
            <li
              onClick={() => {
                setMoveToTrashModalOpen(true);
                setWorkspaceDropdownOpen(false);
              }}
            >
              Delete Permanently
            </li>
          </ul>
        </div>
      )}

      {isRenaming ? (
        <div className="rename-section">
          <input
            type="text"
            value={inputValue}
            className="workspace-rename-input"
            onChange={(e) => setInputValue(e.target.value)}
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="workspace-rename-buttns">
            <button className="cancel-button" onClick={handleCancelRename}>
              Cancel
            </button>
            <button className="save-button" onClick={handleSaveRename}>
              Save
            </button>
          </div>
        </div>
      ) : null}

      <button
        className="link_chat"
        onClick={() => handleWorkspaceSwitch(selectedWorkspace)}
      >
        Switch Workspace <AiOutlinePlus className="icon" />
      </button>

      <div className="folder-wrapper">
        {selectedWorkspace?.folders.map((folder, index) => (
          <li key={index} className="section-list-item">
            <IoFolderOpen
              className="file-icon"
              style={{ color: 'gray', fontSize: '2rem' }}
            />
            <p>{truncateString(folder.folderName, 9)}</p>
          </li>
        ))}
      </div>
      {
        <CustomModal
          isOpen={isMoveToTrashModalOpen}
          onClose={handleCloseMoveToTrashModal}
          onProceed={handleProceedMoveToTrash}
          heading="Move to trash"
          bodyContent={
            <div>
              Are you sure you want to move this file to the
              <br /> trash? It will remain there for 30 days before being
              <br />
              permanently deleted.
            </div>
          }
          cancelText="Cancel"
          proceedText="Proceed"
        />
      }
    </ul>
  );
};

ModalSections.propTypes = {
  selectedWorkspace: PropTypes.shape({
    workspaceName: PropTypes.string.isRequired,
    folders: PropTypes.arrayOf(
      PropTypes.shape({
        folderName: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  handleWorkspaceSwitch: PropTypes.func.isRequired,
};

export default Workspaces;
