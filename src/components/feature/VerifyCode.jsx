import { useState } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, useField } from 'formik';

const VerifyCode = ({
  label,
  place,
  className,
  handleVerification,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  const [value, setValue] = useState(field.value);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    helpers.setValue(newValue);

    // Check if newValue is exactly 6 digits to trigger verification
    if (/^\d{6}$/.test(newValue)) {
      handleVerification({ newValue }); // Send { "verificationCode": newValue }
    }
  };

  return (
    <div className="forminput" data-aos="fade-up" data-aos-duration="500">
      <label htmlFor={field.name} className="mb_Primary">
        {label}
      </label>
      <input
        placeholder={place}
        type="text"
        inputMode="numeric"
        pattern="\d*"
        className={`form-input ${className} ${
          meta.touched && meta.error && 'is-invalid'
        }`}
        {...field}
        autoComplete="off"
        value={value}
        onChange={handleChange}
      />
      <ErrorMessage component="div" name={field.name} className="form-error" />
    </div>
  );
};

VerifyCode.propTypes = {
  label: PropTypes.string.isRequired,
  place: PropTypes.string,
  className: PropTypes.string,
  handleVerification: PropTypes.func.isRequired,
  // Spread props may contain other PropTypes from useField hook
};

export default VerifyCode;
