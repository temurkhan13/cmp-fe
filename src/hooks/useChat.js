import { useState } from "react";
import axios from "axios";

const useChat = () => {
  const [chatResponse, setChatResponse] = useState("");
  const [error, setError] = useState(null);

  const chatWithdoc = async (inputText, file = null) => {
    try {
      const formData = new FormData();
      formData.append("message", inputText);

      if (file) {
        formData.append("file", file);
      }

      const response = await axios.post("/chat/change-tone", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("chatWithApi response", response.data.message);
      setChatResponse(response.data.message);
      setError(null);
    } catch (error) {
      console.error("Error in chatWithApi", error);
      setError("Failed to process your request. Please try again.");
      setChatResponse("");
    }
  };

  return { chatResponse, error, chatWithdoc };
};

export default useChat;
