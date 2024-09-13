// TrashWorkspaceTab.js
import { useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi'; // Import the icon from react-icons

const TrashWorkspaceTab = () => {
  // Sample data for deleted workspaces. Replace with your actual data source.
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
  ];

  // State to manage dropdown visibility
  const [dropdownOpen, setDropdownOpen] = useState(null);

  // Handle dropdown toggle
  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  // Handlers for restore and delete actions
  const handleRestore = (id) => {
    console.log(`Restore workspace with ID: ${id}`);
    // Add your restore logic here
  };

  const handleDeletePermanently = (id) => {
    console.log(`Delete workspace permanently with ID: ${id}`);
    // Add your delete logic here
  };

  return (
    <div className="workspace-content">
      <ul>
        {sampleWorkspaceData.map((workspace) => (
          <li key={workspace.id} className="workspace-item">
            <div className="workspace-details">
              <h3 className="workspace-name">{workspace.workspaceName}</h3>
              <p className="workspace-description">{workspace.description}</p>
            </div>
            <div className="dropdown">
              <button
                className="dropdown-button"
                onClick={() => toggleDropdown(workspace.id)}
              >
                <FiMoreVertical />
              </button>
              {dropdownOpen === workspace.id && (
                <ul className="dropdown-menu">
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
          max-width: 600px;
          margin: 0 auto;
        }
        h2 {
          text-align: center;
          margin-bottom: 1.5rem;
          font-size: 1.75rem;
        }
        ul {
          list-style-type: none;
          padding: 0;
        }
        .workspace-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          padding: 1rem;
          margin-bottom: 1rem;
          border-radius: 8px;
          transition: box-shadow 0.2s;
        }
        .workspace-item:hover {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .workspace-details {
          flex-grow: 1;
        }
        .workspace-name {
          margin: 0;
          font-size: 1.25rem;
          color: #333;
        }
        .workspace-description {
          margin: 0.5rem 0 0;
          font-size: 1rem;
          color: #666;
        }
        .dropdown {
          position: relative;
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
          width: 150px;
          z-index: 100;
        }
        .dropdown-menu li {
          padding: 0.5rem 1rem;
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
