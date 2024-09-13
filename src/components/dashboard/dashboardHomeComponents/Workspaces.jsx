import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsWindowStack } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { IoFolderOpen } from 'react-icons/io5';

import { useDispatch } from 'react-redux';
import { setSelectedWorkspace as setReduxSelectedWorkspace } from '../../../redux/slices/workspacesSlice';
import { useAddWorkspaceMutation } from '../../../redux/api/workspaceApi';

const Workspaces = ({ activeWorkspace, workspaces }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [isNewWorkspaceModalOpen, setIsNewWorkspaceModalOpen] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
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
    try {
      await addWorkspace({ workspaceName: newWorkspaceName }).unwrap();
      setNewWorkspaceName('');
      setIsNewWorkspaceModalOpen(false);
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
              onChange={(e) => setNewWorkspaceName(e.target.value)}
              placeholder="Enter workspace name"
            />
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
      `}</style>
    </div>
  );
};

const ModalSections = ({ selectedWorkspace, handleWorkspaceSwitch }) => {
  const truncateString = (str, num) =>
    str.length > num ? str.slice(0, num) + '...' : str;

  return (
    <ul className="modal-sections">
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
