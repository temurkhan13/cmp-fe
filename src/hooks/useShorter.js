import { useState } from "react";
import apiClient from "../api/axios";

const useShorter = () => {
  const [shortestText, setShortestText] = useState("");
  const [error, setError] = useState(null);

  const shortText = async (inputText) => {
    try {
      const response = await apiClient.post("/chat/short-text", {
        message: inputText,
      });
      console.log("Shortest test ", response.data.message);
      setShortestText(response.data.message);
      setError(null);
    } catch (error) {
      setError("Failed to improve writing. Please try again.");
      setShortestText("");
    }
  };

  return { shortestText, error, shortText };
};

export default useShorter;
