import { useState, useEffect } from 'react';

import Component from '@components';
import useManagerChat from '@hooks/useManagerChat';

// import Switch from 'react-switch';
import { PiFilesFill } from 'react-icons/pi';
// import RecentCards from '../../components/dashboard/RecentCard';

const MyAssessmentComp = () => {
  const { managerData, error, toggleMockData } = useManagerChat();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (managerData) {
      setIsLoading(false);
    }
  }, [managerData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const truncateString = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + '...';
    } else {
      return str;
    }
  };

  const mockFiles = [
    { name: 'AI Overview' },
    { name: 'Machine Learning Basics' },
    { name: 'Advanced Neural Networks' },
    { name: 'Introduction to NLP' },
    { name: 'AI in Robotics' },
    { name: 'Reinforcement Learning Concepts' },
    { name: 'AI and Ethics' },
    { name: 'AI in Healthcare Applications' },
    { name: 'AI in Financial Services' },
    { name: 'Data Science Techniques' },
    { name: 'Predictive Modeling' },
    { name: 'AI and Privacy' },
    { name: 'Computer Vision Applications' },
    { name: 'Deep Learning Explained' },
    { name: 'AI for Beginners' },
    { name: 'AI Research Papers' },
    { name: 'Natural Language Processing Guide' },
    { name: 'Understanding AI Algorithms' },
    { name: 'AI in Marketing' },
  ];

  // const recentChats = managerData.folders.flatMap((folder) =>
  //   folder.chats.map((chat) => [folder.name, chat])
  // );

  return (
    <div className="container">
      {/* <Switch
          checked={true}
          onChange={toggleMockData}
          inputProps={{ 'aria-label': 'controlled' }}
        /> */}
      {/* <button onClick={toggleMockData}>Toggle Mock Data</button> */}
      <div className="section">
        {/* <p className="sectionTitle">Recent Files</p> */}
        {/* <RecentCards chats={recentChats} /> */}
      </div>
      <div className="section">
        <p className="sectionTitle">AI Assessment</p>
        <div className="buttonGroup">
          <button className="customizeButton">Customize</button>
          <button className="addButton">Add New</button>
        </div>
        <div className="files">
          {/* <p className="files-heading">Ai Assessments</p> */}
          <div className="file-list">
            {mockFiles.map((file, index) => (
              <div key={index} className="file-item">
                <PiFilesFill style={{ fontSize: '6rem', color: 'gray' }} />
                <span>{truncateString(file.name, 6)}</span>
                {/* <span
                  style={{
                    color: 'rgba(0, 102, 255, 1)',
                  }}
                >
                  2 Files
                </span> */}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="section">
        <p className="sectionTitle">Folders</p>
        <div className="itemsContainer">
          {managerData &&
            managerData.folders.map((folder) => (
              <Component.Dashboard.FolderCard key={folder.id} folder={folder} />
            ))}
          {/* <Component.Dashboard.FolderCard />
            <Component.Dashboard.FolderCard />
            <Component.Dashboard.FolderCard />
            <Component.Dashboard.FolderCard />
            <Component.Dashboard.FolderCard /> */}
        </div>
      </div>
      <div className="section">
        <p className="sectionTitle">Files</p>

        {/* <div className="itemsContainer">
            <Component.Dashboard.RecentCard />
            <Component.Dashboard.RecentCard />
            <Component.Dashboard.RecentCard />
            <Component.Dashboard.RecentCard />
            <Component.Dashboard.RecentCard />
            <Component.Dashboard.RecentCard />
          </div> */}
      </div>
      <style>{`
  .container {
    background-color: rgba(249, 249, 249, 1);
    padding: 1rem 2rem;
    overflow-x: hidden;
  }
  .section {
    margin-top: 2rem;
    gap: 2rem;
  }
  .sectionTitle {
    font-weight: 500;
    font-size: 2rem;
    line-height: 2.125rem;
    letter-spacing: 0.0075rem;
    margin-bottom:2rem;
  }
  .buttonGroup {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom:2rem;
  }
  .customizeButton {
    margin-right: 0.625rem;
    padding: 0.625rem 1rem;
    font-size: 1.5rem;
    background-color: white;
    border-radius: 0.7rem;
    border: 1px solid black;
    cursor: pointer;
  }
  .addButton {
    padding: 0.625rem 1rem;
    font-size: 1.5rem;
    background-color: rgba(195, 225, 29, 1);
    border-radius: 0.7rem;
    border: none;
    outline:none
    cursor: pointer;
    margin-left: 1rem;
  }
  .itemsContainer {
    display: flex;
    gap: 0.625rem;
  }
  .files {
    padding: 0 2rem;
  }
  .files-heading {
    font-size: 2.5rem;
    display: flex;
    font-weight: 600;
    margin-top: 3rem;
    margin-bottom: 3rem;
    padding: 0 2rem;
  }
  .file-list {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 1rem;
  }
  .file-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: black;
    font-size: 1.25rem;
    cursor: pointer;
    // gap: 1rem;
  }
  .file-item span {
    margin-left: 0.5rem;
  }
`}</style>
    </div>
  );
};

export default MyAssessmentComp;
