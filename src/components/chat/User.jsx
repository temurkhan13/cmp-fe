import { useState } from "react";
import Links from "./Links";
import Documents from "./Documents";
import Images from "./Images";
import Button from "../common/Button";

const contents = [
  { component: <Images />, key: "images" },
  { component: <Documents />, key: "documents" },
  { component: <Links />, key: "links" },
];

const User = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const buttons = ["Images", "Documents", "Links"];

  const handleButtonClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="Media">
      <p className="heading">Media</p>
      <hr />

      <div className="button-content-container">
        <div className="buttons-row">
          {buttons.map((button, index) => (
            <Button
              key={index}
              variant="toggle"
              active={activeIndex === index}
              className={`button ${activeIndex === index ? "active" : ""}`}
              onClick={() => handleButtonClick(index)}
            >
              {button}
            </Button>
          ))}
        </div>
        <hr />
        {activeIndex !== null && (
          <div className="content" key={contents[activeIndex].key}>
            {contents[activeIndex].component}
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
