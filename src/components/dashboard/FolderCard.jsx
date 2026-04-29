import { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import {
  FaTrash,
  FaLink,
  FaDownload,
  FaCopy,
  FaEdit,
  FaFolderPlus,
} from 'react-icons/fa';
import assets from '@assets';
import CustomModal from '../customModal/CustomModal';
import MoveToModal from '../customModal/MoveToModal';
import AnchoredMenu from '../dropdowns/AnchoredMenu';
import PropTypes from 'prop-types';
import { downloadFolderAsZip } from '@utils/ExportAs';
import './dashboard-inline.scss';

const FolderCard = ({ folder }) => {
  const [isMoveToModalOpen, setMoveToModalOpen] = useState(false);
  const [isMoveToTrashModalOpen, setMoveToTrashModalOpen] = useState(false);

  if (!folder) return null;

  const { id, name } = folder;

  const folders = [
    {
      name: 'NeuralNet',
      subfolders: [{ name: 'DeepLearning 1' }, { name: 'DeepLearning 2' }],
    },
    {
      name: 'MachineLearning',
      subfolders: [
        { name: 'SupervisedLearning 1' },
        { name: 'SupervisedLearning 2' },
      ],
    },
    {
      name: 'AI Model',
      subfolders: [
        { name: 'UnsupervisedLearning 1' },
        { name: 'UnsupervisedLearning 2' },
      ],
    },
    {
      name: 'Algorithm',
      subfolders: [
        { name: 'ReinforcementLearning 1' },
        { name: 'ReinforcementLearning 2' },
      ],
    },
    {
      name: 'ArtificialIntelligence',
      subfolders: [{ name: 'NeuralNetwork 1' }, { name: 'NeuralNetwork 2' }],
    },
    { name: 'DataScience', subfolders: [] },
  ];

  return (
    <div className="folder-card">
      <img src={assets.dashboard.FolderIcon} alt="FolderIcon" />
      <div>
        <p className="folder-card__heading">{name}</p>
        <p className="folder-card__subheading">Modified 2 days ago</p>
      </div>
      <div className="folder-card__items">
        <p className="folder-card__item-count">{id} Items</p>
        <AnchoredMenu
          align="right"
          trigger={({ onClick }) => (
            <BsThreeDots
              onClick={onClick}
              className="folder-card__dots-icon"
            />
          )}
          items={[
            {
              key: 'move',
              label: 'Move To Folder',
              icon: <FaFolderPlus />,
              onClick: () => setMoveToModalOpen(true),
            },
            {
              key: 'duplicate',
              label: 'Duplicate',
              icon: <FaCopy />,
              onClick: () => {},
            },
            {
              key: 'rename',
              label: 'Rename',
              icon: <FaEdit />,
              onClick: () => {},
            },
            {
              key: 'download',
              label: 'Download As Zip',
              icon: <FaDownload />,
              onClick: () => downloadFolderAsZip(folder),
            },
            {
              key: 'copy-link',
              label: 'Copy Link',
              icon: <FaLink />,
              onClick: () => {},
            },
            {
              key: 'trash',
              label: 'Move to trash',
              icon: <FaTrash />,
              variant: 'danger',
              onClick: () => setMoveToTrashModalOpen(true),
            },
          ]}
        />
      </div>

      <CustomModal
        isOpen={isMoveToTrashModalOpen}
        onClose={() => setMoveToTrashModalOpen(false)}
        onProceed={() => setMoveToTrashModalOpen(false)}
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
      <CustomModal
        isOpen={isMoveToModalOpen}
        onClose={() => setMoveToModalOpen(false)}
        onProceed={() => setMoveToModalOpen(false)}
        heading="Move to folder"
        bodyContent={<MoveToModal folders={folders} />}
        cancelText="Cancel"
        proceedText="Move"
      />
    </div>
  );
};

FolderCard.propTypes = {
  folder: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    chats: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default FolderCard;
