import { useState } from 'react';
import apiClient from '../../api/axios';

const useExplain = () => {
  const [explainText, setExplainText] = useState('');
  const [error, setError] = useState(null);

  const Explain = async (inputText) => {
    try {
      const response = await apiClient.post('/chat/explain', {
        user_id: JSON.parse(localStorage.getItem('user'))?.id || localStorage.getItem('userId') || '',
        message: inputText,
      });
      const result = response.data.message;
      setExplainText(result);
      setError(null);
      return result;
    } catch (error) {
      setError(error.message);
      setExplainText('');
      return null;
    }
  };

  return { explainText, error, Explain };
};

export default useExplain;
