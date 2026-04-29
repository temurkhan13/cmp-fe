import { useState } from 'react';
import apiClient from '../api/axios';

const useGenerateSingleReport = ({ assessmentId }) => {
  const [error] = useState(null);

  const GenerateSingleReport = async () => {
    try {
      const response = await apiClient.get(`/workspace-assessment/${assessmentId}`);
      return response.data.report;
    } catch (error) { if (import.meta.env.DEV) console.error(error); }
  };

  return { error, GenerateSingleReport };
};

export default useGenerateSingleReport;
