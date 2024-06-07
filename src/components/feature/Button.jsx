import React from "react";

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`btn--${props.className}`}
      type={props.type}
    >
      {props.icon && <img src={props.icon} alt="icon" />}
      {props.children}
    </button>
  );
};

export default Button;
