import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { CreateProjectModal } from '../../modal';
import FileStructure from '../../dashboard/FileStructure';
import { useAddFolderMutation } from '../../../redux/api/workspaceApi';
import { AiOutlinePlus } from 'react-icons/ai';
import NotificationBar from '../../common/NotificationBar';
import Button from '../../common/Button';
import { BiSolidFolderOpen } from 'react-icons/bi';

import './styles/folder.scss';

const Folder = ({ activeWorkspace, onFolderSelect, onFolderUpdate }) => {
  const [addFolder] = useAddFolderMutation();
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const handleError = (message) => {
    setErrorMessage(message);
    setShowNotification(true);
  };

  const handleNewFolderSubmit = useCallback(
    async (values) => {
      try {
        await addFolder({
          workspaceId: activeWorkspace.id,
          folderName: values.projectName,
          businessInfo: {
            companySize: values.companySize,
            companyName: values.companyName,
            jobTitle: values.jobTitle,
            industry: values.industry,
          },
        }).unwrap();
        setIsNewFolderModalOpen(false);
        onFolderUpdate();
      } catch (error) {
        handleError('Failed to add Project. Please try again.');
        throw error;
      }
    },
    [addFolder, activeWorkspace?.id, onFolderUpdate]
  );

  return (
    <div className="dashboard">
      <section className="generate">
        <div className="container-heading">
          <div className="left-buttons">
            <p className="assistant-heading">
              <BiSolidFolderOpen size={30} />
              Projects
            </p>
          </div>
          <div>
            <Button
              variant="primary"
              className="assiss-btn"
              iconRight={<AiOutlinePlus />}
              onClick={() => setIsNewFolderModalOpen(true)}
            >
              New Project
            </Button>
          </div>
        </div>
      </section>

      {activeWorkspace && activeWorkspace.folders?.length > 0 ? (
        <FileStructure
          workspace={activeWorkspace}
          onFolderSelect={onFolderSelect}
          onFolderUpdate={onFolderUpdate}
        />
      ) : (
        <div className="no-projects">
          <p>No Projects associated with this workspace.</p>
        </div>
      )}

      <CreateProjectModal
        isOpen={isNewFolderModalOpen}
        onClose={() => setIsNewFolderModalOpen(false)}
        onSubmit={handleNewFolderSubmit}
      />

      {showNotification && (
        <NotificationBar
          message={errorMessage}
          type="error"
          duration={5000}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

Folder.propTypes = {
  activeWorkspace: PropTypes.object,
  onFolderSelect: PropTypes.func.isRequired,
  onFolderUpdate: PropTypes.func.isRequired,
};

export default Folder;
