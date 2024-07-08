// import { useState } from "react";
// import { useNavigate, useLocation } from 'react-router-dom';
// import apiClient from "../api/axios";

// import { setToken } from '../api/auth';

// const useChat = () => {
//   const [error, setError] = useState(null);
//   const location = useLocation();
//   const [loading, setLoading] = useState(false);

  

//   const chatWithdoc = async (inputText, file = null) => {
//     try {

//       setLoading(true);
//     setError(null);
//       // Retrieve the token from the location state

//   const token = location.state?.token;
//   console.log("Retrieved token:", token); // Debug log
//   if (token) {
//     setToken(token);
//     console.log("Token set in localStorage"); // Debug log
//   } else {
//     setError('Token not found');
//     setLoading(false);
//     return;
//   }

//       // formdata append
//       const formData = new FormData();
//       formData.append("message", inputText);

//       if (file) {
//         formData.append("pdfPath", file);
//       }

//       const response = await apiClient.post("/chat/", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log("chatWithApi response", response.data.message);
//       setError(null);
//       return response.data.message;
//     } catch (error) {
//       // console.error("Error in chatWithApi", error.message);
//       setError(error.message);
//     }
//   };

//   return { error, chatWithdoc };
// };

// export default useChat;


import { useState } from 'react';
import apiClient from '@api/axios';

const useChat = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const chatWithdoc = async (inputText, file = null) => {
    setLoading(true);
    setError(null);

    try {
      // FormData append
      const formData = new FormData();
      formData.append('message', inputText);

      if (file) {
        formData.append('pdfPath', file);
      }

      const response = await apiClient.post('/chat/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('chatWithApi response', response.data.message);
      setLoading(false);
      setError(null);
      return response.data.message;
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return { error, chatWithdoc, loading };
};

export default useChat;
