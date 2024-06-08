import Components from "../../components";
import data from "../../data";

const AiAssistantChat = () => {
  return (
    <>
      <div className="assessmentChat">
        <Components.Common.Header />
        <section>
          <Components.Assistant.NewChat data={data.chat.newChatDummyData} />
          <Components.Assistant.MessagesSection
            data={data.chat.dummyChatData}
            assisstentDefaultQuestion={data.chat.assisstentDefaultQuestion}
          />
          <Components.Assistant.Assessments />
        </section>
      </div>
    </>
  );
};

export default AiAssistantChat;
