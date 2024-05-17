import FolderIcon from "../../assets/dashboard/folderIcon.png";

const FolderStructure = () => {
  const folders = [
    { name: "folder1" },
    { name: "folder1" },
    { name: "folder1" },
    { name: "folder1" },
    { name: "folder1" },
    { name: "folder1" },
    { name: "folder1" },
  ];

  return (
    <section className="assistant">
      <div
        style={{
          display: "flex",
          textAlign: "center",
          justifyContent: "space-between",
          margin: "0 20px",
          fontSize: "18px",
          lineHeight: "24px",
          letterSpacing: "0.12px",
          fontWeight: 600,
          color: "rgba(10, 10, 10, 0.68)",
          fontFamily: "Poppins",
          borderBottom: "1px solid lightgray",
          padding: "10px 0",
        }}
      >
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

      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          textAlign: "center",
          margin: "40px 0",
        }}
      >
        {folders.map(({ name }, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
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
