// import React from "react";
// import Components from "..";
// import assets from "../../assets";

// const MessageItemFile = (props) => {
//   return (
//     <div className="messageItemFile">
//       <header>
//         <img src={props.image} alt="profile" />
//       </header>
//       <section>
//         <Components.Feature.Text className="titory--bold">
//           {props.name}
//         </Components.Feature.Text>
//         <section>
//           {props.files.map((el) => (
//             <div>
//               <img src={assets.common.fileIcon} alt="icon" />
//               <div>
//                 <Components.Feature.Text className="secondry--dark-bold">
//                   {el.name}
//                 </Components.Feature.Text>
//                 <Components.Feature.Text className="secondry">
//                   {el.size}
//                 </Components.Feature.Text>
//               </div>
//             </div>
//           ))}
//         </section>
//       </section>
//     </div>
//   );
// };

// export default MessageItemFile;

import React from "react";
import Components from "..";
import assets from "../../assets";

const MessageItemFile = (props) => {
  // Function to determine the file icon based on the file extension
  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    switch (extension) {
      case "pdf":
        return assets.common.pdfIcon;
      case "xls":
      case "xlsx":
        return assets.common.fileIcon; // Assuming you have an icon for xls
      default:
        return assets.common.fileIcon;
    }
  };

  return (
    <div className="messageItemFile">
      <header>
        <img src={props.image} alt="profile" />
      </header>
      <section>
        <Components.Feature.Text className="titory--bold">
          {props.name}
        </Components.Feature.Text>
        <section>
          {props.files.map((el) => (
            <div key={el.name}>
              <img src={getFileIcon(el.name)} alt="icon" />
              <div>
                <Components.Feature.Text className="secondry--dark-bold">
                  {el.name}
                </Components.Feature.Text>
                <Components.Feature.Text className="secondry">
                  {el.size}
                </Components.Feature.Text>
              </div>
            </div>
          ))}
        </section>
      </section>
    </div>
  );
};

export default MessageItemFile;
