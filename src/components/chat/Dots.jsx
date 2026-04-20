import { IoIosArrowUp } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';
import { IoMdClose } from 'react-icons/io';
import { IoSearchOutline } from 'react-icons/io5';
import './chat.scss';
import PropTypes from 'prop-types';

const Dots = ({ closeButton }) => {
  return (
    <div className="chat-dropdown-content">
      <div className="chat-sub-search-bar">
        <input type="text" placeholder="Search" />
        <IoMdClose
          onClick={closeButton}
          className="chat-close-icon"
        />
      </div>
      <hr />
      <div className="chat-sub-search-body">
        <div className="chat-sub-search-input">
          <IoSearchOutline className="chat-sub-search-icons" />
          <input type="text" placeholder="Find any word" />
          <span className="chat-search-count">
            1/4
          </span>
          <span className="chat-sub-search-icons"></span>
          <IoIosArrowUp className="chat-sub-search-icons" />
          <IoIosArrowDown className="chat-sub-search-icons" />
        </div>
      </div>
    </div>
  );
};

Dots.propTypes = {
  closeButton: PropTypes.func.isRequired,
};

export default Dots;
