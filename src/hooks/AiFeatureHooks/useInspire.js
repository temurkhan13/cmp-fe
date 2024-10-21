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
        `${config.apiURL}/assessment/inspire`,
        {
          message:
            'What is the current situation prompting the need for change?', //text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
