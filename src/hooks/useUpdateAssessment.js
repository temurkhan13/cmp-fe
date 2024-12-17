import { useState } from 'react';
import apiClient from '../api/axios';
import { useSelector } from 'react-redux';
import axios from 'axios';
import config from '../config/config';

const useUpdateAssessment = () => {
  const [error, setError] = useState(null);
  const businessInfo = useSelector((state) => state.businessInfo);

  const UpdateAssessment = async (message, assessmentName, Questions) => {
    try {
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
        `${config.apiURL}/assessment/`,
        {
          message: message || '',
          history: [],
          generalInfo: `5 Comprehensive Pre-Assessment ${Questions}`,
          businessInfo: businessInfoData,
          assessmentName: assessmentName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.message;
    } catch (error) {
      setError(error.message);
    }
  };

  return { error, UpdateAssessment };
};

export default useUpdateAssessment;
