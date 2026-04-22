import { useState } from 'react';
import apiClient from '../../api/axios';
import { getUserId } from '../../utils/getUserId';

const useExplain = () => {
  const [error, setError] = useState(null);

  const Explain = async (inputText) => {
    try {
      const response = await apiClient.post('/chat/explain', {
        user_id: getUserId(),
        message: inputText,
      });
      setError(null);
      return response.data.message;
    } catch (error) {
      setError(error.message);
    }
  };

  return { error, Explain };
};

export default useExplain;
