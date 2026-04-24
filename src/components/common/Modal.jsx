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
    if (e.target.className.includes('common-modal-overlay')) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="common-modal-overlay" onClick={handleClickOutside}>
      <div className="common-modal-content">
        <div className="common-modal-header">
          <h2 className="common-modal-title">{title}</h2>
          <RxCross2 className="common-modal-close" onClick={onClose} />
        </div>
        <div className="common-modal-body">{children}</div>
      </div>
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
