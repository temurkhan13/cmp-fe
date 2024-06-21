import { useState } from 'react';
import Components from '..';
import assets from '../../assets';
import { BiSearch } from 'react-icons/bi';
import { MdPeople } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import { FaUserPlus } from 'react-icons/fa6';

const Header = () => {
  const [activeIcon, setActiveIcon] = useState(null); // Added state to track active icon

  const handleIconClick = (icon) => {
    setActiveIcon(icon); // Function to set the active icon
  };

  return (
    <div className="topbar">
      <div>
        <Components.Feature.HeaderDropDown />
        <Components.Feature.Button className="secondry">
          Untitled
        </Components.Feature.Button>
      </div>
      <section>
        <div>
          <span
            className={activeIcon === 'search' ? 'active' : ''}
            onClick={() => handleIconClick('search')}
          >
            <BiSearch />
          </span>
          <span
            className={activeIcon === 'people' ? 'active' : ''}
            onClick={() => handleIconClick('people')}
          >
            <MdPeople />
          </span>
          <span
            className={activeIcon === 'dots' ? 'active' : ''}
            onClick={() => handleIconClick('dots')}
          >
            <BsThreeDots />
          </span>
          <div className="shareBtn">
            <FaUserPlus />
            <span>Share</span>
          </div>
        </div>
        <img src={assets.common.profile} alt="profile" />
      </section>
    </div>
  );
};

export default Header;
