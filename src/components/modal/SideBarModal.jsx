import PropTypes from 'prop-types';

import { RxCross2 } from 'react-icons/rx';
import Button from '../common/Button';

const SideBarModal = ({ title, bodyContent, onClose }) => {
  const closeModal = () => {
    onClose();
  };
  return (
    <>
      <div className="sidebar-modal-overlay" onClick={closeModal}>
        <div className="sidebar-modal" onClick={(e) => e.stopPropagation()}>
          <div className="sidebar-modal-header">
            <p className="sidebar-modal-title">{title}</p>
            <Button
              variant="icon"
              ariaLabel="Close"
              className="sidebar-modal-close"
              onClick={closeModal}
            >
              <RxCross2 />
            </Button>
          </div>
          <hr className="sidebar-modal-divider" />
          <div className="sidebar-modal-body">{bodyContent}</div>
        </div>
      </div>
    </>
  );
};

SideBarModal.propTypes = {
  title: PropTypes.string.isRequired,
  bodyContent: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SideBarModal;
