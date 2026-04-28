import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { FaBookmark } from 'react-icons/fa';
import { MdOutlineDelete } from 'react-icons/md';
import CustomModal from '../customModal/CustomModal';
import Button from './Button';
import './common.scss';

const DashboardCard = ({ chat }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMoveToTrashModalOpen, setIsMoveToTrashModalOpen] = useState(false);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMoveToTrash = () => {
    setIsMoveToTrashModalOpen(true);
    setIsDropdownOpen(false);
  };

  const handleCloseMoveToTrashModal = () => {
    setIsMoveToTrashModalOpen(false);
  };

  // Click outside event handler to close the dropdown menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !menuRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <>
      <div className="common-card">
        <div className="common-card-header">
          <p className="common-card-title">{chat.chatTitle}</p>
          <div className="common-card-menu" ref={menuRef} onClick={toggleDropdown}>
            <BiDotsVerticalRounded className="common-card-menu-icon" />
            {isDropdownOpen && (
              <div className="common-card-dropdown" ref={dropdownRef}>
                <Button
                  variant="ghost"
                  iconLeft={<MdOutlineDelete className="common-card-menu-delete-icon" />}
                  onClick={handleMoveToTrash}
                >
                  Move to Trash
                </Button>
              </div>
            )}
          </div>
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
