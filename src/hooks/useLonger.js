import { useState } from "react";
import apiClient from "../api/axios";

const useLonger = () => {
  const [longestText, setLongestText] = useState("");
  const [error, setError] = useState(null);

  const LongText = async (inputText) => {
    try {
      const response = await apiClient.post("/chat/long-text", {
        message: inputText,
      });
      console.log("long test ", response.data.message);
      setLongestText(response.data.message);
      setError(null);
    } catch (error) {
      setError("Failed to improve writing. Please try again.");
      setLongestText("");
    }
  };

  return { longestText, error, LongText };
};

export default useLonger;
