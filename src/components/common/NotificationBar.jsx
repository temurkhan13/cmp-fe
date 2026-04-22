import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

const NotificationBar = ({ message, type, duration = 5000, onClose }) => {
  const [visible, setVisible] = useState(true);
  const [enterAnimation, setEnterAnimation] = useState(false);

  useEffect(() => {
    // Slide in animation
    setTimeout(() => {
      setEnterAnimation(true);
    }, 100);
    //
    // Set a timer to auto-close the notification
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // Delay to allow exit animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300); // Delay for smooth closing transition
  };

  if (!visible) return null;

  return (
    <div className={`notification-bar ${type} ${enterAnimation ? 'enter' : ''}`}>
      <span>{message}</span>
      <FiX onClick={handleClose} className="close-icon" />

      <style>{`
        .notification-bar {
          position: fixed;
          top: 8rem;
          right: 10px;
          background-color: #f0f0f0;
          padding: 3rem 2rem;
          border-radius: 0.5rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 10100;
          font-size: 1.5rem;
          width: 300px;
          height:40px;
          transition: transform 0.3s ease-in-out, opacity 0.3s;
          opacity: 0;
        }

        .notification-bar.enter {
          transform: translateX(-6px);
          opacity: 1;
        }

        .notification-bar.success {
          background-color: #e6ffe6;
          color: green;
        }

        .notification-bar.error {
          background-color: #ffe6e6;
          color: red;
        }

        .notification-bar .close-icon {
          cursor: pointer;
          margin-left: 1rem;
          font-size: 2rem;
          color: #666;
        }

        .notification-bar.success .close-icon {
          color: green;
        }

        .notification-bar.error .close-icon {
          color: red;
        }

        .notification-bar.enter {
          right: 1rem;
        }

      `}</style>
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
