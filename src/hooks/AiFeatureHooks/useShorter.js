import { useState } from 'react';
import axios from 'axios';
import config from '../../config/config';

const useShorter = () => {
  const [error, setError] = useState(null);

  const shortText = async (inputText) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${config.apiURL}/chat/short-text`,
        {
          user_id: JSON.parse(localStorage.getItem('user'))?.id || localStorage.getItem('userId') || '',
          message: inputText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setError(null);
      return response.data.message;
    } catch (error) {
      setError(error.message);
    }
  };

  return { error, shortText };
};

export default useShorter;
