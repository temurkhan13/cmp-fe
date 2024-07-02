import { useState } from 'react';
import apiClient from '../api/axios';
import { useNavigate } from 'react-router-dom';

const useForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const forgotPassword = async (email) => {
        setLoading(true);
        setError(null);
        try {
            console.log("check email ==.>", email)
            const response = await apiClient.post('/auth/forgot/password', { email });
            if (response.status === 200) {
                setSuccess(true);
                navigate('/forgot-password/Code', {state:{email}});
            } else {
                setError('Failed to send reset password email.');
            }
        } catch (err) {
            setError(err.response ? err.response.data.message : err.message);
        } finally {
            setLoading(false);
        }
    };

    return { forgotPassword, loading, error, success };
};

export default useForgotPassword;
