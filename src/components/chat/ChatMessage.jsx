import { useState, useEffect } from "react";
import "../../style/chat/ChatMessage.scss";
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

// ASk-Ai
import useGrammarFix from "../../hooks/useGrammarFix";
import useSummarize from "../../hooks/useSummarize";
import useImproveWriting from "../../hooks/useImproveWriting";

// change Tone
import useChangeTone from "../../hooks/useChangeTone";

// response length
import useComprehensive from "../../hooks/useComprehensive";
import useAuto from "../../hooks/useAuto";
import useShorter from "../../hooks/useShorter";
import useLonger from "../../hooks/useLonger";

// chat upload pdf & text
import useChat from "../../hooks/useChat";

const ChatMessage = () => {
  const [file, setFile] = useState([]);
  const [text, setText] = useState("");
  //
  const [chat, setChat] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [selectedTone, setSelectedTone] = useState("");
  const [responseLength, setResponseLength] = useState("");
  const [askAi, setAskAI] = useState("");
  const [loading, setLoading] = useState(false);

  // custom hooks
  const { fixGrammar } = useGrammarFix();
  const { improveWriting } = useImproveWriting();
  const { summarize } = useSummarize();
  const { ChangeToneFun } = useChangeTone();
  const { comprehensiveWriting } = useComprehensive();
  const { autoWritingFnc } = useAuto();
  const { shortText } = useShorter();
  const { LongText } = useLonger();
  const { error, chatWithdoc } = useChat();

  // upload files
  // uncomment part is for uploading multiple doc
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    // const uploadedFiles = Array.from(e.target.files);
    // setFile((prevFiles) => [...prevFiles, ...uploadedFiles]);
  };

  // handle drop_&_drop
  // uncomment part is for uploading multiple doc
  const handleDrop = (e) => {
    e.preventDefault();
    // const droppedFiles = Array.from(e.dataTransfer.files);
    // setFile((prevFiles) => [...prevFiles, ...droppedFiles]);
    setFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // send chat
  const handleSendMessage = async () => {
    console.log("Text:", text);
    console.log("Uploaded File:", file);

    // set user chat
    if (!text && !file) return;
    // setChat((prevChat) => [...prevChat, { role: "user", content: text }]);
    if (text) {
      setChat((prevChat) => [
        ...prevChat,
        {
          role: "user",
          content: text || null,
          // file: file ? URL.createObjectURL(file) : null,
          // fileName: file ? file.name : null,
        },
      ]);
    } else {
      setChat((prevChat) => [
        ...prevChat,
        {
          role: "user",
          // content: text || null,
          file: file ? URL.createObjectURL(file) : null,
          fileName: file ? file.name : null,
        },
      ]);
    }

    setLoading(true);
    try {
      const response = await chatWithdoc(text, file);
      if (response) {
        // set AI chat
        setChat((prevChat) => [...prevChat, { role: "ai", content: response }]);
      }

      // setFile([]);
      setFile(null); // Reset the file state
      document.getElementById("file-input").value = "";
      setText("");
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Ask-Ai
  const HandleAskAi = async (value) => {
    try {
      setLoading(true);
      setAskAI(value);

      if (value === "Fix Spelling & Grammar") {
        const responseGrammar = await fixGrammar(selectedText);
        applyFixedText(responseGrammar);
        //
      } else if (value === "Improve Writing") {
        const responseWriting = await improveWriting(selectedText);
        applyFixedText(responseWriting);
        //
      } else if (value === "Summarize") {
        const responseSummary = await summarize(selectedText);
        applyFixedText(responseSummary);
      }
    } catch (error) {
      console.error("Asi AI", error);
    } finally {
      setLoading(false);
    }
  };

  // replace selected text chat
  const applyFixedText = (newText) => {
    // updated
    const updatedChat = chat.map((message) => {
      if (message.content) {
        return {
          ...message,
          content: message.content.replace(selectedText, newText),
        };
      }
      return message;
    });

    setChat(updatedChat);
    setPopupVisible(false);
  };

  // select the text from chat
  const handleTextSelect = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    setSelectedText(selectedText);
    setPopupVisible(!!selectedText);
  };

  // handle Tone change
  const handleToneChange = async (tone) => {
    setSelectedTone(tone);
    // if (selectedText && tone) {
    setLoading(true);
    try {
      const response = await ChangeToneFun(selectedText, tone);
      applyFixedText(response);
    } catch (error) {
      console.error("Error occurred while changing tone:", error);
    } finally {
      setLoading(false);
    }
    // }
  };

  // handle Response length
  const handleResponseLengthChange = async (value) => {
    console.log("response length", value);
    setResponseLength(length);

    // if (value) {
    setLoading(true);
    try {
      if (value === "Auto") {
        const responseAuto = await autoWritingFnc(selectedText);
        applyFixedText(responseAuto);
        //
      } else if (value === "Small") {
        const responseSmall = await shortText(selectedText);
        applyFixedText(responseSmall);
        //
      } else if (value === "Medium") {
        const responseMedium = await LongText(selectedText);
        applyFixedText(responseMedium);
        //
      } else if (value === "Comprehensive") {
        const responseComp = await comprehensiveWriting(selectedText);
        applyFixedText(responseComp);
        //
      }
    } catch (error) {
      console.error("Error occurred while changing tone:", error);
    } finally {
      setLoading(false);
    }
    // }
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

        {chat.length > 0 ? (
          <div>
            {popupVisible && (
              <TonePopup
                onToneChange={handleToneChange}
                onResponseLengthChange={handleResponseLengthChange}
                HandleAskAi={HandleAskAi}
                onClose={handleClosePopup}
              />
            )}

            {chat.map((item, index) => (
              <div key={index}>
                <div>
                  {item.role === "user" ? (
                    <div className="card">
                      <div>
                        <img src={UserPic} alt="avatar" />
                      </div>
                      <div>
                        <p className="Heading">You</p>
                        {/* <div className="msg">{item.content}</div> */}
                        {item.content && (
                          <div className="msg">{item.content}</div>
                        )}
                        {item.file && (
                          <div className="file-preview">
                            <a
                              href={item.file}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.fileName}
                            </a>
                          </div>
                        )}
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
      {error && (
        <div className="error" style={{ color: "red" }}>
          {error}
        </div>
      )}
      {/* input */}
      <div className="Message_container">
        <div>
          <label htmlFor="file-input" className="file-upload-text">
            {/* {file ? file.map((f) => f.name).join(", ") : ""} */}
            {/* {file.name} */}
            {file ? file.name : ""}
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
