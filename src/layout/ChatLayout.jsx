import { useState } from "react";
import "boxicons/css/boxicons.min.css";
import "../style/dashboard/dashboardLayout.scss";
import PropTypes from "prop-types";
import { Examples } from "../utils";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { HiPlus } from "react-icons/hi";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const ChatLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`SibebarIcons ${isOpen ? "hidden" : ""}`}
        onClick={toggleSidebar}
      >
        <HiPlus className="SibebarIcon" />
        <MdKeyboardDoubleArrowRight />
      </div>

       <div
        className={`sidebar ${isOpen ? "open" : "collapsed"}`}
        style={{
          top: "12%",
          background: "white",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          minHeight:"80vh"
        }}
      >
        <div className="NewChatContianer">
          <button className="NewChat">
            <span style={{ fontSize: "20px" }}>+</span> New Chat
          </button>
          <span onClick={() => toggleSidebar(false)}>
            <MdKeyboardDoubleArrowLeft className="closeChatHistoryBtn" />
          </span>
        </div>

        <div className="History">
          {Examples.map(({ question }, index) => (
            <div key={index} className="commonSidebar">
              <span
                style={{
                  border: "none",
                  outline: "none",
                  color: "black",
                  flex: 1,
                }}
              >
                {truncateText(question, 30)}
              </span>
              <span> </span>
              <span>
                <HiOutlineDotsHorizontal
                  style={{
                    color: "black",
                    cursor: "pointer",
                  }}
                />
              </span>
            </div>
          ))}
        </div>
      </div> 

      <section className="home-section">{children}</section>
    </>
  );
};

ChatLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ChatLayout;
