import { useState } from 'react';
import apiClient from '../../api/axios';
import axios from 'axios';
import config from '../../config/config';

const useChangeTone = () => {
  const [error, setError] = useState(null);

  const ChangeToneFun = async (selectedText, tone) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        `${config.apiURL}/chat/change-tone`,
        {
          message: { selectedText },
          tone: tone,
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

  return { error, ChangeToneFun };
};

export default useChangeTone;
