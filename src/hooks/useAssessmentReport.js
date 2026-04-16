import { useState, useEffect } from 'react';
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

  // Sync singleAssessmenChats when assessmentData is set externally (e.g. on page load)
  useEffect(() => {
    if (assessmentData && assessmentData.qa) {
      setSingleAssessmenChats(assessmentData);
    }
  }, [assessmentData]);

  const AssessmentReport = async (answer, subReportId, file) => {
    try {
      const token = localStorage.getItem('token');

      // Select `questionId` based on whether `assessmentData` is populated
      const questionId = assessmentData.qa[assessmentData.qa.length - 1]._id;

      let responseData;
      if (file && file instanceof File) {
        // Send as FormData when file is attached
        const formData = new FormData();
        formData.append('questionId', questionId);
        formData.append('answer', answer || '');
        formData.append('file', file);

        const res = await fetch(
          `${config.apiURL}/workspace-assessment/${assessmentId}/answer`,
          {
            method: 'PATCH',
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
          }
        );
        responseData = await res.json();
      } else {
        const response = await apiClient.patch(
          `${config.apiURL}/workspace-assessment/${assessmentId}/answer`,
          { questionId, answer },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        responseData = response.data;
      }

      const data = responseData.data;
      setAssessmentData(data);
      setSingleAssessmenChats(data);

      const question = data.qa[data.qa.length - 1].question;

      if (data?.report?.isGenerated) {
        setIsReportGenerated(true);
        setReport(responseData);
      }
      addContent(question);

      setError(null);
      return question;
    } catch (error) {
      setError(error.response?.data?.message || error.message);
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
