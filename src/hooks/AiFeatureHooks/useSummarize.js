import { useState } from 'react';
import apiClient from '../../api/axios';

const useSummarize = () => {
  const [error, setError] = useState(null);

  const summarize = async (inputText) => {
    try {
      const response = await apiClient.post('/chat/summarize', {
        user_id: JSON.parse(localStorage.getItem('user'))?.id || localStorage.getItem('userId') || '',
        message: inputText,
      });
      setError(null);
      return response.data.message;
    } catch (error) {
      setError(error.message);
    }
  };

  return { error, summarize };
};

export default useSummarize;
