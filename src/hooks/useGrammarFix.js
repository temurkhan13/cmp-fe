import { useState } from "react";
import apiClient from "../api/axios";

const useGrammarFix = () => {
  const [error, setError] = useState(null);

  const fixGrammar = async (inputText) => {
    try {
      const response = await apiClient.post("/chat/grammar-fix", {
        message: inputText,
      });
      console.log("fix grammar -> ", response.data.message);
      setError(null);
      return response.data.message;
    } catch (error) {
      console.log("check", error);
      setError("Failed to fix grammar. Please try again.");
    }
  };

  return { error, fixGrammar };
};

export default useGrammarFix;
