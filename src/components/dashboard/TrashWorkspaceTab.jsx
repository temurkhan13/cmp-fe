import { useState, useRef, useEffect } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { FaFolder } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import {
  restoreFromTrash,
  deleteFromTrash,
} from '../../redux/slices/trashSlice';

const TrashWorkspaceTab = ({ workspaces }) => {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const handleRestore = (id) => {
    dispatch(restoreFromTrash({ type: 'workspace', id }));
  };

  const handleDeletePermanently = (id) => {
    dispatch(deleteFromTrash({ type: 'workspace', id }));
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="workspace-content">
      <ul className="workspace-items">
        {workspaces.map((workspace) => (
          <li key={workspace._id} className="workspace-item">
            <FaFolder className="folder-icon" />
            <div className="workspace-details">
              <h3 className="workspace-name">{workspace.workspaceName}</h3>
              <p className="workspace-description">
                {workspace.workspaceDescription || 'No description'}
              </p>
            </div>
            <div className="dropdown">
              <button
                className="dropdown-button"
                onClick={() => toggleDropdown(workspace._id)}
              >
                <FiMoreHorizontal size={20} />
              </button>
              {dropdownOpen === workspace._id && (
                <ul className="dropdown-menu" ref={dropdownRef}>
                  <li onClick={() => handleRestore(workspace._id)}>Restore</li>
                  <li onClick={() => handleDeletePermanently(workspace._id)}>
                    Delete Permanently
                  </li>
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
      <style>{`
        .workspace-content {
          width: 100%;
          text-align: left;
        }
        .workspace-items {
          display: flex;
          flex-direction: row; /* Align items horizontally */
          flex-wrap: wrap; /* Wrap items if there's no space */
          gap: 15px; /* Space between items */
          padding: 0;
          margin: 0 0 0 50px;
          list-style: none;
        }
        .workspace-item {
          display: flex;
          flex-direction: row; /* Folder icon on the left, content on the right */
          align-items: center; /* Vertically align content */
          justify-content: space-between;
          width: 30%; /* Adjust width as needed for the layout */
          min-width: 280px; /* Ensure items don't get too narrow */
          max-width: 400px; /* Ensure items don't get too wide */
          padding: 15px 20px; /* Adjusted padding */
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 5px;
          margin-top:10px;
          transition: box-shadow 0.3s, background-color 0.3s; /* Smooth transitions */
        }
        .workspace-item:hover {
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Hover effect */
          background-color: #f0f0f0;
        }
        .folder-icon {
          font-size: 2.5rem; /* Larger size for folder icon */
          color: #666;
          transition: transform 0.3s;
          margin-right: 20px; /* Add spacing between icon and content */
        }
        .workspace-item:hover .folder-icon {
          transform: scale(1.1); /* Slightly increase size on hover */
        }
        .workspace-details {
          flex-grow: 1; /* Ensure details take up available space */
          margin-right: 10px;
        }
        .workspace-name {
          font-size: 1.4rem; /* Larger font for the workspace name */
          font-weight: 600;
          margin: 0;
          color: #333;
        }
        .workspace-description {
          color: #888;
          margin-top: 5px;
          font-size: 1.1rem; /* Slightly smaller for the description */
          max-height: 3rem; /* Limit height to 3 lines */
          overflow: hidden; /* Hide overflowed content */
          text-overflow: ellipsis; /* Add ellipsis for truncated text */
          display: -webkit-box; /* Support for webkit */
          -webkit-line-clamp: 2; /* Limit to 2 lines */
          -webkit-box-orient: vertical; /* Required for ellipsis on multiple lines */
        }
        .dropdown {
          position: relative;
          align-self: flex-end;
        }
        .dropdown-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 5px;
          border-radius: 50%;
          transition: background-color 0.3s;
        }
        .dropdown-button:hover {
          background-color: rgba(0, 0, 0, 0.1); /* Hover effect for button */
        }
        .dropdown-menu {
          position: absolute;
          top: 30px;
          right: 0;
          background-color: white;
          border: 1px solid #ddd;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          width: 160px;
          padding: 0;
          border-radius: 5px;
          overflow: hidden; /* Avoids overflow on hover */
          transition: all 0.3s;
        }
        .dropdown-menu li {
          padding: 10px 15px;
          cursor: pointer;
          font-size: 1.1rem;
          transition: background-color 0.2s;
        }
        .dropdown-menu li:hover {
          background-color: #f0f0f0;
        }
      `}</style>
    </div>
  );
};

export default TrashWorkspaceTab;
