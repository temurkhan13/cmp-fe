import { useState } from "react";
import apiClient from "../api/axios";

const useTranslation = () => {
  const [translationtext, setTranslationText] = useState("");
  const [error, setError] = useState(null);

  const Translation = async (inputText, language) => {
    try {
      const response = await apiClient.post("/chat/translate", {
        message: inputText,
        language: language,
      });
      console.log("translation", response.data.message);
      setTranslationText(response.data.message);
      setError(null);
    } catch (error) {
      console.log("check", error);
      setError("Failed to fix grammar. Please try again.");
      setTranslationText("");
    }
  };

  return { translationtext, error, Translation };
};

export default useTranslation;
