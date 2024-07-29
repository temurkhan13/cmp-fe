import { useState } from 'react';
import apiClient from '@api/axios';

const useInspire = () => {
  const [loading, setLoading] = useState(false);

  const handleInspire = async (text) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await apiClient.post('http://139.59.4.99:3000/api/assessment/inspire', {
        message: text,
      },
      { headers: {
         'Content-Type': 'multipart/form-data',
       Authorization : `Bearer ${token}`
     }},);
      return response.data.message;
    } catch (error) {
      console.log(error.message);
      return '';
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleInspire };
};

export default useInspire;
