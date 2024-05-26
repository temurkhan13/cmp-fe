import FolderIcon from "../../assets/dashboard/folderIcon.png";
import styles from "../../style/dashboard/dashboard.module.scss";

const FolderStructure = () => {
  const folders = [
    { name: "folder1" },
    { name: "folder1" },
    { name: "folder1" },
    { name: "folder1" },
    { name: "folder1" },
    { name: "folder1" },
    { name: "folder1" },
    { name: "folder1" },
    { name: "folder1" },
    { name: "folder1" },
    { name: "folder1" },
    { name: "folder1" },
    { name: "folder1" },
    { name: "folder1" },
    { name: "folder1" },
    { name: "folder1" },
    { name: "folder1" },
    { name: "folder1" },
    { name: "folder1" },
    { name: "folder1" },
    { name: "folder1" },
    { name: "folder1" },
    { name: "folder1" },
    { name: "folder1" },
    { name: "folder1" },
    { name: "folder1" },
    { name: "folder1" },
    { name: "folder1" },
  ];

  return (
    <section className={styles.assistant}>
      <div className={styles.heading}>
        <p>Folders</p>
        <p
          style={{
            fontWeight: "normal",
            fontSize: "14px",
          }}
        >
          See All (23)
        </p>
      </div>

      <div className={styles.fileContainer}>
        {folders.map(({ name }, index) => (
          <div key={index} className={styles.files}>
            <img
              src={FolderIcon}
              alt=""
              style={{
                width: "65px",
                height: "55px",
              }}
            />
            <p>{name}</p>
            <p
              style={{
                color: "rgba(0, 102, 255, 1)",
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

export default FolderStructure;
