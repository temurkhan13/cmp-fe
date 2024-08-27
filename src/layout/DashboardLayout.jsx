import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import 'boxicons/css/boxicons.min.css';
import '../../scss/modules/dashboard/dashboardLayout.scss';
import Sidebarlogo from '../assets/dashboard/sidebarLogo.png';

import { RiFeedbackFill } from 'react-icons/ri';
import { FaTrash } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { IoIosChatboxes } from 'react-icons/io';
import { RiNewspaperLine } from 'react-icons/ri';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { BiSolidSpreadsheet } from 'react-icons/bi';
import { BsFilePlayFill } from 'react-icons/bs';

const DashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const Menu = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      Icon: <MdDashboard />,
    },
    {
      path: '/dashboard/AiAssistant',
      name: 'Ai Assistant',
      Icon: <IoIosChatboxes />,
    },
    {
      path: '/dashboard/myAssessments',
      name: 'My Assessments',
      Icon: <RiNewspaperLine />,
    },
    {
      path: '/sitemap/list',
      name: 'Digital Playbook',
      Icon: <BsFilePlayFill />,
    },
    {
      path: '/dashboard/PlanBilling',
      name: 'Plan & Billing',
      Icon: <BiSolidSpreadsheet />,
    },
    {
      path: '/dashboard/HelpCenter',
      name: 'Help Center',
      Icon: <AiFillQuestionCircle />,
    },
    {
      path: '/dashboard/feedback',
      name: 'Feedback',
      Icon: <RiFeedbackFill />,
    },
    {
      path: '/dashboard/Trash',
      name: 'Trash',
      Icon: <FaTrash />,
    },
  ];
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="logo_details">
          <div
            className="logo_name"
            style={{ display: isOpen ? 'block' : 'none' }}
          >
            <div className="logo_content">
              <div className="logo_image">
                <img
                  src={Sidebarlogo}
                  alt="logo"
                  style={{
                    borderRadius: '10px',
                  }}
                />
              </div>

              <div className="logo_text">
                <p
                  style={{
                    fontSize: '20px',
                    color: 'black',
                  }}
                >
                  ChangeAI
                </p>
                <p
                  style={{
                    fontSize: '10px',
                    color: 'gray',
                  }}
                >
                  By InnovationsWorks
                </p>
              </div>
            </div>
          </div>
          <i
            className={`bx ${isOpen ? 'bx-menu-alt-right' : 'bx-menu'}`}
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
                textDecoration: 'none',
              }}
            >
              <li>
                <a>
                  <i style={{ color: 'gray' }}>{Icon}</i>
                  <span className="link_name">{name}</span>
                </a>
                <span className="tooltip">{name}</span>
              </li>
            </Link>
          ))}
          {/* <li className="profile">
            <div className="profile_details">
              <img src={ProfileUser} alt="profile image" />
              <div className="profile_content">
                <div className="name">Anna Jhon</div>
                <div className="designation">Admin</div>
              </div>
            </div>
            <i className="bx bx-log-out" id="log_out"></i>
          </li> */}
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
