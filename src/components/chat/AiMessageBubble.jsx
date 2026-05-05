import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import AiPic from '../../assets/dashboard/sidebarLogo.png';
import UserAvatar from '../common/UserAvatar';
import MessageActions from './MessageActions';

const AiMessageBubble = ({
  text,
  dataAttributes,
  cardClassName = 'assistant-card',
  bodyClassName,
  actions,
  children,
}) => {
  const msgBody = (
    <div className="msg" {...(dataAttributes || {})}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
    </div>
  );

  return (
    <div className="chat-container-assistant left">
      <div className={`card chat-card ${cardClassName}`}>
        <div className="ai-avatar">
          <UserAvatar src={AiPic} name="AI Assistant" size={50} imgClassName="avatar" />
        </div>
        {bodyClassName ? (
          <div className={bodyClassName}>
            {msgBody}
            {children}
          </div>
        ) : (
          <>
            {msgBody}
            {children}
          </>
        )}
        {actions && <MessageActions {...actions} />}
      </div>
    </div>
  );
};

AiMessageBubble.propTypes = {
  text: PropTypes.string,
  dataAttributes: PropTypes.object,
  cardClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  actions: PropTypes.object,
  children: PropTypes.node,
};

export default AiMessageBubble;
