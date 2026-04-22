import { useState } from 'react';
import apiClient from '../../api/axios';
import { getUserId } from '../../utils/getUserId';
const useInspire = () => {
  const [loading, setLoading] = useState(false);

  const handleInspire = async (text) => {
    setLoading(true);
    try {
      const response = await apiClient.post('/chat/inspire-me', {
        user_id: getUserId(),
        message: text,
      });
      return response.data.message;
    } catch (error) {
      return '';
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleInspire };
};

export default useInspire;
