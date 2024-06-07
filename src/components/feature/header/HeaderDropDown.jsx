import React, { useState } from "react";
import assets from "../../../assets";
import { motion } from "framer-motion";
import { RiArrowDownSLine } from "react-icons/ri";

const HeaderDropDown = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <div className="header-dropDown">
        <header onClick={() => setOpen(!isOpen)}>
          <img src={assets.common.icon} alt="icon" />
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
        {/* <motion.div
            initial={{ y: "-6rem", opacity: 0 }}
            animate={{ y: "0rem", opacity: 1 }}
            exit={{ opacity: 0 }}
        >




        </motion.div> */}
      </div>
    </>
  );
};

export default HeaderDropDown;
