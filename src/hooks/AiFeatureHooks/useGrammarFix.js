import { useState } from 'react';
import apiClient from '../../api/axios';
import config from '../../config/config';

const useGrammarFix = () => {
  const [error, setError] = useState(null);

  const fixGrammar = async (inputText) => {
    try {
      const token = localStorage.getItem('token');
      const response = await apiClient.post(
        `${config.apiURL}/chat/grammar-fix`,
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

  return { error, fixGrammar };
};

export default useGrammarFix;
