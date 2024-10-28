import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { FaBookmark } from 'react-icons/fa';
import { MdOutlineDelete } from 'react-icons/md';
import CustomModal from '../customModal/CustomModal';

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
      <div className="card">
        <div className="card-header">
          <p className="chat-title">{chat.chatTitle}</p>
          <div className="menu" ref={menuRef} onClick={toggleDropdown}>
            <BiDotsVerticalRounded style={{ fontSize: '1.5rem', color: 'black', cursor: 'pointer' }} />
            {isDropdownOpen && (
              <div className="dropdown" ref={dropdownRef}>
                <button onClick={handleMoveToTrash}>
                  <MdOutlineDelete style={{ marginRight: '0.5rem' }} /> Move to Trash
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="card-body">
          <p className="chat-content">{chat.text}</p>
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

      <style>{`
        .card {
          width: 22rem;
          border: 1px solid #ccc;
          border-radius: 1rem;
          background-color: #fff;
          padding: 1.5rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chat-title {
          font-weight: 600;
          font-size: 1.2rem;
        }

        .menu {
          position: relative;
        }

        .dropdown {
          position: absolute;
          top: 25px;
          right: 0;
          background-color: white;
          border: 1px solid #ccc;
          border-radius: 0.5rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          z-index: 10;
        }

        .dropdown button {
          padding: 0.5rem 1rem;
          border: none;
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .dropdown button:hover {
          background-color: #f5f5f5;
        }

        .card-body {
          margin-top: 1rem;
          font-size: 1rem;
          color: #333;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          margin-top: 1.5rem;
        }

        .chat-content {
          color: #666;
          font-size: 1rem;
        }
      `}</style>
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
