import { useState } from 'react';
import apiClient from '../api/axios';

const useSummarize = () => {
  const [summary, setSummary] = useState("");
  const [error, setError] = useState(null);

  const summarize = async (inputText) => {
    try {
      const response = await apiClient.post("/chat/summarize", {
        message: inputText,
      });
      console.log("Summary -> ",response.data.message)
      setSummary(response.data.message);
      setError(null);
    } catch (error) {
      setError("Failed to summarize text. Please try again.");
      setSummary("");
    }
  };

  return { summary, error, summarize };
};

export default useSummarize;
