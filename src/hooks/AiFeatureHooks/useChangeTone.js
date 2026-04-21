import { useState } from 'react';
import apiClient from '../../api/axios';
import config from '../../config/config';
import { getUserId } from '../../utils/getUserId';

const useChangeTone = () => {
  const [error, setError] = useState(null);

  const ChangeToneFun = async (selectedText, tone) => {
    try {
      const token = localStorage.getItem('token');

      const response = await apiClient.post(
        `${config.apiURL}/chat/change-tone`,
        {
          user_id: getUserId(),
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
