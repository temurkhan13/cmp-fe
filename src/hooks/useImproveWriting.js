import { useState } from "react";
import apiClient from "../api/axios";

const useImproveWriting = () => {
  const [error, setError] = useState(null);

  const improveWriting = async (inputText) => {
    try {
      const response = await apiClient.post("/chat/imporve-writing", {
        message: inputText,
      });
      console.log("setWriting -> ", response.data.message);
      setError(null);
      return response.data.message;
    } catch (error) {
      console.log(error.message)
      setError(error.message);
    }
  };

  return { error, improveWriting };
};

export default useImproveWriting;
