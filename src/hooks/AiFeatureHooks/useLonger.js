import { useState } from 'react';
import apiClient from '../../api/axios';
import { getUserId } from '../../utils/getUserId';

const useLonger = () => {
  const [error, setError] = useState(null);

  const LongText = async (inputText) => {
    try {
      const response = await apiClient.post('/chat/long-text', {
        user_id: getUserId(),
        message: inputText,
      });
      setError(null);
      return response.data.message;
    } catch (error) {
      setError(error.message);
    }
  };

  return { error, LongText };
};

export default useLonger;
