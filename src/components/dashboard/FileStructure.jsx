import { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import { BiSolidFolderOpen } from 'react-icons/bi';
import { FiPlus } from 'react-icons/fi';
import { Navigate, useNavigate } from 'react-router-dom';

const FileStructure = ({ workspace }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const openModal = (folder) => {
    setSelectedFolder(folder);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFolder(null);
  };

  return (
    <section className="folders-files" style={{ marginTop: '2rem' }}>
      <div className="heading">
        <p>
          Your &ldquo;{workspace && workspace.workspaceName}&rdquo; contains the
          following projects:
        </p>
      </div>

      <div className="files-container">
        {workspace &&
          workspace.folders.map((folder, index) => (
            <div key={index} className="file" onClick={() => openModal(folder)}>
              <span className="icon">
                <BiSolidFolderOpen style={{ fontSize: '5rem' }} />
              </span>
              <p>{folder.folderName}</p>
              <p className="file-count">
                {folder.chats.length + folder.assessments.length} files
              </p>
            </div>
          ))}
      </div>

      {isModalOpen && (
        <div className="folder-modal">
          <div className="folder-modal-content">
            <h3>{selectedFolder.folderName}</h3>
            <div className="folder-modal-buttons">
              <button
                className="folder-modal-button"
                onClick={() => {
                  navigate('/assisstant/chat');
                }}
              >
                Create Assistant Project <FiPlus />
              </button>
              <button
                className="folder-modal-button"
                onClick={() => {
                  navigate('/assessment/chat');
                }}
              >
                Create Assessment Project <FiPlus />
              </button>
            </div>
            <button onClick={closeModal} className="folder-modal-close-btn">
              Close
            </button>
          </div>
        </div>
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
        .see-less {
          font-weight: normal;
          font-size: 1.5rem;
        }
        .files-container {
          display: flex;
          flex-wrap: wrap;
          cursor: pointer;
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
          width: 90%;
          max-width: 30rem;
          text-align: center;
          font-size: 1.4rem;
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
          color:#0b1444 ;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          font-size: 1.5rem;
          font-weight: 500;
          transition: background-color 0.3s;
          display:flex;
          align-items: center;
          justify-content: center;
          gap:0.5rem;
        }
        .folder-modal-close-btn {
          padding: 0.5rem 1rem;
          background-color: #c3e11d;
          color: #0b1444;
          border: none;
          width: 15rem;
          border-radius: 0.5rem;
          cursor: pointer;
          margin-top: 1rem;
          font-size: 1.4rem;
        }
      `}</style>
    </section>
  );
};

// Define prop types for the component
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
