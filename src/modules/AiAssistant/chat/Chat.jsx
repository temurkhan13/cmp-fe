import Header from "../../../components/chat/Header";
import ChatMessages from "../../../components/chat/ChatMessages";
import ChatLayout from "../../../layout/ChatLayout";

const Chat = () => {
  return (
    <>
      <Header />
      <ChatLayout>
        <ChatMessages />
      </ChatLayout>
    </>
  );
};

export default Chat;
