import { useState } from 'react';
import PropTypes from 'prop-types';

import { GoPlus } from 'react-icons/go';
import { CiSearch } from 'react-icons/ci';
import { IoMdCheckmark } from 'react-icons/io';
import { FaRegFolderOpen } from 'react-icons/fa6';
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md';

const MoveToModal = ({ folders }) => {
  const [openFolders, setOpenFolders] = useState({});
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const handleIconClick = (folderName) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  const handleTextClick = (folderName) => {
    setSelectedFolder((prevSelected) =>
      prevSelected === folderName ? null : folderName
    );
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterFolders = (folders, searchTerm) => {
    if (!searchTerm) {
      return folders;
    }

    return folders
      .map((folder) => {
        const filteredSubfolders = filterFolders(folder.subfolders, searchTerm);

        if (
          folder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          filteredSubfolders.length > 0
        ) {
          return {
            ...folder,
            subfolders: filteredSubfolders,
          };
        }

        return null;
      })
      .filter(Boolean);
  };

  const renderFolders = (folders, parentName = '') => {
    return folders.map((folder, index) => {
      const folderName = parentName
        ? `${parentName}/${folder.name}`
        : folder.name;
      const isOpen = openFolders[folderName];
      const isSelected = selectedFolder === folderName;

      return (
        <div key={index}>
          <div style={styles.folder}>
            <div
              onClick={() => handleIconClick(folderName)}
              style={styles.iconContainer}
            >
              {isOpen ? (
                <MdKeyboardArrowDown style={styles.arrowIcon} />
              ) : (
                <MdKeyboardArrowRight style={styles.arrowIcon} />
              )}
              <FaRegFolderOpen style={styles.icon} />
            </div>
            <div
              style={styles.folderText}
              onClick={() => handleTextClick(folderName)}
            >
              {folder.name}
              {isSelected && <IoMdCheckmark style={styles.checkIcon} />}
            </div>
          </div>
          {isOpen && folder.subfolders && (
            <div style={styles.subfolderContainer}>
              {folder.subfolders.length > 0 ? (
                renderFolders(folder.subfolders, folderName)
              ) : (
                <div style={styles.noFolder}>No items</div>
              )}
            </div>
          )}
        </div>
      );
    });
  };

  const filteredFolders = filterFolders(folders, searchTerm);

  return (
    <>
      <div style={styles.searchContainer}>
        <CiSearch
          style={{ marginRight: '0.3rem', fontSize: '2rem', color: 'black' }}
        />
        <input
          placeholder="Move file to"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          style={styles.input}
        />
      </div>
      <hr style={styles.straightLine} />
      <div style={styles.title}>Suggested</div>
      <div style={styles.container}>{renderFolders(filteredFolders)} </div>
      <hr style={styles.straightLine} />
      <button style={styles.folderBtn}>
        <GoPlus size={18} />
        New Folder
      </button>
      <hr style={styles.straightLine} />
    </>
  );
};

MoveToModal.propTypes = {
  folders: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      subfolders: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          subfolders: PropTypes.array,
        })
      ),
    })
  ).isRequired,
};

const styles = {
  container: {
    padding: '1rem',
    maxHeight: '50vh',
    overflowY: 'auto',
    scrollbarWidth: 'thin',
    scrollbarColor: '#888 #e0e0e0',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    border: '0.15rem solid lightgray',
    borderRadius: '1rem',
    padding: '0.7rem 4rem 0.7rem 1rem',
    marginBottom: '1rem',
  },
  input: {
    outline: 'none',
    border: 'none',
    padding: '0.5rem',
    flex: 1,
  },
  folder: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '0.5rem 0',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '500',
    margin: '1rem 0 1rem 0',
    display: 'flex',
    color: 'black',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '0.5rem',
  },
  icon: {
    marginRight: '0.5rem',
    fontSize: '1.5rem',
  },
  arrowIcon: {
    marginRight: '0.5rem',
  },
  folderText: {
    flex: 1,
    fontSize: '1.3rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'black',
  },
  checkIcon: {
    marginLeft: '0.5rem',
  },
  subfolderContainer: {
    paddingLeft: '1.25rem',
  },
  subfolder: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.3rem 0',
  },
  noFolder: {
    paddingLeft: '1.75rem',
    color: 'grey',
    fontSize: '1.3rem',
  },
  folderBtn: {
    margin: '1rem 0',
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    color: 'blue',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.7rem',
    fontWeight: '550',
  },
  straightLine: {
    borderTop: '0.0625rem solid lightgray',
  },
};

export default MoveToModal;
