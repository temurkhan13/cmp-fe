import { useEffect, useRef } from "react";
import { RiSendPlane2Fill } from "react-icons/ri";
import { IoMdAttach } from "react-icons/io";
import Components from "../..";
import PropTypes from "prop-types";
import { useLocation } from 'react-router-dom';

const MessagesSection = (props) => {
  const messagesEndRef = useRef(null);
  const location = useLocation();
  const { Questions } = location.state || {};

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
      <p>{Questions}</p>
      <section>
        {props.selectedAssessment ? (
          <Components.Feature.StartAssessmentPopup
            data={props.selectedAssessment}
          />
        ) : (
          props.data.map((el, index) =>
            el.file ? (
              <Components.Feature.MessageItemFile
                key={index}
                image={el.image}
                name={el.name}
                files={el.file}
              />
            ) : (
              <Components.Feature.MessageItemText
                key={index}
                image={el.image}
                name={el.name}
                text={el.text}
              />
            )
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

MessagesSection.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      file: PropTypes.string, // Change this according to the actual type of 'file'
      text: PropTypes.string,
    })
  ).isRequired,
};

export default MessagesSection;
