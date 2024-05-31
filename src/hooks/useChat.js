import { useState } from "react";
import apiClient from "../api/axios";

const useChat = () => {
  const [error, setError] = useState(null);

  const chatWithdoc = async (inputText, file = null) => {
    try {
      // formdata append
      const formData = new FormData();
      formData.append("message", inputText);

      if (file) {
        formData.append("pdfPath", file);
      }

      const response = await apiClient.post("/chat/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("chatWithApi response", response.data.message);
      setError(null);
      return response.data.message;
    } catch (error) {
      // console.error("Error in chatWithApi", error.message);
      setError(error.message);
    }
  };

  return { error, chatWithdoc };
};

export default useChat;
