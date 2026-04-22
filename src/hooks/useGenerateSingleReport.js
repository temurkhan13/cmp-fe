import { useState } from 'react';
import apiClient from '../api/axios';

const useGenerateSingleReport = ({ workspaceId, folderId, assessmentId }) => {
  const [error, setError] = useState(null);

  const GenerateSingleReport = async () => {
    try {
      const response = await apiClient.get(`/workspace-assessment/${assessmentId}`);
      return response.data.report;
    } catch (error) { if (import.meta.env.DEV) console.error(error); }
  };

  return { error, GenerateSingleReport };
};

export default useGenerateSingleReport;
