import { useState } from 'react';
import axios from 'axios';
import config from '../config/config';
import { addContent } from '../redux/reducers/editorReducer';

const useAssessmentReport = ({ workspaceId, folderId, assessmentId, allAssessmentData }) => {
  const [error, setError] = useState(null);
  const [isReportGenerated, setIsReportGenerated] = useState(false);
  const [report, setReport] = useState(null);
  const [assessmentData, setAssessmentData] = useState(allAssessmentData);
  const [singleAssessmenChats, setSingleAssessmenChats] = useState([]);

  const AssessmentReport = async (answer, subReportId) => {
    try {
      const token = localStorage.getItem('token');
      console.log("HELOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO",  `${config.apiURL}/workspace-assessment/${assessmentId}/answer`);
      console.log("responseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", assessmentData);

      // Select `questionId` based on whether `assessmentData` is populated
      const questionId = assessmentData.qa[assessmentData.qa.length - 1]._id;

      const response = await axios.patch(
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

      console.log('Assessment hook response:', response.data.data);
      const question = response.data.data.qa[response.data.data.qa.length - 1].question;
      console.log('RESPONSSEEEEEE:', question);

      if (response.data.data?.report?.isGenerated) {
        setIsReportGenerated(true); // set the report generated flag to true
        setReport(response.data); // set the report data to the response data
      }
      addContent(response.data.data.qa[response.data.data.qa.length - 1].question);

      console.log('Extracted question:', question);
      setError(null);
      return question;
    } catch (error) {
      console.error('Error in Assessment:', error); // log the full error
      setError(error.response?.data?.message || error.message); // more detailed error handling
    }
  };

  return { error, AssessmentReport, isReportGenerated, report, setAssessmentData,singleAssessmenChats };
};

export default useAssessmentReport;
