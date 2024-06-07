import React from "react";

const Text = (props) => {
  return (
    <p
      className={`text text-${props.className}`}
      dangerouslySetInnerHTML={props.dangerouslySetInnerHTML}
      data-aos={props.animation}
      data-aos-duration={props.duration}
      onClick={props.onClick}
      style={props.style}
    >
      {props.children}
    </p>
  );
};

export default Text;
