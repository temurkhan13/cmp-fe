import { useState, useRef, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { FaFileAlt, FaFolder } from 'react-icons/fa';
import DashboardLayout from '@layout/DashboardLayout';
import Component from '@components';
import '@styles/ChatFileManager.css';
import useManagerChat from '@hooks/useManagerChat'; // Hooks for chat manager
import Switch from 'react-switch';

const MyAssistant = () => {
  //const [ data, setData ] = useState({ folders: [] });
  const {
    managerData,
    error,
    toggleMockData,
    // moveChatToFolder,
    // renameFolder,
    // deleteFolder,
    // downloadFolderAsZip,
    // downloadChatAsPdf,
  } = useManagerChat();
  const [isLoading, setIsLoading] = useState(true);
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const addDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        addDropdownRef.current &&
        !addDropdownRef.current.contains(event.target)
      ) {
        setShowAddDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // useEffect(() => {
  //   // Fetch initial data when component mounts
  //   managerData()
  //     .then(() => setIsLoading(false))
  //     .catch((error) => {
  //       console.error("Error fetching initial data:", error);
  //       setIsLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    //setIsLoading(false);
    if (managerData) {
      // Process managerData or update UI based on managerData
      setIsLoading(false);
    }
  }, [managerData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // const fetchChats = async () => {
  //   try {
  //     const data = await managerData(); // Call the function returned by the hook
  //     setData(data);
  //   } catch (error) {
  //     console.error('Error fetching chats:', error);
  //   }
  // };

  const toggleAddDropdown = () => {
    setShowAddDropdown(!showAddDropdown);
  };

  const handleAddItemClick = (action) => {
    switch (action) {
      case 'New Assessment':
        window.location.href = 'http://localhost:5173/questionnaire';
        break;
      case 'New Folder':
        window.location.href = 'http://localhost:5173/questionnaire';
        break;
      default:
        setShowAddDropdown(false);
    }
  };

  return (
    <DashboardLayout>
      <div style={styles.container}>
        <Switch
          checked={true}
          onChange={toggleMockData}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <button onClick={toggleMockData}>Toggle Mock Data</button>;
        <div style={styles.section}>
          <p style={styles.sectionTitle}>Recent Files</p>
          {/* <div style={styles.itemsContainer}>
            <div className="chat-file-manager">
              {managerData &&
                managerData.folders.map((folder) => (
                  <div className="folder" key={folder.id}>
                    <div className="folder-name">
                      <FaFolder /> {folder.name}
                    </div>
                    <div className="chats">
                      {folder.chats.map((chat) => (
                        <div className="chat-file" key={chat.id}>
                          <div className="chat-file-icon">📄</div> Icon to
                          represent file
                          <div className="chat-file-title">{chat.title}</div>
                          <div className="chat-file-preview">
                            {chat.content.substring(0, 100)}...
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div> */}

          {managerData &&
            managerData.folders.map((folder) => (
              <div key={folder.id}>
                {folder.chats.map((chat) => (
                  <Component.Dashboard.RecentCard
                    style={styles.cardsStyle}
                    key={chat.id}
                    chat={[folder.name, chat]}
                  />
                ))}
              </div>
            ))}
          <Component.Dashboard.RecentCard />
          <Component.Dashboard.RecentCard />
        </div>
        <div style={styles.section}>
          <div style={styles.aiAssessmentContainer}>
            <p style={styles.sectionTitle}>AI Assessment</p>
            <div style={styles.buttonGroup}>
              <button style={styles.customizeButton}>
                <FiPlus /> Customize
              </button>
              <div ref={addDropdownRef} style={styles.dropdownContainer}>
                <button style={styles.addButton} onClick={toggleAddDropdown}>
                  <FiPlus /> Add New
                </button>
                {showAddDropdown && (
                  <div style={styles.dropdown}>
                    <p
                      style={styles.dropdownItem}
                      onClick={() => handleAddItemClick('New Assessment')}
                    >
                      <FaFileAlt style={styles.dropdownIcon} /> New Assessment
                    </p>
                    <p
                      style={styles.dropdownItem}
                      onClick={() => handleAddItemClick('New Folder')}
                    >
                      <FaFolder style={styles.dropdownIcon} /> New Folder
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div style={styles.section}>
          <p style={styles.sectionTitle}>Folders</p>
          <div style={styles.itemsContainer}>
            {managerData &&
              managerData.folders.map((folder) => (
                <Component.Dashboard.FolderCard
                  key={folder.id}
                  folder={folder}
                />
              ))}
            <Component.Dashboard.FolderCard />
            <Component.Dashboard.FolderCard />
            <Component.Dashboard.FolderCard />
            <Component.Dashboard.FolderCard />
            <Component.Dashboard.FolderCard />
          </div>
        </div>
        <div style={styles.section}>
          <p style={styles.sectionTitle}>Files</p>
          <div style={styles.itemsContainer}>
            <Component.Dashboard.RecentCard />
            <Component.Dashboard.RecentCard />
            <Component.Dashboard.RecentCard />
            <Component.Dashboard.RecentCard />
            <Component.Dashboard.RecentCard />
            <Component.Dashboard.RecentCard />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const styles = {
  container: {
    backgroundColor: 'rgba(249, 249, 249, 1)',
    padding: '1rem 2rem',
    overflowX: 'hidden',
  },
  section: {
    marginTop: '20px',
    gap: '2rem',
    // display: 'flex',
  },
  cardsStyle: {
    // display: 'flez',
  },
  sectionTitle: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '34px',
    letterSpacing: '0.12px',
  },
  itemsContainer: {
    display: 'flex',
    // flexWrap: 'wrap',
    gap: '10px',
  },
  aiAssessmentContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonGroup: {
    display: 'flex',
    alignItems: 'center',
  },
  customizeButton: {
    marginRight: '10px',
    padding: '10px 16px',
    fontSize: '14px',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid black',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  addButton: {
    padding: '10px 16px',
    fontSize: '14px',
    backgroundColor: 'rgba(195, 225, 29, 1)',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    marginLeft: '1rem',
  },
  dropdownContainer: {
    position: 'relative',
    display: 'inline-block',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 'auto',
    right: '0',
    backgroundColor: 'white',
    boxShadow: '0px 8px 16px rgba(10, 10, 10, 0.1)',
    borderRadius: '8px',
    zIndex: '100',
    minWidth: '190px',
    padding: '8px 0',
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '14px',
    color: 'rgba(10, 10, 10, 0.8)',
  },
  dropdownIcon: {
    marginRight: '8px',
  },
  '@media (max-width: 768px)': {
    itemsContainer: {
      flexDirection: 'column',
      gap: '10px',
    },
    dropdown: {
      right: '0',
      left: 'auto',
      minWidth: '100%',
    },
  },
};

export default MyAssistant;
