import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useVerifyEmail = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const verifyEmail = async (code) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        'http://139.59.4.99:3000/api/auth/verification',
        { code }
      );
      setLoading(false);
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
