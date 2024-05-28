import { useState } from "react";

// styling
import styles from "../../style/chat/chatHeader.module.scss";

// react-icons
import { IoSearchOutline } from "react-icons/io5";
import { HiUser, HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiUserSharedLine } from "react-icons/ri";

// images
import Sidebar from "../../assets/dashboard/sidebarLogo.png";
import UserProfilePic from "../../assets/chat/user.png";
import Search from "./Search";
import MultiUser from "./MultiUser";
import Dots from "./Dots";

const Header = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [inputValue, setInputValue] = useState("United");

  const handleToggleComponent = (component) => {
    setActiveComponent(activeComponent === component ? null : component);
  };

  const handleDeactivateComponent = () => {
    setActiveComponent(null);
  };

  const IconMap = [
    {
      icon: IoSearchOutline,
      name: "Search",
      component: <Search closeButton={() => handleDeactivateComponent()} />,
    },
    {
      icon: HiUser,
      name: "MultiUser",
      component: <MultiUser closeButton={() => handleDeactivateComponent()} />,
    },
    {
      icon: HiOutlineDotsHorizontal,
      name: "Dots",
      component: <Dots closeButton={() => handleDeactivateComponent()} />,
    },
  ];

  return (
    <header className={styles.ChatHeader}>
      <div className={styles.hero}>
        <nav>
          <div className={styles.LogoWithFileName}>
            <img src={Sidebar} alt="Logo" className={styles.ChatImage} />
            <input
              type="text"
              className={styles.ChatInput}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>

          <ul>
            {IconMap.map(({ icon: Icon, name, component }) => (
              <li key={name}>
                <div className={styles.NavLinkContainer}>
                  <Icon
                    className={
                      activeComponent === name
                        ? styles.ActiveNavlink
                        : styles.NavLinks
                    }
                    style={{
                      color: activeComponent === name ? "white" : "black",
                    }}
                    onClick={() => handleToggleComponent(name)}
                  />
                  {activeComponent === name && component}
                </div>
              </li>
            ))}

            <li>
              <button className={styles.share}>
                <RiUserSharedLine />
                <span>Share</span>
              </button>
            </li>
          </ul>

          <img src={UserProfilePic} alt="ProfileLogo" />
        </nav>
      </div>
    </header>
  );
};

export default Header;
