import { useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { BiSolidFolderOpen } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { setSelectedFolder as setSelectedReduxFolder } from '../../redux/slices/workspacesSlice';
import CustomModal from '../customModal/CustomModal';
import { truncateText } from '../../utils/helperFunction';
import {
  useMoveToTrashMutation,
  useGetWorkspacesQuery,
} from '../../redux/api/workspaceApi';
import NotificationBar from '../common/NotificationBar';
import { RxCross2 } from 'react-icons/rx';
import { selectSelectedFolder } from '../../redux/slices/folderSlice.js';
import './styles/FileStructure.css';
import { BsThreeDotsVertical } from 'react-icons/bs';

const FileStructure = ({ workspace, onFolderSelect, onFolderUpdate }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [isTrashModalOpen, setIsTrashModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [moveToTrash] = useMoveToTrashMutation();
  const { refetch } = useGetWorkspacesQuery(workspace.id);
  const folderId = useSelector(selectSelectedFolder);
  const [openDropdown, setOpenDropdown] = useState(null); // State to toggle dropdown visibility

  const modalRef = useRef(null);

  const openModal = useCallback((folder) => {
    setSelectedFolder(folder);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedFolder(null);
  }, []);

  // const handleProceedMoveToTrash = useCallback(async () => {
  //   try {
  //     await moveToTrash({
  //       entityType: 'folder',
  //       id: selectedFolder.id,
  //     }).unwrap();
  //     refetch();
  //     onFolderUpdate();
  //   } catch {
  //     setError('Error moving to trash');
  //   }
  //   closeModal();
  //   setIsTrashModalOpen(false);
  // }, [moveToTrash, selectedFolder, refetch, onFolderUpdate, closeModal]);

  const handleProceedMoveToTrash = async () => {
    console.log('IDDD', folderId);
    try {
      await moveToTrash({
        entityType: 'folder',
        id: folderId.id,
      }).unwrap();
      refetch();
      onFolderUpdate();
      setIsModalOpen(false);
    } catch {
      setError('Error moving to trash');
    }
  };

  const handleOpenFolder = useCallback(() => {
    dispatch(setSelectedReduxFolder(selectedFolder));
    onFolderSelect(selectedFolder);
    closeModal();
  }, [dispatch, onFolderSelect, selectedFolder, closeModal]);

  const handleCloseError = useCallback(() => setError(null), []);

  const toggleDropdown = (index) => {
    setOpenDropdown((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="folders-files">
      {error && (
        <NotificationBar
          message={error}
          type="error"
          onClose={handleCloseError}
        />
      )}

      <div className="heading">
        <p>
          Your &ldquo;{workspace.workspaceName}&rdquo; contains the following
          projects:
        </p>
      </div>

      <div className="files-container">
        {workspace.folders.map((folder) => (
          <div
            key={folder.id}
            className="file"
            // onClick={() => openModal(folder)}
          >
            <span className="icon">
              <BsThreeDotsVertical
                size={18}
                style={{ position: 'absolute', top: '0', right: '0' }}
                onClick={() => toggleDropdown(folder)}
              />
              {openDropdown === folder && (
                <div className="dropdown-menuu">
                  <div
                    className="dropdown-itemm deletee"
                    // onClick={() => {
                    //   handleDeleteWorkspace(workspace.id);
                    //   setOpenDropdown(null); // Close dropdown after delete
                    // }}
                    onClick={handleProceedMoveToTrash}
                  >
                    Delete
                  </div>
                </div>
              )}
              <BiSolidFolderOpen
                style={
                  folderId?.id === folder.id
                    ? { color: 'black', fontSize: '5rem' }
                    : { color: 'grey', fontSize: '5rem' }
                }
                onClick={() => {
                  dispatch(setSelectedReduxFolder(folder));
                  onFolderSelect(folder);
                }}
              />
            </span>
            <p>{truncateText(folder.folderName, 10)}</p>
          </div>
        ))}
      </div>

      {isModalOpen && selectedFolder && (
        <ModalContent
          folder={selectedFolder}
          onSelect={handleOpenFolder}
          onDelete={() => setIsTrashModalOpen(true)}
          onClose={closeModal}
        />
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
    </section>
  );
};

const ModalContent = ({ folder, onSelect, onDelete, onClose }) => (
  <div className="fs-modal">
    <div className="modal-wrapper">
      <h3 className="modal-heading">{folder.folderName}</h3>
      <button className="modal-closebtn" onClick={onClose}>
        <RxCross2 />
      </button>
    </div>
    <div className="modal-content">
      <div className="modal-actions">
        <button className="folder-modal-button switch-btn" onClick={onSelect}>
          Select Project
        </button>
        <button className="folder-modal-button delete-btn" onClick={onDelete}>
          Move to Trash
        </button>
      </div>
    </div>
  </div>
);

ModalContent.propTypes = {
  folder: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

FileStructure.propTypes = {
  workspace: PropTypes.shape({
    workspaceName: PropTypes.string.isRequired,
    folders: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        folderName: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  onFolderSelect: PropTypes.func.isRequired,
  onFolderUpdate: PropTypes.func.isRequired,
};

export default FileStructure;
