import React from "react";
import { ErrorMessage, useField } from "formik";

const FormTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="formtextArea" data-aos="fade-up" data-aos-duration="700">
        <label htmlFor={field.name} className="form-label">
          {label}
        </label>
        <textarea
          placeholder={props.place}
          name="message"
          id="message"
          className={`form-text ${meta.touched && meta.error && "is-invalid"}`}
          {...field}
          {...props}
          autoComplete="off"
          style={{ border: meta.touched && meta.error && "1px solid red" }}
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

export default FormTextArea;
