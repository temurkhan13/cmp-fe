import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { RxCross2 } from 'react-icons/rx';

const Modal = ({ title, isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscClose = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscClose);
    return () => {
      window.removeEventListener('keydown', handleEscClose);
    };
  }, [onClose]);

  const handleClickOutside = (e) => {
    if (e.target.className.includes('modal-overlay')) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <RxCross2 className="close-icon" onClick={onClose} />
        </div>
        <div className="modal-body">{children}</div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10001; /* Set high z-index to ensure modal is on top */
        }
        .modal-content {
          background: white;
          padding: 2rem;
          border-radius: 1rem;
          position: relative;
          max-width: 90vw;
          max-height:98vh;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .close-icon {
          cursor: pointer;
          font-size: 2.5rem;
          background-color: lightgray;
          display: flex;
          padding: 0.3rem;
          border-radius: 50%;
        }
        .modal-title {
          margin: 0;
          font-size: 2rem;
          font-weight: 600;
        }
        .modal-body {
          font-size: 1rem;
          color: #333;
          display: flex;
          align-items: center;
          flex-direction: column;
          gap: 1rem;
          overflow-y: auto;
        }

        @media (max-width: 600px) {
          .modal-content {
            padding: 1.5rem;
            max-width: calc(100vw - 2rem);
          }
          .modal-title {
            font-size: 1.6rem;
          }
        }
      `}</style>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
