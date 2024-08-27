import { useState } from 'react';
import PropTypes from 'prop-types';
import Editor from './Editor';
import AssessmentModal from './AssessmentModal';
import NoDataAvailable from '../../../common/NoDataAvailable'; // Adjust the path as necessary

const AssessmentTasks = ({ tasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownload = (format) => {
    console.log(`Download ${format} clicked`);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const getColor = (progress) => {
    if (progress === 100) return { text: 'blue', background: '#ccffcc' };
    if (progress >= 70) return { text: 'purple', background: '#e6ccff' };
    if (progress >= 50) return { text: 'orange', background: '#ffe6cc' };
    return { text: 'red', background: '#ffcccc' };
  };

  const calculateCollectiveProgress = (tasks) => {
    const totalProgress = tasks.reduce((sum, task) => sum + task.progress, 0);
    return (totalProgress / tasks.length).toFixed(0);
  };

  const collectiveProgress = calculateCollectiveProgress(tasks);
  const collectiveColors = getColor(collectiveProgress);

  return (
    <>
      <div className="task-list-container">
        <div className="progress-bar">
          <span style={{ fontSize: '1.4rem', fontWeight: '500' }}>
            Assessment Progress
          </span>
          <span
            style={{
              color: collectiveColors.text,
              backgroundColor: collectiveColors.background,
              borderRadius: '1rem',
              fontSize: '1.3rem',
              padding: '0.1rem 0.5rem',
            }}
          >
            {collectiveProgress}%
          </span>
        </div>
        {tasks.length === 0 ? (
          <NoDataAvailable message="No tasks available" />
        ) : (
          <div className="task-list">
            {tasks.map((task, index) => {
              const taskColors = getColor(task.progress);
              return (
                <div className="task-item" key={index}>
                  <div className="task-info">
                    <span className="task-name">{task.name}</span>
                    {task.progress !== undefined && (
                      <span
                        className={`task-progress ${
                          task.progress < 100 ? 'hover-show' : ''
                        }`}
                        style={{
                          color: taskColors.text,
                          backgroundColor: taskColors.background,
                          borderRadius: '1rem',
                          paddingLeft: '0.8rem',
                          paddingRight: '0.8rem',
                          fontSize: '1.2rem',
                          fontWeight: '500',
                        }}
                      >
                        {task.progress === 100
                          ? 'Completed'
                          : `${task.progress}%`}
                      </span>
                    )}
                  </div>
                  {task.progress === 100 && (
                    <>
                      <button
                        className="complete-button"
                        onClick={() => setIsModalOpen(true)}
                      >
                        Link_Assessment
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
        <style>{`
          .task-list-container {
            margin: 0 auto;
          }
          .progress-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            border: 0.1rem solid #ddd;
            border-radius: 1.2rem;
            background-color: #f5f5f5;
            margin: 1rem;
          }
          .task-list {
            border-radius: 0.4rem;
          }
          .task-item {
            padding: 1rem;
            border-bottom: 0.1rem solid #ddd;
            background-color: #fff;
            position: relative;
            transition: background-color 0.3s ease;
          }
          .task-item:hover {
            background-color: #f1f1f1;
            cursor: pointer;
          }
          .task-item:last-child {
            border-bottom: none;
          }
          .task-info {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .task-name {
            font-size: 1.3rem; 
            max-width: 70%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .task-progress {
            font-size: 0.875rem; 
            display: none;
          }
          .task-item:hover .task-progress {
            display: block;
          }
          .complete-button {
            margin-top: 0.625rem; 
            padding: 0.5rem 1rem;
            border-radius: 1.5rem;
            font-size: 1.3rem;
            font-weight: 500;
            color: #007bff;
            background-color: white;
            border: none;
            cursor: pointer;
            transition: color 0.3s, background-color 0.3s;
          }
          .complete-button:hover {
            color: royalblue;
            background-color: #f1f1f1;
          }
        `}</style>
      </div>
      {isModalOpen && (
        <AssessmentModal
          title="Change Vision/Case for Change"
          content={
            <Editor placeholder="Type your text here..." height="100vw" />
          }
          onDownload={handleDownload}
          onClose={handleClose}
        />
      )}
    </>
  );
};

AssessmentTasks.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      progress: PropTypes.number,
    })
  ).isRequired,
};

export default AssessmentTasks;
