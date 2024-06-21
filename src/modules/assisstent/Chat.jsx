import Components from "../../components";
import data from "../../data";

const AiAssistantChat = () => {
  return (
    <>
      <div className="assessmentChat">
        <Components.Common.Header />
        <section>
          <Components.Assistant.NewChat data={data.chat.newChatDummyData} />
          <Components.Assistant.MessagesSection/>
          <Components.Assistant.Assessments />
        </section>
      </div>
    </>
  );
};

export default AiAssistantChat;
