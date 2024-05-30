import { useState } from "react";
import apiClient from "../api/auth";
import { useNavigate } from "react-router-dom";

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
      console.log("login", response);
      if (response) {
        setSuccess(true);
        navigate("/choose-plain");
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, success };
};

export default useLogin;
