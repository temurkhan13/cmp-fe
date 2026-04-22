import { useState } from "react";
import apiClient from '../api/axios';
import { getUserId } from '../utils/getUserId';

const useAssessment = ({ workspaceId, folderId }) => {
  const [error, setError] = useState(null);

  const Assessment = async (assessmentName) => {
    try {
      const response = await apiClient.post(
        `/workspace/${workspaceId}/folder/${folderId}/assessment`,
        {
          user_id: getUserId(),
          assessmentName,
        },
      );

      const question = response.data.report[0]?.subReport[0]?.questionAnswer[0]?.question;

      setError(null);
      return question;
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  const getAssessment = async (id) => {
    const response = await apiClient.get(`/workspace-assessment/${id}`);
    return response.data;
  }

  return { error, Assessment, getAssessment };
};

export default useAssessment;
