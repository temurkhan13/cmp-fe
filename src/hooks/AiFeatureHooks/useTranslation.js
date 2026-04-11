import { useState } from 'react';
import apiClient from '../../api/axios';

const useTranslation = () => {
  const [translationtext, setTranslationText] = useState('');
  const [error, setError] = useState(null);

  const Translation = async (inputText, language) => {
    try {
      const response = await apiClient.post('/chat/translate', {
        user_id: JSON.parse(localStorage.getItem('user'))?.id || localStorage.getItem('userId') || '',
        message: inputText,
        language: language,
      });
      const result = response.data.message;
      setTranslationText(result);
      setError(null);
      return result;
    } catch (error) {
      setError(error.message);
      setTranslationText('');
      return null;
    }
  };

  return { translationtext, error, Translation };
};

export default useTranslation;
