import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // import useLocation
import PropTypes from 'prop-types';
import 'boxicons/css/boxicons.min.css';
import '../../scss/modules/dashboard/dashboardLayout.scss';
import Sidebarlogo from '../assets/dashboard/sidebarLogo.png';
import { PlanAndBillingModal } from '../components/modal';

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
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../redux/slices/authSlice.js';
import { FaFolderTree } from 'react-icons/fa6';
import OnboardingTour from '../components/common/OnboardingTour';
import SupportChat from '../components/common/SupportChat';
import Button from '../components/common/Button';
import useMediaQuery from '../hooks/useMediaQuery';

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Use location to get current path
  const isSmallScreen = useMediaQuery('(max-width: 1080px)');
  const [isOpen, setIsOpen] = useState(!isSmallScreen);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // Auto-close sidebar when entering small screen
  useEffect(() => {
    if (isSmallScreen) setIsOpen(false);
  }, [isSmallScreen]);

  // Lock body scroll when sidebar overlay is active
  useEffect(() => {
    if (isSmallScreen && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isSmallScreen, isOpen]);

  const handleNavClick = () => {
    if (isSmallScreen) setIsOpen(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user ? user.id : null;

        if (userId) {
          await dispatch(getUser(userId));
        }
      } catch (error) { if (import.meta.env.DEV) console.error(error); }
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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePlanRoute = () => {
    navigate('/dashboard/PlanBilling');
  };

  return (
    <>
      {isSmallScreen && !isOpen && (
        <Button
          variant="icon"
          ariaLabel="Open sidebar"
          className="hamburger-btn"
          onClick={toggleSidebar}
        >
          <i className="bx bx-menu"></i>
        </Button>
      )}

      {isSmallScreen && isOpen && (
        <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />
      )}

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="logo_details">
          <div
            className="logo_name"
          >
            <div className="logo_content">
              <div className="logo_image">
                <img
                  src={Sidebarlogo}
                  alt="logo"
                />
              </div>
              <div className="logo_text">
                <p className="logo-text__title">ChangeAI</p>
                <p className="logo-text__subtitle">
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
          {Menu.map(({ path, name, Icon }) => (
            <Link
              to={path}
              key={path}
              className={location.pathname === path ? 'active-link' : ''}
              onClick={handleNavClick}
            >
              <li className="link_namee">
                <div className="nav-item-content">
                  <i className="nav-item-icon">{Icon}</i>
                  <span className="link_name">{name}</span>
                </div>
                <span className="tooltip">{name}</span>
              </li>
            </Link>
          ))}
        </ul>

        {user && !user.subscription && (
          <div className="upgrade-plan">
            <Button
              variant="primary"
              className="upgrade-button"
              onClick={handlePlanRoute}
            >
              <span className="upgrade-button__content">
                <GiArtificialHive className="upgrade-icon" />
                <span className="upgrade-button__text">
                  Upgrade Plan
                </span>
              </span>
              {isOpen && (
                <p className="upgrade-button__description">
                  Get Change AI Starter Plan
                </p>
              )}
            </Button>
          </div>
        )}

      </div>

      <section className="home-section">
        {children}
      </section>
      <OnboardingTour />
      <SupportChat />
      <PlanAndBillingModal isOpen={isModalOpen} onClose={closeModal} />

    </>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
