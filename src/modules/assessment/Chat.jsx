import React from "react";
import Components from "../../components";
import data from "../../data";

const Chat = () => {
  return (
    <div className="assessmentChat">
      <Components.Common.Header />
      <section>
        <Components.UI.NewChat data={data.chat.newChatDummyData} />
        <Components.UI.MessagesSection data={data.chat.dummyChatData} />
        <Components.UI.Assessments data={data.chat.newChatDummyData} />
      </section>
    </div>
  );
};

export default Chat;
