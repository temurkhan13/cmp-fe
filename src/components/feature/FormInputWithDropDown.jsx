import { useState, useEffect, useRef } from 'react';
import { ErrorMessage, useField } from 'formik';
import { IoIosArrowDown } from 'react-icons/io';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import Components from '..';

const FormInputWithDropDown = ({ label, place, data, className, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const [inputValue, setInputValue] = useState('');
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
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const filteredData = dropDownData.filter((item) => {
    if (typeof inputValue === 'number') {
      return item.includes(inputValue.toString());
    } else if (typeof inputValue === 'string') {
      return item.toLowerCase().includes(inputValue.toLowerCase());
    }
    return false;
  });

  return (
    <div
      className={`formInputWithDropDown ${
        meta.touched && meta.error ? 'is-invalid' : ''
      }`}
    >
      <section data-aos="fade-up" data-aos-duration={`600`}>
        <label
          htmlFor={field.name}
          className={`form-label ${
            inputValue !== '' ? 'form-label-input-value' : ''
          }`}
        >
          {label}
        </label>

        <div
          className={meta.touched && meta.error ? 'form-input-error-border' : ''}
        >
          <input
            placeholder={place}
            type="text"
            className={`form-input ${className} ${
              meta.touched && meta.error ? 'is-invalid' : ''
            }`}
            {...field}
            {...props}
            autoComplete="off"
            onChange={handleInputChange}
            value={inputValue}
          />
          <motion.div
            animate={showDropDown ? { rotate: -180 } : { rotate: 0 }}
            onClick={handleArrowClick}
          >
            <IoIosArrowDown />
          </motion.div>
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
          initial={{ y: '-6rem', opacity: 1 }}
          animate={{ y: '0rem', opacity: 1 }}
          exit={{ opacity: 1 }}
          ref={dropdownRef}
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
  );
};

FormInputWithDropDown.propTypes = {
  label: PropTypes.string.isRequired,
  place: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
};

FormInputWithDropDown.defaultProps = {
  place: '',
  className: '',
};

export default FormInputWithDropDown;
