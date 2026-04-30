import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verify, resendVerification } from '../../redux/slices/authSlice.js';
import { EmailVerificationModal } from '../../components/modal';
import Button from '../../components/common/Button';

const EmailVerificationHandler = () => {
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationData, setVerificationData] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedData = JSON.parse(userData);
      const isVerified = parsedData?.verificationCode?.verify ?? false;
      const hasGoogleId = parsedData?.googleId !== null;
      setVerificationData(isVerified || hasGoogleId);
    } else {
      setVerificationData(false);
    }
  }, []);

  const handleVerifyClick = () => {
    setShowVerificationModal(true);
  };

  const handleSubmit = async (code) => {
    const response = await dispatch(verify({ code }));
    if (response.error && response.error.message) {
      throw new Error('Something is wrong, please try again.');
    }
    const userData = localStorage.getItem('user');
    let parsedData = JSON.parse(userData);
    parsedData = {
      ...parsedData,
      verificationCode: {
        ...parsedData.verificationCode,
        verify: true,
      },
    };
    localStorage.setItem('user', JSON.stringify(parsedData));
    setVerificationData(true);
    setShowVerificationModal(false);
    window.location.reload();
    navigate('/dashboard');
  };

  const handleResend = async () => {
    await dispatch(resendVerification());
  };

  return (
    <>
      {verificationData === false && (
        <div className="email-verification-bar">
          <p>Please verify your email to unlock all features.</p>
          <Button
            variant="primary"
            size="sm"
            className="email-verify-btn"
            onClick={handleVerifyClick}
          >
            Verify
          </Button>
        </div>
      )}

      <EmailVerificationModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        onSubmit={handleSubmit}
        onResend={handleResend}
      />
    </>
  );
};

export default EmailVerificationHandler;
