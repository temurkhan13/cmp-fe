import DashboardLayout from '../../layout/DashboardLayout';
import Component from '../../components';
import { FiPlus } from 'react-icons/fi';

const MyAssistant = () => {
  return (
    <DashboardLayout>
      <div style={styles.container}>
        <p style={styles.recentFilesText}>Recent Files</p>
        <div style={styles.recentFilesContainer}>
          <Component.Dashboard.RecentCard />
          <Component.Dashboard.RecentCard />
          <Component.Dashboard.RecentCard />
          <Component.Dashboard.RecentCard />
        </div>
      </div>

      <div style={styles.aiAssessmentContainer}>
        <div><p style={styles.aiAssessmentText}>AI Assessment</p></div>
        <div>
          <button style={styles.customizeButton}>
            <FiPlus /> Customize
          </button>
          <button style={styles.addButton}>
            <FiPlus /> Add New
          </button>
        </div>
      </div>

      <div style={styles.recentFolders}>
        <p style={styles.recentFilesText}>Folders</p>
        <div style={styles.folderContainer}>
          <Component.Dashboard.FolderCard />
          <Component.Dashboard.FolderCard />
          <Component.Dashboard.FolderCard />
          <Component.Dashboard.FolderCard />
          <Component.Dashboard.FolderCard />
        </div>
      </div>

      <div style={styles.fileContainer}>
        <p style={styles.recentFilesText}>Files</p>
        <div style={styles.recentFilesContainer}>
          <Component.Dashboard.RecentCard />
          <Component.Dashboard.RecentCard />
          <Component.Dashboard.RecentCard />
          <Component.Dashboard.RecentCard />
          <Component.Dashboard.RecentCard />
          <Component.Dashboard.RecentCard />
        </div>
      </div>
    </DashboardLayout>
  );
};

const styles = {
  container: {
    backgroundColor: 'rgba(249, 249, 249, 1)',
    padding: '1rem 2rem',
  },
  recentFilesText: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '34px',
    letterSpacing: '0.12px',
  },
  recentFilesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  aiAssessmentContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '2rem',
    
  },
  aiAssessmentText: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '600',
    fontSize: '28px',
    lineHeight: '36px',
    letterSpacing: '0.12px',
  },
  customizeButton: {
    color: 'rgba(11, 20, 68, 1)',
    fontSize: '14px',
    lineHeight: '23px',
    letterSpacing: '0.12px',
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '10px 16px',
    border: '1px solid black',
  },
  addButton: {
    color: 'rgba(11, 20, 68, 1)',
    fontSize: '14px',
    lineHeight: '23px',
    letterSpacing: '0.12px',
    backgroundColor: 'rgba(195, 225, 29, 1)',
    borderRadius: '8px',
    padding: '10px 16px',
    border: 'none',
    marginLeft: '1rem',
  },
  recentFolders: {
    padding: '1rem 2rem',
  },
  folderContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  fileContainer: {
    padding: '1rem 2rem',
  },
  '@media (max-width: 768px)': {
    folderContainer: {
      flexDirection: 'column',
      gap: '10px',
    },
  },
};

export default MyAssistant;
