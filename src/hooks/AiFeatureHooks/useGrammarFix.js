import { useState } from 'react';
import apiClient from '../../api/axios';
import { getUserId } from '../../utils/getUserId';

const useGrammarFix = () => {
  const [error, setError] = useState(null);

  const fixGrammar = async (inputText) => {
    try {
      const response = await apiClient.post('/chat/grammar-fix', {
        user_id: getUserId(),
        message: inputText,
      });
      setError(null);
      return response.data.message;
    } catch (error) {
      setError(error.message);
    }
  };

  return { error, fixGrammar };
};

export default useGrammarFix;
