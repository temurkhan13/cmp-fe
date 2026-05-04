import { useState } from 'react';
import apiClient from '../api/axios';

const useGenerateSingleReport = ({ assessmentId }) => {
  const [error] = useState(null);

  const GenerateSingleReport = async () => {
    try {
      const response = await apiClient.get(`/workspace-assessment/${assessmentId}`);
      return response.data.report;
    } catch (e) {
      console.error(e);
    }
  };

  return { error, GenerateSingleReport };
};

export default useGenerateSingleReport;
