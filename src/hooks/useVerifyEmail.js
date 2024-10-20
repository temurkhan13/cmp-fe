import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import apiClient from '../api/axios';
import { setToken } from '../api/auth';

const useVerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const verifyEmail = async (code) => {
    setLoading(true);
    setError(null);

    try {

      const response = await apiClient.post(
        '/auth/verification',
        {"verificationCode": parseInt( code.value.newValue) }
      );
      setLoading(false);
      console.log(response);
      if (response.data) {
        navigate('/choose-plain');
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return { verifyEmail, error, loading };
};

export default useVerifyEmail;
