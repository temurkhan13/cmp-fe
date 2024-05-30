import { useState } from "react";
import apiClient from "../api/axios";

const useShorter = () => {
  const [error, setError] = useState(null);

  const shortText = async (inputText) => {
    try {
      const response = await apiClient.post("/chat/short-text", {
        message: inputText,
      });
      console.log("Shortest test ", response.data.message);
      setError(null);
      return response.data.message;
    } catch (error) {
      setError("Failed to improve writing. Please try again.");
    }
  };

  return { error, shortText };
};

export default useShorter;
