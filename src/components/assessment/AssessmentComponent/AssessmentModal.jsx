import { useState } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-multilevel-dropdown';
import 'react-loading-skeleton/dist/skeleton.css';
import EditModal from './EditModal';

import { RxCross2 } from 'react-icons/rx';
import { MdModeEdit } from 'react-icons/md';
import { IoSync } from 'react-icons/io5';

const AssessmentModal = ({ title, content, onDownload, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleRegenerate = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div className="modalOverlayy" onClick={onClose}>
      <div className="modall" onClick={(e) => e.stopPropagation()}>
        <div className="headerr">
          <div className="headerButtonss">
            {/* <button className="generate-button" onClick={handleRegenerate}>
              <IoSync style={{ marginRight: '0.5rem' }} /> Regenerate
              </button> */}
            <button
              className="edit-button"
              style={{ display: 'none' }}
              onClick={openModal}
            >
              <MdModeEdit
                style={{ marginRight: '0.3rem', fontSize: '1.5rem' }}
              />
              Edit
            </button>
            {isModalOpen && (
              <EditModal isOpen={isModalOpen} onClose={closeModal} />
            )}
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <h2 className="titlee">{title}</h2>
          <button className="closeButton" onClick={onClose}>
            <RxCross2 style={{ fontSize: '2rem' }} />
          </button>
          <div className="content">{content}</div>
        </div>
      </div>
      <style>{`
        .modalOverlayy {
          position: fixed;
          top: 0;
          left: 0;
          right:0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.3);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10;
        }
        .modall {
          left:20%;
          right:100%;
          height: 100%;
          display: flex;
          overflow-y: scroll;
          background-color: white;
          padding: 2rem;
          width: fit-content !important;
          // border-radius: 0.5rem;
          // flex-direction: column;
          // box-shadow: 0 0.125rem 0.625rem rgba(0, 0, 0, 0.1);
        }
        .headerr {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.625rem 1.25rem;
          border-bottom: 0.0625rem solid #ddd;
        }
        .titlee {
          margin: 0;
          font-size: 1.5rem;
        }
        .headerButtonss {
          display: flex;
          align-items: center;
          justify-content: center;
          gap:1rem;
        }
        .generate-button {
          background-color: transparent;
          color: blue;
          display:flex;
          border: none;
          padding: 1rem;
          cursor: pointer;
          align-items: center;
          font-size:1.5rem;

        }
        .dropdown {
          position: relative;
          display: inline-block;
        }
        .dropdownContent {
          display: none;
          position: absolute;
          background-color: #f9f9f9;
          min-width: 10rem;
          box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.2);
          z-index: 1;
        }
        .dropdown:hover .dropdownContent {
          display: block;
        }
          .edit-button{
            border:none;
            outline:none;
            padding:1rem;
            font-size:1.3rem;
            display:flex;
          font-weight:500;
          border-radius:1rem;
          background-color:lightgray;
          }
          ._dropdown_15ws1_1 ._button_15ws1_5._button-secondary_15ws1_54 {
          background-color: lightgray;
          font-size:1.3rem;
          font-weight:500;
          border-radius:1rem;
          }
        .closeButton {
          background-color: transparent;
          border: none;
          position: absolute;
          right: -15px;
          top: -10px;
          font-size: 1.5rem;
          cursor: pointer;
          background-color: #f1f1f1;
        //   margin:1rem;
          display:flex;
          border-radius:50%;
          padding:0.5rem;
        }
        .separator {
          margin: 0;
        }
        .content {
          padding: 1.25rem;
          overflow-y: auto;
        }
          .dropdown-btn{
          padding: 0.5rem;
          }
      `}</style>
    </div>
  );
};

AssessmentModal.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(PropTypes.string).isRequired,
  onRegenerate: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AssessmentModal;
