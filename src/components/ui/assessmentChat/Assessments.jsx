// import { useState } from 'react';
// import { RxCross2 } from 'react-icons/rx';
// import Components from '../..';
// import data from '../../../data';
// //
// import { FaRegQuestionCircle } from 'react-icons/fa';
// import { RxTimer } from 'react-icons/rx';
// import { FaFolderOpen } from 'react-icons/fa';
// import { BiSolidMessageAlt } from 'react-icons/bi';
// import { FaBookmark } from 'react-icons/fa';
// import { RiVideoFill } from 'react-icons/ri';

// const Assessments = ({ onAssessmentSelect }) => {
//   const [showAssessmentList, setShowAssessmentList] = useState(false);
//   const [activeIcon, setActiveIcon] = useState(null);

//   const handleToggleAssessmentList = () => {
//     setShowAssessmentList(!showAssessmentList);
//   };

//   const handleIconClick = (icon) => {
//     setActiveIcon(icon);
//     handleToggleAssessmentList();
//   };

//   const renderContent = () => {
//     switch (activeIcon) {
//       case 'question':
//         return <p>Q&A Assessments content goes here.</p>;
//       case 'timer':
//         return <p>Timer content goes here.</p>;
//       case 'folder':
//         return <p>Folder content goes here.</p>;
//       case 'message':
//         return <p>Message content goes here.</p>;
//       case 'bookmark':
//         return <p>Bookmark content goes here.</p>;
//       case 'video':
//         return <p>Video content goes here.</p>;
//       default:
//         return null;
//     }
//   };

//   return (
//     <>
//       {showAssessmentList && (
//         <div className="assessmentList">
//           <header>
//             <Components.Feature.Text className="main--bold">
//               Assessments
//             </Components.Feature.Text>
//             <span onClick={() => handleToggleAssessmentList()}>
//               <RxCross2 />
//             </span>
//           </header>
//           <section>{renderContent()}</section>
//         </div>
//       )}

//       <section className="iconSection">
//         <div className="iconContainer">
//           <span
//             onClick={() => handleIconClick('question')}
//             className={`iconButton ${activeIcon === 'question' ? 'active' : ''}`}
//           >
//             <FaRegQuestionCircle className="icon" />
//           </span>
//           <span
//             onClick={() => handleIconClick('timer')}
//             className={`iconButton ${activeIcon === 'timer' ? 'active' : ''}`}
//           >
//             <RxTimer className="icon" />
//           </span>
//           <span
//             onClick={() => handleIconClick('folder')}
//             className={`iconButton ${activeIcon === 'folder' ? 'active' : ''}`}
//           >
//             <FaFolderOpen className="icon" />
//           </span>
//           <span
//             onClick={() => handleIconClick('message')}
//             className={`iconButton ${activeIcon === 'message' ? 'active' : ''}`}
//           >
//             <BiSolidMessageAlt className="icon" />
//           </span>
//           <span
//             onClick={() => handleIconClick('bookmark')}
//             className={`iconButton ${activeIcon === 'bookmark' ? 'active' : ''}`}
//           >
//             <FaBookmark className="icon" />
//           </span>
//           <span
//             onClick={() => handleIconClick('video')}
//             className={`iconButton ${activeIcon === 'video' ? 'active' : ''}`}
//           >
//             <RiVideoFill className="icon" />
//           </span>
//         </div>
//       </section>

//       <style jsx>{`
//         .assessmentList {
//           width: ${showAssessmentList ? '67.8rem' : '0'};
//           transition: width 0.3s;
//         }
//         .iconSection {
//           display: flex;
//           flex-direction: column;
//         }
//         .iconContainer {
//           display: flex;
//           flex-direction: column;
//           gap: 1rem;
//           border: 1px solid lightgray;
//           border-radius: 5px;
//           align-items: center;
//           justify-content: center;
//           width: 55px;
//           height: 300px;
//         }
//         .iconButton {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//           width: 40px;
//           height: 40px;
//           border-radius: 8px;
//           transition: background-color 0.3s ease;

//           &.active {
//             background-color: black;
//             color: white;
//           }
//         }
//         .icon {
//           width: 20px;
//           height: 40px;
//           // color: black;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Assessments;
import { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import Components from '../..';
import data from '../../../data';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { RxTimer } from 'react-icons/rx';
import { FaFolderOpen } from 'react-icons/fa';
import { BiSolidMessageAlt } from 'react-icons/bi';
import { FaBookmark } from 'react-icons/fa';
import { RiVideoFill } from 'react-icons/ri';


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
          width: ${showAssessmentList ? '48rem' : '0'};
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


// // 

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Home from "../../chat/Home";
// import User from "../../chat/User";
// import Settings from "../../chat/Settings";
// import Help from "../../chat/Help";
// import "../../../styles/ChatMenu.scss";
// import { MdOutlineMoreTime } from "react-icons/md";
// import { MdPermMedia } from "react-icons/md";
// import { BiSolidCommentMinus } from "react-icons/bi";
// import { BiSolidSave } from "react-icons/bi";
// import { IoMdClose } from "react-icons/io";

// const Assessments = () => {
//   const [activeMenu, setActiveMenu] = useState(null);

//   const renderActiveMenu = () => {
//     switch (activeMenu) {
//       case "home":
//         return <Home />;
//       case "user":
//         return <User />;
//       case "settings":
//         return <Settings />;
//       case "help":
//         return <Help />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="assessmentList">
//       <div className="menu-icons">
//         <MdOutlineMoreTime onClick={() => setActiveMenu("home")} />
//         <MdPermMedia onClick={() => setActiveMenu("user")} />
//         <BiSolidCommentMinus onClick={() => setActiveMenu("settings")} />
//         <BiSolidSave onClick={() => setActiveMenu("help")} />
//       </div>
//       <AnimatePresence>
//         {activeMenu && (
//           <motion.div
//             key={activeMenu}
//             initial={{ height: 0 }}
//             animate={{ height: "100%", width: "350px" }}
//             exit={{ height: 0, width: 0 }}
//             transition={{ duration: 0.5 }}
//             className="menu-content"
//           >
//             <div style={{ backgroundColor: "white" }}>
//               <IoMdClose
//                 onClick={() => setActiveMenu(null)}
//                 style={{
//                   position: "absolute",
//                   top: 5,
//                   right: 3,
//                   fontSize: "20px",
//                   backgroundColor: "lightgray",
//                   borderRadius: "10px",
//                   color: "gray",
//                 }}
//               />
//               <div className="content">{renderActiveMenu()}</div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Assessments;
