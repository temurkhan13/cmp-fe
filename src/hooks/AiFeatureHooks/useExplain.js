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
      setExplainText(response.data.message);
      setError(null);
    } catch (error) {
      setError(error.message);
      setExplainText('');
    }
  };

  return { explainText, error, Explain };
};

export default useExplain;
