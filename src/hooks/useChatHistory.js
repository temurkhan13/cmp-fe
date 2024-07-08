import { useState } from "react";
import apiClient from "@api/axios";

const useChatHistory = () => {
  const [error, setError] = useState(null);

  const historyChat = async () => {
    const useMockData = true; // Set this to true to use mock data

    if (useMockData) {
      const mockData = [
        {
          date: "2024-07-06",
          message: [
            { text: "This is a mock chat message 1." },
            { text: "This is a mock chat message 2." }
          ]
        },
        {
          date: "2024-07-05",
          message: [
            { text: "Another mock chat message 1." },
            { text: "Another mock chat message 2." },
            { text: "Another mock chat message 3." },
            { text: "Another mock chat message 4." }
          ]
        },
        {
          date: "2024-07-05",
          message: [
            { text: "Another mock chat message 1." },
            { text: "Another mock chat message 2." },
            { text: "Another mock chat message 3." },
            { text: "Another mock chat message 4." }
          ]
        },
        {
          date: "2024-07-05",
          message: [
            { text: "Another mock chat message 1." },
            { text: "Another mock chat message 2." },
            { text: "Another mock chat message 3." },
            { text: "Another mock chat message 4." }
          ]
        },
        {
          date: "2024-07-05",
          message: [
            { text: "Another mock chat message 1." },
            { text: "Another mock chat message 2." },
            { text: "Another mock chat message 3." },
            { text: "Another mock chat message 4." }
          ]
        }
      ];
      return mockData;
    }

    try {
      const response = await apiClient.post("/chat", {
        message: "Tell me, How to do you assess the business's change management?",
      });
      console.log("Shortest test ", response.data.message);
      setError(null);
      return response.data.message;
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return { error, historyChat };
};

export default useChatHistory;
