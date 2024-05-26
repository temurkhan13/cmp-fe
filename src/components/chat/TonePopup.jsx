import { useState } from "react";
import { RiMagicFill } from "react-icons/ri";
import { GoCommentDiscussion } from "react-icons/go";
import { RxMagicWand } from "react-icons/rx";
import { BsFilterLeft } from "react-icons/bs";
import PropTypes from "prop-types";
import { FaLocationArrow } from "react-icons/fa6";
import styles from "../../style/chatMessage.module.scss"

const TonePopup = ({ onToneChange, HandleAskAi, style }) => {
  const [showAskAi, setShowAskAi] = useState(false);

  return (
    <div
      className={styles.PopupBox}
      style={{
        backgroundColor: "white",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "5px",
        zIndex: 9999,
        // ...style, // merge with passed style
      }}
    >
      {!showAskAi ? (
        <div className={styles.navabr}>
          <div className={styles.dropdown} onClick={() => setShowAskAi(true)}>
            <button
              className={styles.dropbtn}
              style={{
                color: "rgba(0, 102, 255, 1)",
                fontWeight: 400,
              }}
            >
              <span>
                <RiMagicFill />
              </span>{" "}
              Asik AI
              <i className="fa fa-caret-down"></i>
            </button>
          </div>

          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>
              <span>
                <GoCommentDiscussion />
              </span>{" "}
              Comment
              <i className="fa fa-caret-down"></i>
            </button>
          </div>

          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>
              <span>
                <RxMagicWand />
              </span>{" "}
              Change Tone
              <i className="fa fa-caret-down"></i>
            </button>
            <div className={styles.dropdownContent}>
              <a href="#">Normal</a>
              <a href="#">Professional</a>
              <a href="#">Casual</a>
              <a href="#">Relax</a>
              <a href="#">Friendly</a>
              <a href="#">StraightForward</a>
            </div>
          </div>

          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>
              <span>
                <BsFilterLeft />
              </span>{" "}
              Response Length
              <i className="fa fa-caret-down"></i>
            </button>
            <div className={styles.dropdownContent}>
              <a href="#">Auto</a>
              <a href="#">Small</a>
              <a href="#">Medium</a>
              <a href="#">Comprehensive</a>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={styles.PopupBox}
          style={{
            backgroundColor: "white",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
            zIndex: 9999,
          }}
        >
          <div className={styles.navabr}>
            <div
              className={styles.dropdown}
              style={{
                minWidth: "100%",
                padding:"5px 5px",
                borderRadius:"10px"
              }}
            >
              <button
                // className="dropbtn"
                style={{
                  width:"400px",
                  display: "flex",
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  // border:"none",
                  border:"1px solid lightgray",
                  outline:"none",
                  padding:"10px",
                  fontFamily:"inherit",
                  margin:"4px",
                  background:"white",
                  borderRadius:"5px"
                }}
              >
                <span
                  style={{
                    color: "rgba(0, 102, 255, 1)",
                  }}
                >
                  <RiMagicFill />
                </span>{" "}
                <input
                    type="text"
                  style={{
                    border: "none",
                    outline: "none",
                    flex:1,
                    // backgroundColor: "transparent",
                    margin: "0 10px",
                  }}
                  placeholder="Ask AI to edit or generate..."
                />
                <span className={styles.sendAskAI}>
                  <FaLocationArrow />
                </span>
              </button>
              <div className={styles.dropdownContent}>
                <a href="#">Improve Writing</a>
                <a href="#">Fix Spelling & Grammar</a>
                <a href="#">Summarize</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

TonePopup.propTypes = {
  onToneChange: PropTypes.func.isRequired,
  HandleAskAi: PropTypes.func.isRequired,
  style: PropTypes.object, // style prop added
};

export default TonePopup;
