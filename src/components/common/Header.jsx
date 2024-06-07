import React from "react";
import Components from "..";
import assets from "../../assets";
import { FaRegQuestionCircle } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { MdPeople } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";

const Header = () => {
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
          <span>
            <FaRegQuestionCircle />
          </span>
          <span>
            <BiSearch />
          </span>
          <span>
            <MdPeople />
          </span>
          <span>
            <BsThreeDots />
          </span>
        </div>
        <img src={assets.common.profile} alt="profile" />
      </section>
    </div>
  );
};

export default Header;
