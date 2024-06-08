import React, { useState } from "react";
import Components from "..";
import { color, motion } from "framer-motion";
import { RiArrowDownSLine } from "react-icons/ri";

const DropDownList = (props) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <div className="dropDownList">
        <header onClick={() => setOpen(!isOpen)}>
          <Components.Feature.Text className="secondry--light">
            {props.name}
          </Components.Feature.Text>
          <motion.div
            animate={
              isOpen
                ? {
                    rotate: -180,
                  }
                : { rotate: 0 }
            }
          >
            <RiArrowDownSLine />
          </motion.div>
        </header>

        {isOpen && (
          <section>
            {props.data.map((el, index) => (
              <motion.div
                key={index}
                initial={{ y: `${index + 5}rem`, opacity: 0 }}
                animate={{ y: "0rem", opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => props.onAssessmentClick(el)}
              >
                <Components.Feature.Text
                  style={{
                    color: props.link && "#0066FF",
                    textDecoration: props.link && "underline",
                  }}
                  className="secondry--dark"
                >
                  {el}
                </Components.Feature.Text>
              </motion.div>
            ))}
          </section>
        )}
      </div>
    </>
  );
};

export default DropDownList;
