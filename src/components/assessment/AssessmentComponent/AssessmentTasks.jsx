import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Editor from './Editor';
import AssessmentModal from './AssessmentModal';
import NoDataAvailable from '../../common/NoDataAvailable';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectWorkspace,
} from '../../../redux/slices/workspacesSlice';
import assessmentQnaData from '../../../data/chat/assessmentQnaData';
import { CiEdit } from 'react-icons/ci';
import useAssessment from '../../../hooks/useAssessment';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchWorkspaceAssessments } from '../../../redux/slices/folderSlice';
import Button from '../../common/Button';

const AssessmentTasks = ({ handleAssessmentSelect, folderID, onTaskSelected }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const workspaceId = useSelector(
    (state) => state.workspaces.currentWorkspaceId
  );
  const folderId = useSelector((state) => state.workspaces.currentFolderId);
  const selectedWorkspace = useSelector(selectWorkspace);
  const [, setAssessmentId] = useState('');
  const [selectedFolder, setSelectedFolder] = useState({});
  const [selectedReport, setSelectedReport] = useState();
  const [mergeReports, setMergeRepoorts] = useState([]);
  const [, setAssessmentData] = useState([]);
  const [assessmentsData, setAssessmentsData] = useState([]);
  const { getAssessment } = useAssessment(workspaceId, folderId);

  const viewReport = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const fetchAssessments = async () => {
    try {
      if (!folderID) return;
      const assessmentDATA = await dispatch(
        fetchWorkspaceAssessments({
          folderId: folderID,
        })
      );
      const fetchedData = assessmentDATA?.payload?.results || [];
      setAssessmentsData(fetchedData);

      if (id) {
        const singleAssessment = await getAssessment(id);
        setAssessmentData(singleAssessment);
      }
    } catch (error) { if (import.meta.env.DEV) console.error(error); }
  };

  // Fetch fresh data whenever component mounts, folder changes, or assessment id changes
  useEffect(() => {
    fetchAssessments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceId, folderId, folderID, id]);
  useEffect(() => {
    if (workspaceId && folderId && selectedWorkspace?.folders) {
      const filteredFolders = selectedWorkspace.folders.filter(
        (item) => (item._id || item.id) === folderId
      );

      if (filteredFolders.length > 0 && filteredFolders[0].assessments?.length > 0) {
        const mergedData = assessmentQnaData.map((title) => {
          const matchingAssessment = filteredFolders[0].assessments.find(
            (assessment) =>
              assessment.report?.[0]?.subReport?.some((report) => {
                if (report.ReportTitle === title) {
                  return true;
                }
                return false;
              })
          );

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
        filteredFolders[0].assessments?.length > 0 &&
        filteredFolders[0].assessments[0]?.report?.length > 0
      ) {
        setAssessmentId(filteredFolders[0].assessments[0]._id);
        setSelectedFolder(filteredFolders[0]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceId, folderId]);
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const getColor = (progress) => {
    if (progress) return { text: '#15803d', background: 'rgba(34,197,94,0.1)' };
    return { text: '#a16207', background: 'rgba(234,179,8,0.1)' };
  };

  const getStatusDisplay = (status) => {
    const map = {
      'pending': { label: 'Pending', color: '#a16207', bg: 'rgba(234,179,8,0.1)' },
      'in_progress': { label: 'In Progress', color: '#2563eb', bg: 'rgba(59,130,246,0.1)' },
      'in-progress': { label: 'In Progress', color: '#2563eb', bg: 'rgba(59,130,246,0.1)' },
      'completed': { label: 'Completed', color: '#15803d', bg: 'rgba(34,197,94,0.1)' },
    };
    return map[status] || map['pending'];
  };

  const generateAllReports = () => {
    // Logic to generate all reports goes here
  };

  // Calculate assessment completion stats
  const totalAssessments = assessmentQnaData?.length || 0;
  const completedCount = assessmentsData?.filter(d => d.status === 'completed').length || 0;
  const inProgressCount = assessmentsData?.filter(d => d.status === 'in_progress' || d.status === 'in-progress').length || 0;
  const progressPercent = totalAssessments > 0 ? Math.round((completedCount / totalAssessments) * 100) : 0;
  const circumference = 2 * Math.PI * 28;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <>
      <div className="task-list-container">
        {/* Progress Ring */}
        <div className="task-progress-ring">
          <svg width="64" height="64" viewBox="0 0 64 64" className="task-progress-ring__svg">
            <circle cx="32" cy="32" r="28" fill="none" stroke="#e5e7eb" strokeWidth="4" />
            <circle cx="32" cy="32" r="28" fill="none" stroke="#C3E11D" strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 32 32)"
              className="task-progress-ring__transition"
            />
            <text x="32" y="36" textAnchor="middle" fontSize="14" fontWeight="600" fill="#111">
              {progressPercent}%
            </text>
          </svg>
          <div>
            <div className="task-progress-ring__completed">
              {completedCount}/{totalAssessments} Completed
            </div>
            <div className="task-progress-ring__status">
              {inProgressCount > 0 ? `${inProgressCount} in progress` : 'Select a report to begin'}
            </div>
          </div>
        </div>

        <div
          className="progress-bar task-select-report"
          onClick={generateAllReports}
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
                      onClick={() => {
                        handleAssessmentSelect(assessment);
                        if (onTaskSelected) onTaskSelected();
                      }}
                    >
                      {currentReport.ReportTitle
                        ? currentReport.subReport?.[0]?.ReportTitle || currentReport.ReportTitle
                        : assessment.ReportTitle}
                    </span>
                    {!currentReport.finalReportURL && (
                      <span
                        className={`task-progress task-badge ${
                          !currentReport.finalReportURL ? 'hover-show' : ''
                        }`}
                        style={{
                          '--task-color': taskColors.text,
                          '--task-bg': taskColors.background,
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
                      <Button
                        variant="icon"
                        ariaLabel="Edit report"
                        className="complete-button"
                        onClick={() => viewReport(currentReport)}
                      >
                        <CiEdit />
                      </Button>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="task-list">
            {assessmentQnaData.map((assessment, index) => {
              const matchedAssessment = assessmentsData?.find((data) => data?.name === assessment);
              return (
                <div className="task-item" key={index}>
                  <div
                    className="task-info"
                    onClick={() => {
                      if (matchedAssessment && matchedAssessment.status !== 'pending') {
                        navigate(`/assessment/chat/${matchedAssessment.id || matchedAssessment._id}`);
                      } else {
                        handleAssessmentSelect(assessment);
                      }
                      if (onTaskSelected) onTaskSelected();
                    }}
                  >
                    <span className="task-name">{assessment}</span>
                    {(() => {
                      const status = matchedAssessment ? matchedAssessment.status : 'pending';
                      const display = getStatusDisplay(status);
                      return (
                        <span
                          className="task-progress hover-show task-status-badge"
                          style={{
                            '--task-color': display.color,
                            '--task-bg': display.bg,
                          }}
                        >
                          {display.label}
                        </span>
                      );
                    })()}
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
