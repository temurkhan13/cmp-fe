import { useState, useEffect } from 'react';
import { IoPeople } from 'react-icons/io5';
import { HiDotsHorizontal } from 'react-icons/hi';
import LoadingSpinner from '../../components/common/LoadingSpinner ';
import { selectWorkspace } from '../../redux/slices/workspacesSlice';
import { useSelector } from 'react-redux';
import useManagerChat from '@hooks/useManagerChat';
import DashboardCard from '@components/common/DashboardCard';
import Folder from './dashboardHomeComponents/Folder';
import { truncateText } from '../../utils/helperFunction';

const MyAssessmentComp = () => {
  const { managerData, error } = useManagerChat();
  const [isLoading, setIsLoading] = useState(true);
  const selectedWorkspace = useSelector(selectWorkspace);

  useEffect(() => {
    if (managerData) {
      setIsLoading(false);
    }
  }, [managerData]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  const cardData = [
    {
      userName: 'You',
      content: truncateText(
        'Lorem ipsum dolor sit sapiente quae nobis porro, sed cum molestiae!',
        55
      ),
    },
    {
      userName: 'John Doe',
      content: truncateText(
        'Lorem ipsum dolor sit sapiente quae nobis porro, sed cum molestiae!',
        55
      ),
    },
    {
      userName: 'Jane Smith',
      content: truncateText(
        'Lorem ipsum dolor sit sapiente quae nobis porro, sed cum molestiae!',
        55
      ),
    },
  ];

  return (
    <div className="container">
      <div className="section">
        <p className="sectionTitle">AI Assessment</p>
        <Folder activeWorkspace={selectedWorkspace} />
      </div>

      <div className="cardWrapper">
        {cardData.map((card, index) => (
          <div key={index}>
            <DashboardCard chat={''} />
            <div className="fileDetails">
              <div className="fileName">
                File Name
                <IoPeople className="peopleIcon" />
              </div>
              <div>
                <span>in</span>
                <span className="folderName">folderName</span>
                <span>
                  • Modified 2 days ago
                  <HiDotsHorizontal className="dotsIcon" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .container {
          // background-color: #f9f9f9;
          padding: 1rem 2rem;
        }

        .section {
          margin-top: 2rem;
        }

        .sectionTitle {
          font-weight: 500;
          font-size: 2rem;
          margin-bottom: 2rem;
        }

        .cardWrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 20px;
        }

        .fileDetails {
          margin: 0.2rem 1.5rem;
          font-size: 1rem;
          margin-bottom: 3rem;
        }

        .fileName {
          font-size: 1.125rem;
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .folderName {
          color: #0066ff;
          font-size: 1.1rem;
          margin-left: 0.5rem;
        }

        .dotsIcon {
          cursor: pointer;
          font-size: 1.4rem;
          color: gray;
        }

        .peopleIcon {
          font-size: 1.5rem;
          color: black;
        }
      `}</style>
    </div>
  );
};

export default MyAssessmentComp;
