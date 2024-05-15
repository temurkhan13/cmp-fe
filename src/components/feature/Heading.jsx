import React from "react";

const Heading = (props) => {
  return (
    <h1
      className={`heading-${props.className}`}
      data-aos={props.animation}
      data-aos-duration={props.duration}
      id={props.id}
    >
      {props.children}
    </h1>
  );
};

export default Heading;
