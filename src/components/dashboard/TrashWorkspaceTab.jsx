import { useState, useRef, useEffect } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { FaFolder } from 'react-icons/fa';

const TrashWorkspaceTab = () => {
  const sampleWorkspaceData = [
    {
      id: 1,
      workspaceName: 'Project Alpha',
      description: 'Workspace for Project Alpha, containing drafts and notes.',
    },
    {
      id: 2,
      workspaceName: 'Marketing Plan 2024',
      description: 'Marketing strategy and planning documents.',
    },
    {
      id: 3,
      workspaceName: 'Website Redesign',
      description: 'Design assets and wireframes for the website redesign.',
    },
    {
      id: 4,
      workspaceName: 'Sales Q1 2024',
      description: 'Sales reports and strategies for Q1 2024.',
    },
  ];

  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const handleRestore = (id) => {
    console.log(`Restore workspace with ID: ${id}`);
  };

  const handleDeletePermanently = (id) => {
    console.log(`Delete workspace permanently with ID: ${id}`);
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
        {sampleWorkspaceData.map((workspace) => (
          <li key={workspace.id} className="workspace-item">
            <FaFolder className="folder-icon" />
            <div className="workspace-details">
              <h3 className="workspace-name">{workspace.workspaceName}</h3>
              <p className="workspace-description">{workspace.description}</p>
            </div>
            <div className="dropdown">
              <button
                className="dropdown-button"
                onClick={() => toggleDropdown(workspace.id)}
              >
                <FiMoreHorizontal size={20} />
              </button>
              {dropdownOpen === workspace.id && (
                <ul className="dropdown-menu" ref={dropdownRef}>
                  <li onClick={() => handleRestore(workspace.id)}>Restore</li>
                  <li onClick={() => handleDeletePermanently(workspace.id)}>
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
          text-align: left;
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
        }
        .workspace-items {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          padding: 0;
          list-style-type: none;
        }
        .workspace-item {
          display: flex;
          gap:1rem;
          // flex-direction: column;
          justify-content: space-between;
          // align-items: center;
          background-color: #f9f9f9;
          // border: 1px solid #ddd;
          padding: 1rem;
          border-radius: 8px;
          transition: box-shadow 0.2s;
          box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2);
        }
        .workspace-item:hover {
        }
        .folder-icon {
          color: #666;
          margin-bottom: 0.5rem;
          font-size:3rem;
        }
        .workspace-details {
          text-align: center;
        }
        .workspace-name {
          margin: 0;
          font-size: 1.25rem;
          color: #333;
          text-align: start;
        }
        .workspace-description {
          margin: 0.5rem 0 0;
          font-size: 1rem;
          text-align:start;

          color: #666;
        }
        .dropdown {
          position: relative;
          margin-top: 1rem;
        }
        .dropdown-button {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.5rem;
          color: #666;
        }
        .dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          background-color: #fff;
          border: 1px solid #ddd;
          border-radius: 4px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          padding: 0.5rem 0;
          list-style: none;
          margin: 0;
          width: 16rem;
          z-index: 100;
        }
        .dropdown-menu li {
          padding: 0.5rem 1rem;
          font-size:1.4rem;
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
