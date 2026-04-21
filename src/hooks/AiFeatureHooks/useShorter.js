import { useState } from 'react';
import apiClient from '../../api/axios';
import config from '../../config/config';
import { getUserId } from '../../utils/getUserId';

const useShorter = () => {
  const [error, setError] = useState(null);

  const shortText = async (inputText) => {
    try {
      const token = localStorage.getItem('token');
      const response = await apiClient.post(
        `${config.apiURL}/chat/short-text`,
        {
          user_id: getUserId(),
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
