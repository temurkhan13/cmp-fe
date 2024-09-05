import { useState } from "react";
import apiClient from "../api/axios";

const useAuto = () => {
  const [error, setError] = useState(null);

  const autoWritingFnc = async (inputText) => {
    try {
      const token = localStorage.getItem('token');
      const response = await apiClient.post("http://139.59.4.99:3000/api//chat/auto", {
        message: inputText,
      },
      { headers: {
       Authorization : `Bearer ${token}`
     }},);
      setError(null);
      return response.data.message;
    } catch (error) {
      console.log("error", error.message);
      setError(error.message);
    }
  };

  return { error, autoWritingFnc };
};

export default useAuto;
