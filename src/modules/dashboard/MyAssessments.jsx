// import DashboardLayout from '../../layout/DashboardLayout';
// import Component from '../../components';
// import { FiPlus } from 'react-icons/fi';
// import { useState, useRef, useEffect } from 'react';
// import { FaFileAlt, FaFolder } from 'react-icons/fa';

// const MyAssistant = () => {
//   const [showAddDropdown, setShowAddDropdown] = useState(false);
//   const addDropdownRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         addDropdownRef.current &&
//         !addDropdownRef.current.contains(event.target)
//       ) {
//         setShowAddDropdown(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const toggleAddDropdown = () => {
//     setShowAddDropdown(!showAddDropdown);
//   };

//   const handleAddItemClick = (action) => {
//     switch (action) {
//       case 'New Assessment':
//         history.push('/questionnaire');
//         break;
//       case 'New Folder':
//         break;
//       default:
//         setShowAddDropdown(false);
//     }
//   };

//   return (
//     <DashboardLayout>
//       <div style={styles.container}>
//         <p style={styles.recentFilesText}>Recent Files</p>
//         <div style={styles.recentFilesContainer}>
//           <Component.Dashboard.RecentCard />
//           <Component.Dashboard.RecentCard />
//           <Component.Dashboard.RecentCard />
//           <Component.Dashboard.RecentCard />
//         </div>
//       </div>

//       <div style={styles.aiAssessmentContainer}>
//         <div>
//           <p style={styles.aiAssessmentText}>AI Assessment</p>
//         </div>
//         <div>
//           <button style={styles.customizeButton}>
//             <FiPlus /> Customize
//           </button>
//           <div
//             ref={addDropdownRef}
//             style={{ position: 'relative', display: 'inline-block' }}
//           >
//             <button style={styles.addButton} onClick={toggleAddDropdown}>
//               <FiPlus /> Add New
//             </button>
//             {showAddDropdown && (
//               <div style={styles.addDropdown}>
//                 <p
//                   style={styles.addDropdownItem}
//                   onClick={() => handleAddItemClick('New Assessment')}
//                 >
//                   <FaFileAlt style={styles.dropdownIcon} /> New Assessment
//                 </p>
//                 <p
//                   style={styles.addDropdownItem}
//                   onClick={() => handleAddItemClick('New Folder')}
//                 >
//                   <FaFolder style={styles.dropdownIcon} /> New Folder
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <div style={styles.recentFolders}>
//         <p style={styles.recentFilesText}>Folders</p>
//         <div style={styles.folderContainer}>
//           <Component.Dashboard.FolderCard />
//           <Component.Dashboard.FolderCard />
//           <Component.Dashboard.FolderCard />
//           <Component.Dashboard.FolderCard />
//           <Component.Dashboard.FolderCard />
//         </div>
//       </div>

//       <div style={styles.fileContainer}>
//         <p style={styles.recentFilesText}>Files</p>
//         <div style={styles.recentFilesContainer}>
//           <Component.Dashboard.RecentCard />
//           <Component.Dashboard.RecentCard />
//           <Component.Dashboard.RecentCard />
//           <Component.Dashboard.RecentCard />
//           <Component.Dashboard.RecentCard />
//           <Component.Dashboard.RecentCard />
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// const styles = {
//   container: {
//     backgroundColor: 'rgba(249, 249, 249, 1)',
//     padding: '1rem 2rem',
//   },
//   recentFilesText: {
//     fontFamily: 'Poppins, sans-serif',
//     fontWeight: '500',
//     fontSize: '16px',
//     lineHeight: '34px',
//     letterSpacing: '0.12px',
//   },
//   recentFilesContainer: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     gap: '10px',
//   },
//   aiAssessmentContainer: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     padding: '2rem',
//     alignItems: 'center',
//     // justifyContent: 'space-between',
//     marginTop: '20px',
//   },
//   aiAssessmentText: {
//     fontFamily: 'Poppins, sans-serif',
//     fontWeight: '600',
//     fontSize: '28px',
//     lineHeight: '36px',
//     letterSpacing: '0.12px',
//   },
//   customizeButton: {
//     color: 'rgba(11, 20, 68, 1)',
//     fontSize: '14px',
//     lineHeight: '23px',
//     letterSpacing: '0.12px',
//     backgroundColor: 'white',
//     borderRadius: '8px',
//     padding: '10px 16px',
//     border: '1px solid black',
//   },
//   addButton: {
//     color: 'rgba(11, 20, 68, 1)',
//     fontSize: '14px',
//     lineHeight: '23px',
//     letterSpacing: '0.12px',
//     backgroundColor: 'rgba(195, 225, 29, 1)',
//     borderRadius: '8px',
//     padding: '10px 16px',
//     border: 'none',
//     marginLeft: '1rem',
//   },
//   recentFolders: {
//     padding: '1rem 2rem',
//   },
//   folderContainer: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     gap: '10px',
//   },
//   fileContainer: {
//     padding: '1rem 2rem',
//   },
//   addDropdown: {
//     position: 'absolute',
//     top: '100%',
//     left: '0',
//     backgroundColor: 'white',
//     boxShadow: '0px 8px 16px rgba(10, 10, 10, 0.1)',
//     borderRadius: '8px',
//     zIndex: '100',
//     minWidth: '150px',
//     padding: '8px 0',
//   },
//   addDropdownItem: {
//     display: 'flex',
//     alignItems: 'center',
//     padding: '8px 16px',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s',
//     fontFamily: 'Poppins, sans-serif',
//     fontSize: '14px',
//     color: 'rgba(10, 10, 10, 0.8)',
//   },
//   dropdownIcon: {
//     marginRight: '8px',
//   },
//   '@media (max-width: 768px)': {
//     folderContainer: {
//       flexDirection: 'column',
//       gap: '10px',
//     },
//   },
// };

// export default MyAssistant;

import { useState, useRef, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { FaFileAlt, FaFolder } from 'react-icons/fa';
import DashboardLayout from '../../layout/DashboardLayout';
import Component from '../../components';

const MyAssistant = () => {
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const addDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (addDropdownRef.current && !addDropdownRef.current.contains(event.target)) {
        setShowAddDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleAddDropdown = () => {
    setShowAddDropdown(!showAddDropdown);
  };

  const handleAddItemClick = (action) => {
    switch (action) {
      case 'New Assessment':
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
        <div style={styles.section}>
          <p style={styles.sectionTitle}>Recent Files</p>
          <div style={styles.itemsContainer}>
            <Component.Dashboard.RecentCard />
            <Component.Dashboard.RecentCard />
            <Component.Dashboard.RecentCard />
            <Component.Dashboard.RecentCard />
          </div>
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
                    <p style={styles.dropdownItem} onClick={() => handleAddItemClick('New Assessment')}>
                      <FaFileAlt style={styles.dropdownIcon} /> New Assessment
                    </p>
                    <p style={styles.dropdownItem} onClick={() => handleAddItemClick('New Folder')}>
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
    flexWrap: 'wrap',
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
    left: 'auto', // to align it left
    right: '0', // to prevent cutting off
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
      right: '0', // Ensure it aligns within the screen
      left: 'auto', // Align it on the left side of the button
      minWidth: '100%', // Make it responsive
    },
  },
};

export default MyAssistant;
