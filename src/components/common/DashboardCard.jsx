import PropTypes from 'prop-types';
import { useState } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { MdOutlineDelete } from 'react-icons/md';
import CustomModal from '../customModal/CustomModal';
import AnchoredMenu from '../dropdowns/AnchoredMenu';
import './common.scss';

const DashboardCard = ({ chat }) => {
  const [isMoveToTrashModalOpen, setIsMoveToTrashModalOpen] = useState(false);

  const handleMoveToTrash = () => {
    setIsMoveToTrashModalOpen(true);
  };

  const handleCloseMoveToTrashModal = () => {
    setIsMoveToTrashModalOpen(false);
  };

  return (
    <>
      <div className="common-card">
        <div className="common-card-header">
          <p className="common-card-title">{chat.chatTitle}</p>
          <AnchoredMenu
            align="right"
            trigger={({ onClick }) => (
              <div className="common-card-menu" onClick={onClick}>
                <BiDotsVerticalRounded className="common-card-menu-icon" />
              </div>
            )}
            items={[
              {
                key: 'trash',
                label: 'Move to Trash',
                icon: <MdOutlineDelete className="common-card-menu-delete-icon" />,
                onClick: handleMoveToTrash,
              },
            ]}
          />
        </div>
        <div className="common-card-body">
          <p className="common-card-content">{chat.text}</p>
        </div>
        {/*<div className="card-footer">*/}
        {/*  <AiOutlineLike style={{ fontSize: '1.3rem', color: 'black', cursor: 'pointer' }} />*/}
        {/*  <AiOutlineDislike style={{ fontSize: '1.3rem', color: 'black', cursor: 'pointer' }} />*/}
        {/*  <FaBookmark style={{ fontSize: '1.3rem', color: 'black', cursor: 'pointer' }} />*/}
        {/*</div>*/}
      </div>

      {/* Move to Trash Modal */}
      <CustomModal
        isOpen={isMoveToTrashModalOpen}
        onClose={handleCloseMoveToTrashModal}
        onProceed={() => {
          /* handle move to trash logic here */
        }}
        heading="Move to Trash"
        bodyContent={
          <div>
            Are you sure you want to move this chat to the trash?
            <br /> It will remain in the trash for 30 days before being permanently deleted.
          </div>
        }
        cancelText="Cancel"
        proceedText="Move to Trash"
      />

    </>
  );
};

DashboardCard.propTypes = {
  chat: PropTypes.shape({
    chatTitle: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default DashboardCard;
