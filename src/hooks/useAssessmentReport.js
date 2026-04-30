import { useState, useEffect } from 'react';
import apiClient from '../api/axios';

const useAssessmentReport = ({
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
      // Select `questionId` based on whether `assessmentData` is populated
      const questionId = assessmentData.qa[assessmentData.qa.length - 1]._id;

      let responseData;
      if (file && file instanceof File) {
        // Send as FormData when file is attached
        const formData = new FormData();
        formData.append('questionId', questionId);
        formData.append('answer', answer || '');
        formData.append('file', file);

        const res = await apiClient.patch(
          `/workspace-assessment/${assessmentId}/answer`,
          formData,
        );
        responseData = res.data;
      } else {
        const response = await apiClient.patch(
          `/workspace-assessment/${assessmentId}/answer`,
          { questionId, answer },
        );
        responseData = response.data;
      }

      const data = responseData.data;
      setAssessmentData(data);
      setSingleAssessmenChats(data);

      if (data?.report?.isGenerated) {
        setIsReportGenerated(true);
        setReport(responseData);
      }

      setError(null);
      return data;
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
