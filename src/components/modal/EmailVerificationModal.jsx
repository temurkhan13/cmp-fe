import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button';
import { Spinner } from '../common';
import Modal from './Modal';

const CODE_LENGTH = 6;

const EmailVerificationModal = ({ isOpen, onClose, onSubmit, onResend }) => {
  const [code, setCode] = useState(Array(CODE_LENGTH).fill(''));
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (isOpen) {
      setCode(Array(CODE_LENGTH).fill(''));
      setError('');
      setSubmitting(false);
      setResending(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    if (submitting) return;
    onClose();
  };

  const handleCodeChange = (index, value) => {
    const next = [...code];
    next[index] = value;
    setCode(next);
    if (value !== '' && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').slice(0, CODE_LENGTH);
    const next = Array(CODE_LENGTH).fill('');
    pasted.split('').forEach((ch, i) => {
      if (i < CODE_LENGTH) next[i] = ch;
    });
    setCode(next);
    const firstEmpty = next.findIndex((c) => c === '');
    inputRefs.current[firstEmpty === -1 ? CODE_LENGTH - 1 : firstEmpty]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === 'Delete' && code[index] === '' && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.ctrlKey && e.key === 'a') {
      e.preventDefault();
      inputRefs.current.forEach((input) => input?.select());
    }
  };

  const handleFocus = (index) => {
    inputRefs.current[index]?.select();
  };

  const handleSubmit = async () => {
    setError('');
    if (code.some((c) => !c || c.length < 1)) {
      setError('All fields are required and must be at least 1 character long.');
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit(code.join(''));
    } catch (err) {
      setError(err?.message || 'Something is wrong, please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!onResend || resending) return;
    setResending(true);
    try {
      await onResend();
    } finally {
      setResending(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Email Verification"
      footer={
        <Button
          variant="primary"
          size="lg"
          className="code-submit-btn"
          onClick={handleSubmit}
          loading={submitting}
        >
          Submit
        </Button>
      }
    >
      <strong>Please check your email.</strong>
      <p className="auth-verification-subtitle">
        We&apos;ve sent a code to your entered email.
      </p>
      <div className="verification-inputs">
        {code.map((value, index) => (
          <input
            key={index}
            type="text"
            value={value}
            maxLength="1"
            ref={(el) => (inputRefs.current[index] = el)}
            onChange={(e) => handleCodeChange(index, e.target.value)}
            onPaste={handlePaste}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onFocus={() => handleFocus(index)}
            disabled={submitting}
          />
        ))}
      </div>
      {error && <div className="auth-error">{error}</div>}

      {onResend && (
        <p className="auth-verification-subtitle--lg">
          Didn&apos;t get a code?{' '}
          <span className="auth-resend-action" onClick={handleResend}>
            Click to resend.
            {resending && <Spinner />}
          </span>
        </p>
      )}
    </Modal>
  );
};

EmailVerificationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onResend: PropTypes.func,
};

export default EmailVerificationModal;
