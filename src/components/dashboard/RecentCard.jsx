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
          <div className={`recent-card ${isListView ? 'listCard' : ''}`}>
            <div className={`cardContent ${isListView ? 'listContent' : ''}`}>
              <div className="cardHeader">
                <h2 className="userName">
                  <RxAvatar className="icon" /> You
                </h2>
                <p className="recent-card-subtitle">
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
              <FaFileAlt className="fileIcon recent-card-file-icon" />
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
