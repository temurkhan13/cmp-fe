import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axios';
import { setToken } from '../api/auth';

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
      const response = await apiClient.post('/auth/', {
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

      if (response.data && response.data.tokens && response.data.tokens.access) {
        if (response.data) {
          // Store the token in localStorage
          localStorage.setItem('token', response.data.tokens.access.token);
  
          setSuccess(true);
          navigate('/verify-email', { state: { email: allDetails.email } });
        }
        //const token = response.data.tokens.access.token;
        //setToken(token);
       // setSuccess(true);
       // navigate('/verify-email', { state: { email: allDetails.email } });
      }

    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, success };
};

export default useRegister;
