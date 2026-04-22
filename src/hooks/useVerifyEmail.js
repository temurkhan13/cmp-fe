import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axios';

const useVerifyEmail = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const verifyEmail = async (code) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post('/auth/verification', {
        verificationCode: parseInt(code.value.newValue),
      });
      setLoading(false);
      if (response.data) {
        navigate('/choose-plan');
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return { verifyEmail, error, loading };
};

export default useVerifyEmail;
