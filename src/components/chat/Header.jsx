import { useState } from 'react';

// styling
import './chat.scss';

// react-icons
import { IoSearchOutline } from 'react-icons/io5';
import { HiUser, HiOutlineDotsHorizontal } from 'react-icons/hi';

// images
import Sidebar from '../../assets/dashboard/sidebarLogo.png';
import UserProfilePic from '../../assets/chat/user.png';
import Search from './Search';
import MultiUser from './MultiUser';
import Dots from './Dots';

const Header = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [inputValue, setInputValue] = useState('United');

  const handleToggleComponent = (component) => {
    setActiveComponent(activeComponent === component ? null : component);
  };

  const handleDeactivateComponent = () => {
    setActiveComponent(null);
  };

  const IconMap = [
    {
      icon: IoSearchOutline,
      name: 'Search',
      component: <Search closeButton={() => handleDeactivateComponent()} />,
    },
    {
      icon: HiUser,
      name: 'MultiUser',
      component: <MultiUser closeButton={() => handleDeactivateComponent()} />,
    },
    {
      icon: HiOutlineDotsHorizontal,
      name: 'Dots',
      component: <Dots closeButton={() => handleDeactivateComponent()} />,
    },
  ];

  return (
    <header className="chat-header">
      <div className="chat-header__hero">
        <nav>
          <div className="chat-header__logo-filename">
            <img src={Sidebar} alt="Logo" className="chat-header__image" />
            <input
              type="text"
              className="chat-header__input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>

          <ul>
            {IconMap.map(({ icon: Icon, name, component }) => (
              <li key={name}>
                <div className="chat-header__nav-container">
                  <Icon
                    className={`chat-header__nav-link ${activeComponent === name ? 'chat-header__nav-link--active chat-header-icon--active' : 'chat-header-icon--inactive'}`}
                    onClick={() => handleToggleComponent(name)}
                  />
                  {activeComponent === name && component}
                </div>
              </li>
            ))}

            {/*<li>*/}
            {/*  <button className="chat-header__share">*/}
            {/*    <RiUserSharedLine />*/}
            {/*    <span>Share</span>*/}
            {/*  </button>*/}
            {/*</li>*/}
          </ul>

          <img
            src={
              UserProfilePic ||
              'https://avatar.iran.liara.run/public/boy?username=Ash'
            }
            alt="ProfileLogo"
            onError={(e) =>
              (e.target.src =
                'https://avatar.iran.liara.run/public/boy?username=Ash')
            }
          />
        </nav>
      </div>
    </header>
  );
};

export default Header;
