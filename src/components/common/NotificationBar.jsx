import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

const NotificationBar = ({ message, type, duration = 5000, onClose }) => {
  const [visible, setVisible] = useState(true);
  const [enterAnimation, setEnterAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => setEnterAnimation(true), 100);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  if (!visible) return null;

  return (
    <div className={`notification-bar ${type} ${enterAnimation ? 'enter' : ''}`}>
      <span>{message}</span>
      <FiX onClick={handleClose} className="close-icon" />
    </div>
  );
};

NotificationBar.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error']).isRequired,
  duration: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};

export default NotificationBar;
