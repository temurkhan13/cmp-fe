import { useState } from "react";
import apiClient from "../api/axios";
import axios from "axios";

const useChangeTone = () => {
  const [error, setError] = useState(null);



  const ChangeToneFun = async (selectedText, tone) => {
    try {
      const token = localStorage.getItem('token');
      
      console.log("Change Tone text: "+selectedText)
      const response = await axios.post("http://139.59.4.99:3000/api/chat/change-tone", {
        message: {selectedText},
        tone: tone,        
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
