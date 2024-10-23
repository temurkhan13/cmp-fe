import { useState } from "react";
import axios from "axios";
import config from '../config/config';

const useGenerateSingleReport = ({ workspaceId, folderId, assessmentId }) => {
  const [error, setError] = useState(null);

  const GenerateSingleReport = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${config.apiURL}/workspace/${workspaceId}/folder/${folderId}/assessment/${assessmentId}/reports`,{},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response, 'response')
      setError(null);
      return response;
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };



  return { error, GenerateSingleReport };
};

export default useGenerateSingleReport;

