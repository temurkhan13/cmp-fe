import { useState } from 'react';
import apiClient from '../../api/axios';

const useShorter = () => {
  const [error, setError] = useState(null);

  const shortText = async (inputText) => {
    try {
      const response = await apiClient.post('/chat/short-text', {
        user_id: JSON.parse(localStorage.getItem('user'))?.id || localStorage.getItem('userId') || '',
        message: inputText,
      });
      setError(null);
      return response.data.message;
    } catch (error) {
      setError(error.message);
    }
  };

  return { error, shortText };
};

export default useShorter;
