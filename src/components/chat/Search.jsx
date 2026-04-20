import PropTypes from 'prop-types';
import './chat.scss';

import { IoIosArrowUp } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';
import { IoMdClose } from 'react-icons/io';
import { IoSearchOutline } from 'react-icons/io5';

const Search = ({ closeButton }) => {
  return (
    <div className="chat-dropdown-content">
      <div className="chat-sub-search-bar">
        <input type="text" placeholder="Search" />
        <IoMdClose
          className="chat-close-icon"
          onClick={closeButton}
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

Search.propTypes = {
  closeButton: PropTypes.func.isRequired,
};

export default Search;
