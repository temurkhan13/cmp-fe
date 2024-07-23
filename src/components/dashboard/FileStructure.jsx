import { BiSolidFolderOpen } from 'react-icons/bi';

const FileStructure = () => {
  const files = [
    {
      icon: <BiSolidFolderOpen style={{ fontSize: '5rem' }} />,
      name: 'Testing1',
    },
    {
      icon: <BiSolidFolderOpen style={{ fontSize: '5rem' }} />,
      name: 'Testing2',
    },
    {
      icon: <BiSolidFolderOpen style={{ fontSize: '5rem' }} />,
      name: 'Testing3',
    },
    {
      icon: <BiSolidFolderOpen style={{ fontSize: '5rem' }} />,
      name: 'Assistant',
    },
    {
      icon: <BiSolidFolderOpen style={{ fontSize: '5rem' }} />,
      name: 'Testing5',
    },
    {
      icon: <BiSolidFolderOpen style={{ fontSize: '5rem' }} />,
      name: 'Testing1',
    },
    {
      icon: <BiSolidFolderOpen style={{ fontSize: '5rem' }} />,
      name: 'Testing2',
    },
    {
      icon: <BiSolidFolderOpen style={{ fontSize: '5rem' }} />,
      name: 'Testing3',
    },
    {
      icon: <BiSolidFolderOpen style={{ fontSize: '5rem' }} />,
      name: 'Assistant',
    },
    {
      icon: <BiSolidFolderOpen style={{ fontSize: '5rem' }} />,
      name: 'Testing5',
    },
    {
      icon: <BiSolidFolderOpen style={{ fontSize: '5rem' }} />,
      name: 'Testing1',
    },
    {
      icon: <BiSolidFolderOpen style={{ fontSize: '5rem' }} />,
      name: 'Testing2',
    },
    {
      icon: <BiSolidFolderOpen style={{ fontSize: '5rem' }} />,
      name: 'Testing3',
    },
    {
      icon: <BiSolidFolderOpen style={{ fontSize: '5rem' }} />,
      name: 'Assistant',
    },
    {
      icon: <BiSolidFolderOpen style={{ fontSize: '5rem' }} />,
      name: 'Testing5',
    },
    {
      icon: <BiSolidFolderOpen style={{ fontSize: '5rem' }} />,
      name: 'Testing1',
    },
    {
      icon: <BiSolidFolderOpen style={{ fontSize: '5rem' }} />,
      name: 'Testing2',
    },
    {
      icon: <BiSolidFolderOpen style={{ fontSize: '5rem' }} />,
      name: 'Testing3',
    },
    {
      icon: <BiSolidFolderOpen style={{ fontSize: '5rem' }} />,
      name: 'Assistant',
    },
    {
      icon: <BiSolidFolderOpen style={{ fontSize: '5rem' }} />,
      name: 'Testing5',
    },
    {
      icon: <BiSolidFolderOpen style={{ fontSize: '5rem' }} />,
      name: 'Testing6',
    },
    {
      icon: <BiSolidFolderOpen style={{ fontSize: '5rem' }} />,
      name: 'Testing7',
    },
    {
      icon: <BiSolidFolderOpen style={{ fontSize: '5rem' }} />,
      name: 'Testing8',
    },
    {
      icon: <BiSolidFolderOpen style={{ fontSize: '5rem' }} />,
      name: 'Testing8',
    },
  ];

  return (
    <section className="folders-files" style={{ marginTop: '2rem' }}>
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
          padding:0 2rem;
        }
        .heading {
          display: flex;
          justify-content: space-between;
          font-size:1.5em;
          font-weight:500;
          align-items: center;
          margin-right:4rem;
          margin-left:2rem;
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
          margin:0.5rem;
          font-size:1.3rem;
          text-align: center;
          padding:0.5rem;
          &:hover{
          background-color: #f0f0f0;
          border-radius:0.8rem;
          }
        }
          .icon{
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
