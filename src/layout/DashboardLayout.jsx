import { useState } from "react";
import { Link } from "react-router-dom";
import "../../scss/modules/dashboard/dashboardLayout.scss";
import PropTypes from "prop-types";
import "boxicons/css/boxicons.min.css";
import { CgMenuGridR } from "react-icons/cg";
import { MdOutlineAssistant } from "react-icons/md";
import { MdOutlineAssistantDirection } from "react-icons/md";
import { SiDigitalocean } from "react-icons/si";
import { RiBillLine } from "react-icons/ri";
import { FaHireAHelper } from "react-icons/fa";
import { RiFeedbackFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import ProfileUser from "../assets/chat/user.png";
import Sidebarlogo from "../assets/dashboard/sidebarLogo.png";

const DashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const Menu = [
    {
      path: "/dashboard",
      name: "Dashboard",
      Icon: <CgMenuGridR />,
    },
    {
      path: "/dashboard/AiAssistant",
      name: "Ai Assistant",
      Icon: <MdOutlineAssistant />,
    },
    {
      path: "/dashboard/MyAssistant",
      name: "My Assistant",
      Icon: <MdOutlineAssistantDirection />,
    },
    {
      path: "/dashboard/DigitalPlaybook",
      name: "Digital Playbook",
      Icon: <SiDigitalocean />,
    },
    {
      path: "/dashboard/PlanBilling",
      name: "Plan & Billing",
      Icon: <RiBillLine />,
    },
    {
      path: "/dashboard/HelpCenter",
      name: "Help Center",
      Icon: <FaHireAHelper />,
    },
    {
      path: "/dashboard/feedback",
      name: "Feedback",
      Icon: <RiFeedbackFill />,
    },
    {
      path: "/dashboard/Trash",
      name: "Trash",
      Icon: <FaTrash />,
    },
  ];
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="logo_details">
          <div
            className="logo_name"
            style={{ display: isOpen ? "block" : "none" }}
          >
            <div className="logo_content">
              <div className="logo_image">
                <img
                  src={Sidebarlogo}
                  alt="logo"
                  style={{
                    borderRadius: "10px",
                  }}
                />
              </div>

              <div className="logo_text">
                <p
                  style={{
                    fontSize: "20px",
                    color:"black"
                  }}
                >
                  ChangeAI
                </p>
                <p
                  style={{
                    fontSize: "10px",
                    color: "gray",
                  }}
                >
                  By InnovationsWorks
                </p>
              </div>
            </div>
          </div>
          <i
            className={`bx ${isOpen ? "bx-menu-alt-right" : "bx-menu"}`}
            id="btn"
            onClick={toggleSidebar}
          ></i>
        </div>

        <ul className="navlist">
          {Menu.map(({ path, name, Icon }, index) => (
            <Link
              to={path}
              key={index}
              style={{
                textDecoration: "none",
              }}
            >
              <li>
                <a>
                  <i style={{color:"black"}}>{Icon}</i>
                  <span className="link_name">{name}</span>
                </a>
                <span className="tooltip">{name}</span>
              </li>
            </Link>
          ))}
          <li className="profile">
            <div className="profile_details">
              <img src={ProfileUser} alt="profile image" />
              <div className="profile_content">
                <div className="name">Anna Jhon</div>
                <div className="designation">Admin</div>
              </div>
            </div>
            <i className="bx bx-log-out" id="log_out"></i>
          </li>
        </ul>
      </div>

      <section className="home-section">{children}</section>
    </>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
