import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'boxicons/css/boxicons.min.css';
import '../../scss/modules/dashboard/dashboardLayout.scss';
import Sidebarlogo from '../assets/dashboard/sidebarLogo.png';
import PlanAndBillingmodal from '../components/dashboard/PlanAndBillingmodal';

import { RiFeedbackFill } from 'react-icons/ri';
import { FaTrash } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { IoIosChatboxes } from 'react-icons/io';
import { RiNewspaperLine } from 'react-icons/ri';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { BiSolidSpreadsheet } from 'react-icons/bi';
import { BsFilePlayFill } from 'react-icons/bs';
import { IoSettingsSharp } from 'react-icons/io5';
import { GiArtificialHive } from 'react-icons/gi';
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/slices/authSlice.js';

const DashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user')); // Parse the user from localStorage
        const userId = user ? user.id : null; // Extract user ID

        if (userId) {
          await dispatch(getUser(userId)); // Dispatch action to get user data
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    fetchUserData(); // Call the async function inside useEffect
  }, []); // Empty dependency array to run only once


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
    {
      path: '/dashboard/settings',
      name: 'Settings',
      Icon: <IoSettingsSharp />,
    },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
        </ul>

        <div className="upgrade-plan">
          <button
            className="upgrade-button"
            onClick={openModal}
            style={{
              padding: isOpen ? '1.5rem 3rem' : '1rem',
              marginRight: isOpen ? '2rem' : '3rem',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <GiArtificialHive className="upgrade-icon" />
              <span
                style={{
                  display: isOpen ? 'flex' : 'none',
                  alignItems: 'center',
                }}
              >
                Upgrade Plan
              </span>
            </span>
            {isOpen && (
              <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>
                Get Change AI Starter Plan
              </p>
            )}
          </button>
        </div>
      </div>

      <section className="home-section">{children}</section>
      <PlanAndBillingmodal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
