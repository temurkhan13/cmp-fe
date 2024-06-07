import { useState, useEffect, useRef } from "react";
import { ErrorMessage, useField } from "formik";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";
import Components from "..";

const FormInputWithDropDown = ({ label, place, data, className, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const [inputValue, setInputValue] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownRef = useRef(null);
  const dropDownData = data;
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setShowDropDown(true);
    helpers.setValue(value);
  };
  const handleArrowClick = (e) => {
    setShowDropDown(!showDropDown);
    e.stopPropagation();
  };
  const handleItemClick = (item) => {
    setInputValue(item);
    setShowDropDown(false);
    helpers.setValue(item);
  };
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropDown(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const filteredData = dropDownData.filter((item) =>
    item.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <>
      <div data-aos="fade-up" data-aos-duration={`600`}>
        <div
          className={`formInputWithDropDown ${
            meta.touched && meta.error && "is-invalid"
          }`}
        >
          <section>
            <label
              htmlFor={field.name}
              className={`form-label ${
                inputValue !== "" && "form-label-input-value"
              }`}
            >
              {label}
            </label>

            <div
              style={{ border: meta.touched && meta.error && "1px solid red" }}
            >
              <input
                placeholder={place}
                type="text"
                className={`form-input ${className}   ${
                  meta.touched && meta.error && "is-invalid"
                }`}
                {...field}
                {...props}
                autoComplete="off"
                onChange={handleInputChange}
                value={inputValue}
              />
              <div onClick={handleArrowClick}>
                <IoIosArrowDown />
              </div>
            </div>
            <blockquote>
              <ErrorMessage
                component="div"
                name={field.name}
                className="form-error"
              />
            </blockquote>
          </section>
          {showDropDown && (
            <motion.div
              initial={{ y: "-6rem", opacity: 0 }}
              animate={{ y: "0rem", opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={dropdownRef}
              style={{ zIndex: 9999 }}
            >
              {filteredData.length > 0 ? (
                <ul>
                  {filteredData.map((item, index) => (
                    <li key={index} onClick={() => handleItemClick(item)}>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <center>
                  <Components.Feature.Text className="secondry">
                    No match found
                  </Components.Feature.Text>
                </center>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default FormInputWithDropDown;
