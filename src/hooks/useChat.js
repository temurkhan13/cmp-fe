import { useState } from 'react';
import apiClient from '../api/axios';
import config from '../config/config';
import { getUserId } from '../utils/getUserId';

const useChat = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const chatWithdoc = async (inputText, file = null) => {
    setLoading(true);
    setError(null);

    try {
      // FormData append
      const formData = new FormData();
      formData.append('user_id', getUserId());
      formData.append('message', inputText);

      if (file) {
        formData.append('pdfPath', file);
      }

      const token = localStorage.getItem('token');
      const response = await apiClient.post(`${config.apiURL}/chat/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      setError(null);
      return response.data.message;
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return { error, chatWithdoc, loading };
};

export default useChat;
