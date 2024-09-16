import { useEffect, useState } from 'react';
import Component from '@components';
import useManagerChat from '@hooks/useManagerChat';
import DashboardLayout from '@layout/DashboardLayout';
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
import LoadingSpinner from '../../components/common/LoadingSpinner ';

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
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const truncateText = (text, maxLength) =>
    text?.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text || '';

  const convertTimestampToRelativeTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const differenceInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (differenceInDays === 0) return 'Today';
    if (differenceInDays === 1) return '1 day ago';
    if (differenceInDays <= 2) return `${differenceInDays} days ago`;
    if (differenceInDays <= 30) return `Previous ${differenceInDays} days`;
    return 'Older than 30 days';
  };

  const renderCard = (chat) => (
    <div className="card">
      {chat?.generalMessages?.[0]?.sender ? (
        <div className="card-header">
          <h2 className="userName">
            <RxAvatar style={{ fontSize: '1.5rem', color: 'black' }} /> You
          </h2>
          <p>{truncateText(chat.text, 55)}</p>
          <MdOutlineEdit />
        </div>
      ) : (
        <div className="content">
          <h3 className="ai-heading">
            <RxLaptop style={{ fontSize: '1.5rem', color: 'black' }} /> Change
            AI
          </h3>
          <p className="chatContent">
            {truncateText(chat?.generalMessages?.[0]?.text, 55)}
          </p>
        </div>
      )}

      {chat?.generalMessages?.[1]?.sender ? (
        <div className="card-header">
          <h2 className="userName">
            <RxAvatar style={{ fontSize: '1.5rem', color: 'black' }} /> You
          </h2>
          <p>{truncateText(chat.text, 55)}</p>
          <MdOutlineEdit />
        </div>
      ) : (
        <div className="content">
          <h3 className="ai-heading">
            <RxLaptop style={{ fontSize: '1.5rem', color: 'black' }} /> Change
            AI
          </h3>
          <p className="chatContent">
            {truncateText(chat?.generalMessages?.[1]?.text, 55)}
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
  );

  return (
    <DashboardLayout>
      <div style={{ marginBottom: '2rem' }}>
        <Component.Dashboard.Header />
      </div>
      <Component.Dashboard.AssistantBar setView={setView} />
      <Folder activeWorkspace={selectedWorkspace} />
      <div
        className="card-wrapper"
        style={{ margin: '20px', display: 'flex', flexWrap: 'wrap' }}
      >
        {selectAllChat?.map((chat, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
            {renderCard(chat)}
            <div className="fileDetails">
              <div className="fileName">
                {chat.chatTitle}
                <IoPeople color="gray" style={{ marginLeft: '0.3rem' }} />
              </div>
              <div>
                <span>in </span>
                <span className="folderName">{activeFolder?.folderName}</span>
                <span>
                  • Created {convertTimestampToRelativeTime(chat.createdAt)}
                  <HiDotsHorizontal style={{ fontSize: '1.2rem' }} />
                </span>
              </div>
            </div>
          </div>
        ))}
        <style>{`
          .card-wrapper {
            display: flex;
            margin-top: 20px;
          }
          .card {
            width: 30rem;
            height: 25rem;
            margin: 0.5rem;
            border: 1px solid #ccc;
            border-radius: 1.3rem;
            background-color: #fff;
            padding: 2rem;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: start;
            transition: all 0.1s ease-in-out;
          }
          .card:hover {
            background-color: #f9f9f9;
          }
          .card-header, .content {
            display: flex;
            flex-direction: column;
            margin-bottom: 0.5rem;
          }
          .userName {
            font-size: 1.125rem;
            font-weight: bold;
          }
          .chatContent {
            font-size: 1.2rem;
            margin: 0.5rem 0;
          }
          .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
            .fileDetails{
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
        `}</style>
      </div>
    </DashboardLayout>
  );
};

export default AiAssistant;
