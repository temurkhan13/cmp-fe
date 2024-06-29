import { useState } from 'react';
// import apiClient from '../api/axios';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const register = async (allDetails, password) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post('http://139.59.4.99:3000/api/auth/', {
        email: allDetails.email,
        password: password,
        firstName: allDetails.name,
        lastName: allDetails.lastName,
        industry: allDetails.industry,
        companyName: allDetails.companyName,
        companySize: allDetails.companySize,
        webURL: allDetails.websiteURL,
        jobTitle: allDetails.jobTitle,
      });
      console.log('Registration successful:', response.data);

      if (response.data) {
        setSuccess(true);
        navigate('/verify-email', { state: { email: allDetails.email } });
      }

      // setSuccess(true);
    } catch (err) {
      // if (err || err.response.data) {
      //   setError(err.response.data.message);
      //   setError(err.response.message);
      // }
      setError(err.response.data.message);
      // console.error('Registration error:', err.message);
      // setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, success };
};

export default useRegister;
