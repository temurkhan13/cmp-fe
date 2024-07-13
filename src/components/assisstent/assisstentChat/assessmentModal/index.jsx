import PropTypes from 'prop-types';

import { RxCross2 } from 'react-icons/rx';

const AssessmentModal = ({ title, bodyContent, onClose }) => {
  const closeModal = () => {
    onClose();
  };
  return (
    <>
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <p className="header-title">{title}</p>
            <button className="close-button" onClick={closeModal}>
              <RxCross2 />
            </button>
          </div>
          <hr className="straight-Line" />
          <div className="modal-body">{bodyContent}</div>
        </div>
      </div>
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          // background: rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal {
          position: absolute;
          right: 10rem; /* Set the left offset to 10rem */
        //   top:5rem;
          width: 35rem;
          height: 98vh;
          background: #fff;
          display: flex;
          flex-direction: column;
          border-radius: 8px;
          overflow-y: auto;
          box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.2rem;
          border-bottom: 1px solid #e0e0e0;
        }
          .header-title{
          font-size: 1.7rem;
          font-weight:bold;
          color:"#000
          }
        .modal-body {
          padding: 1rem;
          flex: 1;
          overflow-y: auto;
        }
        .close-button {
          background: #f1f1f1;
          border: none;
          cursor: pointer;
          font-size: 1.6rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.4rem;
          height: 2.4rem;
        }
        .straight-Line {
          border-bottom: 1px solid #f1f1f1;
        }
      `}</style>
    </>
  );
};

AssessmentModal.propTypes = {
  title: PropTypes.string.isRequired,
  bodyContent: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AssessmentModal;
