import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';
import Button from '../common/Button';

import './custom-dropdown.scss';

const SearchDropdown = ({ title, items, visible, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim()) {
      window.find(e.target.value, false, false, true, false, true, false);
    } else {
      // If the query is empty, clear the search highlights
      window.find('');
    }
  };

  // Filter and sort items based on the search term
  const filteredItems = items
    .filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort();

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e);
    setCurrentIndex(0);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setCurrentIndex((prevIndex) =>
        Math.min(prevIndex + 1, filteredItems.length - 1)
      );
    } else if (e.key === 'ArrowUp') {
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  // Return null if the dropdown is not visible
  if (!visible) return null;

  return (
    <div className="custom-dropdown-search">
      <div className="custom-dropdown-search-header">
        <p className="custom-dropdown-search-title">{title}</p>
        <Button
          variant="icon"
          ariaLabel="Close"
          className="custom-dropdown-close-button"
          onClick={onClose}
        >
          <RxCross2 className="custom-dropdown-cross-icon" />
        </Button>
      </div>
      <hr className="custom-dropdown-search-hr" />
      <div className="custom-dropdown-search-input">
        <CiSearch className="custom-dropdown-search-icon" />
        <input
          type="text"
          placeholder="Find any word"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="custom-dropdown-input"
        />
        <span className="custom-dropdown-search-count">
          {currentIndex + 1}/{filteredItems.length}
        </span>
        <span>|</span>
        <div className="custom-dropdown-nav-buttons">
          <Button
            variant="icon"
            ariaLabel="Previous"
            className="custom-dropdown-nav-button"
            onClick={() => setCurrentIndex(Math.max(currentIndex - 1, 0))}
          >
            <FaChevronUp />
          </Button>
          <Button
            variant="icon"
            ariaLabel="Next"
            className="custom-dropdown-nav-button"
            onClick={() =>
              setCurrentIndex(
                Math.min(currentIndex + 1, filteredItems.length - 1)
              )
            }
          >
            <FaChevronDown />
          </Button>
        </div>
      </div>
      {searchTerm && ( // Only show the list when there is a search term
        <ul className="custom-dropdown-search-list">
          {filteredItems.map((item, index) => (
            <li
              key={index}
              className={
                index === currentIndex
                  ? 'custom-dropdown-search-list-item--highlighted'
                  : 'custom-dropdown-search-list-item'
              }
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

SearchDropdown.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SearchDropdown;
