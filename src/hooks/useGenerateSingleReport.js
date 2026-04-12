import { useState } from 'react';
import axios from 'axios';
import config from '../config/config';

const useGenerateSingleReport = ({ workspaceId, folderId, assessmentId }) => {
  const [error, setError] = useState(null);

  const GenerateSingleReport = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
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
