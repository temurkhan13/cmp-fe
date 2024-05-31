import { useState } from 'react';
import apiClient from '../api/axios';

const useSummarize = () => {
  const [error, setError] = useState(null);

  const summarize = async (inputText) => {
    try {
      const response = await apiClient.post("/chat/summarize", {
        message: inputText,
      });
      console.log("Summary -> ",response.data.message)
      setError(null);
      return response.data.message
    } catch (error) {
      console.log(error.message)
      setError(error.message);
    }
  };

  return {  error, summarize };
};

export default useSummarize;
