import { useState } from "react";
import PropTypes from "prop-types";
import styles from "../../style/chatHeader.module.scss";
import { IoSearchOutline } from "react-icons/io5";
import { GoCommentDiscussion } from "react-icons/go";
import { HiUser, HiOutlineDotsHorizontal } from "react-icons/hi";
import { BiSolidSave } from "react-icons/bi";
import { RiUserSharedLine } from "react-icons/ri";
import Sidebar from "../../assets/dashboard/sidebarLogo.png";
import UserProfilePic from "../../assets/chat/user.png";
import Search from "./Search";
import Comment from "./Comment";
import MultiUser from "./MultiUser";
import Save from "./Save";
import Dots from "./Dots";

const Header = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [inputValue, setInputValue] = useState("United");

  const handleToggleComponent = (component) => {
    setActiveComponent(activeComponent === component ? null : component);
  };

  const IconMap = [
    {
      icon: IoSearchOutline,
      name: "Search",
      component: <Search />,
    },
    {
      icon: GoCommentDiscussion,
      name: "Comment",
      component: <Comment />,
    },
    {
      icon: HiUser,
      name: "MultiUser",
      component: <MultiUser />,
    },
    {
      icon: BiSolidSave,
      name: "Save",
      component: <Save />,
    },
    {
      icon: HiOutlineDotsHorizontal,
      name: "Dots",
      component: <Dots />,
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

Header.propTypes = {
  onToggleChatHistory: PropTypes.func.isRequired,
};

export default Header;
