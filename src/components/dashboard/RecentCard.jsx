import assets from '@assets';
import PropTypes from "prop-types";


const RecentCard = ({ chat }) => {
  if (!chat) {
    return null; // Add a safeguard to handle if folder is not defined
  }
  //const { name, [id, title, content] } = chat;
  const [folderName, chatData] = chat; // Destructure the chat prop

  return (
    <div>
    
    <div style={styles.cardContainer}>
    
      <img
        src={assets.dashboard.RecentFile}
        alt="RecentFile"
        style={styles.image}
      />
      <div  style={styles.image}>{chatData.content.substring(0, 120)}...</div>
      <div>
        <p style={styles.fileName}>{chatData.title}</p>
        <p style={styles.fileInfo}>
          in{' '}
          <span style={styles.folderName}>
            {folderName}{' '}
          </span>
          Modified 2 days ago
        </p>
      </div>
    </div></div>
  );
};

const styles = {
  cardContainer: {
    display: 'inline-block',
    marginRight: '10px',
  },
  image: {
    height: 'auto',
    width: '100%',
    maxWidth: '28rem',
  },
  fileName: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.12px',
    color: 'rgba(10, 10, 10, 1)',
  },
  fileInfo: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '18px',
    letterSpacing: '0.24px',
    color: 'rgba(10, 10, 10, 0.46)',
  },
  folderName: {
    fontSize: '12px',
    letterSpacing: '0.24px',
    color: 'rgba(0, 102, 255, 1)',
  },
};


// Prop types validation
RecentCard.propTypes = { 
  chat: PropTypes.arrayOf(PropTypes.any).isRequired,
};
export default RecentCard;
