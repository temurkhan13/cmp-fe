import React from "react";

const Text = (props) => {
  return (
    <p
      className={`text text-${props.className}`}
      dangerouslySetInnerHTML={props.dangerouslySetInnerHTML}
      data-aos={props.animation}
      data-aos-duration={props.duration}
    >
      {props.children}
    </p>
  );
};

export default Text;
