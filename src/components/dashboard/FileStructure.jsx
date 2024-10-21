import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { BiSolidFolderOpen } from 'react-icons/bi';
import { FiPlus, FiMoreVertical, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import {
  setCurrentChatId,
  setSelectedFolder as setSelectedReduxFolder,
} from '../../redux/slices/workspacesSlice';
import CustomModal from '../customModal/CustomModal';
import { truncateText } from '../../utils/helperFunction';
import { useGetWorkspacesQuery, useMoveToTrashMutation, useUpdateWorkspaceMutation } from '../../redux/api/workspaceApi';

const FileStructure = ({ workspace }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTrashModalOpen, setIsTrashModalOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [moveToTrash] = useMoveToTrashMutation();
  const { refetch } = useGetWorkspacesQuery(workspace.id);
  console.log('folderr:', workspace)

  const modalRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isModalOpen]);

  const openModal = (folder) => {
    setSelectedFolder(folder);
    setIsModalOpen(true);
    setNewFolderName(folder.folderName);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFolder(null);
    setIsDropdownOpen(false);
    setIsRenaming(false);
  };

  const handleRename = () => {
    setIsRenaming(true);
    setIsDropdownOpen(false);
  };

  const handleSaveRename = () => {
    if (newFolderName.trim()) {
      selectedFolder.folderName = newFolderName;
      setIsRenaming(false);
    }
  };

  const handleCancelRename = () => {
    setIsRenaming(false);
    setNewFolderName(selectedFolder.folderName);
  };

  const handleProceedMoveToTrash = async() => {
    try {
      console.log(workspace.folder)
      const saveUserId = selectedFolder.userId;
      console.log("User ID:", saveUserId);
      await moveToTrash({ entityType: 'folder', id: selectedFolder.id }).unwrap();  
      refetch(); 
    } catch (error) {
      console.error('Error moving to trash:', error);
    }
    console.log('Moving folder to trash:', selectedFolder);
    setIsTrashModalOpen(false);
  };

  const handleOpenFolder = (folder) => {
    dispatch(setSelectedReduxFolder(folder));
    dispatch(setCurrentChatId(null));
    navigate('/assisstant/chat');
  };

  const handleOpenAssessment = (folder) => {
    dispatch(setSelectedReduxFolder(folder));
    navigate('/assessment/chat');
  };

  const handleCreateSitemap = () => {
    navigate('/sitemap/new');
  };

  return (
    <section className="folders-files" style={{ marginTop: '2rem' }}>
      <div className="heading">
        <p>
          Your &ldquo;{workspace.workspaceName}&rdquo; contains the following
          projects:
        </p>
      </div>

      <div className="files-container">
        {workspace.folders.map((folder, index) => (
          <div key={index} className="file" onClick={() => openModal(folder)}>
            <span className="icon">
              <BiSolidFolderOpen style={{ fontSize: '5rem', color: 'gray' }} />
            </span>
            <p>{truncateText(folder.folderName, 10)}</p>
            <p className="file-count">
              {folder.chats.length + folder.assessments.length} files
            </p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="folder-modal">
          <div className="folder-modal-content" ref={modalRef}>
            <FiX className="modal-close-icon" onClick={closeModal} />
            <div className="modal-menu">
              <FiMoreVertical
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
              {isDropdownOpen && (
                <div className="file-structure-dropdown" ref={dropdownRef}>
                  <button className="dropdown-item" onClick={handleRename}>
                    Rename
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => setIsTrashModalOpen(true)}
                  >
                    Move to Trash
                  </button>
                </div>
              )}
            </div>

            {isRenaming ? (
              <div className="rename-section">
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Enter your new folder name"
                  className="rename-input"
                />
                <div className="rename-buttons">
                  <button
                    className="folder-modal-button"
                    onClick={handleCancelRename}
                  >
                    Cancel
                  </button>
                  <button
                    className="folder-modal-button"
                    onClick={handleSaveRename}
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <h3>{selectedFolder.folderName}</h3>
            )}

            <div className="folder-modal-buttons">
              <button
                className="folder-modal-button"
                onClick={() => handleOpenFolder(selectedFolder)}
              >
                New Assistant <FiPlus />
              </button>
              <button
                className="folder-modal-button"
                onClick={() => handleOpenAssessment(selectedFolder)}
              >
                New Assessment <FiPlus />
              </button>
              <button
                className="folder-modal-button"
                onClick={handleCreateSitemap}
              >
                Create Sitemap <FiPlus />
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
              <br /> It will remain there for 30 days before being permanently
              deleted.
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
        .icon {
          color: gray;
        }
        .file-count {
          color: rgba(0, 102, 255, 1);
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
          width: 35rem;
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
        .modal-menu {
          position: absolute;
          top: 1rem;
          left: 1rem;
          cursor: pointer;
          font-size:1.9rem;
        }
        .file-structure-dropdown {
          position: absolute;
          top: 2.5rem;
          right: 0;
          background-color: white;
          border: 1px solid #ddd;
          border-radius: 0.8rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          z-index: 100;
          display: flex;
          flex-direction: column;
          width: 15rem;
        }
        .dropdown-item {
          padding: 0.5rem 1rem;
          cursor: pointer;
          font-size:1.5rem;
          border: none;
          background: none;
          text-align: left;
        }
        .dropdown-item:hover {
          background-color: #f0f0f0;
        }
        .folder-modal-buttons {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin: 1rem 0;
        }
        .folder-modal-button {
          padding: 0.5rem 1rem;
          background-color: #c3e11d;
          color: #0b1444;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          font-size: 1.5rem;
          font-weight: 500;
          transition: background-color 0.3s;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }
          .rename-buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
}
    .rename-input{
    outline: none;
    border:1px solid lightgray;
    width:25rem;
    padding:0.8rem 1rem;
    border-radius:0.8rem;
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
};

export default FileStructure;
