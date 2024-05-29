import { useState } from "react";
import apiClient from "../api/axios";

const useChangeTone = () => {
  const [changetoneText, setChangeToneText] = useState("");
  const [error, setError] = useState(null);

  const ChangeToneFun = async (inputText, selectedTone) => {
    try {
      console.log("pass -> " ,inputText, selectedTone)
      const response = await apiClient.post("/chat/change-tone", {
        message: inputText,
        tone: selectedTone,
      });
      console.log("changetonefun", response.data.message);
      setChangeToneText(response.data.message);
      setError(null);
    } catch (error) {
      console.log("check", error);
      setError("Failed to fix grammar. Please try again.");
      setChangeToneText("");
    }
  };

  return { changetoneText, error, ChangeToneFun };
};

export default useChangeTone;
