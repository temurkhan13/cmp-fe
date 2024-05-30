import { useState } from "react";
import apiClient from "../api/axios";

const useAuto = () => {
  const [error, setError] = useState(null);

  const autoWritingFnc = async (inputText) => {
    try {
      const response = await apiClient.post("/chat/auto", {
        message: inputText,
      });
      setError(null);
      return response.data.message;
    } catch (error) {
      console.log("error", error.message);
      setError("Failed to summarize text. Please try again.");
    }
  };

  return { error, autoWritingFnc };
};

export default useAuto;
