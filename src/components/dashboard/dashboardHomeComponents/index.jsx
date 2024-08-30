import { Link } from 'react-router-dom';
import Workspaces from './Workspaces';
import CountingCards from './CountingCards';
import Folder from './Folder';
import Account from './Account';
import { TiPlus } from 'react-icons/ti';
import { MdOutlineEdit } from 'react-icons/md';
import { TfiMenuAlt, TfiReload } from 'react-icons/tfi';
import { SlArrowRight } from 'react-icons/sl';
import { SlArrowLeft } from 'react-icons/sl';
import { CgMenuGridR } from 'react-icons/cg';
import { ImFilesEmpty } from 'react-icons/im';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { CiBookmark } from 'react-icons/ci';
import { FaFileAlt } from 'react-icons/fa';
import { RxAvatar } from 'react-icons/rx';
import { IoPeople } from 'react-icons/io5';
import { HiDotsHorizontal } from 'react-icons/hi';

const DashboardHomeComp = () => {
  const cardData = [
    {
      userName: 'You',
      avatar: <RxAvatar style={{ fontSize: '1.5rem', color: 'black' }} />,
      userComment:
        'Lorem ipsum, dolor sit sapiente quae nobis porro, sed cum molestiae! Nemo, repellat?',
      aiHeading: 'ChangeAI',
      chatContent: 'Lorem ipsum, dolor sit amet consectetur adipisi',
      fileName: 'File Name',
      folderName: 'folderName',
      modifiedDate: 'Modified 2 days ago',
    },
    {
      userName: 'You',
      avatar: <RxAvatar style={{ fontSize: '1.5rem', color: 'black' }} />,
      userComment:
        'Lorem ipsum, dolor sit sapiente quae nobis porro, sed cum molestiae! Nemo, repellat?',
      aiHeading: 'ChangeAI',
      chatContent: 'Lorem ipsum, dolor sit amet consectetur adipisi',
      fileName: 'File Name',
      folderName: 'folderName',
      modifiedDate: 'Modified 2 days ago',
    },
    {
      userName: 'You',
      avatar: <RxAvatar style={{ fontSize: '1.5rem', color: 'black' }} />,
      userComment:
        'Lorem ipsum, dolor sit sapiente quae nobis porro, sed cum molestiae! Nemo, repellat?',
      aiHeading: 'ChangeAI',
      chatContent: 'Lorem ipsum, dolor sit amet consectetur adipisi',
      fileName: 'File Name',
      folderName: 'folderName',
      modifiedDate: 'Modified 2 days ago',
    },
  ];

  const assessmentCardData = [
    {
      userName: 'You',
      avatar: <RxAvatar style={{ fontSize: '1.5rem', color: 'black' }} />,
      userComment:
        'Lorem ipsum, dolor sit sapiente quae nobis porro, sed cum molestiae! Nemo, repellat?',
      aiHeading: 'ChangeAI',
      chatContent: 'Lorem ipsum, dolor sit amet consectetur adipisi',
      fileName: 'File Name',
      folderName: 'folderName',
      modifiedDate: 'Modified 2 days ago',
    },
    {
      userName: 'You',
      avatar: <RxAvatar style={{ fontSize: '1.5rem', color: 'black' }} />,
      userComment:
        'Lorem ipsum, dolor sit sapiente quae nobis porro, sed cum molestiae! Nemo, repellat?',
      aiHeading: 'ChangeAI',
      chatContent: 'Lorem ipsum, dolor sit amet consectetur adipisi',
      fileName: 'File Name',
      folderName: 'folderName',
      modifiedDate: 'Modified 2 days ago',
    },
    {
      userName: 'You',
      avatar: <RxAvatar style={{ fontSize: '1.5rem', color: 'black' }} />,
      userComment:
        'Lorem ipsum, dolor sit sapiente quae nobis porro, sed cum molestiae! Nemo, repellat?',
      aiHeading: 'ChangeAI',
      chatContent: 'Lorem ipsum, dolor sit amet consectetur adipisi',
      fileName: 'File Name',
      folderName: 'folderName',
      modifiedDate: 'Modified 2 days ago',
    },
  ];

  const renderCard = (data) => (
    <div className="card">
      <div className="card-header">
        <h2 className="userName">
          {data.avatar} {data.userName}
        </h2>
        <p>{data.userComment}</p>
        <MdOutlineEdit />
      </div>
      <div className="content">
        <h3 className="ai-heading" style={{ marginTop: '1rem' }}>
          {data.avatar} {data.aiHeading}
        </h3>
        <p className="chatContent">{data.chatContent}</p>
      </div>
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
      <div className="fileDetails">
        <div className="fileName">
          {data.fileName}
          <IoPeople color="gray" style={{ marginLeft: '0.3rem' }} />
        </div>
        <div>
          <span>in</span>
          <span className="folderName">{data.folderName}</span>
          <span>
            • {data.modifiedDate}
            <HiDotsHorizontal style={{ fontSize: '1.2rem' }} />
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      <CountingCards />
      <Account />
      <Workspaces />
      <Folder />
      <section className="generate" style={{ marginTop: '2rem' }}>
        <div className="container">
          <div className="left-buttons">
            <button className="arrow-btn">
              <SlArrowLeft />
            </button>
            <button className="arrow-btn">
              <SlArrowRight />
            </button>
            <p className="assistant-heading">AI Assistant</p>
          </div>
          <div className="center-buttons">
            <div className="left-buttons">
              <CgMenuGridR className="icon" />
              <TfiMenuAlt className="icon-small" />
            </div>
            <div>
              <Link
                to="/assisstant/chat"
                target="_blank"
                style={{ textDecoration: 'none' }}
              >
                <button className="assiss-btn">
                  <TiPlus />
                  New Assistant
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Render Main Cards */}
      <div
        className="card-wrapper"
        style={{ margin: '20px', display: 'flex', flexWrap: 'wrap' }}
      >
        {cardData.map((data, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
            {renderCard(data)}
          </div>
        ))}
      </div>

      {/* Render Assessment Cards */}
      <div className="files">
        <p className="files-heading">AI Assessments</p>
        <div className="heading">
          <p>Recent</p>
          <p className="see-less">See less</p>
        </div>
        <div
          className="card-wrapper"
          style={{ display: 'flex', flexWrap: 'wrap' }}
        >
          {assessmentCardData.map((data, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '1rem',
              }}
            >
              {renderCard(data)}
            </div>
          ))}
        </div>
      </div>

      <style>{`
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
        align-items: center;
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
  );
};

export default DashboardHomeComp;
