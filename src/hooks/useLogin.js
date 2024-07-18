import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axios";
import axios from "axios";
import { setToken } from "../api/axios"; // Import setToken to save the token in localStorage


const useLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    console.log("login", email, password);

    try {
      const response = await apiClient.post("/auth/login", {
        email,
        password,
      });
      console.log("Response Login", response)


      if (response.data) {
        // Store the token in localStorage
        setToken(response.data.tokens.access.token);
        
        setSuccess(true);
        navigate("/dashboard");
      }

      // if (response.data) {
      //   setSuccess(true);
      //   navigate("/dashboard");
      // }
    } catch (err) {
      console.log(err.message);
      if (err.response) {
        console.log('Error Response Data:', err.response.data);
        console.log('Error Response Status:', err.response.status);
        console.log('Error Response Headers:', err.response.headers);
      }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, success };
};

export default useLogin;
