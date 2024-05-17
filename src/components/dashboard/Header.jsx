import { CiBellOn } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";

const Header = () => {
  return (
    <header className="header">
      <div
        style={{
          margin: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div className="SeachBar">
          <IoSearch className="SearchIcon" />
          <input type="text" placeholder="Search in Ai assistant" />
        </div>
        <div className="ProfileBar">
          <CiBellOn className="BellIcon" />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbuzji_7v5blhzW4rLy8so6nZAD8u_YuQwPWyBZUZ8QA&s"
            alt="#"
            className="ProfileImage"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
