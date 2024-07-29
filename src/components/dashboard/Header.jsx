import { useState } from 'react';
import { CiBellOn } from 'react-icons/ci';
import { FiLogOut } from 'react-icons/fi';
import User from '../../assets/chat/user.png';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    // Handle logout functionality here
    console.log('Logout clicked');
  };

  return (
    <header className="header">
      <div>
        {/* <IoSearch className="SearchIcon" /> */}
        {/* <input type="text" placeholder="Search in Ai assistant" /> */}
      </div>

      <div className="ProfileBar">
        <CiBellOn className="BellIcon" />
        <img
          src={User}
          alt="User"
          className="ProfileImage"
          onClick={handleProfileClick}
        />
        {dropdownOpen && (
          <div className="dropdownMenu">
            <div className="dropdownItem" onClick={handleLogout}>
              <FiLogOut className="dropdownIcon" />
              Logout
            </div>
          </div>
        )}
      </div>
      <style>{`

        .header {
          display: flex;
          justify-content: space-between;
          padding: 1% 2%;
          // height: 10vh;
        }

        .ProfileBar {
          display: flex;
          align-items: center;
          position: relative;
        }

        .BellIcon {
          height: 2.5rem; 
          width: 2.5rem; 
          color: gray;
          margin-right: 1rem; 
          cursor:pointer;
        }

        .ProfileImage {
          height: 4rem; 
          width: 4rem; 
          border-radius: 50%;
          cursor: pointer;
        }

        .dropdownMenu {
          position: absolute;
          top: 4rem; 
          right: 0rem;
          background-color: white;
          box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.2); 
          border-radius: 0.5rem; 
          overflow: hidden;
          z-index: 1001;
        }

        .dropdownItem {
          display: flex;
          align-items: center;
          padding: 0.5rem 1rem; 
          cursor: pointer;
          font-size:1.7rem;
          transition: background-color 0.3s ease;
        }

        .dropdownItem:hover {
          background-color: #f0f0f0;
        }

        .dropdownIcon {
          margin-right: 0.625rem;
        }
      `}</style>
    </header>
  );
};

export default Header;
