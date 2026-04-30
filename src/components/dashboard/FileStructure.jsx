import { useState } from 'react';
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
import { selectSelectedFolder } from '../../redux/slices/folderSlice.js';
import { IconCard, NotificationBar } from '../common';
import "./dashboard-inline.scss";

const FileStructure = ({ workspace, onFolderSelect, onFolderUpdate }) => {
  const dispatch = useDispatch();
  const [isTrashModalOpen, setIsTrashModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [moveToTrash] = useMoveToTrashMutation();
  const { refetch } = useGetWorkspacesQuery(workspace.id);
  const folderId = useSelector(selectSelectedFolder);
  const [renameModal, setRenameModal] = useState({ open: false, folder: null });
  const [trashConfirm, setTrashConfirm] = useState({ open: false, folder: null });

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

  const handleCloseError = () => setError(null);

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
