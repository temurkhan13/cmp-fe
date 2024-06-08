// import PropTypes from "prop-types";
// import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
// import { Examples } from "../../utils";
// import { HiOutlineDotsHorizontal } from "react-icons/hi";

// const ChatHistoryComp = ({ toggleOpen }) => {
//   const truncateText = (text, maxLength) => {
//     if (text.length <= maxLength) return text;
//     return text.substring(0, maxLength) + "...";
//   };

//   return (
//     <>
//       <div className="header">
//         <button className="NewChat">
//           <span style={{ fontSize: "20px" }}>+</span> New Chat
//         </button>
//         <span onClick={toggleOpen}>
//           <MdKeyboardDoubleArrowLeft />
//         </span>
//       </div>

//       <div className="chats">
//         {Examples.map(({ question }, index) => (
//           <div key={index}>
//             <span>{truncateText(question, 30)}</span>
//             <span> </span>
//             <span>
//               <HiOutlineDotsHorizontal />
//             </span>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// ChatHistoryComp.propTypes = {
//   toggleOpen: PropTypes.func.isRequired,
// };
// export default ChatHistoryComp;
