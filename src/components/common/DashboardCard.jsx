import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { CiBookmark } from 'react-icons/ci';
import { FaFileAlt } from 'react-icons/fa';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { ImFilesEmpty } from 'react-icons/im';
import { MdOutlineEdit } from 'react-icons/md';
import { RxAvatar, RxLaptop } from 'react-icons/rx';
import { TfiReload } from 'react-icons/tfi';
import CustomModal from '../customModal/CustomModal';
import { truncateText } from '../../utils/helperFunction';

const DashboardCard = ({ chat }) => {
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isMoveToTrashModalOpen, setIsMoveToTrashModalOpen] = useState(false);
  const [renameInput, setRenameInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleDropdown = (chat) => {
    if (selectedChat === chat) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      setIsDropdownOpen(true);
      setSelectedChat(chat);
    }
  };

  const openRenameModal = () => {
    setIsDropdownOpen(false);
    setIsRenameModalOpen(true);
  };

  const openMoveToTrashModal = () => {
    setIsDropdownOpen(false);
    setIsMoveToTrashModalOpen(true);
  };

  const handleCloseRenameModal = () => {
    setIsRenameModalOpen(false);
    setErrorMessage('');
  };

  const handleCloseMoveToTrashModal = () => {
    setIsMoveToTrashModalOpen(false);
  };

  const handleRename = () => {
    if (renameInput.trim() === '') {
      setErrorMessage('Name cannot be empty');
      return;
    }

    // Add rename logic here
    setIsRenameModalOpen(false);
    setErrorMessage('');
  };

  // Click outside event handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !menuRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
        setSelectedChat(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const renderChatHeader = (message, icon, heading) => (
    <div className="content">
      <h3 className="ai-heading" style={{ marginTop: '1rem' }}>
        {icon}
        {heading}
      </h3>
      <p className="chatContent">{truncateText(message, 55)}</p>
    </div>
  );

  const renderUserHeader = (message) => (
    <div className="card-header">
      <h2 className="userName">
        <RxAvatar style={{ fontSize: '1.5rem', color: 'black' }} /> You
      </h2>
      <p>{truncateText(message, 55)}</p>
    </div>
  );

  return (
    <>
      <div className="card dashboardCardWrapper">
        <div
          className="menu"
          ref={menuRef}
          onClick={() => toggleDropdown(chat)}
        >
          <BiDotsVerticalRounded
            style={{ fontSize: '1.5rem', color: 'black' }}
          />
          {isDropdownOpen && selectedChat === chat && (
            <div className="card-dropdown-menu" ref={dropdownRef}>
              <button onClick={openRenameModal}>Rename</button>
              <button onClick={openMoveToTrashModal}>Move to Trash</button>
            </div>
          )}
        </div>

        {chat?.generalMessages?.[0]?.sender
          ? renderUserHeader(chat.text)
          : renderChatHeader(
              chat?.generalMessages?.[0]?.text,
              <RxAvatar style={{ fontSize: '1.5rem', color: 'black' }} />,
              'You'
            )}
        <MdOutlineEdit />

        {chat?.generalMessages?.[1]?.sender
          ? renderUserHeader(chat.text)
          : renderChatHeader(
              chat?.generalMessages?.[1]?.text,
              <RxLaptop style={{ fontSize: '1.5rem', color: 'black' }} />,
              'Change AI'
            )}

        <div className="footer">
          <div className="iconsContainer">
            <ImFilesEmpty style={{ fontSize: '1.3rem', color: 'black' }} />
            <AiOutlineLike style={{ fontSize: '1.3rem', color: 'black' }} />
            <AiOutlineDislike style={{ fontSize: '1.3rem', color: 'black' }} />
            <CiBookmark style={{ fontSize: '1.3rem', color: 'black' }} />
            <TfiReload style={{ fontSize: '1.3rem', color: 'black' }} />
          </div>
          <FaFileAlt style={{ fontSize: '3.5rem', color: 'gray' }} />
        </div>
      </div>

      {/* Rename Modal */}
      <CustomModal
        isOpen={isRenameModalOpen}
        onClose={handleCloseRenameModal}
        onProceed={handleRename}
        heading="Rename Card"
        bodyContent={
          <div>
            <input
              type="text"
              value={renameInput}
              onChange={(e) => setRenameInput(e.target.value)}
              placeholder="Enter new name"
              className="rename-input"
            />
            {errorMessage && (
              <p
                style={{
                  color: 'red',
                  marginTop: '0.5rem',
                  fontSize: '1.1rem',
                }}
              >
                {errorMessage}
              </p>
            )}
          </div>
        }
        cancelText="Cancel"
        proceedText="Save"
      />

      {/* Move to Trash Modal */}
      <CustomModal
        isOpen={isMoveToTrashModalOpen}
        onClose={handleCloseMoveToTrashModal}
        onProceed={() => {
          /* handle move to trash logic */
        }}
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

      <style>{`
        .card {
          width: 30rem;
          height: 25rem;
          margin: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 1.3rem;
          background-color: #fff;
          padding: 2rem;
          overflow: hidden;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: start;
          &:hover {
            background-color: #f9f9f9;
            transition: all 0.1s ease-in-out;
          }
        }

        .menu {
          position: relative;
          left: 22rem;
        }

        .card-dropdown-menu {
          position: absolute;
          top: 30px;
          right: 0;
          background: white;
          border: none;
          border-radius: 1rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          z-index: 10000;
          width: 15rem;
        }

        .card-dropdown-menu button {
          padding: 10px;
          border: none;
          background: transparent;
          cursor: pointer;
          text-align: left;
        }

        .card-dropdown-menu button:hover {
          background: #f0f0f0;
        }

        .card-header {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }

        .userName {
          font-size: 1.125rem;
          font-weight: bold;
        }

        .content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        }

        .chatContent {
          font-size: 1.2rem;
          margin: 0.5rem 0;
        }

        .ai-heading {
          display: flex;
        }

        .footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
          width: 100%;
        }
      `}</style>
    </>
  );
};

DashboardCard.propTypes = {
  chat: PropTypes.shape({
    text: PropTypes.string,
    generalMessages: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        sender: PropTypes.string,
      })
    ),
  }),
};

export default DashboardCard;
