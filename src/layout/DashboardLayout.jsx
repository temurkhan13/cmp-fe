import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // import useLocation
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
import { HiOutlineDocumentText } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/slices/authSlice.js';
import { FaFolderTree } from 'react-icons/fa6';

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Use location to get current path
  const [isOpen, setIsOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user ? user.id : null;

        if (userId) {
          await dispatch(getUser(userId));
        }
      } catch (error) {}
    };
    fetchUserData();
  }, [dispatch]);

  const Menu = [
    { path: '/dashboard', name: 'Dashboard', Icon: <MdDashboard /> },
    {
      path: '/dashboard/AiAssistant',
      name: 'AI Assistant',
      Icon: <IoIosChatboxes />,
    },
    {
      path: '/dashboard/myAssessments',
      name: 'My Assessments',
      Icon: <RiNewspaperLine />,
    },
    {
      path: '/sitemap/list',
      name: 'Sitemap',
      Icon: <FaFolderTree />,
    },
    {
      path: '/digital-playbook/list',
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
      path: '/dashboard/knowledge-base',
      name: 'Knowledge Base',
      Icon: <HiOutlineDocumentText />,
    },
    { path: '/dashboard/feedback', name: 'Feedback', Icon: <RiFeedbackFill /> },
    { path: '/dashboard/Trash', name: 'Trash', Icon: <FaTrash /> },
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

  const handlePlanRoute = () => {
    navigate('/choose-plan');
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
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <div className="logo_text">
                <p style={{ fontSize: '20px', color: 'black' }}>ChangeAI</p>
                <p style={{ fontSize: '10px', color: 'gray' }}>
                  By InnovationWorks
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
              style={{ textDecoration: 'none', color: 'inherit' }}
              className={location.pathname === path ? 'active-link' : ''}
            >
              <li className="link_namee">
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <i style={{ color: 'gray' }}>{Icon}</i>
                  <span className="link_name">{name}</span>
                </div>
                <span className="tooltip">{name}</span>
              </li>
            </Link>
          ))}
        </ul>

        <div className="upgrade-plan">
          <button
            className="upgrade-button"
            onClick={handlePlanRoute}
            style={{
              padding: isOpen ? '1.5rem 3rem' : '1rem',
              marginRight: isOpen ? '2.5rem' : '3rem',
              width: '100%',
              backgroundColor: '#f0f0f0',
              color: '#00316f',
              fontWeight: '500',
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

      <style>{`
        .navlist a {
          color: #4b5563 !important;
          text-decoration: none !important;
        }
        .navlist a:visited {
          color: #4b5563 !important;
        }
        .navlist a:hover {
          color: #1f2937 !important;
        }
        .navlist a:hover .link_namee {
          background: rgba(0,0,0,0.04);
          border-radius: 8px;
        }
        .navlist .active-link {
          color: #0B1444 !important;
          font-weight: 600;
        }
        .navlist .active-link .link_namee {
          background: rgba(195,225,29,0.15);
          border-radius: 8px;
        }
        .link_namee {
          padding: 8px 12px;
          border-radius: 8px;
          transition: all 0.15s ease;
        }
      `}</style>
    </>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
