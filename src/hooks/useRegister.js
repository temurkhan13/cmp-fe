// import { useState } from 'react';
// // import apiClient from '../api/axios';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const useRegister = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const register = async (allDetails, password) => {
//     setLoading(true);
//     setError(null);
//     setSuccess(false);

//     try {
//       const response = await axios.post('http://139.59.4.99:3000/api/auth/', {
//         email: allDetails.email,
//         password: password,
//         firstName: allDetails.name,
//         lastName: allDetails.lastName,
//         industry: allDetails.industry,
//         companyName: allDetails.companyName,
//         companySize: allDetails.companySize,
//         webURL: allDetails.websiteURL,
//         jobTitle: allDetails.jobTitle,
//       });
//       console.log('Registration successful:', response.data);

//       if (response.data) {
//         setSuccess(true);
//         navigate('/verify-email', { state: { email: allDetails.email } });
//       }

//     } catch (err) {
//       setError(err.response.data.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { register, loading, error, success };
// };

// export default useRegister;

// import apiClient from '../api/axios';

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const useRegister = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const register = async (allDetails, password) => {
//     setLoading(true);
//     setError(null);
//     setSuccess(false);

//     try {
//       const response = await axios.post('http://139.59.4.99:3000/api/auth/', {
//         email: allDetails.email,
//         password: password,
//         firstName: allDetails.name,
//         lastName: allDetails.lastName,
//         industry: allDetails.industry,
//         companyName: allDetails.companyName,
//         companySize: allDetails.companySize,
//         webURL: allDetails.websiteURL,
//         jobTitle: allDetails.jobTitle,
//       });
//       console.log('Registration successful:', response.user.tokens.access.token);

//       if (response) {
//         localStorage.setItem("token")
//         setSuccess(true);
//         navigate('/verify-email', { state: { email: allDetails.email } });
//       }

//     } catch (err) {
//       setError(err.response.data.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { register, loading, error, success };
// };

// export default useRegister;

import { useState } from 'react';
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
      
      console.log('Registration successful:', response);

      if (response) {
        localStorage.setItem("token", response.data.tokens.access.token);
        setSuccess(true);
        navigate('/verify-email', { state: { email: allDetails.email } });
      }

    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, success };
};

export default useRegister;
