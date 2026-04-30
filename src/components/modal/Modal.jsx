import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { RxCross2 } from 'react-icons/rx';

const Modal = ({ title, headerSlot, isOpen, onClose, footer, children, width }) => {
  const overlayRef = useRef(null);

  const customStyles = {
    width: width ? width : 'unset',
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleEscClose = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscClose);
    return () => {
      window.removeEventListener('keydown', handleEscClose);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return createPortal(
    <div className="common-modal-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="common-modal-content" style={customStyles}>
        <div className="common-modal-header">
          {headerSlot ?? <h2 className="common-modal-title">{title}</h2>}
          <RxCross2 className="common-modal-close" onClick={onClose} />
        </div>
        <div className="common-modal-body">{children}</div>
        {footer && <div className="common-modal-footer">{footer}</div>}
      </div>
    </div>,
    document.body
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  headerSlot: PropTypes.node,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  footer: PropTypes.node,
  children: PropTypes.node.isRequired,
};

export default Modal;
