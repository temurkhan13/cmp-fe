import { useState } from "react";
import axios from "axios";
import config from '../config/config';

const useAssessment = ({ workspaceId, folderId }) => {
  const [error, setError] = useState(null);

  const Assessment = async (assessmentName) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${config.apiURL}/workspace/${workspaceId}/folder/${folderId}/assessment`,
        {
          assessmentName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const question = response.data.report[0]?.subReport[0]?.questionAnswer[0]?.question;

      setError(null);
      return question;
    } catch (error) {
      setError(error.response?.data?.message || error.message); // more detailed error handling
    }
  };

  const getAssessment = async (id) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      `${config.apiURL}/workspace-assessment/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }



  return { error, Assessment, getAssessment };
};

export default useAssessment;

