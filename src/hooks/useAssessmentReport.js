import { useState } from 'react';
import apiClient from '../api/axios';
import config from '../config/config';
import { addContent } from '../redux/reducers/editorReducer';

const useAssessmentReport = ({
  workspaceId,
  folderId,
  assessmentId,
  allAssessmentData,
}) => {
  const [error, setError] = useState(null);
  const [isReportGenerated, setIsReportGenerated] = useState(false);
  const [report, setReport] = useState(null);
  const [assessmentData, setAssessmentData] = useState(allAssessmentData);
  const [singleAssessmenChats, setSingleAssessmenChats] = useState([]);

  const AssessmentReport = async (answer, subReportId) => {
    try {
      const token = localStorage.getItem('token');

      // Select `questionId` based on whether `assessmentData` is populated
      const questionId = assessmentData.qa[assessmentData.qa.length - 1]._id;

      const response = await apiClient.patch(
        `${config.apiURL}/workspace-assessment/${assessmentId}/answer`,
        {
          questionId,
          answer: answer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAssessmentData(response.data.data);
      setSingleAssessmenChats(response.data.data);

      const question =
        response.data.data.qa[response.data.data.qa.length - 1].question;

      if (response.data.data?.report?.isGenerated) {
        setIsReportGenerated(true); // set the report generated flag to true
        setReport(response.data); // set the report data to the response data
      }
      addContent(
        response.data.data.qa[response.data.data.qa.length - 1].question
      );

      setError(null);
      return question;
    } catch (error) {
      setError(error.response?.data?.message || error.message); // more detailed error handling
    }
  };

  return {
    error,
    AssessmentReport,
    isReportGenerated,
    report,
    setAssessmentData,
    singleAssessmenChats,
  };
};

export default useAssessmentReport;
