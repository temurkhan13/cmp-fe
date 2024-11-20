import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Editor from './Editor';
import AssessmentModal from './AssessmentModal';
import NoDataAvailable from '../../common/NoDataAvailable';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectWorkspace,
  setCurrentSelectedTitle,
} from '../../../redux/slices/workspacesSlice';
import assessmentQnaData from '../../../data/chat/assessmentQnaData';
import { CiEdit } from 'react-icons/ci';
import useAssessment from '../../../hooks/useAssessment';
import { useNavigate, useParams } from 'react-router-dom';
import { get } from 'jodit/esm/core/helpers';
import { fetchWorkspaceAssessments } from '../../../redux/slices/folderSlice';
import { selectCurrentFolder } from '../../../redux/selectors/selectors';

const AssessmentTasks = ({ tasks, handleAssessmentSelect, folderID }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  console.log('LAAAAAAAAAAAAAAAAAAAAA', folderID);

  const workspaceId = useSelector(
    (state) => state.workspaces.currentWorkspaceId
  );
  const folderId = useSelector((state) => state.workspaces.currentFolderId);
  const selectedWorkspace = useSelector(selectWorkspace);
  const [assessmentId, setAssessmentId] = useState('');
  const [selectedFolder, setSelectedFolder] = useState({});
  const [selectedReport, setSelectedReport] = useState();
  const [mergeReports, setMergeRepoorts] = useState([]);
  const [workspaceID, setWorkspaceId] = useState(workspaceId);
  const [assessmentData, setAssessmentData] = useState([]);
  const currentFolder = useSelector(selectCurrentFolder);
  const [assessmentsData, setAssessmentsData] = useState([]);
  const { getAssessment } = useAssessment(workspaceId, folderId);

  const viewReport = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const getAssessments = async () => {
      try {
        const assessmentDATA = await dispatch(
          fetchWorkspaceAssessments({
            folderId: folderID,
          })
        );
        const fetchedData = assessmentDATA?.payload?.results || [];
        setAssessmentsData(fetchedData);
        console.log('DTATAA', assessmentsData);

        // console.log('DTATAA', currentFolder);
        const singleAssessment = await getAssessment(id);
        setAssessmentData(singleAssessment);
        console.log('GET ASSESSMENTttt', singleAssessment);
      } catch (error) {
        console.log(error);
      }
    };
    getAssessments();
  }, [workspaceId, folderId]);
  console.log('GET ASSESSMENTTTTTTTTT', assessmentData);
  useEffect(() => {
    if (workspaceId && folderId) {
      const filteredFolders = selectedWorkspace.folders.filter(
        (item) => item._id === folderId
      );

      if (filteredFolders[0].assessments.length > 0) {
        const mergedData = assessmentQnaData.map((title) => {
          // Check if there is a matching report title in the selectedFolder.assessments array
          const matchingAssessment = filteredFolders[0].assessments.find(
            (assessment) =>
              assessment.report[0].subReport.some((report) => {
                console.log(assessment.report);
                if (report.ReportTitle === title) {
                  return assessment.report[0];
                }
              })
          );

          // If found, return the matching assessment object; otherwise, return the title
          if (matchingAssessment) {
            return matchingAssessment;
          } else {
            return { ReportTitle: title };
          }
        });

        setMergeRepoorts(mergedData);
      }

      if (
        filteredFolders.length > 0 &&
        filteredFolders[0].assessments.length > 0 &&
        filteredFolders[0].assessments[0].report.length > 0
      ) {
        console.log(filteredFolders[0].assessments);
        setAssessmentId(filteredFolders[0].assessments[0]._id);
        setSelectedFolder(filteredFolders[0]);
      }
    }
  }, [workspaceId, folderId]);
  const handleDownload = (format) => {
    console.log(`Download ${format} clicked`);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const getColor = (progress) => {
    if (progress) return { text: 'blue', background: '#ccffcc' };
    return { text: 'red', background: '#ffcccc' };
  };

  const calculateCollectiveProgress = (tasks) => {
    const totalProgress = tasks.reduce((sum, task) => sum + task.progress, 0);
    return (totalProgress / tasks.length).toFixed(0);
  };

  const generateAllReports = () => {
    console.log('Generating all reports');
    // Logic to generate all reports goes here
  };

  const collectiveProgress = calculateCollectiveProgress(tasks);
  const collectiveColors = getColor(collectiveProgress);

  return (
    <>
      <div className="task-list-container">
        <div
          className="progress-bar"
          onClick={generateAllReports}
          style={{
            fontSize: '1.4rem',
            fontWeight: '500',
            textAlign: 'center',
          }}
        >
          Select a Report
        </div>

        {selectedFolder &&
        selectedFolder.assessments &&
        selectedFolder.assessments.length === 0 ? (
          <NoDataAvailable message="No reports available" />
        ) : mergeReports.length > 0 ? (
          <div className="task-list">
            {mergeReports.map((assessment, index) => {
              const currentReport = assessment.report
                ? assessment.report[0]
                : {};

              const taskColors = getColor(
                currentReport.finalReportURL || false
              );
              return (
                <div className="task-item" key={index}>
                  <div className="task-info">
                    <span
                      className="task-name"
                      onClick={handleAssessmentSelect(assessment)}
                    >
                      {currentReport.ReportTitle
                        ? currentReport.subReport[0].ReportTitle
                        : assessment.ReportTitle}
                    </span>
                    {!currentReport.finalReportURL && (
                      <span
                        className={`task-progress ${
                          !currentReport.finalReportURL ? 'hover-show' : ''
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
                        {currentReport.finalReportURL
                          ? 'Completed'
                          : `Not Completed yet`}
                      </span>
                    )}
                  </div>
                  {currentReport.finalReportURL && (
                    <>
                      <button
                        className="complete-button"
                        onClick={() => viewReport(currentReport)}
                      >
                        <CiEdit />
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        ) : selectedFolder && Object.keys(selectedFolder).length === 0 ? (
          <div className="task-list">
            {assessmentQnaData.map((assessment, index) => {
              const taskColors = getColor(false);
              return (
                <div className="task-item" key={index}>
                  <div
                    className="task-info"
                    onClick={() => handleAssessmentSelect(assessment)}
                  >
                    <span className="task-name">{assessment}</span>
                    <span
                      className={`task-progress hover-show`}
                      style={{
                        color:
                          assessmentsData &&
                          assessmentsData.find(
                            (data) => data.name === assessment
                          )
                            ? 'black'
                            : taskColors.text,
                        backgroundColor:
                          assessmentsData &&
                          assessmentsData.find(
                            (data) => data.name === assessment
                          )
                            ? '#C3E11D'
                            : taskColors.background,
                        borderRadius: '1rem',
                        paddingLeft: '0.8rem',
                        paddingRight: '0.8rem',
                        fontSize: '1.2rem',
                        fontWeight: '500',
                        position: 'absolute',
                        right: '0',
                      }}
                    >
                      {/* {assessmentData.name === assessment
                        ? assessmentData.status
                        : 'Pending'} */}

                      {assessmentsData &&
                      assessmentsData?.find((data) => data?.name === assessment)
                        ? assessmentsData?.find(
                            (data) => data?.name === assessment
                          ).status
                        : 'pending'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="task-list">
            {selectedFolder &&
              selectedFolder.assessments &&
              selectedFolder.assessments.map((assessment, index) => {
                if (assessment.report.length === 0) return null;

                const currentReport = assessment.report[0];

                const taskColors = getColor(currentReport.finalReportURL);
                return (
                  <div className="task-item" key={index}>
                    <div className="task-info">
                      <span className="task-name">
                        {currentReport.ReportTitle}
                      </span>
                      {!currentReport.finalReportURL && (
                        <span
                          className={`task-progress ${
                            !currentReport.finalReportURL ? 'hover-show' : ''
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
                          {currentReport.finalReportURL
                            ? 'Completed'
                            : `Not Completed yet`}
                        </span>
                      )}
                    </div>
                    {currentReport.finalReportURL && (
                      <>
                        <button
                          className="complete-button"
                          onClick={() => viewReport(currentReport)}
                        >
                          <CiEdit />
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
            padding: 1rem;
            border: none;
            border-radius: 1.5rem;
            margin: 1rem;
            background-color: #C3E11D;
            color: #00316E;

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
            position: relative;
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
          title={selectedReport.ReportTitle}
          content={
            <Editor
              title={selectedReport.ReportTitle}
              data={selectedReport.finalReport}
              placeholder="Type your text here..."
              height="100vw"
            />
          }
          onDownload={() => {
            const fullUrl = `${window.location.protocol}//${window.location.host}${selectedReport.finalReportURL}`;
            window.open(fullUrl, '_blank');
          }}
          // onDownload={handleDownload}
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
