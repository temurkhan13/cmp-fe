import { useEffect } from 'react';
import Workspaces from './Workspaces';
import CountingCards from './CountingCards';
import Folder from './Folder';
import Account from './Account';
import { IoPeople } from 'react-icons/io5';
import { HiDotsHorizontal } from 'react-icons/hi';
import { SlQuestion } from 'react-icons/sl';
import DashboardCard from '@components/common/DashboardCard';
import { useDispatch, useSelector } from 'react-redux';
import { useGetWorkspacesQuery } from '../../../redux/api/workspaceApi';
import {
  setSelectedWorkspace,
  selectWorkspace,
} from '../../../redux/slices/workspacesSlice';
import {
  selectAllWorkspaces,
  selectAllChats,
} from '../../../redux/selectors/selectors';

const DashboardHomeComp = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?.id);
  const { data: workspaces } = useGetWorkspacesQuery(userId);
  const workspacess = useSelector(selectAllWorkspaces);
  const selectedWorkspace = useSelector(selectWorkspace);
  const activeFolder = useSelector((state) => state.workspaces.selectedFolder);
  const chats = useSelector(selectAllChats);

  useEffect(() => {
    if (workspaces && workspaces.length > 0 && !selectedWorkspace) {
      dispatch(setSelectedWorkspace(workspaces[0]));
    }
  }, [workspaces, selectedWorkspace, dispatch]);

  const convertTimestampToRelativeTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const differenceInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (differenceInDays === 0) return 'Today';
    if (differenceInDays === 1) return '1 day ago';
    if (differenceInDays <= 2) return `${differenceInDays} days ago`;
    if (differenceInDays <= 30) return `Previous ${differenceInDays} days`;
    return 'Older than 30 days';
  };

  return (
    <div className="dashboard">
      <CountingCards activeWorkspace={selectedWorkspace} />
      <Account />
      <Workspaces
        activeWorkspace={selectedWorkspace}
        workspaces={workspacess}
      />
      <Folder activeWorkspace={selectedWorkspace} />
      <section className="generate" style={{ marginTop: '2rem' }}>
        <div className="container">
          <div
            className="left-buttons"
            style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
          >
            <button className="arrow-btn">
              <SlQuestion size={25} />
            </button>
            <p className="assistant-heading">Change AI Assistance</p>
          </div>
        </div>
      </section>

      <div
        className="card-wrapper"
        style={{ margin: '20px', display: 'flex', flexWrap: 'wrap' }}
      >
        {chats &&
          chats.map((chat, index) => (
            <div key={index}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <DashboardCard chat={chat} />
              </div>
              <div className="fileDetails">
                <div className="fileName">
                  {chat.chatTitle}
                  <IoPeople color="gray" style={{ marginLeft: '0.3rem' }} />
                </div>
                <div>
                  <span>in</span>
                  <span className="folderName">{activeFolder?.folderName}</span>
                  <span>
                    • Created {convertTimestampToRelativeTime(chat.CreatedAt)}
                    <HiDotsHorizontal style={{ fontSize: '1.2rem' }} />
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>

      <section className="generate" style={{ marginTop: '2rem' }}>
        <div className="container">
          <div className="left-buttons">
            <button className="arrow-btn">{/* <SlQuestion /> */}</button>
            <p className="assistant-heading">AI Assessment</p>
          </div>
        </div>
      </section>

      <div
        className="card-wrapper"
        style={{ margin: '20px', display: 'flex', flexWrap: 'wrap' }}
      ></div>

      <style>{`
        .dashboard {
          display: flex;
          flex-direction: column;
        }
        .generate {
          background-color: white;
        }
        .generate .container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1%;
          height: 10vh;
        }
        .generate .arrow-btn {
          height: 40px;
          border: none;
          border-radius: 50%;
          background: transparent;
        }
        .generate .assistant-heading {
          font-family: 'Poppins';
          font-size: 2rem;
          font-weight: 600;
          line-height: 36px;
          color: black;
        }
        .files {
          border-right: 2px solid lightgray;
        }
        .files-heading {
          font-size: 2.5rem;
          font-weight: 600;
          margin-top: 2rem;
          padding: 0 3rem;
        }
        .card-wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 20px;
        }
        .fileDetails {
          margin-top: 1rem;
          margin-bottom: 3rem;
        }
        .fileName {
          font-size: 1.125rem;
          font-weight: bold;
          margin-top: 1rem;
        }
        .folderName {
          color: #0066ff;
          font-size: 1.1rem;
          margin-left: 0.5rem;
        }
        .left-buttons{
        display:flex;
        align-items:center;
        gap: 1rem;
        margin-left:2rem;
        }
      `}</style>
    </div>
  );
};

export default DashboardHomeComp;
