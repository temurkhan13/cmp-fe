import { useState } from 'react';
import apiClient from '../../api/axios';
import { getUserId } from '../../utils/getUserId';

const useAuto = () => {
  const [error, setError] = useState(null);

  const autoWritingFnc = async (inputText) => {
    try {
      const response = await apiClient.post('/chat/auto/', {
        user_id: getUserId(),
        message: inputText,
      });
      setError(null);
      return response.data.message;
    } catch (error) {
      setError(error.message);
    }
  };

  return { error, autoWritingFnc };
};

export default useAuto;
