import { useState } from 'react';
import apiClient from '../../api/axios';

const useComprehensive = () => {
  const [error, setError] = useState(null);

  const comprehensiveWriting = async (inputText) => {
    try {
      const response = await apiClient.post('/chat/comprehensive', {
        message: inputText,
      });
      console.log('setCmpWriting -> ', response.data.message);
      setError(null);
      return response.data.message;
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return { error, comprehensiveWriting };
};

export default useComprehensive;
