import { useState } from 'react';
import apiClient from '../api/axios';
import { useNavigate } from 'react-router-dom';
import config from '../config/config';

const useForgotVerfication = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const ForgotVerfication = async (code) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post(`${config.apiURL}/auth/verification`, {
        code,
      });
      setLoading(false);
      if (response.data) {
        navigate('forgot-password/set-new-password');
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return { ForgotVerfication, error, loading };
};

export default useForgotVerfication;
