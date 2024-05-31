import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/auth";

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

      // For now we just set token this but in future we use setToken component in api
      // const accessToken = response.data.tokens.access.token;
      // apiClientForAll.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      if (response) {
        setSuccess(true);
        navigate("/choose-plain");
      }
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, success };
};

export default useLogin;
