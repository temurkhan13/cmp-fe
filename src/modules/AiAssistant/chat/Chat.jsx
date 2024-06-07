import { useState } from "react";
import ChatHistory from "../../../components/chat/ChatHistory";
import ChatMessage from "../../../components/chat/ChatMessage";
import ChatMenu from "../../../components/chat/ChatMenu";
import Header from "../../../components/chat/Header";
import "../../../style/chat/Chat.scss";

const App = () => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const toggleHistoryOpen = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  return (
    <>
      <Header />
      <div className={`MainChat ${isHistoryOpen ? "history-open" : ""}`}>
        <ChatHistory isOpen={isHistoryOpen} toggleOpen={toggleHistoryOpen} />
        <ChatMessage />
        <ChatMenu />
      </div>
    </>
  );
};

export default App;
