import { useEffect, useState } from 'react';
import Component from '@components';
import useManagerChat from '@hooks/useManagerChat';
import DashboardLayout from '@layout/DashboardLayout';
import RecentCards from '../../components/dashboard/RecentCard';
import Folder from '../../components/dashboard/dashboardHomeComponents/Folder';
import { useSelector } from 'react-redux';
import { selectWorkspace } from '../../redux/slices/workspacesSlice';
import { selectAllChats } from '../../redux/selectors/selectors';
import { IoPeople } from 'react-icons/io5';
import { HiDotsHorizontal } from 'react-icons/hi';
import { ImFilesEmpty } from 'react-icons/im';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { CiBookmark } from 'react-icons/ci';
import { TfiReload } from 'react-icons/tfi';
import { FaFileAlt } from 'react-icons/fa';
import { MdOutlineEdit } from 'react-icons/md';
import { RxAvatar, RxLaptop } from 'react-icons/rx';

const AiAssistant = () => {
  const selectedWorkspace = useSelector(selectWorkspace);
  const selectAllChat = useSelector(selectAllChats);
  const activeFolder = useSelector((state) => state.workspaces.selectedFolder);
  
  const { managerData, error } = useManagerChat();
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState('grid');

  useEffect(() => {
    if (managerData) {
      setIsLoading(false);
    }
  }, [managerData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const recentChats = managerData.folders.flatMap((folder) =>
    folder.chats.map((chat) => [folder.name, chat])
  );


  // Helper function to truncate text
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength
      ? text.substring(0, maxLength) + '...'
      : text;
  };

  const convertTimestampToRelativeTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
  
    // Get the difference in milliseconds
    const differenceInMillis = now - date;
  
    // Convert to days
    const differenceInDays = Math.floor(differenceInMillis / (1000 * 60 * 60 * 24));
  
    if (differenceInDays === 0) {
      return "Today";
    } else if (differenceInDays === 1) {
      return "1 day ago";
    } else if (differenceInDays <= 2) {
      return `${differenceInDays} days ago`;
    } else if (differenceInDays <= 30) {
      return `Previous ${differenceInDays} days`;
    } else {
      return "Older than 30 days";
    }
  };
  
  // Usage
  const timestamp1 = Date.now() - (2 * 24 * 60 * 60 * 1000); // 2 days ago
  console.log(convertTimestampToRelativeTime(timestamp1)); // "2 days ago"
  
  const timestamp2 = Date.now() - (10 * 24 * 60 * 60 * 1000); // 10 days ago
  console.log(convertTimestampToRelativeTime(timestamp2)); // "Previous 10 days"
  
  const timestamp3 = Date.now() - (45 * 24 * 60 * 60 * 1000); // 45 days ago
  console.log(convertTimestampToRelativeTime(timestamp3)); // "Older than 30 days"
  

  // Modified renderCard function
  const renderCard = (chat) => (
    <div className="card">
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
      {/* <div className="fileDetails">
        <div className="fileName">
          {chat.chatTitle}
          <IoPeople color="gray" style={{ marginLeft: '0.3rem' }} />
        </div> */}
      {/* <div>
          <span>in</span>
          <span className="folderName">{data.folderName}</span>
          <span>
            • {data.modifiedDate}
            <HiDotsHorizontal style={{ fontSize: '1.2rem' }} />
          </span>
        </div> */}
      {/* </div> */}
    </div>
  );
  return (
    <DashboardLayout>
      <div style={{ marginBottom: '2rem' }}>
        <Component.Dashboard.Header />
      </div>
      <Component.Dashboard.AssistantBar setView={setView} />
      <Folder activeWorkspace={selectedWorkspace} />
      {/* <RecentCards chats={recentChats} view={view} /> */}
      <div
        className="card-wrapper"
        style={{ margin: '20px', display: 'flex', flexWrap: 'wrap' }}
      >
        {selectAllChat &&
          selectAllChat.map((chat, index) => (
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
                  <span>in </span>
                  <span className="folderName">{activeFolder && activeFolder.folderName}</span>
                  <span>
                    
                    • Created {convertTimestampToRelativeTime(chat.createdAt)}
                    <HiDotsHorizontal style={{ fontSize: '1.2rem' }} />
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div><style>{`
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
            `}</style></div>
      </div>

      {/* <Component.Dashboard.FolderStructure /> */}
    </DashboardLayout>
  );
};

export default AiAssistant;
