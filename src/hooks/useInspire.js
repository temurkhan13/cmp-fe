import { useState } from 'react';
import apiClient from '../api/axios';

const useInspire = () => {
  const [loading, setLoading] = useState(false);

  const handleInspire = async (text) => {
    setLoading(true);
    try {
      const response = await apiClient.post('/assessment/inspire', {
        message: text,
      });
      return response.data.message;
    } catch (error) {
      console.log(error.message);
      return '';
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleInspire };
};

export default useInspire;
