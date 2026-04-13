import { useState } from 'react';
import apiClient from '../api/axios';
import config from '../config/config';

const useGenerateSingleReport = ({ workspaceId, folderId, assessmentId }) => {
  const [error, setError] = useState(null);

  const GenerateSingleReport = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await apiClient.get(
        `${config.apiURL}/workspace-assessment/${assessmentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.report;
    } catch (error) { if (import.meta.env.DEV) console.error(error); }
  };

  return { error, GenerateSingleReport };
};

export default useGenerateSingleReport;
