import { Link } from 'react-router-dom';
import Workspaces from './Workspaces';
import CountingCards from './CountingCards';
import Folder from './Folder';
import Account from './Account';
import FileStructure from '../../dashboard/FileStructure';
import { TiPlus } from 'react-icons/ti';
import { BsFilterLeft } from 'react-icons/bs';
import { MdOutlineEdit, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { BsFilterCircle } from 'react-icons/bs';
import { HiAdjustmentsHorizontal } from 'react-icons/hi2';
import { TfiMenuAlt, TfiReload } from 'react-icons/tfi';
import { SlArrowRight } from 'react-icons/sl';
import { SlArrowLeft } from 'react-icons/sl';
import { CgMenuGridR } from 'react-icons/cg';
import { PiFilesFill } from 'react-icons/pi';
import { ImFilesEmpty } from 'react-icons/im';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { CiBookmark } from 'react-icons/ci';
import { FaFileAlt } from 'react-icons/fa';
import { RxAvatar } from 'react-icons/rx';
import { IoPeople } from 'react-icons/io5';
import { HiDotsHorizontal } from 'react-icons/hi';
import { SlQuestion } from 'react-icons/sl';
import { RxLaptop } from 'react-icons/rx';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useGetWorkspacesQuery } from '../../../redux/api/workspaceApi';

import {
  setSelectedWorkspace,
  selectWorkspace,
} from '../../../redux/slices/workspacesSlice';
import { selectAllWorkspaces } from '../../../redux/selectors/selectors';
import { useNavigate } from 'react-router-dom';
import { selectAllChats } from '../../../redux/selectors/selectors';

const DashboardHomeComp = () => {
  const dispatch = useDispatch();
  const { data: workspaces, error, isLoading } = useGetWorkspacesQuery();
  const workspacess = useSelector(selectAllWorkspaces);
  const selectedWorkspace = useSelector(selectWorkspace);
  const chats = useSelector(selectAllChats);

  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleChatClick = (chatId) => {
    navigate(`/assisstant/chat/${chatId}`); // Redirect to the chat's specific route
  };
  const handleAssessmentClick = (chatId) => {
    navigate(`/assisstant/chat/${chatId}`); // Redirect to the chat's specific route
  };
  useEffect(() => {
    if (workspaces && workspaces.length > 0 && !selectedWorkspace) {
      const firstWorkspace = workspaces[0];
      dispatch(setSelectedWorkspace(firstWorkspace));
    }
  }, [workspaces, selectedWorkspace, dispatch]);

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

  const mockFiles = [
    { name: 'AI Overview' },
    { name: 'Machine Learning Basics' },
    { name: 'Advanced Neural Networks' },
    { name: 'Introduction to NLP' },
    { name: 'AI in Robotics' },
    { name: 'Reinforcement Learning Concepts' },
    { name: 'AI and Ethics' },
    { name: 'AI in Healthcare Applications' },
    { name: 'AI in Financial Services' },
    { name: 'Data Science Techniques' },
    { name: 'Predictive Modeling' },
    { name: 'AI and Privacy' },
    { name: 'Computer Vision Applications' },
    { name: 'Deep Learning Explained' },
    { name: 'AI for Beginners' },
    { name: 'AI Research Papers' },
    { name: 'Natural Language Processing Guide' },
    { name: 'Understanding AI Algorithms' },
    { name: 'AI in Marketing' },
    { name: 'AI in Education' },
    { name: 'AI Overview' },
    { name: 'Machine Learning Basics' },
    { name: 'Advanced Neural Networks' },
    { name: 'Introduction to NLP' },
    { name: 'AI in Robotics' },
    { name: 'Reinforcement Learning Concepts' },
    { name: 'AI and Ethics' },
    { name: 'AI in Healthcare Applications' },
  ];

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
          <p>{chat.text}</p>
          <MdOutlineEdit />
        </div>
      ) : (
        <div className="content">
          <h3 className="ai-heading" style={{ marginTop: '1rem' }}>
            <RxLaptop style={{ fontSize: '1.5rem', color: 'black' }} /> Change
            AI
          </h3>
          <p className="chatContent">
            {chat.generalMessages &&
              chat.generalMessages[0] &&
              chat.generalMessages[0].text}
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
          <p>{chat.text}</p>
          <MdOutlineEdit />
        </div>
      ) : (
        <div className="content">
          <h3 className="ai-heading" style={{ marginTop: '1rem' }}>
            <RxLaptop style={{ fontSize: '1.5rem', color: 'black' }} /> Change
            AI
          </h3>
          <p className="chatContent">
            {chat.generalMessages &&
              chat.generalMessages[1] &&
              chat.generalMessages[1].text}
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
      <div className="fileDetails">
        <div className="fileName">
          {chat.chatTitle}
          <IoPeople color="gray" style={{ marginLeft: '0.3rem' }} />
        </div>
        {/* <div>
          <span>in</span>
          <span className="folderName">{data.folderName}</span>
          <span>
            • {data.modifiedDate}
            <HiDotsHorizontal style={{ fontSize: '1.2rem' }} />
          </span>
        </div> */}
      </div>
    </div>
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
          {/* <div className="center-buttons">
            <div className="left-buttons">
              <CgMenuGridR className="icon" />
              <TfiMenuAlt className="icon-small" />
            </div>
            {/* <div className="right-buttons">
              <BsFilterLeft className="filter-icon" />
              <MdOutlineKeyboardArrowDown className="icon-small" />
            </div>
            <div className="right-buttons">
              <BsFilterCircle className="icon-small" />
              <MdOutlineKeyboardArrowDown className="icon-small" />
            </div>
            <div className="right-buttons">
              <HiAdjustmentsHorizontal className="adjustments-icon" />
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
          </div> */}
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
                  <span className="folderName">folderName</span>
                  <span>
                    • Modified 2 days ago
                    <HiDotsHorizontal style={{ fontSize: '1.2rem' }} />
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
      {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card">
            <div className="card-header">
              <h2 className="userName">
                <RxAvatar style={{ fontSize: '1.5rem', color: 'black' }} /> You
              </h2>
              <p>
                Lorem ipsum, dolor sit sapiente quae nobis porro, sed cum
                molestiae! Nemo, repellat?
              </p>
              <MdOutlineEdit />
            </div>
            <div className="content">
              <h3 className="ai-heading" style={{ marginTop: '1rem' }}>
                <RxAvatar style={{ fontSize: '1.5rem', color: 'black' }} />
                ChangeAI
              </h3>
              <p className="chatContent">
                <p>Lorem ipsum, dolor sit amet consectetur adipisi</p>
              </p>
            </div>
            <div className="footer">
              <div className="iconsContainer">
                <ImFilesEmpty style={{ fontSize: '1.3rem', color: 'black' }} />
                <AiOutlineLike style={{ fontSize: '1.3rem', color: 'black' }} />
                <AiOutlineDislike
                  style={{ fontSize: '1.3rem', color: 'black' }}
                />
                <CiBookmark style={{ fontSize: '1.3rem', color: 'black' }} />
                <TfiReload style={{ fontSize: '1.3rem', color: 'black' }} />
              </div>
              <FaFileAlt style={{ fontSize: '3.5rem', color: 'gray' }} />
            </div>
          </div>
          <div className="fileDetails">
            <div className="fileName">
              File Name
              <IoPeople
                color="gray"
                style={{ marginLeft: '0.3rem', fontSize: '' }}
              />
            </div>
            <div>
              <span>in</span>
              <span className="folderName">folderName</span>
              <span>
                • Modified 2 days ago
                <HiDotsHorizontal style={{ fontSize: '1.2rem' }} />
              </span>
            </div>
          </div>
        </div>{' '}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card">
            <div className="card-header">
              <h2 className="userName">
                <RxAvatar style={{ fontSize: '1.5rem', color: 'black' }} /> You
              </h2>
              <p>
                Lorem ipsum, dolor sit sapiente quae nobis porro, sed cum
                molestiae! Nemo, repellat?
              </p>
              <MdOutlineEdit />
            </div>
            <div className="content">
              <h3 className="ai-heading" style={{ marginTop: '1rem' }}>
                <RxAvatar style={{ fontSize: '1.5rem', color: 'black' }} />
                ChangeAI
              </h3>
              <p className="chatContent">
                <p>Lorem ipsum, dolor sit amet consectetur adipisi</p>
              </p>
            </div>
            <div className="footer">
              <div className="iconsContainer">
                <ImFilesEmpty style={{ fontSize: '1.3rem', color: 'black' }} />
                <AiOutlineLike style={{ fontSize: '1.3rem', color: 'black' }} />
                <AiOutlineDislike
                  style={{ fontSize: '1.3rem', color: 'black' }}
                />
                <CiBookmark style={{ fontSize: '1.3rem', color: 'black' }} />
                <TfiReload style={{ fontSize: '1.3rem', color: 'black' }} />
              </div>
              <FaFileAlt style={{ fontSize: '3.5rem', color: 'gray' }} />
            </div>
          </div>
          <div className="fileDetails">
            <div className="fileName">
              File Name
              <IoPeople
                color="gray"
                style={{ marginLeft: '0.3rem', fontSize: '' }}
              />
            </div>
            <div>
              <span>in</span>
              <span className="folderName">folderName</span>
              <span>
                • Modified 2 days ago
                <HiDotsHorizontal style={{ fontSize: '1.2rem' }} />
              </span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card">
            <div className="card-header">
              <h2 className="userName">
                <RxAvatar style={{ fontSize: '1.5rem', color: 'black' }} /> You
              </h2>
              <p>
                Lorem ipsum, dolor sit sapiente quae nobis porro, sed cum
                molestiae! Nemo, repellat?
              </p>
              <MdOutlineEdit />
            </div>
            <div className="content">
              <h3 className="ai-heading" style={{ marginTop: '1rem' }}>
                <RxAvatar style={{ fontSize: '1.5rem', color: 'black' }} />
                ChangeAI
              </h3>
              <p className="chatContent">
                <p>Lorem ipsum, dolor sit amet consectetur adipisi</p>
              </p>
            </div>
            <div className="footer">
              <div className="iconsContainer">
                <ImFilesEmpty style={{ fontSize: '1.3rem', color: 'black' }} />
                <AiOutlineLike style={{ fontSize: '1.3rem', color: 'black' }} />
                <AiOutlineDislike
                  style={{ fontSize: '1.3rem', color: 'black' }}
                />
                <CiBookmark style={{ fontSize: '1.3rem', color: 'black' }} />
                <TfiReload style={{ fontSize: '1.3rem', color: 'black' }} />
              </div>
              <FaFileAlt style={{ fontSize: '3.5rem', color: 'gray' }} />
            </div>
          </div>
          <div className="fileDetails">
            <div className="fileName">
              File Name
              <IoPeople
                color="gray"
                style={{ marginLeft: '0.3rem', fontSize: '' }}
              />
            </div>
            <div>
              <span>in</span>
              <span className="folderName">folderName</span>
              <span>
                • Modified 2 days ago
                <HiDotsHorizontal style={{ fontSize: '1.2rem' }} />
              </span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card">
            <div className="card-header">
              <h2 className="userName">
                <RxAvatar style={{ fontSize: '1.5rem', color: 'black' }} /> You
              </h2>
              <p>
                Lorem ipsum, dolor sit sapiente quae nobis porro, sed cum
                molestiae! Nemo, repellat?
              </p>
              <MdOutlineEdit />
            </div>
            <div className="content">
              <h3 className="ai-heading" style={{ marginTop: '1rem' }}>
                <RxAvatar style={{ fontSize: '1.5rem', color: 'black' }} />
                ChangeAI
              </h3>
              <p className="chatContent">
                <p>Lorem ipsum, dolor sit amet consectetur adipisi</p>
              </p>
            </div>
            <div className="footer">
              <div className="iconsContainer">
                <ImFilesEmpty style={{ fontSize: '1.3rem', color: 'black' }} />
                <AiOutlineLike style={{ fontSize: '1.3rem', color: 'black' }} />
                <AiOutlineDislike
                  style={{ fontSize: '1.3rem', color: 'black' }}
                />
                <CiBookmark style={{ fontSize: '1.3rem', color: 'black' }} />
                <TfiReload style={{ fontSize: '1.3rem', color: 'black' }} />
              </div>
              <FaFileAlt style={{ fontSize: '3.5rem', color: 'gray' }} />
            </div>
          </div>
          <div className="fileDetails">
            <div className="fileName">
              File Name
              <IoPeople
                color="gray"
                style={{ marginLeft: '0.3rem', fontSize: '' }}
              />
            </div>
            <div>
              <span>in</span>
              <span className="folderName">folderName</span>
              <span>
                • Modified 2 days ago
                <HiDotsHorizontal style={{ fontSize: '1.2rem' }} />
              </span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card">
            <div className="card-header">
              <h2 className="userName">
                <RxAvatar style={{ fontSize: '1.5rem', color: 'black' }} /> You
              </h2>
              <p>
                Lorem ipsum, dolor sit sapiente quae nobis porro, sed cum
                molestiae! Nemo, repellat?
              </p>
              <MdOutlineEdit />
            </div>
            <div className="content">
              <h3 className="ai-heading" style={{ marginTop: '1rem' }}>
                <RxAvatar style={{ fontSize: '1.5rem', color: 'black' }} />
                ChangeAI
              </h3>
              <p className="chatContent">
                <p>Lorem ipsum, dolor sit amet consectetur adipisi</p>
              </p>
            </div>
            <div className="footer">
              <div className="iconsContainer">
                <ImFilesEmpty style={{ fontSize: '1.3rem', color: 'black' }} />
                <AiOutlineLike style={{ fontSize: '1.3rem', color: 'black' }} />
                <AiOutlineDislike
                  style={{ fontSize: '1.3rem', color: 'black' }}
                />
                <CiBookmark style={{ fontSize: '1.3rem', color: 'black' }} />
                <TfiReload style={{ fontSize: '1.3rem', color: 'black' }} />
              </div>
              <FaFileAlt style={{ fontSize: '3.5rem', color: 'gray' }} />
            </div>
          </div>
          <div className="fileDetails">
            <div className="fileName">
              File Name
              <IoPeople
                color="gray"
                style={{ marginLeft: '0.3rem', fontSize: '' }}
              />
            </div>
            <div>
              <span>in</span>
              <span className="folderName">folderName</span>
              <span>
                • Modified 2 days ago
                <HiDotsHorizontal style={{ fontSize: '1.2rem' }} />
              </span>
            </div>
          </div>
        </div> */}

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
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: '1rem',
            }}
          >
            <div className="card">
              <div className="card-header">
                <h2 className="userName">
                  <RxAvatar style={{ fontSize: '1.5rem', color: 'black' }} />{' '}
                  You
                </h2>
                <p>
                  Lorem ipsum, dolor sit sapiente quae nobis porro, sed cum
                  molestiae! Nemo, repellat?
                </p>
                <MdOutlineEdit />
              </div>
              <div className="content">
                <h3 className="ai-heading" style={{ marginTop: '1rem' }}>
                  <RxAvatar style={{ fontSize: '1.5rem', color: 'black' }} />
                  ChangeAI
                </h3>
                <p className="chatContent">
                  <p>Lorem ipsum, dolor sit amet consectetur adipisi</p>
                </p>
              </div>
              <div className="footer">
                <div className="iconsContainer">
                  <ImFilesEmpty
                    style={{ fontSize: '1.3rem', color: 'black' }}
                  />
                  <AiOutlineLike
                    style={{ fontSize: '1.3rem', color: 'black' }}
                  />
                  <AiOutlineDislike
                    style={{ fontSize: '1.3rem', color: 'black' }}
                  />
                  <CiBookmark style={{ fontSize: '1.3rem', color: 'black' }} />
                  <TfiReload style={{ fontSize: '1.3rem', color: 'black' }} />
                </div>
                <FaFileAlt style={{ fontSize: '3.5rem', color: 'gray' }} />
              </div>
            </div>{' '}
            <div className="fileDetails">
              <div className="fileName">
                File Name
                <IoPeople
                  color="gray"
                  style={{ marginLeft: '0.3rem', fontSize: '' }}
                />
              </div>
              <div>
                <span>in</span>
                <span className="folderName">folderName</span>
                <span>
                  • Modified 2 days ago
                  <HiDotsHorizontal style={{ fontSize: '1.2rem' }} />
                </span>
              </div>
            </div>
          </div>
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
          width: 40px;
          border: none;
          outline: none;
          border-radius: 50%;
          background: transparent;
        }
        .generate .assistant-heading {
          font-family: 'Poppins';
          font-size: 20px;
          font-weight: 600;
          line-height: 36px;
          letter-spacing: 0.12px;
          text-align: left;
          color: black;
        }
        .generate .assiss-btn {
          background-color: rgba(10, 10, 10, 1);
          display: flex;
          text-align: center;
          align-items: center;
          justify-content: space-between;
          color: white;
          border-radius: 8px;
          margin-left: 10px;
          padding: 10px 20px;
        }
        .generate .left-buttons,
        .generate .center-buttons,
        .generate .right-buttons {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .generate .center-buttons {
          justify-content: space-between;
        }
        .generate .icon {
          font-size: 26px;
        }
        .generate .icon-small {
          margin-right: 30px;
          margin-left: 5px;
          font-size: 18px;
        }
        .generate .filter-icon {
          font-size: 22px;
        }
        .generate .adjustments-icon {
          margin-right: 30px;
          font-size: 22px;
        }
        .files {
          // padding: 0 2rem;
          // margin-top:1rem;
          border-right: 2px solid lightgray;
        }
        .files-heading {
          font-size: 2.5rem;
          display: flex;
          font-weight: 600;
          margin-top: 2rem;
          padding: 0 3rem;
        }
        .file-list {
          display: flex;
          flex-wrap: wrap;
          flex-direction: row;
          gap: 1rem;
        }
        .file-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: gray;
          cursor: pointer;
          font-size: 1.25rem;
          gap: 0.1rem;
          padding: 0.5rem;
          border-radius: 0.8rem;
          &:hover {
          background-color: #f0f0f0;
        }
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
