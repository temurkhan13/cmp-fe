import { useState, useEffect, useRef } from 'react';
import { dropdown, Logo1 } from '../../assets';
import { FaArrowRight, FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownHomeOpen, setDropdownHomeOpen] = useState(false);
  const [dropdownAboutOpen, setDropdownAboutOpen] = useState(false);
  const navRef = useRef(null);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdownHome = () => {
    setDropdownHomeOpen(!dropdownHomeOpen);
    setDropdownAboutOpen(false); // Close About dropdown
  };

  const toggleDropdownAbout = () => {
    setDropdownAboutOpen(!dropdownAboutOpen);
    setDropdownHomeOpen(false); // Close Home dropdown
  };

  // Close dropdowns when clicking outside
  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setDropdownHomeOpen(false);
      setDropdownAboutOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar" ref={navRef}>
      <div className="navbar-container">
        <img className="navbar-logo" src={Logo1} alt="Logo" />
        <div className="menu-icon" onClick={toggleNavbar}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          {/*<li className="nav-item dropdown">*/}
          {/*  <button className="nav-links" onClick={toggleDropdownHome}>*/}
          {/*    User Cases &nbsp;*/}
          {/*    <img*/}
          {/*      className={dropdownHomeOpen ? 'dropdownrotate' : ''}*/}
          {/*      src={dropdown}*/}
          {/*      alt="dropdown"*/}
          {/*    />*/}
          {/*  </button>*/}
          {/*  {dropdownHomeOpen && (*/}
          {/*    <ul className="dropdown-menu">*/}
          {/*      <li>*/}
          {/*        <a href="#home-sub1" className="dropdown-link">*/}
          {/*          Sub Link 1*/}
          {/*        </a>*/}
          {/*      </li>*/}
          {/*      <li>*/}
          {/*        <a href="#home-sub2" className="dropdown-link">*/}
          {/*          Sub Link 2*/}
          {/*        </a>*/}
          {/*      </li>*/}
          {/*    </ul>*/}
          {/*  )}*/}
          {/*</li>*/}
          {/*<li className="nav-item dropdown">*/}
          {/*  <button className="nav-links" onClick={toggleDropdownAbout}>*/}
          {/*    Resources &nbsp;*/}
          {/*    <img*/}
          {/*      className={dropdownAboutOpen ? 'dropdownrotate' : ''}*/}
          {/*      src={dropdown}*/}
          {/*      alt="dropdown"*/}
          {/*    />*/}
          {/*  </button>*/}
          {/*  {dropdownAboutOpen && (*/}
          {/*    <ul className="dropdown-menu">*/}
          {/*      <li>*/}
          {/*        <a href="#about-sub1" className="dropdown-link">*/}
          {/*          Sub Link 1*/}
          {/*        </a>*/}
          {/*      </li>*/}
          {/*      <li>*/}
          {/*        <a href="#about-sub2" className="dropdown-link">*/}
          {/*          Sub Link 2*/}
          {/*        </a>*/}
          {/*      </li>*/}
          {/*    </ul>*/}
          {/*  )}*/}
          {/*</li>*/}
          {/*<li className="nav-item">*/}
          {/*  <a href="#services" className="nav-links">*/}
          {/*    Pricing Plan*/}
          {/*  </a>*/}
          {/*</li>*/}
        </ul>
        <div className={isOpen ? 'navbar-buttons mobile-open' : 'navbar-buttons'}>
          <button
            className="btn"
            onClick={() => {
              navigate('/log-in');
            }}
          >
            Login
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate('/sign-up');
            }}
          >
            Get Started <FaArrowRight />
          </button>
        </div>
      </div>
      <style>
        {`
        .navbar {
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 600;
          position: sticky;
          top: 0;
          padding: 10px 20px;
          z-index: 1000;
          margin-top:1rem;
          background-color: #f9f9f9;
        }

        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .navbar-logo {
          color: black;
          cursor: pointer;
          background-color: #C3E11D;
          padding: 10px 3px;
          border-radius: 10px;
        }

        .menu-icon {
          display: none;
        }

        .nav-menu {
          display: flex;
          flex: 1;
          justify-content: center;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-item {
          position: relative;
          margin: 0 30px;
        }

        .nav-links {
          text-decoration: none;
          font-size: 1.4rem;
          color: black;
          background: none;
          border: none;
          cursor: pointer;
          position: relative;
          display: flex;
          align-items: center;
        }

        .nav-links:hover {
         
        }

        .navbar-buttons {
          display: flex;
          gap: 10px;
          font-size:1.5rem;
        }

        .btn {
          padding: 10px 20px;
          border: none;
          background-color: transparent;
          border-radius: 4px;
          color: black;
          cursor: pointer;
          font-size: 1.5rem;
          font-weight: 500;
        }

        .btn-primary {
          background-color: #C3E11D;
          padding: 0 30px;
          border-radius: 200px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .btn:hover {
          opacity: 0.9;
        }

        .btn-primary:hover {
          /* Optional: Add styles for hover effect if needed */
        }

        /* Dropdown styles */
        .dropdown-menu {
          display: none;
          position: absolute;
          top: 150%;
          width: 200%;
          left: -30px;
          background: #333;
          list-style: none;
          padding: 0;
          margin: 0;
          border-radius: 4px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          z-index: 1000;
        }

        .dropdown-menu .dropdown-link {
          display: block;
          padding: 10px 20px;
          color: white;
          text-decoration: none;
        }

        .dropdown-menu .dropdown-link:hover {
          background-color: #575757;
        }

        /* Dropdown visibility controlled via state */
        .dropdown-menu {
          display: ${dropdownHomeOpen || dropdownAboutOpen ? 'block' : 'none'};
        }

        .dropdownrotate {
          rotate: 180deg;
          transition: all ease 0.3s;
        }

        /* Responsive styles */
        @media screen and (max-width: 768px) {
          .menu-icon {
            display: block;
            font-size: 1.5rem;
            cursor: pointer;
          }

          .nav-menu {
            display: none;
            flex-direction: column;
            width: 100%;
            position: absolute;
            top: 60px;
            left: 0;
            background: #333;
            z-index: 999;
          }

          .nav-menu.active {
            display: flex;
          }

          .nav-item {
            margin: 10px 0;
          }

          .dropdown-menu {
            position: static;
            background: #333;
          }

          .navbar-buttons {
            display: none;
          }

          .navbar-buttons.mobile-open {
            display: flex;
            flex-direction: column;
            gap: 5px;
            position: absolute;
            top: 60px;
            right: 0;
            background: white;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 999;
          }

          .navbar-buttons.mobile-open .btn {
            width: 100%;
            text-align: center;
          }
        }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
