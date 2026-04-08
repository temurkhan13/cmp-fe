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
//   if (token) {
//     setToken(token);
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
//       setError(null);
//       return response.data.message;
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return { error, chatWithdoc };
// };

// export default useChat;

import { useState } from 'react';
import apiClient from '@api/axios';
import axios from 'axios';
import config from '../config/config';

const useChat = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const chatWithdoc = async (inputText, file = null) => {
    setLoading(true);
    setError(null);

    try {
      // FormData append
      const formData = new FormData();
      const userId = JSON.parse(localStorage.getItem('user'))?.id || localStorage.getItem('userId') || '';
      formData.append('user_id', userId);
      formData.append('message', inputText);

      if (file) {
        formData.append('pdfPath', file);
      }

      const token = localStorage.getItem('token');
      const response = await axios.post(`${config.apiURL}/chat/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
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
