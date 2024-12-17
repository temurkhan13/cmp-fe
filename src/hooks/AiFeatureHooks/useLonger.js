import { useState } from 'react';
import apiClient from '../../api/axios';

const useLonger = () => {
  const [error, setError] = useState(null);

  const LongText = async (inputText) => {
    try {
      const response = await apiClient.post('/chat/long-text', {
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
