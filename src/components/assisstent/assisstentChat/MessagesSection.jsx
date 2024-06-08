import { useEffect, useRef, useState } from "react";
import { RiSendPlane2Fill } from "react-icons/ri";
import { IoMdAttach } from "react-icons/io";
import Components from "../..";
import PropTypes from "prop-types";
import { LuPencil } from "react-icons/lu";
import { FaCopy, FaThumbsUp, FaThumbsDown, FaSync } from "react-icons/fa";
// chat upload pdf & text
import useChat from "../../../hooks/useChat";
import TonePopup from "../../chat/TonePopup";
import assets from "../../../assets";

// ASk-Ai
import useGrammarFix from "../../../hooks/useGrammarFix";
import useSummarize from "../../../hooks/useSummarize";
import useImproveWriting from "../../../hooks/useImproveWriting";

// change Tone
import useChangeTone from "../../../hooks/useChangeTone";

// response length
import useComprehensive from "../../../hooks/useComprehensive";
import useAuto from "../../../hooks/useAuto";
import useShorter from "../../../hooks/useShorter";
import useLonger from "../../../hooks/useLonger";
import dummyChatData from "../../../data/chat/dummyChatData";

const MessagesSection = (props) => {
  const messagesEndRef = useRef(null);

  const [file, setFile] = useState([]);
  const [text, setText] = useState("");

  const [chat, setChat] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [selectedTone, setSelectedTone] = useState("");
  const [responseLength, setResponseLength] = useState("");
  const [askAi, setAskAI] = useState("");
  const [loading, setLoading] = useState(false);

  const { error, chatWithdoc } = useChat();

  // custom hooks
  const { fixGrammar } = useGrammarFix();
  const { improveWriting } = useImproveWriting();
  const { summarize } = useSummarize();
  const { ChangeToneFun } = useChangeTone();
  const { comprehensiveWriting } = useComprehensive();
  const { autoWritingFnc } = useAuto();
  const { shortText } = useShorter();
  const { LongText } = useLonger();

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

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

  useEffect(() => {
    scrollToBottom();
  }, [props.data]);

  return (
    <div className="messages-Section">
      <section>
        <input
          type="file"
          id="file-input"
          onChange={handleFileChange}
          style={{ display: "none" }}
          multiple
        />

        {props.data.length > 0 ? (
          <div>
            {popupVisible && (
              <TonePopup
                onToneChange={handleToneChange}
                onResponseLengthChange={handleResponseLengthChange}
                HandleAskAi={HandleAskAi}
                onClose={handleClosePopup}
              />
            )}

            {dummyChatData.map((item, index) => (
              <div key={index}>
                <div>
                  {item.name === "You" ? (
                    <div className="card">
                      <div>
                        <img src={assets.common.profile} alt="avatar" />
                      </div>
                      <div>
                        <p className="Heading">You</p>
                        <div className="msg">{item.text}</div>
                        {item.file && (
                          <div className="file-preview">
                            <a
                              href={item.file.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.file.name} ({item.file.size})
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
                        <img src={assets.common.icon} alt="avatar" />
                      </div>
                      <div>
                        <p className="Heading">ChangeAI</p>
                        <div className="msg">{item.text}</div>
                        {item.file &&
                          item.file.map((fileItem, index) => (
                            <div key={index} className="file-preview">
                              <a
                                href={fileItem.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {fileItem.name} ({fileItem.size})
                              </a>
                            </div>
                          ))}
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
                <img src={"fileIcon"} alt="" />
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
              {props.assisstentDefaultQuestion.map(({ question }, index) => (
                <div key={index} className="data-map-item">
                  {question}
                </div>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </section>

      {error && (
        <div className="error" style={{ color: "red" }}>
          {error}
        </div>
      )}

      <div>
        {/* <span htmlFor="file-input" className="file-upload-text"> */}
        {/* {file ? file.map((f) => f.name).join(", ") : ""} */}
        {/* {file.name} */}
        {file ? file.name : ""}
        {/* </span> */}
        <input
          type="text"
          placeholder="Message ChangeAI"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <IoMdAttach />
        <RiSendPlane2Fill onClick={handleSendMessage} />
      </div>
    </div>
  );
};

export default MessagesSection;
