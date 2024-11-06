import { useState } from 'react';
import axios from 'axios';
import config from '../config/config';
import { addContent } from '../redux/reducers/editorReducer';

const useAssessmentReport = ({ workspaceId, folderId, assessmentId }) => {
  const [error, setError] = useState(null);
  const [isReportGenerated, setIsReportGenerated] = useState(false);
  const [report, setReport] = useState(null);

  const AssessmentReport = async (assessmentName, subReportId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `${config.apiURL}/workspace/${workspaceId}/folder/${folderId}/assessment/${assessmentId}/subReport/${subReportId}`,
        {
          content: assessmentName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Assessment hook response:', response.data);
      const question = response.data.question;
      if (response.data.isReportGenerated) {
        setIsReportGenerated(true); // set the report generated flag to true
        addContent(response.data.question.content);
        setReport(response.data.question.content); // set the report data to the response data
      }
      console.log('Extracted question:', question);

      setError(null);
      return question;
    } catch (error) {
      console.error('Error in Assessment:', error); // log the full error
      setError(error.response?.data?.message || error.message); // more detailed error handling
    }
  };

  return { error, AssessmentReport, isReportGenerated, report };
};

export default useAssessmentReport;
