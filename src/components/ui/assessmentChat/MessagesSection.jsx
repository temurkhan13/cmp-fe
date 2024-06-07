import React, { useEffect, useRef } from "react";
import { RiSendPlane2Fill } from "react-icons/ri";
import { IoMdAttach } from "react-icons/io";
import Components from "../..";

const MessagesSection = (props) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [props.data]);

  return (
    <div className="messages-Section">
      <section>
        {props.data.map((el) =>
          el.file ? (
            <Components.Feature.MessageItemFile
              image={el.image}
              name={el.name}
              files={el.file}
            />
          ) : (
            <Components.Feature.MessageItemText
              image={el.image}
              name={el.name}
              text={el.text}
            />
          )
        )}

        <div ref={messagesEndRef} />
      </section>
      <div>
        <input type="text" placeholder="Message ChangeAI" />
        <IoMdAttach />
        <RiSendPlane2Fill />
      </div>
    </div>
  );
};

export default MessagesSection;
