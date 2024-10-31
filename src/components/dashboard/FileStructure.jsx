import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { BiSolidFolderOpen } from 'react-icons/bi';
import { FiPlus, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import {
  setSelectedFolder as setSelectedReduxFolder,
} from '../../redux/slices/workspacesSlice';
import CustomModal from '../customModal/CustomModal';
import { truncateText } from '../../utils/helperFunction';
import {
  useMoveToTrashMutation,
  useGetWorkspacesQuery
} from '../../redux/api/workspaceApi';
import NotificationBar from '../common/NotificationBar.jsx';
import { RxCross2 } from 'react-icons/rx';
import { selectSelectedFolder } from '../../redux/slices/folderSlice.js';
import { useSelector } from 'react-redux';

const FileStructure = ({ workspace, onFolderSelect, onFolderUpdate }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [isTrashModalOpen, setIsTrashModalOpen] = useState(false);
  const [error, setError] = useState(null); // For displaying error notifications
  const [moveToTrash] = useMoveToTrashMutation();
  const { refetch } = useGetWorkspacesQuery(workspace.id);
  const folderId =  useSelector(selectSelectedFolder);

  const modalRef = useRef(null);

  const openModal = (folder) => {
    setSelectedFolder(folder);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFolder(null);
  };

  const handleProceedMoveToTrash = async () => {
    try {
      await moveToTrash({ entityType: 'folder', id: selectedFolder.id }).unwrap();
      refetch(); // Refetch the workspace data
      onFolderUpdate();
    } catch (error) {
      setError('Error moving to trash');
    }
    setIsModalOpen(false);
    setIsTrashModalOpen(false);
  };

  const handleOpenFolder = () => {
    dispatch(setSelectedReduxFolder(selectedFolder)); // Set in Redux
    onFolderSelect(selectedFolder); // Pass selected folder to parent
    closeModal(); // Close modal after selecting
    // navigate('/assessment/chat');

  };

  const handleCloseError = () => setError(null); // Close error notification

  return (
    <section className="folders-files" style={{ marginTop: '2rem' }}>
      {error && (
        <NotificationBar
          message={error}
          type="error"
          onClose={handleCloseError}
        />
      )}

      <div className="heading">
        <p>Your &ldquo;{workspace.workspaceName}&rdquo; contains the following projects:</p>
      </div>

      <div className="files-container">
        {workspace.folders.map((folder, index) => (
          <div key={index} className="file" onClick={() => openModal(folder)}>
            <span className="icon">
              <BiSolidFolderOpen style={folderId?.id == folder.id ? { color: 'black',fontSize: "5rem" } : { color: 'grey',fontSize: "5rem" }} />
            </span>
            <p>{truncateText(folder.folderName, 10)}</p>
          </div>
        ))}
      </div>

      {isModalOpen && selectedFolder && (
        <div className="modal">
            <div className="modal-wrapper">
              <h3 className="modal-heading"><h3>{selectedFolder.folderName}</h3></h3>
              <button className="modal-closebtn" onClick={closeModal}>
                <RxCross2 />
              </button>
            </div>
          <div className="modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="folder-modal-button switch-btn" onClick={handleOpenFolder}>
                Select Project
              </button>
              <button className="folder-modal-button delete-btn" onClick={() => setIsTrashModalOpen(true)}>
                Move to Trash
              </button>
            </div>
          </div>
        </div>
      )}

      {isTrashModalOpen && (
        <CustomModal
          isOpen={isTrashModalOpen}
          onClose={() => setIsTrashModalOpen(false)}
          onProceed={handleProceedMoveToTrash}
          heading="Move to Trash"
          bodyContent={
            <div>
              Are you sure you want to move this file to the trash?
              <br /> It will remain there for 30 days before being permanently deleted.
            </div>
          }
          cancelText="Cancel"
          proceedText="Proceed"
        />
      )}

      <style>{`
        .folders-files {
          padding: 0 2rem;
        }
        .heading {
          display: flex;
          justify-content: space-between;
          font-size: 1.5em;
          font-weight: 500;
          align-items: center;
          margin-right: 4rem;
          margin-left: 2rem;
        }
        .files-container {
          display: flex;
          flex-wrap: wrap;
        }
        .file {
          cursor: pointer;
          margin: 0.5rem;
          font-size: 1.3rem;
          text-align: center;
          padding: 0.5rem;
          transition: background-color 0.3s;
        }
        .file:hover {
          background-color: #f0f0f0;
          border-radius: 0.8rem;
        }
        .folder-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .folder-modal-content {
          background-color: white;
          padding: 2rem;
          border-radius: 1rem;
          width: 30rem;
          text-align: center;
          font-size: 1.4rem;
          position: relative;
        }
        .modal-close-icon {
          position: absolute;
          top: 1rem;
          right: 1rem;
          font-size: 1.9rem;
          cursor: pointer;
        }
        .folder-modal-buttons {
          display: flex;
          justify-content: space-between;
          margin: 1.5rem 0;
        }
        .folder-modal-button {
          margin-top: 1rem;
          border: none;
          font-weight: 600;
          font-size: 1.2rem;
          padding: 1rem 2rem;
          border-radius: 1rem;
          background-color: #c3e11d;
        }
        .switch-btn {
          background-color: #c3e11d;
          color: #0b1444;
        }
        .delete-btn {
          background-color: red;
          color: white;
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
          z-index:999;
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
      `}</style>
    </section>
  );
};

FileStructure.propTypes = {
  workspace: PropTypes.shape({
    workspaceName: PropTypes.string.isRequired,
    folders: PropTypes.arrayOf(
      PropTypes.shape({
        folderName: PropTypes.string.isRequired,
        chats: PropTypes.array.isRequired,
        assessments: PropTypes.array.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onFolderSelect: PropTypes.func.isRequired, // Function to pass selected folder
  onFolderUpdate: PropTypes.func.isRequired, // Callback to notify parent component of folder updates
};

export default FileStructure;
