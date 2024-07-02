import { useState } from 'react';
// import apiClient from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const useVerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const verifyEmail = async (code) => {
    setLoading(true);
    setError(null);
    try {
      setLoading(false);
      if (code && email) {
        navigate('/forgot-password/set-new-password', {
          state: { email, code },
        });
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return { verifyEmail, error, loading };
};

export default useVerifyEmail;
