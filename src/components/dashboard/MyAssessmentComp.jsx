import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PiFilesFill } from 'react-icons/pi';
import { IoPeople } from 'react-icons/io5';
import { FaFileAlt } from 'react-icons/fa';
import { TfiReload } from 'react-icons/tfi';
import { CiBookmark } from 'react-icons/ci';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { ImFilesEmpty } from 'react-icons/im';
import { RxAvatar } from 'react-icons/rx';
import { MdOutlineEdit } from 'react-icons/md';
import { HiDotsHorizontal } from 'react-icons/hi';

import Component from '@components';
import useManagerChat from '@hooks/useManagerChat';

const MyAssessmentComp = () => {
  const { managerData, error, toggleMockData } = useManagerChat();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (managerData) {
      setIsLoading(false);
    }
  }, [managerData]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const truncateString = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + '...';
    } else {
      return str.padEnd(num, ' ') + '...';
    }
  };

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
  ];

  const cardData = [
    {
      userName: 'You',
      content: truncateString(
        'Lorem ipsum dolor sit sapiente quae nobis porro, sed cum molestiae!',
        55
      ),
    },
    {
      userName: 'John Doe',
      content: truncateString(
        'Lorem ipsum dolor sit sapiente quae nobis porro, sed cum molestiae!',

        55
      ),
    },
    {
      userName: 'Jane Smith',
      content: truncateString(
        'Lorem ipsum dolor sit sapiente quae nobis porro, sed cum molestiae!',
        55
      ),
    },
    // Add more card data here
  ];

  return (
    <div className="container">
      <div className="section">
        <p className="sectionTitle">AI Assessment</p>
        <div className="buttonGroup">
          <Link to="/questionnaire">
            <button className="customizeButton">Customize</button>
          </Link>
          <Link to="/assessment/chat">
            <button className="addButton">Add New</button>
          </Link>
        </div>
        <div className="fileList">
          {mockFiles.map((file, index) => (
            <div key={index} className="fileItem">
              <PiFilesFill className="fileIcon" />
              <span>{truncateString(file.name, 6)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="cardWrapper">
        {cardData.map((card, index) => (
          <div key={index}>
            <div className="card">
              <div className="cardHeader">
                <h2 className="userName">
                  <RxAvatar className="icon" /> {card.userName}
                </h2>
                <p>{card.content}</p>
                <MdOutlineEdit className="editIcon" />
              </div>
              <div className="content">
                <h3 className="aiHeading">
                  <RxAvatar className="icon" /> ChangeAI
                </h3>
                <p className="chatContent">
                  Lorem ipsum dolor sit amet consectetur adipisi
                </p>
              </div>

              <div className="footer">
                <div className="iconsContainer">
                  <ImFilesEmpty className="footerIcon" />
                  <AiOutlineLike className="footerIcon" />
                  <AiOutlineDislike className="footerIcon" />
                  <CiBookmark className="footerIcon" />
                  <TfiReload className="footerIcon" />
                </div>
                <FaFileAlt className="largeFileIcon" />
              </div>
            </div>
            <div className="fileDetails">
              <div className="fileName">
                File Name
                <IoPeople className="peopleIcon" />
              </div>
              <div>
                <span>in</span>
                <span className="folderName">folderName</span>
                <span>
                  • Modified 2 days ago
                  <HiDotsHorizontal className="dotsIcon" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="section">
        <p className="sectionTitle">Folders</p>
        <div className="itemsContainer">
          {managerData &&
            managerData.folders.map((folder) => (
              <Component.Dashboard.FolderCard key={folder.id} folder={folder} />
            ))}
        </div>
      </div>

      <style>{`
        .container {
          background-color: #f9f9f9;
          padding: 1rem 2rem;
          overflow-x: hidden;
        }

        .section {
          margin-top: 2rem;
          gap: 2rem;
        }

        .sectionTitle {
          font-weight: 500;
          font-size: 2rem;
          line-height: 2.125rem;
          letter-spacing: 0.0075rem;
          margin-bottom: 2rem;
        }

        .buttonGroup {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
        }

        .customizeButton,
        .addButton {
          padding: 0.625rem 1rem;
          font-size: 1.5rem;
          border-radius: 0.7rem;
          cursor: pointer;
        }

        .customizeButton {
          background-color: white;
          border: 1px solid black;
        }

        .addButton {
          background-color: #c3e11d;
          border: none;
        }

        .fileList {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .fileItem {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: black;
          font-size: 1.25rem;
          cursor: pointer;
        }

        .fileIcon {
          font-size: 6rem;
          color: gray;
        }

        .cardWrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 20px;
        }

        .card {
          width: 30rem;
          margin: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 1.3rem;
          background-color: white;
          padding: 2rem;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: background-color 0.1s ease-in-out;
        }

        .card:hover {
          background-color: #f9f9f9;
        }

        .cardHeader {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }

        .userName,
        .fileName {
          font-size: 1.125rem;
          font-weight: bold;
        }

        .content {
          margin-top: 1rem;
        }

        .aiHeading {
          display: flex;
        }

        .chatContent {
          font-size: 1.2rem;
          margin: 0.5rem 0;
        }

        .footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .iconsContainer {
          display: flex;
          gap: 0.5rem;
        }

        .footerIcon {
          font-size: 1.5rem;
        }

        .largeFileIcon {
          font-size: 2rem;
        }

        .fileDetails {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          // align-items: center;
          width: 100%;
          margin: 0.2rem 1.5rem;
          font-size: 1rem;
        }

        .folderName {
          margin: 0 0.5rem;
          font-weight: bold;
        }

        .dotsIcon,
        .editIcon {
          cursor: pointer;
          font-size: 1.25rem;
          color: #888;
        }
      `}</style>
    </div>
  );
};

export default MyAssessmentComp;
