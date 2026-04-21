import { useState } from 'react';
import config from '../../config/config';
import apiClient from '../../api/axios';
import { getUserId } from '../../utils/getUserId';

const useAuto = () => {
  const [error, setError] = useState(null);

  const autoWritingFnc = async (inputText) => {
    try {
      const token = localStorage.getItem('token');
      const response = await apiClient.post(
        config.apiURL + '/chat/auto/',
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

  return { error, autoWritingFnc };
};

export default useAuto;
