import fileIcon from '../../assets/dashboard/fileIcon.png';
import styles from '../../../scss/modules/dashboard/dashboard.module.scss';

const FileStructure = () => {
  const files = [
    {
      icon: fileIcon,
      name: 'Testing1',
    },
    {
      icon: fileIcon,
      name: 'Testing2',
    },
    {
      icon: fileIcon,
      name: 'Testing3',
    },
    {
      icon: fileIcon,
      name: 'Assistant',
    },
    {
      icon: fileIcon,
      name: 'Testing5',
    },
    {
      icon: fileIcon,
      name: 'Testing1',
    },
    {
      icon: fileIcon,
      name: 'Testing2',
    },
    {
      icon: fileIcon,
      name: 'Testing3',
    },
    {
      icon: fileIcon,
      name: 'Assistant',
    },
    {
      icon: fileIcon,
      name: 'Testing5',
    },
    {
      icon: fileIcon,
      name: 'Testing1',
    },
    {
      icon: fileIcon,
      name: 'Testing2',
    },
    {
      icon: fileIcon,
      name: 'Testing3',
    },
    {
      icon: fileIcon,
      name: 'Assistant',
    },
    {
      icon: fileIcon,
      name: 'Testing5',
    },
    {
      icon: fileIcon,
      name: 'Testing1',
    },
    {
      icon: fileIcon,
      name: 'Testing2',
    },
    {
      icon: fileIcon,
      name: 'Testing3',
    },
    {
      icon: fileIcon,
      name: 'Assistant',
    },
    {
      icon: fileIcon,
      name: 'Testing5',
    },
    {
      icon: fileIcon,
      name: 'Testing6',
    },
    {
      icon: fileIcon,
      name: 'Testing7',
    },
    {
      icon: fileIcon,
      name: 'Testing8',
    },
    {
      icon: fileIcon,
      name: 'Testing8',
    },
    {
      icon: fileIcon,
      name: 'Testing8',
    },
  ];

  return (
    <section className={styles.foldersFiles}>
      <div className={styles.Heading}>
        <p>Yesterday</p>
        <p
          style={{
            fontWeight: 'normal',
            fontSize: '14px',
          }}
        >
          See less
        </p>
      </div>

      <div className={styles.filesContainer}>
        {files.map(({ name, icon }, index) => (
          <div key={index} className={styles.files}>
            <img
              src={icon}
              alt=""
              style={{
                width: '50px',
                height: '65px',
              }}
            />
            <p>{name}</p>
            <p
              style={{
                color: 'rgba(0, 102, 255, 1)',
              }}
            >
              2 files
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FileStructure;
