import { useState } from 'react';
// import apiClient from '../../api/axios';
import config from '../../config/config';
import axios from 'axios';

const useAuto = () => {
  const [error, setError] = useState(null);

  const autoWritingFnc = async (inputText) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        config.apiURL + '/chat/auto/',
        {
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
      console.error('error', error.message);
      setError(error.message);
    }
  };

  return { error, autoWritingFnc };
};

export default useAuto;
