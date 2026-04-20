import FolderIcon from '../../assets/dashboard/folderIcon.png';
import styles from '../../../scss/modules/dashboard/dashboard.module.scss';

const FolderStructure = () => {
  const folders = [
    { name: 'folder1' },
    { name: 'folder1' },
    { name: 'folder1' },
    { name: 'folder1' },
    { name: 'folder1' },
    { name: 'folder1' },
    { name: 'folder1' },
    { name: 'folder1' },
    { name: 'folder1' },
    { name: 'folder1' },
    { name: 'folder1' },
    { name: 'folder1' },
    { name: 'folder1' },
    { name: 'folder1' },
    { name: 'folder1' },
    { name: 'folder1' },
    { name: 'folder1' },
    { name: 'folder1' },
    { name: 'folder1' },
    { name: 'folder1' },
    { name: 'folder1' },
    { name: 'folder1' },
    { name: 'folder1' },
    { name: 'folder1' },
    { name: 'folder1' },
    { name: 'folder1' },
    { name: 'folder1' },
    { name: 'folder1' },
  ];

  return (
    <section className={styles.assistant}>
      <div className={styles.heading}>
        <p>Folders</p>
        <p className="folder-structure__see-all">
          See All (23)
        </p>
      </div>

      <div className={styles.fileContainer}>
        {folders.map(({ name }, index) => (
          <div key={index} className={styles.files}>
            <img
              src={FolderIcon}
              alt=""
              className="folder-structure__icon"
            />
            <p>{name}</p>
            <p className="folder-structure__file-count">
              2 files
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FolderStructure;
