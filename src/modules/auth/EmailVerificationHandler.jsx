import { useState, useRef, useEffect } from 'react';
import Modal from '../../components/common/Modal';
import { useDispatch } from 'react-redux';
import { verify, resendVerification } from '../../redux/slices/authSlice.js';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/dashboard/Spinner/Spinner.jsx';
const EmailVerificationHandler = () => {
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [resendCode, setResendCode] = useState(false);
  const [error, setError] = useState('');

  const [verificationData, setVerificationData] = useState(false);
  const [verificationCode, setVerificationCode] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleVerifyClick = async () => {
    setShowVerificationModal(true);
  };

  const handleResendCode = async () => {
    setResendCode(true);
    dispatch(resendVerification())
      .then((response) => {
        setResendCode(false);
      })
      .catch((error) => {
        setResendCode(false);
      });
  };

  const handleCloseModal = async () => {
    const code = verificationCode.join('');
    // await dispatch(verify({code}))
    // Clear previous error
    setError('');

    // Check for empty fields or fields with minlength 0
    const hasError = inputRefs.current.some((input) => {
      return !input.value || input.value.length < 1; // Change < 1 to < desiredMinLength if needed
    });

    if (hasError) {
      setError(
        'All fields are required and must be at least 1 character long.'
      );
      return;
    }
    dispatch(verify({ code }))
      .then((response) => {
        if (response.error && response.error.message) {
          setError('Something is wrong, please try again.');
          return;
        }

        const userData = localStorage.getItem('user');
        let parsedData = JSON.parse(userData);

        // Update the verificationCode.verify to true
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
      })
      .catch((error) => {});
  };

  const handleCodeChange = (index, value) => {
    const newCode = [...verificationCode];
    newCode[index] = value;

    if (value !== '' && index < verificationCode.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    setVerificationCode(newCode);
  };

  const handlePaste = (index, e) => {
    const pastedCode = e.clipboardData
      .getData('text')
      .slice(0, verificationCode.length);
    const newCode = pastedCode.split('').slice(0, verificationCode.length);

    setVerificationCode(newCode);

    // Focus on the last filled input after paste
    const nextIndex = newCode.findIndex((code) => code === '');
    inputRefs.current[
      nextIndex === -1 ? newCode.length - 1 : nextIndex
    ].focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (verificationCode[index] === '' && index > 0) {
        // Focus previous input if current input is empty and backspace is pressed
        inputRefs.current[index - 1].focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      // Move focus to the previous input on left arrow
      inputRefs.current[index - 1].focus();
    } else if (e.key === 'ArrowRight' && index < verificationCode.length - 1) {
      // Move focus to the next input on right arrow
      inputRefs.current[index + 1].focus();
    } else if (
      e.key === 'Delete' &&
      verificationCode[index] === '' &&
      index < verificationCode.length - 1
    ) {
      // Focus next input if current input is empty and delete is pressed
      inputRefs.current[index + 1].focus();
    } else if (e.ctrlKey && e.key === 'a') {
      // Handle Ctrl+A for selecting all inputs
      e.preventDefault();
      const inputs = inputRefs.current;
      inputs.forEach((input) => input.select());
    }
  };

  const handleFocus = (index) => {
    // Automatically select all text on focus for improved UX
    inputRefs.current[index].select();
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      // Parse if userData exists
      const parsedData = JSON.parse(userData);
      const isVerified = parsedData?.verificationCode?.verify ?? false;
      const hasGoogleId = parsedData?.googleId !== null;

      // Set the verification state based on both conditions
      setVerificationData(isVerified || hasGoogleId);
    } else {
      // Handle missing user data in localStorage
      setVerificationData(false); // or any default value you prefer
    }
  }, []);

  return (
    <>
      {verificationData === false && (
        <div className="email-verification-bar">
          <p>Please verify your email to unlock all features.</p>
          <button onClick={handleVerifyClick} className="email-verify-btn">
            Verify
          </button>
        </div>
      )}

      <Modal
        title="Email Verification"
        isOpen={showVerificationModal}
        onClose={() => {
          setVerificationCode(['', '', '', '', '', '']);
          setError('');
          setShowVerificationModal(!showVerificationModal);
        }}
      >
        <h1>Please check your email.</h1>
        <p style={{ fontSize: '1.2rem' }}>
          We&apos;ve sent a code to your entered email.
        </p>
        <div className="verification-inputs">
          {verificationCode.map((code, index) => (
            <input
              key={index}
              type="text"
              value={code}
              minLength={'1'}
              maxLength="1"
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onPaste={(e) => handlePaste(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onFocus={() => handleFocus(index)}
            />
          ))}
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}

        <p style={{ fontSize: '1.3rem' }}>
          <span> </span>
          Didn&apos;t get a code?
          <span
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={handleResendCode}
          >
            Click to resend.
            {resendCode && <Spinner />}
          </span>
        </p>

        <button className="code-submit-btn" onClick={handleCloseModal}>
          Submit
        </button>
      </Modal>
      <style>{`

  .email-verification-bar {
    width: 100%;
    max-width: 37.5rem; 
    position: fixed;
    top: 0%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #C3E11D;
    padding: 1rem;
    border-bottom-right-radius: 1rem; 
    border-bottom-left-radius: 1rem; 
    color: black;
    text-align: center;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1); 
    z-index: 1000;
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
    .email-verify-btn{
    padding: 0.5rem 1rem;
    border: 1px solid black;
    border-radius: 5px;
    background-color:#C3E11D;
    }
  .verification-inputs {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    margin: 1rem 0;
  }
  input {
    width: 5rem;
    height: 5rem;
    font-size: 3rem;
    border: 0.0625rem solid lightgray;
    border-radius: 0.5rem;
    outline: none;
  }
  .code-submit-btn {
    padding: 0.5rem 3rem;
    border: none;
    outline: none;
    font-size: 1.8rem;
    border-radius: 1rem; 
    background-color: #c3e11d;
    color: #0b1444;
  }
`}</style>
    </>
  );
};

export default EmailVerificationHandler;
