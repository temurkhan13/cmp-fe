import { useState, useEffect } from "react";
import "../../style/chat/ChatMessage.scss";
import { DummyChat } from "../../utils";
import { LuPencil } from "react-icons/lu";
import { FaCopy, FaThumbsUp, FaThumbsDown, FaSync } from "react-icons/fa";
import { IoAttach } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import UserPic from "../../assets/chat/user.png";
import AiPic from "../../assets/dashboard/sidebarLogo.png";
import { Example } from "../../utils";
import fileIcon from "../../assets/dashboard/fileIcon.png";
import TonePopup from "./TonePopup";
import { ScaleLoader } from "react-spinners";

// hooks
import useGrammarFix from "../../hooks/useGrammarFix";
import useSummarize from "../../hooks/useSummarize";
import useImproveWriting from "../../hooks/useImproveWriting";
import useChangeTone from "../../hooks/useChangeTone";

const ChatMessage = () => {
  const [file, setFile] = useState([]);
  const [text, setText] = useState("");
  //
  const [chat, setChat] = useState(DummyChat);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [selectedTone, setSelectedTone] = useState("");
  const [responseLength, setResponseLength] = useState("");
  const [askAi, setAskAI] = useState("");
  const [loading, setLoading] = useState(false);
  // custom hooks
  const { fixedGrammer, fixGrammar } = useGrammarFix();
  const { writing, improveWriting } = useImproveWriting();
  const { summary, summarize } = useSummarize();
  const { changetoneText, ChangeToneFun } = useChangeTone();

  // upload files
  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFile((prevFiles) => [...prevFiles, ...uploadedFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFile((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSendMessage = () => {
    console.log("Text:", text);
    console.log("Uploaded File:", file);
    setFile([]);
    setText("");
  };

  // popup change Tone
  const HandleAskAi = async (value) => {
    try {
      setLoading(true);
      setAskAI(value);
      console.log("selected ASi value", value);

      if (value === "Fix Spelling & Grammar") {
        await fixGrammar(selectedText);
        applyFixedText(fixedGrammer);
        //
      } else if (value === "Improve Writing") {
        await improveWriting(selectedText);
        applyFixedText(writing);
        //
      } else if (value === "Summarize") {
        await summarize(selectedText);
        applyFixedText(summary);
      }
    } catch (error) {
      console.error("Error occurred while processing AI request:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFixedText = (newText) => {
    const updatedChat = chat.map((message) => ({
      ...message,
      content: message.content.replace(selectedText, newText),
    }));
    setChat(updatedChat);
    setPopupVisible(false);
  };

  const handleTextSelect = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    console.log("selectedText", selectedText);
    setSelectedText(selectedText);
    setPopupVisible(!!selectedText);
  };

  const handleToneChange = async (tone) => {
    console.log("selectedTone", tone);
    console.log("selectedText", selectedText);
    console.log("selectedresponseLength", responseLength);

    setSelectedTone(tone);

    if (selectedText && tone) {
      setLoading(true);
      try {
        await ChangeToneFun(selectedText, tone);
        applyFixedText(changetoneText);
      } catch (error) {
        console.error("Error occurred while changing tone:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleResponseLengthChange = (ResponseSelectedValue) => {
    console.log("response length", ResponseSelectedValue);
    setResponseLength(length);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleTextSelect);
    return () => {
      document.removeEventListener("mouseup", handleTextSelect);
    };
  }, []);

  return (
    <div className="chat-message-wrapper">
      <div className="spinner" style={{ display: loading ? "flex" : "none" }}>
        <ScaleLoader color={"#000000"} loading={loading} size={150} />
      </div>

      <div className="chat-message">
        <input
          type="file"
          id="file-input"
          onChange={handleFileChange}
          style={{ display: "none" }}
          multiple
        />

        {DummyChat.length > 0 ? (
          <div>
            {popupVisible && (
              <TonePopup
                onToneChange={handleToneChange}
                onResponseLengthChange={handleResponseLengthChange}
                HandleAskAi={HandleAskAi}
                onClose={handleClosePopup}
              />
            )}

            {DummyChat.map((item, index) => (
              <div key={index}>
                <div>
                  {item.role === "user" ? (
                    <div className="card">
                      <div>
                        <img src={UserPic} alt="avatar" />
                      </div>
                      <div>
                        <p className="Heading">You</p>
                        <div className="msg">{item.content}</div>
                        <div>
                          <LuPencil />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="card">
                      <div>
                        <img src={AiPic} alt="avatar" />
                      </div>
                      <div>
                        <p className="Heading">ChangeAI</p>
                        <div className="msg">{item.content}</div>
                        <div>
                          <FaCopy />
                          <FaThumbsUp />
                          <FaThumbsDown />
                          <FaSync />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="defaultPage">
            <div
              className="file-upload"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="file-upload-icon">
                <img src={fileIcon} alt="" />
              </div>

              <div className="file-upload-text">Upload Your File</div>
              <div className="file-upload-info">
                <label htmlFor="file-input">
                  <span
                    style={{
                      color: "rgba(0, 102, 255, 1)",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </label>
              </div>
              <div className="file-upload-info">
                (Max file size will be 25MB)
              </div>
            </div>

            <div className="data-map">
              {Example.map(({ question }, index) => (
                <div key={index} className="data-map-item">
                  {question}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* input */}
      <div className="Message_container">
        <div>
          <label htmlFor="file-input" className="file-upload-text">
            {file ? file.map((f) => f.name).join(", ") : ""}
          </label>
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter text here.."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="icons">
            <label htmlFor="file-input">
              <IoAttach />
            </label>
            <IoSend onClick={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
