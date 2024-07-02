import { useState } from 'react';
import apiClient from '../api/axios';
import { useNavigate } from 'react-router-dom';

const useVerfiyEmailSignUp = () => {
  const navigate = useNavigate();   
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const VerfiyEmailSignUp = async (code) => {
    setLoading(true);
    setError(null);
    try {
      setLoading(false);
      console.log("verfiyEmailSignup", code)
      const response = await apiClient.post("/auth/verification",{
        verificationCode:code
      })
      console.log("useverifyEmailSignuprespose ---> ",response)
      if (response) {
        navigate('/choose-plain');
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return { VerfiyEmailSignUp, error, loading };
};

export default useVerfiyEmailSignUp;
