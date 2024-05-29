import { useState } from 'react';
import apiClient from '../api/axios';

const useImproveWriting = () => {
  const [writing, setWriting] = useState("");
  const [error, setError] = useState(null);

  const improveWriting = async (inputText) => {
    try {
      const response = await apiClient.post("/chat/imporve-writing", {
        message: inputText,
      });
      console.log("setWriting -> ",response.data.message)
      setWriting(response.data.message);
      setError(null);
    } catch (error) {
      setError("Failed to summarize text. Please try again.");
      setWriting("");
    }
  };

  return { writing, error, improveWriting };
};

export default useImproveWriting;
