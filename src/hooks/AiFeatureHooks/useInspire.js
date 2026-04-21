import { useState } from 'react';
import apiClient from '../../api/axios';
import config from '../../config/config';
import { getUserId } from '../../utils/getUserId';
const useInspire = () => {
  const [loading, setLoading] = useState(false);

  const handleInspire = async (text) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await apiClient.post(
        `${config.apiURL}/chat/inspire-me`,
        {
          user_id: getUserId(),
          message: text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
