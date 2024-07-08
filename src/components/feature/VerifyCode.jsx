import React, { useState } from "react";
import { ErrorMessage, useField } from "formik";

const VerifyCode = ({ label, place, className, handleVerification, ...props }) => {
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
        className={`form-input ${className} ${meta.touched && meta.error && "is-invalid"}`}
        {...field}
        autoComplete="off"
        value={value}
        onChange={handleChange}
        style={{
          border: meta.touched && meta.error ? "1px solid rgba(255, 0, 0, 0.589)" : undefined,
        }}
      />
      <ErrorMessage component="div" name={field.name} className="form-error" />
    </div>
  );
};

export default VerifyCode;
