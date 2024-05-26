import { CiBellOn } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import styles from "../../style/dashboard/dashboard.module.scss";
import User from "../../assets/chat/user.png"

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.SeachBar}>
        <IoSearch className={styles.SearchIcon} />
        <input type="text" placeholder="Search in Ai assistant" />
      </div>

      <div className={styles.ProfileBar}>
        <CiBellOn className={styles.BellIcon} />
        <img
          src={User}
          alt="#"
          className={styles.ProfileImage}
        />
      </div>
    </header>
  );
};

export default Header;
