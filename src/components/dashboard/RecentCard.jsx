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

const RecentCards = ({ chats }) => {
  const truncateText = (text, maxLength) =>
    text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

  return (
    <div className="cardsContainer">
      {chats.map(([folderName, chatData]) => (
        <div key={chatData.id} className="card-wrapper">
          <div className="card">
            <div className="card-header">
              <h2 className="userName">
                <RxAvatar style={{ fontSize: '1.5rem', color: 'black' }} /> You
              </h2>
              <p>{truncateText(chatData.content, 55)}</p>
              <MdOutlineEdit />
            </div>
            <div className="content">
              <h3 className="ai-heading" style={{ marginTop: '1rem' }}>
                <RxAvatar style={{ fontSize: '1.5rem', color: 'black' }} />
                ChangeAI
              </h3>
              <p className="chatContent">
                {truncateText(chatData.content, 55)}
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
              <span className="folderName">{folderName}</span>
              <span>
                • Modified 2 days ago
                <HiDotsHorizontal style={{ fontSize: '1.2rem' }} />
              </span>
            </div>
          </div>
        </div>
      ))}

      <style>{`
      .card-wrapper{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .cardsContainer {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        padding: 2rem;
      }
      .card {
        width: 25rem;
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

RecentCards.propTypes = {
  chats: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      })
    )
  ).isRequired,
};

export default RecentCards;
