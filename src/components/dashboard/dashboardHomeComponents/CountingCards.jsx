import card1 from '../../../assets/dashboard/card1.svg';

import { PiFilesFill } from 'react-icons/pi';
import { FaNetworkWired } from 'react-icons/fa';
import { BiSolidCollection, BiSolidFolderOpen } from 'react-icons/bi';

import { useSelector } from 'react-redux';
import { selectAllFolders } from '../../../redux/selectors/selectors';

const CountingCards = ({activeWorkspace}) => {
  const workspaces = useSelector((state) => state.workspaces.workspaces);

  const projects = useSelector(selectAllFolders);

  //const workspaces = useSelector((state) => state.workspace.workspaces);
  // const selectedWorkspaceId = useSelector(
  //   (state) => state.workspace.selectedWorkspaceId
  // );
  // const folderSelect = useSelector((state) => state.workspace.folders);
  // const selectedFolderId = useSelector(
  //   (state) => state.workspace.selectedFolderId
  // );

  // // Count total workspaces
  // const totalWorkspaces = workspaces.length;

  // // Count total folders
  // const totalFolders = workspaces.reduce(
  //   (acc, workspace) => acc + workspace.folders.length,
  //   0
  // );


 // Count total workspaces
 const totalWorkspaces = workspaces ? workspaces.length : 0;
const totalProjects = projects? projects.length : 0;
const Workspace = activeWorkspace ? activeWorkspace.workspaceName : "";
  const cardData = [
    {
      title: 'Active Workspace',
      count: Workspace,
    },
    {
      title: 'Projects',
      count: totalProjects,
    },
    {
      title: 'Total Workspaces',
      count: totalWorkspaces,
    },    
  ];
  return (
    <div className="counting-cards">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="dashboard-card"
          style={{
            border: '1px solid black',
          }}
        >
          <div
            className="counts"
            style={{
              fontSize: `${String(card.count).length > 3 ? '2.8rem' : '5rem'}`,
            }}
          >
            {card.count}
          </div>
          <div className="count-heading">
            <div>{card.icon}</div>
            <div>{card.title}</div>
          </div>
        </div>
      ))}
      <style>{`
         .counting-cards {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1rem;
          margin: 1rem 2rem;
        }

        @media screen and (max-width: 1240px) {
          .counting-cards {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }
          .dashboard-card {
          display: flex;
          flex-direction: column;
          padding: 1rem;
          align-items: center;
          justify-content: space-around;
          width: 40rem;
          height: 15rem;
          background-position: right;
          transition: all 0.1s linear;
          border-radius: 2rem !important;
          background-color: white !important;
        }

        @media screen and (max-width: 1240px) {
          .dashboard-card {
            width: auto;
            height: 20rem;
          }
        }

        .count-heading {
          font-size: 2rem;
          font-weight: 500;
          display: flex;
          flex-direction: row-reverse;
          align-items: flex-start;
          width: 100%;
          padding: 0 1rem;
          justify-content: space-between;
        }

        .counts {
          font-weight: 700;
          color: black;
          width: 100%;
          margin-left: 2rem;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
        }
      `}</style>
    </div>
  );
};

export default CountingCards;
