import { useState } from "react";
import apiClient from "../api/auth";
import { useNavigate } from "react-router-dom";
// 
const useRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const register = async (email, password,verificationCode) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    console.log(email, password,verificationCode )

    try {
      const response = await apiClient.post("/auth/", {
        email,
        password,
        verificationCode,
      });
      console.log("register", response.message);
      if (response) {
        setSuccess(true);
        navigate("/choose-plain");
      }

    } catch (err) {
      console.log(err.message)
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, success };
};

export default useRegister;
