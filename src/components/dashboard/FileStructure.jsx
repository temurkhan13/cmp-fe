import fileIcon from "../../assets/dashboard/fileIcon.png";

const FileStructure = () => {
  const files = [
    {
      icon: fileIcon, // Corrected from 'icone' to 'icon'
      name: "Testing1",
    },
    {
      icon: fileIcon,
      name: "Testing2",
    },
    {
      icon: fileIcon,
      name: "Testing3",
    },
    {
      icon: fileIcon,
      name: "Assistant",
    },
    {
      icon: fileIcon,
      name: "Testing5",
    },
    {
      icon: fileIcon,
      name: "Testing6",
    },
    {
      icon: fileIcon,
      name: "Testing7",
    },
    {
      icon: fileIcon,
      name: "Testing8",
    },
    {
      icon: fileIcon,
      name: "Testing8",
    },
    {
      icon: fileIcon,
      name: "Testing8",
    },
  ];

  return (
    <section className="foldersFiles">
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
          borderTop: "1px solid lightgray",
          padding: "10px 0",
        }}
      >
        <p>Files</p>
        <p
          style={{
            fontWeight: "normal",
            fontSize: "14px",
          }}
        >
          See less
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
        {files.map(({ name, icon }, index) => (
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
              src={icon}
              alt=""
              style={{
                width: "50px",
                height: "65px", // Added 'px' to height
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

export default FileStructure;
