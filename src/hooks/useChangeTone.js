import { useState } from "react";
import apiClient from "../api/axios";
import axios from "axios";

const useChangeTone = () => {
  const [error, setError] = useState(null);



  const ChangeToneFun = async (inputText, selectedTone) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.post("http://139.59.4.99:3000/api/chat/change-tone", {
        message: inputText,
        tone: selectedTone,        
      },
     { headers: {
        'Content-Type': 'multipart/form-data',
      Authorization : `Bearer ${token}`
    }},);
      setError(null);
      return response.data.message;
    } catch (error) {
      console.log("check", error.message);
      setError(error.message);
    }
  };

  return { error, ChangeToneFun };
};

export default useChangeTone;
