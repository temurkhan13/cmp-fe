import { useState } from 'react';
import apiClient from '../../api/axios';
import { getUserId } from '../../utils/getUserId';

const useChangeTone = () => {
  const [error, setError] = useState(null);

  const ChangeToneFun = async (selectedText, tone) => {
    try {
      const response = await apiClient.post('/chat/change-tone', {
        user_id: getUserId(),
        message: selectedText,
        tone: tone,
      });
      setError(null);
      return response.data.message;
    } catch (error) {
      setError(error.message);
    }
  };

  return { error, ChangeToneFun };
};

export default useChangeTone;
