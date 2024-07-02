import { useState } from 'react';
import apiClient from '../api/axios';
import { useNavigate } from 'react-router-dom';

const useResetPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const ResetPassword = async (email, code, values) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/auth/reset/password', {
        email: email,
        OTP: code,
        newPassword: values.password,
      });
      console.log('useResetPAssword -> ', response);
      setLoading(false);
      if (response) {
        navigate('/');
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return { ResetPassword, error, loading };
};

export default useResetPassword;
