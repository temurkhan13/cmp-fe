import { useState } from "react";
import apiClient from "../api/axios";

const useGrammarFix = () => {
  const [fixedGrammer, setFixedGrammer] = useState("");
  const [error, setError] = useState(null);

  const fixGrammar = async (inputText) => {
    try {
      const response = await apiClient.post("/chat/grammar-fix", {
        message: inputText,
      });
      console.log("fix grammar -> ",response.data.message)
      setFixedGrammer(response.data.message);
      setError(null);
    } catch (error) {
      console.log("check", error);
      setError("Failed to fix grammar. Please try again.");
      setFixedGrammer("");
    }
  };

  return { fixedGrammer, error, fixGrammar };
};

export default useGrammarFix;
