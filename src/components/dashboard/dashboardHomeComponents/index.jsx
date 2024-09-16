import { useEffect, useRef, useState } from 'react';
import Workspaces from './Workspaces';
import CountingCards from './CountingCards';
import Folder from './Folder';
import Account from './Account';
import { MdOutlineEdit } from 'react-icons/md';

import { TfiReload } from 'react-icons/tfi';
import { ImFilesEmpty } from 'react-icons/im';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { CiBookmark } from 'react-icons/ci';
import { FaFileAlt } from 'react-icons/fa';
import { RxAvatar } from 'react-icons/rx';
import { IoPeople } from 'react-icons/io5';
import { HiDotsHorizontal } from 'react-icons/hi';
import { SlQuestion } from 'react-icons/sl';
import { RxLaptop } from 'react-icons/rx';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useGetWorkspacesQuery } from '../../../redux/api/workspaceApi';
import CustomModal from '../../customModal/CustomModal';
import {
  setSelectedWorkspace,
  selectWorkspace,
} from '../../../redux/slices/workspacesSlice';
import { selectAllWorkspaces } from '../../../redux/selectors/selectors';
import { selectAllChats } from '../../../redux/selectors/selectors';

const DashboardHomeComp = () => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isMoveToTrashModalOpen, setIsMoveToTrashModalOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const userId = useSelector((state) => state.auth.user?.id);

  const { data: workspaces, error, isLoading } = useGetWorkspacesQuery(userId);
  const workspacess = useSelector(selectAllWorkspaces);
  const selectedWorkspace = useSelector(selectWorkspace);

  const activeFolder = useSelector((state) => state.workspaces.selectedFolder);
  const chats = useSelector(selectAllChats);

  const renameSchema = Yup.object().shape({
    newName: Yup.string()
      .min(2, 'Name is too short') // Add minimum length validation if needed
      .max(50, 'Name is too long') // Add maximum length validation if needed
      .required('Name cannot be empty'),
  });

  const toggleDropdown = (chat) => {
    setIsDropdownOpen(!isDropdownOpen);
    setSelectedChat(chat);
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
  };

  const handleCloseMoveToTrashModal = () => {
    setIsMoveToTrashModalOpen(false);
  };

  useEffect(() => {
    // Function to handle click outside
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

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Remove event listener on cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    if (workspaces && workspaces.length > 0 && !selectedWorkspace) {
      const firstWorkspace = workspaces[0];
      dispatch(setSelectedWorkspace(firstWorkspace));
    }
  }, [workspaces, selectedWorkspace, dispatch]);

  const convertTimestampToRelativeTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    // Get the difference in milliseconds
    const differenceInMillis = now - date;
    // Convert to days
    const differenceInDays = Math.floor(
      differenceInMillis / (1000 * 60 * 60 * 24)
    );

    if (differenceInDays === 0) {
      return 'Today';
    } else if (differenceInDays === 1) {
      return '1 day ago';
    } else if (differenceInDays <= 2) {
      return `${differenceInDays} days ago`;
    } else if (differenceInDays <= 30) {
      return `Previous ${differenceInDays} days`;
    } else {
      return 'Older than 30 days';
    }
  };
  // Helper function to truncate text
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength
      ? text.substring(0, maxLength) + '...'
      : text;
  };

  // Modified renderCard function
  const renderCard = (chat) => (
    <>
      {' '}
      <div className="card">
        <div
          className="menu"
          ref={menuRef}
          onClick={() => toggleDropdown(chat)}
        >
          <HiDotsHorizontal style={{ fontSize: '1.5rem', color: 'black' }} />
          {isDropdownOpen && selectedChat === chat && (
            <div className="card-dropdown-menu" ref={dropdownRef}>
              <button onClick={openRenameModal}>Rename</button>
              <button onClick={openMoveToTrashModal}>Move to Trash</button>
            </div>
          )}
        </div>
        {chat &&
        chat.generalMessages &&
        chat.generalMessages[0] &&
        chat.generalMessages[0].sender ? (
          <div className="card-header">
            <h2 className="userName">
              <RxAvatar style={{ fontSize: '1.5rem', color: 'black' }} /> You
            </h2>
            <p>{truncateText(chat.text, 55)}</p>
            <MdOutlineEdit />
          </div>
        ) : (
          <div className="content">
            <h3 className="ai-heading" style={{ marginTop: '1rem' }}>
              <RxLaptop style={{ fontSize: '1.5rem', color: 'black' }} /> Change
              AI
            </h3>
            <p className="chatContent">
              {truncateText(
                chat.generalMessages &&
                  chat.generalMessages[0] &&
                  chat.generalMessages[0].text,
                55
              )}
            </p>
          </div>
        )}
        {chat &&
        chat.generalMessages &&
        chat.generalMessages[1] &&
        chat.generalMessages[1].sender ? (
          <div className="card-header">
            <h2 className="userName">
              <RxAvatar style={{ fontSize: '1.5rem', color: 'black' }} /> You
            </h2>
            <p>{truncateText(chat.text, 55)}</p>
            <MdOutlineEdit />
          </div>
        ) : (
          <div className="content">
            <h3 className="ai-heading" style={{ marginTop: '1rem' }}>
              <RxLaptop style={{ fontSize: '1.5rem', color: 'black' }} /> Change
              AI
            </h3>
            <p className="chatContent">
              {truncateText(
                chat.generalMessages &&
                  chat.generalMessages[1] &&
                  chat.generalMessages[1].text,
                55
              )}
            </p>
          </div>
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
      <CustomModal
        isOpen={isRenameModalOpen}
        onClose={handleCloseRenameModal}
        onProceed={() => {
          /* handle rename logic */
        }}
        heading="Rename Card"
        bodyContent={
          <input
            type="text"
            placeholder="Enter new name"
            className="rename-input"
          />
        }
        cancelText="Cancel"
        proceedText="Save"
      />
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
    </>
  );

  return (
    <div className="dashboard">
      <CountingCards activeWorkspace={selectedWorkspace} />
      <Account />
      <Workspaces
        activeWorkspace={selectedWorkspace}
        workspaces={workspacess}
      />
      <Folder activeWorkspace={selectedWorkspace} />
      <section className="generate" style={{ marginTop: '2rem' }}>
        <div className="container">
          <div className="left-buttons">
            <button className="arrow-btn">
              <SlQuestion />
            </button>
            <p className="assistant-heading">Change AI Assistance</p>
          </div>
        </div>
      </section>
      <div
        className="card-wrapper"
        style={{ margin: '20px', display: 'flex', flexWrap: 'wrap' }}
      >
        {chats &&
          chats.map((chat, index) => (
            <div key={index}>
              <div
                key={index}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                {renderCard(chat)}
              </div>
              <div className="fileDetails">
                <div className="fileName">
                  {chat.chatTitle}
                  <IoPeople
                    color="gray"
                    style={{ marginLeft: '0.3rem', fontSize: '' }}
                  />
                </div>
                <div>
                  <span>in</span>
                  <span className="folderName">
                    {activeFolder && activeFolder.folderName}
                  </span>
                  <span>
                    • Created {convertTimestampToRelativeTime(chat.CreatedAt)}
                    <HiDotsHorizontal style={{ fontSize: '1.2rem' }} />
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="files">
        <p className="files-heading">AI Assessments</p>
        <div className="heading">
          <p>Recent</p>
          <p className="see-less">See less</p>
        </div>
      </div>
      <style>{`
        .dashboard {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
          .generate {
          background-color: rgba(249, 249, 249, 1);
        }
        .generate .container {
          display: flex;
          text-align: center;
          align-items: center;
          justify-content: space-between;
          padding: 1%;
          height: 10vh;
        }
        .generate .arrow-btn {
          height: 40px;
          // width: 40px;
          border: none;
          outline: none;
          border-radius: 50%;
          background: transparent;
        }
        .generate .assistant-heading {
          font-family: 'Poppins';
          font-size: 2rem;
          font-weight: 600;
          line-height: 36px;
          letter-spacing: 0.12px;
          text-align: left;
          color: black;
        }
        .generate .assiss-btn {
          background-color: #C3E11D;
          color: #0B1444;
          border:none;
          display: flex;
          text-align: center;
          align-items: center;
          justify-content: space-between;
          border-radius: 0.8rem;
          font-weight: 600;
          padding: 0.9rem 2rem;
        }
        .generate .left-buttons,
        .generate .center-buttons,
        .generate .right-buttons {
          display: flex;
          align-items: center;
          justify-content: center;
          gap:0.8rem;
          margin-left: 2rem;
        }
        .files {
          border-right: 2px solid lightgray;
        }
        .files-heading {
          font-size: 2.5rem;
          display: flex;
          font-weight: 600;
          margin-top: 2rem;
          padding: 0 3rem;
        }
      .card-wrapper{
        display: flex;
        // justify-content: space-around;
        margin-top: '20px';
      }
      .cardsContainer {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        padding: 2rem;
      }
      .card {
        width: 30rem;
        height:25rem;
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
      .iconsContainer {
        display: flex;
        gap: 0.5rem;
      }
      .fileDetails {
        width: 100%;
        margin-top: 1rem;
          margin-bottom:3rem;
      }
      .fileName {
        font-size: 1.125rem;
        font-weight: bold;
        margin-top: 1rem;
      }
      .folderName {
        color: #0066ff;
        font-size: 1.1rem;
        margin-left: 0.5rem;
      }
.menu {
  // position: absolute;
  position:relative;
  // top:1rem;
  left:22rem;;

}

.card-dropdown-menu{
  position: absolute;
  top: 30px;
  right: 0;
  background: white;
  border: none;
  border-radius: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  z-index:10000;
  width:15rem;
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
  .rename-input{
  border: 1px solid lightgray;
  outline:none;
  }

      `}</style>
    </div>
  );
};

export default DashboardHomeComp;
