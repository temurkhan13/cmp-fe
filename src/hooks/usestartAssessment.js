import { useState } from 'react';
import apiClient from '../api/axios';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { selectCurrentFolder, selectCurrentWorkspace } from '../redux/selectors/selectors';

const useStartAssessment = () => {
  const [error, setError] = useState(null);
  const businessInfo = useSelector((state) => state.businessInfo);
  const currentWorkspaceId = '66dc950e740af833ee34b3c5';// useSelector(selectCurrentWorkspace);
  const currentFolderId = '66dc950e740af833ee34b3c6';// useSelector(selectCurrentFolder)

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
      const response = await axios.post(`http://139.59.4.99:3000/api/workspace/${currentWorkspaceId}/folder/${currentFolderId}/assessment/`, {
        // message: message || '',
        // history: [],
        // generalInfo: `5 Comprehensive Pre-Assessment ${Questions}`,
        // businessInfo: businessInfoData,
        assessmentName: assessmentName,
      },
      {
        headers: {
        Authorization : `Bearer ${token}`
      }, });
      return response.data.message;
    } catch (error) {
      console.log('assessment error', error.message);
      setError(error.message);
    }
  };

  return { error, StartAssessment };
};

export default useStartAssessment;
