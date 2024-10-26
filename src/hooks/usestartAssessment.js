import { useState } from 'react';
import apiClient from '../api/axios';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  selectCurrentFolder,
  selectCurrentWorkspace,
} from '../redux/selectors/selectors';
import config from '../config/config';

const useStartAssessment = () => {
  const [error, setError] = useState(null);
  const businessInfo = useSelector((state) => state.businessInfo);
  //const currentWorkspaceId = '66dc950e740af833ee34b3c5';// useSelector(selectCurrentWorkspace);
  //const currentFolderId = '66dc950e740af833ee34b3c6';// useSelector(selectCurrentFolder)
  const workspaceId = useSelector(
    (state) => state.workspaces.currentWorkspaceId
  );
  const folderId = useSelector((state) => state.workspaces.currentFolderId);

  const StartAssessment = async (message, assessmentName, Questions) => {
    try {
      console.log('assessmentName', assessmentName);
      console.log('Questions', Questions);
      console.log('businessInfo', businessInfo);

      const businessInfoData = {
        companyName: businessInfo.companyName,
        companySize: businessInfo.companySize,
        industry: businessInfo.industry,
        jobTitle: businessInfo.jobTitle,
        lastName: businessInfo.lastName,
        firstName: businessInfo.firstName,
        role: businessInfo.role,
        webURL: businessInfo.websiteURL,
      };
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${config.apiURL}/workspace/${workspaceId}/folder/${folderId}/assessment/`,
        {
          // message: message || '',
          // history: [],
          // generalInfo: `5 Comprehensive Pre-Assessment ${Questions}`,
          // businessInfo: businessInfoData,
          assessmentName: assessmentName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('hook response: A:', response.data);
      console.log('hook response: B', response.data.report[0]);
      console.log(
        'hook response: C',
        response.data.report[0].subReport[0].questionAnswer
      );
      console.log(
        'hook response:',
        response.data.report[0].subReport[0].questionAnswer[0].question
      );
      return response.data;
    } catch (error) {
      console.log('assessment error', error.message);
      setError(error.message);
    }
  };

  return { error, StartAssessment };
};

export default useStartAssessment;
