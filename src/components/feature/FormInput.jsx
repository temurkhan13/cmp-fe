import { ErrorMessage, useField } from "formik";
import { useState } from "react";
const FormInput = ({ label, place, className, ...props }) => {
  const [field, meta] = useField(props);
  const [value, setValue] = useState("");
  return (
    <>
      <div className="forminput" data-aos="fade-up" data-aos-duration="500">
        <label
          htmlFor={field.name}
          // className={`form-label  mb_primary  ${
          //   value !== "" && "form-label-input-value"
          // }`}
          className="mb_Primary"
        >
          {label}
        </label>
        <input
          placeholder={place}
          type="text"
          className={`form-input ${className}   ${
            meta.touched && meta.error && "is-invalid"
          }`}
          {...field}
          {...props}
          autoComplete="off"
          onChangeCapture={(e) => setValue(e.target.value)}
          style={{
            border:
              meta.touched && meta.error && "1px solid rgba(255, 0, 0, 0.589)",
          }}
        />

        <ErrorMessage
          component="div"
          name={field.name}
          className="form-error"
        />
      </div>
    </>
  );
};

export default FormInput;
