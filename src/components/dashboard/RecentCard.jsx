import assets from '@assets';
import PropTypes from 'prop-types';
import { MdOutlineEdit } from 'react-icons/md';
import { ImFilesEmpty } from 'react-icons/im';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { CiBookmark } from 'react-icons/ci';
import { TfiReload } from 'react-icons/tfi';
import { FaFileAlt } from 'react-icons/fa';
import { HiDotsHorizontal } from 'react-icons/hi';
import { IoPeople } from 'react-icons/io5';

const RecentCard = ({ chat }) => {
  if (!chat) {
    return null;
  }

  const [folderName, chatData] = chat;

  return (
    <>
      <div style={styles.cardContainer}>
        <div style={styles.cardWrapper}>
          <Header userImage={''} userName="You" content={chatData.content} />
          <h3>
            <img src={''} alt="ChangeAI" /> ChangeAI
          </h3>
          <p style={styles.chatContent}>{chatData.content}</p>
          <Footer />
        </div>
      </div>
      <FileDetails folderName={folderName} />
    </>
  );
};

const Header = ({ userImage, userName, content }) => (
  <div style={styles.header}>
    <h2 style={styles.userName}>
      <img src={userImage} alt="User" /> {userName}
    </h2>
    <p>{content}</p>
    <MdOutlineEdit />
  </div>
);

const Footer = () => (
  <div style={styles.footer}>
    <div style={styles.iconsContainer}>
      <ImFilesEmpty fontSize="1.125rem" />
      <AiOutlineLike fontSize="1.125rem" />
      <AiOutlineDislike fontSize="1.125rem" />
      <CiBookmark fontSize="1.125rem" />
      <TfiReload fontSize="1.125rem" />
    </div>
    <FaFileAlt fontSize="2.1875rem" color="gray" />
  </div>
);

const FileDetails = ({ folderName }) => (
  <div>
    <div style={styles.fileName}>
      File Name <IoPeople color="gray" />
    </div>
    <div>
      <span>in</span>
      <span style={styles.folderName}>{folderName}</span>
      <span>
        • Modified 2 days ago <HiDotsHorizontal color="gray" />
      </span>
    </div>
  </div>
);

const styles = {
  cardContainer: {
    width: '25rem',
    // display: 'inline-block',
    border: '0.0625rem solid #ccc',
    borderRadius: '1.3rem',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    cursor: 'pointer',
    backgroundColor: '#fff',
    padding: '2rem',
    overflow: 'hidden',
  },
  cardWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  fileName: {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    marginTop: '1rem',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginBottom: '0.5rem',
  },
  userName: {
    fontSize: '1.125rem',
    fontWeight: 'bold',
  },
  iconsContainer: {
    display: 'flex',
    gap: '0.5rem',
  },
  chatContent: {
    fontSize: '0.875rem',
    margin: '0.5rem 0',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '1rem',
  },
  folderName: {
    color: '#0066FF',
    fontSize: '1.1rem',
  },
};

// Prop types validation
RecentCard.propTypes = {
  chat: PropTypes.arrayOf(PropTypes.any).isRequired,
};

Header.propTypes = {
  userImage: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

Footer.propTypes = {};

FileDetails.propTypes = {
  folderName: PropTypes.string.isRequired,
};

export default RecentCard;
