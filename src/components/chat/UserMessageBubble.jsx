import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import UserAvatar from '../common/UserAvatar';
import MessageActions from './MessageActions';

const UserMessageBubble = ({
  text,
  attachedFile,
  userProfilePhoto,
  userName,
  dataAttributes,
  cardClassName = 'user-card',
  bodyClassName,
  actions,
}) => {
  const msgBody = (
    <div className="msg" {...(dataAttributes || {})}>
      {!bodyClassName && attachedFile?.url && (
        <div className="msg-file-link">
          <a href={attachedFile.url} target="_blank" rel="noopener noreferrer">
            {attachedFile.name || 'Attached file'}
          </a>
        </div>
      )}
      {text && <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>}
    </div>
  );

  const filePreview = bodyClassName && attachedFile?.url && (
    <div className="file-preview">
      <a href={attachedFile.url} target="_blank" rel="noopener noreferrer">
        {attachedFile.name || 'Attached file'}
      </a>
    </div>
  );

  return (
    <div className="chat-container-assistant right">
      <div className={`card chat-card ${cardClassName}`}>
        <div className="user-avatar">
          <UserAvatar
            src={userProfilePhoto}
            name={userName}
            size={50}
            imgClassName="avatar"
            style={{ backgroundColor: '#C3E11D' }}
            initialsStyle={{ color: '#0B1444' }}
          />
        </div>
        {bodyClassName ? (
          <div className={bodyClassName}>
            {msgBody}
            {filePreview}
          </div>
        ) : (
          msgBody
        )}
        {actions && <MessageActions {...actions} />}
      </div>
    </div>
  );
};

UserMessageBubble.propTypes = {
  text: PropTypes.string,
  attachedFile: PropTypes.shape({
    url: PropTypes.string,
    name: PropTypes.string,
  }),
  userProfilePhoto: PropTypes.string,
  userName: PropTypes.string,
  dataAttributes: PropTypes.object,
  cardClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  actions: PropTypes.object,
};

export default UserMessageBubble;
