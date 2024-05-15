import React from "react";

const Container = (props) => {
  return (
    <div className={` container  container-${props.className} ${props.class}`}>
      {props.children}
    </div>
  );
};

export default Container;
