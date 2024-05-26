import { RxMagicWand } from "react-icons/rx";

const AskAi = () => {
  return (
    <div
      className="PopupBox"
      style={{
        backgroundColor: "white",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "5px",
        zIndex: 9999,
      }}
    >
      <div className="navabr">
        <div className="dropdown">
          <button className="dropbtn">
            <span>
              <RxMagicWand />
            </span>{" "}
            <input type="text" placeholder="Ask AI to edit or generate..." />
          </button>
          <div className="dropdown-content">
            <a href="#">Improve Writing</a>
            <a href="#">Fix Spelling & Grammer</a>
            <a href="#">Summarize</a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AskAi;
