import { useState } from 'react';
import PropTypes from 'prop-types';

import { GoPlus } from 'react-icons/go';
import { CiSearch } from 'react-icons/ci';
import { IoMdCheckmark } from 'react-icons/io';
import { FaRegFolderOpen } from 'react-icons/fa6';
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md';

import NoDataAvailable from '../../components/common/NoDataAvailable';

import './custom-modal.scss';

const MoveToModal = ({ folders }) => {
  const [openFolders, setOpenFolders] = useState({});
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [folderList, setFolderList] = useState(folders);

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

  const handleNewFolderClick = () => {
    setIsCreatingFolder(true);
  };

  const handleNewFolderChange = (e) => {
    setNewFolderName(e.target.value);
  };

  const handleNewFolderSubmit = (e) => {
    if (e.key === 'Enter' && newFolderName.trim()) {
      setFolderList((prevFolders) => [
        ...prevFolders,
        { name: newFolderName, subfolders: [] },
      ]);
      setNewFolderName('');
      setIsCreatingFolder(false);
    }
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
    return folders.map((folder) => {
      const folderName = parentName
        ? `${parentName}/${folder.name}`
        : folder.name;
      const isOpen = openFolders[folderName];
      const isSelected = selectedFolder === folderName;

      return (
        <div key={folderName}>
          <div className="custom-modal-folder">
            <div
              onClick={() => handleIconClick(folderName)}
              className="custom-modal-icon-container"
            >
              {isOpen ? (
                <MdKeyboardArrowDown className="custom-modal-arrow-icon" />
              ) : (
                <MdKeyboardArrowRight className="custom-modal-arrow-icon" />
              )}
              <FaRegFolderOpen className="custom-modal-folder-icon" />
            </div>
            <div
              className="custom-modal-folder-text"
              onClick={() => handleTextClick(folderName)}
            >
              {folder.name}
              {isSelected && <IoMdCheckmark className="custom-modal-check-icon" />}
            </div>
          </div>
          {isOpen && folder.subfolders && (
            <div className="custom-modal-subfolder-container">
              {folder.subfolders.length > 0 ? (
                renderFolders(folder.subfolders, folderName)
              ) : (
                <div className="custom-modal-no-folder">No items</div>
              )}
            </div>
          )}
        </div>
      );
    });
  };

  const filteredFolders = filterFolders(folderList, searchTerm);

  return (
    <>
      <div className="custom-modal-search-container">
        <CiSearch className="custom-modal-search-icon" />
        <input
          placeholder="Move file to"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          className="custom-modal-search-input"
        />
      </div>
      <hr className="custom-modal-straight-line" />
      <div className="custom-modal-move-title">Suggested</div>
      <div className="custom-modal-move-container">
        {filteredFolders.length > 0 ? (
          renderFolders(filteredFolders)
        ) : (
          <NoDataAvailable message="No folders available" />
        )}
      </div>
      <hr className="custom-modal-straight-line" />
      {isCreatingFolder ? (
        <input
          type="text"
          value={newFolderName}
          onChange={handleNewFolderChange}
          onKeyDown={handleNewFolderSubmit}
          className="custom-modal-new-folder-input"
          placeholder="Enter folder name"
        />
      ) : (
        <button className="custom-modal-folder-btn" onClick={handleNewFolderClick}>
          <GoPlus size={18} />
          New Folder
        </button>
      )}
      <hr className="custom-modal-straight-line" />
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

export default MoveToModal;
