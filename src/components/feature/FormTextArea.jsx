import { ErrorMessage, useField } from 'formik';
import PropTypes from 'prop-types';

const FormTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="formtextArea" data-aos="fade-up" data-aos-duration="700">
      <label htmlFor={field.name} className="form-label">
        {label}
      </label>
      <textarea
        placeholder={props.place}
        name="message"
        id="message"
        className={`form-text ${meta.touched && meta.error && 'is-invalid'}`}
        {...field}
        {...props}
        autoComplete="off"
        style={{ border: meta.touched && meta.error && '1px solid red' }}
      />
      <ErrorMessage component="div" name={field.name} className="form-error" />
    </div>
  );
};

FormTextArea.propTypes = {
  label: PropTypes.string.isRequired,
  place: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default FormTextArea;
