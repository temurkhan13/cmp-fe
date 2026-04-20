import { useState } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, useField } from 'formik';

const FormInput = ({ label, place, className, ...props }) => {
  const [field, meta] = useField(props);
  const [value, setValue] = useState('');
  return (
    <div className="forminput" data-aos="fade-up" data-aos-duration="500">
      <label
        htmlFor={field.name}
        className={`mb_Primary ${value !== '' ? 'form-label-input-value' : ''}`}
      >
        {label}
      </label>
      <input
        placeholder={place}
        type="text"
        className={`form-input ${className} ${
          meta.touched && meta.error ? 'is-invalid' : ''
        }`}
        {...field}
        {...props}
        autoComplete="off"
        onChangeCapture={(e) => setValue(e.target.value)}
      />
      <ErrorMessage component="div" name={field.name} className="form-error" />
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  place: PropTypes.string,
  className: PropTypes.string,
};

FormInput.defaultProps = {
  place: '',
  className: '',
};

export default FormInput;
