import PropTypes from 'prop-types';
import { IoAttach, IoSend } from 'react-icons/io5';
import InpireMeIcon from '../../assets/inspireBtn.svg';

const MessageInput = ({
  value,
  onChange,
  onSend,
  onInspire,
  loading,
  fileInputId,
}) => (
  <div className="input-container msg-input-relative">
    <div className="msg-inspire-wrapper">
      {!loading ? (
        <img
          src={InpireMeIcon}
          alt="Inspire Me"
          onClick={onInspire}
          className="msg-inspire-icon"
        />
      ) : (
        <div className="msg-inspire-spinner" />
      )}
    </div>
    <textarea
      placeholder="Enter text here.."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          onSend();
        }
      }}
      onInput={(e) => {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
      }}
      className="msg-textarea"
      rows={1}
    />
    <div className="icons msg-icons-row">
      <label htmlFor={fileInputId} className="msg-attach-label">
        <IoAttach size={32} color="#888" title="Attach file" />
      </label>
      <IoSend
        color="#c3e11d"
        onClick={onSend}
        className="send-icon"
        size={32}
      />
    </div>
  </div>
);

MessageInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
  onInspire: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  fileInputId: PropTypes.string,
};

MessageInput.defaultProps = {
  loading: false,
  fileInputId: 'file-input',
};

export default MessageInput;
