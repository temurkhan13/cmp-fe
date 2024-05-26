import { TiPlus } from "react-icons/ti";
import { BsFilterLeft } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsFilterCircle } from "react-icons/bs";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { TfiMenuAlt } from "react-icons/tfi";
import { RxCross1 } from "react-icons/rx";
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
import { CgMenuGridR } from "react-icons/cg";
import StartIcon from "../../assets/dashboard/StarICon.png";
import styles from "../../style/dashboard/dashboard.module.scss";

const AssistantBar = () => {
  return (
    <>
      <main className={styles.main}>
        <RxCross1
          style={{
            borderRadius: "30px",
            position: "absolute",
            top: 20,
            right: 20,
            fontSize: "15px",
          }}
        />
        <input type="text" placeholder="Enter a prompt to generate new file" />

        <button className={styles.assbtn}>
          <img src={StartIcon} alt="StartIcon" />
          Generate
        </button>
      </main>

      <section className={styles.generate}>
        <div className={styles.Container}>
          <div
            style={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <button className={styles.arrowBtn}>
              <SlArrowLeft />
            </button>
            <button className={styles.arrowBtn}>
              <SlArrowRight />
            </button>
            <p className={styles.assistantHeading}>AI Assistant</p>
          </div>

          <div
            style={{
              display: "flex",
              textAlign: "center",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              <CgMenuGridR style={{ fontSize: "26px" }} />
              <TfiMenuAlt
                style={{
                  marginRight: "30px",
                  marginLeft: "5px",
                  fontSize: "18px",
                }}
              />
            </div>
            <div>
              <BsFilterLeft style={{ fontSize: "22px" }} />
              <MdOutlineKeyboardArrowDown
                style={{ marginRight: "30px", fontSize: "18px" }}
              />
            </div>
            <div>
              <BsFilterCircle style={{ fontSize: "20px" }} />
              <MdOutlineKeyboardArrowDown
                style={{ marginRight: "30px", fontSize: "18px" }}
              />
            </div>
            <div>
              <HiAdjustmentsHorizontal
                style={{ marginRight: "30px", fontSize: "22px" }}
              />
              {/* <MdOutlineKeyboardArrowDown /> */}
            </div>
            <div>
              <button className={styles.assbtnAss}>
                {/* <CgMenuGridR/> */}
                <TiPlus />
                New Assistant
              </button>
            </div>
            {/* <div></div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default AssistantBar;
