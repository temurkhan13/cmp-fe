import { useState } from "react";
import apiClient from "../api/axios";

const useChangeTone = () => {
  const [error, setError] = useState(null);

  const ChangeToneFun = async (inputText, selectedTone) => {
    try {
      const response = await apiClient.post("/chat/change-tone", {
        message: inputText,
        tone: selectedTone,
      });
      setError(null);
      return response.data.message;
    } catch (error) {
      console.log("check", error);
      setError("Failed to fix grammar. Please try again.");
    }
  };

  return { error, ChangeToneFun };
};

export default useChangeTone;
