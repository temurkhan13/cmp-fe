import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Components from "../..";
import data from "../../../data";
// 
import { FaRegQuestionCircle } from "react-icons/fa";
import { RxTimer } from "react-icons/rx";
import { FaFolderOpen } from "react-icons/fa";
import { BiSolidMessageAlt } from "react-icons/bi";
import { FaBookmark } from "react-icons/fa";
import { RiVideoFill } from "react-icons/ri";



const Assessments = () => {
  const [showAssessmentList, setShowAssessmentList] = useState(false);

  const handleToggle = () => {
    setShowAssessmentList(!showAssessmentList);
  };

  return (
    <>
      {showAssessmentList && (
        <div className="assessmentList">
          <header>
            <Components.Feature.Text className="main--bold">
              Assessments
            </Components.Feature.Text>
            <span onClick={handleToggle}>
              <RxCross2 />
            </span>
          </header>
          <section>
            <Components.Feature.DropDownList
              name="Q&A Assessments"
              data={data.chat.assessmentQnaData}
            />
            <Components.Feature.DropDownList
              name="Survey"
              data={data.chat.serverData}
              link={true}
            />
            <Components.Feature.DropDownList
              name="Checks / FAQs"
              data={data.chat.faqData}
              link={true}
            />
          </section>
        </div>
      )}

      <section className="iconSection">
        <div className="iconContainer">
          <span onClick={handleToggle} className="iconButton">
            <FaRegQuestionCircle className="icon" />
          </span>
          <span onClick={handleToggle} className="iconButton">
            <RxTimer className="icon" />
          </span>
          <span onClick={handleToggle} className="iconButton">
            <FaFolderOpen className="icon" />
          </span>
          <span onClick={handleToggle} className="iconButton">
            <BiSolidMessageAlt className="icon" />
          </span>
          <span onClick={handleToggle} className="iconButton">
            <FaBookmark className="icon" />
          </span>
          <span onClick={handleToggle} className="iconButton">
            <RiVideoFill className="icon" />
          </span>
        </div>
      </section>

      <style jsx>{`
        .assessmentList {
          width: ${showAssessmentList ? "67.8rem" : "0"};
          transition: width 0.3s;
        }
        .iconSection {
          display: flex;
          flex-direction: column;
        }
        .iconContainer {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          border: 1px solid lightgray;
          border-radius: 5px;
          align-items: center;
          justify-content: center;
          width: 35px;
          height: 200px;
        }
        .iconButton {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          width: 25px;
          height: 25px;
          background: black;
          border-radius: 8px;
        }
        .icon {
          width: 13px;
          height: 13px;
          color: white;
        }
      `}</style>
    </>
  );
};

export default Assessments;
