import { useState } from "react";
import axios from "axios";
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
      console.log('LAAAAAAAAAAAAAAAAAAAAAAALAAAAAAAAAAAAAAAAAAAAAAAAAAAA:',response)
      return response.data.report;
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };



  return { error, GenerateSingleReport };
};

export default useGenerateSingleReport;

