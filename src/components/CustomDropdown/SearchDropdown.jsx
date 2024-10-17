import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';

const SearchDropdown = ({ title, items, visible, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const [query, setQuery] = useState('');
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
    <div style={styles.searchDropdown}>
      <div style={styles.searchHeader}>
        <p style={styles.searchTitle}>{title}</p>
        <button style={styles.closeButton} onClick={onClose}>
          <RxCross2 style={styles.crossIcon} />
        </button>
      </div>
      <hr
        style={{ color: 'lightgray', marginTop: '1rem', marginBottom: '1rem' }}
      />
      <div style={styles.searchInput}>
        <CiSearch style={styles.icon} />
        <input
          type="text"
          placeholder="Find any word"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          style={styles.input}
        />
        <span style={styles.span}>
          {currentIndex + 1}/{filteredItems.length}
        </span>
        <span style={{}}>|</span>
        <div style={styles.navButtons}>
          <button
            style={styles.navButton}
            onClick={() => setCurrentIndex(Math.max(currentIndex - 1, 0))}
          >
            <FaChevronUp />
          </button>
          <button
            style={styles.navButton}
            onClick={() =>
              setCurrentIndex(
                Math.min(currentIndex + 1, filteredItems.length - 1)
              )
            }
          >
            <FaChevronDown />
          </button>
        </div>
      </div>
      {searchTerm && ( // Only show the list when there is a search term
        <ul style={styles.ul}>
          {filteredItems.map((item, index) => (
            <li
              key={index}
              style={
                index === currentIndex
                  ? { ...styles.li, ...styles.highlight }
                  : styles.li
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

// Styles object using rem units
const styles = {
  searchDropdown: {
    border: '0.0625rem solid #f1f1f1',
    borderRadius: '1rem',
    width: '35rem',
    padding: '1.5rem',
    position: 'absolute',
    top: '8rem',
    right: '6rem',
    backgroundColor: 'white',
    zIndex: 1000,
    boxShadow: '0px 4px 35px 0px #0000000D',
  },
  searchHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchTitle: {
    fontSize: '1.8rem',
    fontWeight: 600,
  },
  closeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.2rem',
  },
  searchInput: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid gray',
    borderRadius: '1rem',
    marginTop: '1rem',
  },
  icon: {
    position: 'absolute',
    left: '2rem',
    fontSize: '2rem',
    marginRight: '3rem',
  },
  crossIcon: {
    fontSize: '2.5rem',
    color: 'rgba(0, 0, 0, 0.6)',
    backgroundColor: '#f1f1f1',
    borderRadius: '50%',
    padding: '0.3rem',
    marginLeft: '0.3125rem',
  },
  input: {
    flex: 1,
    padding: '0.3125rem 0.3125rem 0.3125rem 1.5rem',
    marginLeft: '1.5rem',
    border: 'none',
    outline: 'none',
    height: '4rem',
  },
  span: {
    whiteSpace: 'nowrap',
    margin: '0 1rem',
    fontSize: '1.1rem',
  },
  navButtons: {
    display: 'flex',
    gap: '1rem',
    margin: '0 1rem 0rem 1rem',
  },
  navButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    margin: 0,
  },
  ul: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  li: {
    padding: '0.3125rem',
  },
  highlight: {
    backgroundColor: '#eee',
  },
};

SearchDropdown.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SearchDropdown;
