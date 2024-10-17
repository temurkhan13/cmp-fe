import { useState } from 'react';
import apiClient from '../../api/axios';

const useExplain = () => {
  const [explainText, setExplainText] = useState('');
  const [error, setError] = useState(null);

  const Explain = async (inputText) => {
    try {
      const response = await apiClient.post('/chat/explain', {
        message: inputText,
      });
      console.log('Explain', response.data.message);
      setExplainText(response.data.message);
      setError(null);
    } catch (error) {
      console.log('check', error.message);
      setError(error.message);
      setExplainText('');
    }
  };

  return { explainText, error, Explain };
};

export default useExplain;
