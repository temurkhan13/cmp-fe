import { useState } from 'react';
//import apiClient from '@api/axios';
import axios from 'axios';
import config from '../../config/config';
const useInspire = () => {
  const [loading, setLoading] = useState(false);

  const handleInspire = async (text) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${config.apiURL}/chat/inspire-me`,
        {
          user_id: JSON.parse(localStorage.getItem('user'))?.id || localStorage.getItem('userId') || '',
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
