import { BiSolidFolderOpen } from 'react-icons/bi';

const FileStructure = () => {
  const files = [
    {
      icon: <BiSolidFolderOpen />,
      name: 'Testing1',
    },
    {
      icon: <BiSolidFolderOpen />,
      name: 'Testing2',
    },
    {
      icon: <BiSolidFolderOpen />,
      name: 'Testing3',
    },
    {
      icon: <BiSolidFolderOpen />,
      name: 'Assistant',
    },
    {
      icon: <BiSolidFolderOpen />,
      name: 'Testing5',
    },
    {
      icon: <BiSolidFolderOpen />,
      name: 'Testing1',
    },
    {
      icon: <BiSolidFolderOpen />,
      name: 'Testing2',
    },
    {
      icon: <BiSolidFolderOpen />,
      name: 'Testing3',
    },
    {
      icon: <BiSolidFolderOpen />,
      name: 'Assistant',
    },
    {
      icon: <BiSolidFolderOpen />,
      name: 'Testing5',
    },
    {
      icon: <BiSolidFolderOpen />,
      name: 'Testing1',
    },
    {
      icon: <BiSolidFolderOpen />,
      name: 'Testing2',
    },
    {
      icon: <BiSolidFolderOpen />,
      name: 'Testing3',
    },
    {
      icon: <BiSolidFolderOpen />,
      name: 'Assistant',
    },
    {
      icon: <BiSolidFolderOpen />,
      name: 'Testing5',
    },
    {
      icon: <BiSolidFolderOpen />,
      name: 'Testing1',
    },
    {
      icon: <BiSolidFolderOpen />,
      name: 'Testing2',
    },
    {
      icon: <BiSolidFolderOpen />,
      name: 'Testing3',
    },
    {
      icon: <BiSolidFolderOpen />,
      name: 'Assistant',
    },
    {
      icon: <BiSolidFolderOpen />,
      name: 'Testing5',
    },
    {
      icon: <BiSolidFolderOpen />,
      name: 'Testing6',
    },
    {
      icon: <BiSolidFolderOpen />,
      name: 'Testing7',
    },
    {
      icon: <BiSolidFolderOpen />,
      name: 'Testing8',
    },
    {
      icon: <BiSolidFolderOpen />,
      name: 'Testing8',
    },
    {
      icon: <BiSolidFolderOpen />,
      name: 'Testing8',
    },
  ];

  return (
    <section className="folders-files">
      <div className="heading">
        <p>Yesterday</p>
        <p className="see-less">See less</p>
      </div>

      <div className="files-container">
        {files.map(({ name, icon }, index) => (
          <div key={index} className="file">
            <span className="icon">{icon}</span>
            <p>{name}</p>
            <p className="file-count">2 files</p>
          </div>
        ))}
      </div>

      <style>{`
        .folders-files {
          padding: 20px;
        }
        .heading {
          display: flex;
          justify-content: space-between;
          font-size:1.5em;
          font-weight:500;
          align-items: center;
          // margin-bottom: 15px;
        }
        .see-less {
          font-weight: normal;
          font-size: 1.5rem;
          }
          .files-container {
            display: flex;
            flex-wrap: wrap;
            // gap:1rem;
            cursor:pointer;
            }
            .file {
              cursor: pointer;
          margin: 10px;
          font-size:1.3rem;
          text-align: center;
        }
          .icon{
          font-size: 5rem;
          color:gray;
          }
        .file-count {
          color: rgba(0, 102, 255, 1);
        }
      `}</style>
    </section>
  );
};

export default FileStructure;
