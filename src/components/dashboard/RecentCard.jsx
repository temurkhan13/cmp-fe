import PropTypes from 'prop-types';
import { FaFileAlt } from 'react-icons/fa';
import { IoPeople } from 'react-icons/io5';
import { TfiReload } from 'react-icons/tfi';
import { CiBookmark } from 'react-icons/ci';
import { ImFilesEmpty } from 'react-icons/im';
import { MdOutlineEdit } from 'react-icons/md';
import { HiDotsHorizontal } from 'react-icons/hi';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { RxAvatar } from 'react-icons/rx';
import { truncateText } from '../../utils/helperFunction';

const RecentCards = ({ chats, view }) => {
  const isListView = view === 'list';
  const maxLength = isListView ? 50 : 55;

  return (
    <div className={`cardsContainer ${view}`}>
      {chats.map(([folderName, chatData]) => (
        <div key={chatData.id} className="cardWrapper">
          <div className={`card ${isListView ? 'listCard' : ''}`}>
            <div className={`cardContent ${isListView ? 'listContent' : ''}`}>
              <div className="cardHeader">
                <h2 className="userName">
                  <RxAvatar className="icon" /> You
                </h2>
                <p style={{ fontSize: '1.1rem' }}>
                  {truncateText(chatData.content, maxLength)}
                </p>
                <MdOutlineEdit className="editIcon" />
              </div>
              <div className="content">
                <h3 className="aiHeading">
                  <RxAvatar className="icon" /> ChangeAI
                </h3>
                <p className="chatContent">
                  {truncateText(chatData.content, maxLength)}
                </p>
              </div>
            </div>
            <div className="footer">
              <div className="iconsContainer">
                <ImFilesEmpty className="icon" />
                <AiOutlineLike className="icon" />
                <AiOutlineDislike className="icon" />
                <CiBookmark className="icon" />
                <TfiReload className="icon" />
              </div>
              <FaFileAlt className="fileIcon" style={{ fontSize: '3rem' }} />
            </div>
          </div>
          <div className="fileDetails">
            <div className="fileName">
              File Name
              <IoPeople className="peopleIcon" />
            </div>
            <div className="folderInfo">
              <span>in</span>
              <span className="folderName">{folderName}</span>
              <span>
                • Modified 2 days ago
                <HiDotsHorizontal className="dotsIcon" />
              </span>
            </div>
          </div>
        </div>
      ))}
      <style>{`
        .cardsContainer {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          padding: 2rem;
        }
        .cardsContainer.list {
          flex-direction: column;
        }
        .cardWrapper {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .card {
          width: 30rem;
          height:25rem;
          border: 1px solid #ccc;
          border-radius: 1.3rem;
          background-color: #fff;
          padding: 2rem;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: background-color 0.1s ease-in-out;
        }
        .cardsContainer.list .card {
          width: 100%;
          height: 10rem; /* Adjust height for list view */
          display: flex;
          flex-direction: row; /* Align items horizontally */
          justify-content: space-between;
        }
        .card:hover {
          background-color: #f9f9f9;
        }
        .cardContent {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
        }
        .listCard .cardContent {
          flex-direction: row; 
          align-items:center;
          gap:3rem;
          justify-content: space-between;
          width: 100%;
        }
        .cardHeader,
        .content,
        .footer {
          width: 100%;
        }
        .cardHeader,
        .content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          }
          .listCard .cardHeader,
          .listCard .content {
          width: 50%; 
        }
        .userName,
        .fileName {
          font-size: 1.125rem;
          font-weight: bold;
        }
        .chatContent {
          font-size: 1.1rem;
          margin: 0.5rem 0;
        }
        .aiHeading {
          display: flex;
          align-items: center;
          margin-top: 1rem;
        }
        .footer {
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-top: 1rem;
          position: relative;
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
        .folderName {
          color: #0066ff;
          font-size: 1.1rem;
          margin-left: 0.5rem;
        }
        .icon {
          font-size: 1.3rem;
          color: black;
        }
        .editIcon,
        .fileIcon,
        .peopleIcon,
        .dotsIcon {
          font-size: 1.2rem;
        }
        .fileIcon {
          font-size: ${isListView ? '4rem' : '4rem'};
          color: gray;
          position: ${isListView ? 'absolute' : 'static'};
          right: ${isListView ? '1rem' : 'auto'};
          top: ${isListView ? '50%' : 'auto'};
          transform: ${isListView ? 'translateY(-50%)' : 'none'};
        }
      `}</style>
    </div>
  );
};

RecentCards.propTypes = {
  chats: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      })
    )
  ).isRequired,
  view: PropTypes.string.isRequired,
};

export default RecentCards;
