import { useState } from 'react';
import apiClient from '../../api/axios';

const useGrammarFix = () => {
  const [error, setError] = useState(null);

  const fixGrammar = async (inputText) => {
    try {
      const response = await apiClient.post('/chat/grammar-fix', {
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
