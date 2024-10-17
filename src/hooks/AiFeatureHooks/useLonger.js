import { useState } from 'react';
import apiClient from '../../api/axios';

const useLonger = () => {
  const [error, setError] = useState(null);

  const LongText = async (inputText) => {
    try {
      const response = await apiClient.post('/chat/long-text', {
        message: inputText,
      });
      console.log('long test ', response.data.message);
      setError(null);
      return response.data.message;
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return { error, LongText };
};

export default useLonger;
