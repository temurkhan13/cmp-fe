import { useState } from 'react';
// import apiClient from '../api/axios';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const register = async (email, password) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      
      const response = await axios.post('http://139.59.4.99:3000/api/auth', {
        email,
        password,
      });
      console.log('Registration successful:', response.data);
      // setSuccess(true); 
    } catch (err) {
      // if (err || err.response.data) {
      //   setError(err.response.data.message); 
      //   setError(err.response.message);
      // }
      setError(err.message)
      // console.error('Registration error:', err.message);
      // setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, success };
};

export default useRegister;
