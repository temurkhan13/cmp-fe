import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { BiSolidFolderOpen } from 'react-icons/bi';
import { setSelectedFolder as setSelectedReduxFolder } from '../../redux/slices/workspacesSlice';
import { CustomModal, InputModal, ConfirmModal } from '../modal';
import apiClient from '../../api/axios';
import {
  useMoveToTrashMutation,
  useGetWorkspacesQuery,
} from '../../redux/api/workspaceApi';
import { RxCross2 } from 'react-icons/rx';
import { selectSelectedFolder } from '../../redux/slices/folderSlice.js';
import { IconCard, Button, NotificationBar } from '../common';
import "./dashboard-inline.scss";

const FileStructure = ({ workspace, onFolderSelect, onFolderUpdate }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [isTrashModalOpen, setIsTrashModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [moveToTrash] = useMoveToTrashMutation();
  const { refetch } = useGetWorkspacesQuery(workspace.id);
  const folderId = useSelector(selectSelectedFolder);
  const [renameModal, setRenameModal] = useState({ open: false, folder: null });
  const [trashConfirm, setTrashConfirm] = useState({ open: false, folder: null });

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

  const handleProceedMoveToTrash = async (folder) => {
    try {
      await moveToTrash({
        entityType: 'folder',
        id: folder.id || folder._id,
      }).unwrap();
      refetch();
      onFolderUpdate();
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
          <IconCard
            key={folder.id}
            icon={
              <BiSolidFolderOpen
                onClick={() => {
                  dispatch(setSelectedReduxFolder(folder));
                  onFolderSelect(folder);
                }}
                className={`${folderId?.id === folder.id ? 'active' : ''}`}
              />
            }
            label={folder.folderName}
            truncateAt={10}
            hoverFadeKebab
            menuItems={[
              {
                key: 'rename',
                label: 'Rename',
                onClick: () => setRenameModal({ open: true, folder }),
              },
              {
                key: 'delete',
                label: 'Delete',
                variant: 'danger',
                onClick: () => setTrashConfirm({ open: true, folder }),
              },
            ]}
          />
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
      <InputModal
        isOpen={renameModal.open}
        title="Rename Project"
        confirmText="Rename"
        cancelText="Cancel"
        defaultValue={renameModal.folder?.folderName || ''}
        placeholder="Enter project name"
        onConfirm={async (newName) => {
          await apiClient.patch(`/workspace/${workspace.id}/folder/${renameModal.folder.id}`, { folderName: newName });
          onFolderUpdate();
          setRenameModal({ open: false, folder: null });
        }}
        onCancel={() => setRenameModal({ open: false, folder: null })}
      />
      <ConfirmModal
        isOpen={trashConfirm.open}
        title="Move to Trash"
        description="This project will be moved to trash. You can restore it from the Trash page."
        confirmText="Move to Trash"
        cancelText="Cancel"
        onConfirm={async () => {
          await handleProceedMoveToTrash(trashConfirm.folder);
          setTrashConfirm({ open: false, folder: null });
        }}
        onCancel={() => setTrashConfirm({ open: false, folder: null })}
      />
    </section>
  );
};

const ModalContent = ({ folder, onSelect, onDelete, onClose }) => (
  <div className="fs-modal">
    <div className="modal-wrapper">
      <h3 className="modal-heading">{folder.folderName}</h3>
      <Button
        variant="icon"
        ariaLabel="Close"
        className="modal-closebtn"
        onClick={onClose}
      >
        <RxCross2 />
      </Button>
    </div>
    <div className="modal-content">
      <div className="modal-actions">
        <Button
          variant="primary"
          className="folder-modal-button switch-btn"
          onClick={onSelect}
        >
          Select Project
        </Button>
        <Button
          variant="destructive"
          className="folder-modal-button delete-btn"
          onClick={onDelete}
        >
          Move to Trash
        </Button>
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
