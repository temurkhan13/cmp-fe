import { useState } from 'react';
import apiClient from '../../api/axios';
import { getUserId } from '../../utils/getUserId';

const useComprehensive = () => {
  const [error, setError] = useState(null);

  const comprehensiveWriting = async (inputText) => {
    try {
      const response = await apiClient.post('/chat/comprehensive', {
        user_id: getUserId(),
        message: inputText,
      });
      setError(null);
      return response.data.message;
    } catch (error) {
      setError(error.message);
    }
  };

  return { error, comprehensiveWriting };
};

export default useComprehensive;
