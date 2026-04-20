import { FaTimes, FaSearch, FaArrowRight } from 'react-icons/fa';
import assets from '../../assets';
import { FiPlus } from 'react-icons/fi';
import './dashboard-inline.scss';

const MoveToTrash = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="move-trash-backdrop">
      <div className="move-trash-modal">
        <div className="move-trash__header">
          <h2 className="move-trash__heading">Move to folder</h2>
          <FaTimes className="move-trash__close-icon" onClick={onClose} />
        </div>
        <hr />
        <div className="move-trash__search-bar">
          <FaSearch className="move-trash__search-icon" />
          <input
            type="text"
            placeholder="Search..."
            className="move-trash__search-input"
          />
        </div>
        <hr />
        <h3 className="move-trash__suggested-heading">
          Suggested
        </h3>
        <div className="move-trash__suggested-items">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="move-trash__suggested-item">
              <FaArrowRight className="move-trash__arrow-icon" />
              <div className="move-trash__suggest-container">
                <img
                  src={assets.dashboard.FolderIcon}
                  alt="Folder Icon"
                  className="move-trash__folder-icon"
                />
                <p>Testing Folders II</p>
              </div>
            </div>
          ))}
        </div>
        <hr />
        <div className="move-trash__new-folder-wrapper">
          <button className="move-trash__new-folder-btn">
            <FiPlus className="move-trash__plus-icon" /> New Folder
          </button>
        </div>
        <hr />
        <div className="move-trash__buttons">
          <button
            className="move-trash__btn move-trash__cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="move-trash__btn move-trash__move-btn"
            onClick={() => {
              /* Handle move action */
            }}
          >
            Move
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoveToTrash;
