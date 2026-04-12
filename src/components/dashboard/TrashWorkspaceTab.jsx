import { useState, useRef, useEffect } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { FaFolder, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  restoreFromTrash,
  deleteFromTrashAsync,
  fetchTrashItemsAsync, // Import fetchTrashItemsAsync
} from '../../redux/slices/trashSlice';
import { BsWindowStack } from 'react-icons/bs';

const TrashFolderTab = () => {
  return (
    <div className="folder-content">
      <FaTrash size={50} />
      <p className="trash-activity">No recent trash here</p>
      <p>
        Any file you trash will end up here. You&apos;ll have 30 days <br />
        to restore them before they are automatically deleted <br />
        from your Trash.
      </p>
      <style>{`
        .folder-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin: 0 auto;
          align-items: center;
          text-align: center;
          color: #666;
        }
        p {
          margin: 0.3125rem 0;
          font-size: 1.2rem;
        }
        .trash-activity {
          font-size: 1.4rem;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

const TrashWorkspaceTab = ({ workspaces }) => {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const trashItems = useSelector((state) => state.trash.trashItems); // Get the current trash items from Redux

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const handleRestore = async (id) => {
    try {
      await dispatch(restoreFromTrash({ type: 'workspace', id }));
      dispatch(fetchTrashItemsAsync()); // Re-fetch the data after restore
    } catch (error) { if (import.meta.env.DEV) console.error(error); }
  };

  const handleDeletePermanently = async (id) => {
    try {
      const resultAction = await dispatch(
        deleteFromTrashAsync({ type: 'workspace', id })
      );
      if (deleteFromTrashAsync.rejected.match(resultAction)) {
      } else {
        dispatch(fetchTrashItemsAsync()); // Re-fetch the data after deletion
      }
    } catch (error) { if (import.meta.env.DEV) console.error(error); }
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
        {workspaces.length > 0 ? (
          workspaces.map((workspace) => (
            <li key={workspace._id} className="workspace-item">
              <BsWindowStack className="folder-icon" />
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
                    <li onClick={() => handleRestore(workspace._id)}>
                      Restore
                    </li>
                    <li onClick={() => handleDeletePermanently(workspace._id)}>
                      Delete Permanently
                    </li>
                  </ul>
                )}
              </div>
            </li>
          ))
        ) : (
          <TrashFolderTab />
        )}
      </ul>
      <style>{`
        .workspace-content {
          width: 100%;
          text-align: left;
        }
        .workspace-items {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 15px;
          padding: 0;
          margin: 0 0 0 50px;
          list-style: none;
        }
        .workspace-item {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          width: 30%;
          min-width: 280px;
          max-width: 400px;
          padding: 15px 20px;
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 5px;
          margin-top: 10px;
          transition: box-shadow 0.3s, background-color 0.3s;
        }
        .workspace-item:hover {
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          background-color: #f0f0f0;
        }
        .folder-icon {
          font-size: 2.5rem;
          color: #666;
          transition: transform 0.3s;
          margin-right: 20px;
        }
        .workspace-item:hover .folder-icon {
          transform: scale(1.1);
        }
        .workspace-details {
          flex-grow: 1;
          margin-right: 10px;
        }
        .workspace-name {
          font-size: 1.4rem;
          font-weight: 600;
          margin: 0;
          color: #333;
        }
        .workspace-description {
          color: #888;
          margin-top: 5px;
          font-size: 1.1rem;
          max-height: 3rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
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
        }
        .dropdown-menu li {
          padding: 10px 15px;
          cursor: pointer;
        }
        .dropdown-menu li:hover {
          background-color: #f0f0f0;
        }
      `}</style>
    </div>
  );
};

export default TrashWorkspaceTab;
