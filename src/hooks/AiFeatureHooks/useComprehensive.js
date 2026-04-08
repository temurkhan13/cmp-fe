import { useState } from 'react';
import apiClient from '../../api/axios';

const useComprehensive = () => {
  const [error, setError] = useState(null);

  const comprehensiveWriting = async (inputText) => {
    try {
      const response = await apiClient.post('/chat/comprehensive', {
        user_id: JSON.parse(localStorage.getItem('user'))?.id || localStorage.getItem('userId') || '',
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
