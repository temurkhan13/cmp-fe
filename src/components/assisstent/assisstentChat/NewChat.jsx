import Components from "../../";
import { HiOutlinePlusSm } from "react-icons/hi";
import { RiArrowLeftDoubleLine } from "react-icons/ri";

const NewChat = (props) => {
  return (
    <>
      <div className="newChat">
        <div>
          <div>
            <HiOutlinePlusSm />
            <Components.Feature.Text className="secondry">
              New Chat
            </Components.Feature.Text>
          </div>
          <RiArrowLeftDoubleLine />
        </div>
        {props.data.map((el, index) => (
          <section key={index}>
            <Components.Feature.Text className="middium--light">
              {el.date}
            </Components.Feature.Text>
            <div>
              {el.message.map((el, index) => (
                <Components.Feature.Text className="secondry" key={index}>
                  {el.text}
                </Components.Feature.Text>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
};

export default NewChat;
