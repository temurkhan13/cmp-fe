import { useState, useEffect, useRef } from 'react';
import { Logo1 } from '../../assets';
import { FaArrowRight, FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Button from '../../../common/Button';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [, setDropdownHomeOpen] = useState(false);
  const [, setDropdownAboutOpen] = useState(false);
  const navRef = useRef(null);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
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
    <nav className="landing-navbar" ref={navRef}>
      <div className="landing-navbar-container">
        <img className="landing-navbar-logo" src={Logo1} alt="Logo" />
        <div className="landing-navbar-menu-icon" onClick={toggleNavbar}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={isOpen ? 'landing-navbar-menu active' : 'landing-navbar-menu'}>
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
        <div className={isOpen ? 'landing-navbar-buttons mobile-open' : 'landing-navbar-buttons'}>
          <Button
            variant="secondary"
            className="landing-navbar-btn"
            onClick={() => {
              navigate('/log-in');
            }}
          >
            Login
          </Button>
          <Button
            variant="primary"
            className="landing-navbar-btn landing-navbar-btn-primary"
            iconRight={<FaArrowRight />}
            onClick={() => {
              navigate('/sign-up');
            }}
          >
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
