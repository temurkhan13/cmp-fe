import { useState, useRef, useEffect } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import { MdAttachFile } from "react-icons/md";
import { FaMagic } from "react-icons/fa";
import { FaCopy, FaThumbsUp, FaThumbsDown, FaSync } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import axios from "axios";
import TonePopup from "./TonePopup";
import Sidebar from "../../assets/dashboard/sidebarLogo.png";
import uploadFileIcon from "../../assets/dashboard/uploadFileIcon.png";
import USerProfilePic from "../../assets/chat/user.png";
import { DummyChat, Example } from "../../utils";
import styles from "../../style/chatMessage.module.scss";

const ChatMessages = () => {
  const [title, setTitle] = useState("");
  const [chat, setChat] = useState(DummyChat);

  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const [chatHistory, setChatHistory] = useState();
  const [input, setInput] = useState("");

  const [files, setFiles] = useState([]);
  const [uploadedfiles, setUploadedFiles] = useState([]);
  const [showprogress, setShowProgress] = useState(false);
  const fileInputRef = useRef(null);

  const handlefileInputClick = () => {
    fileInputRef.current.click();
  };
  const uploadFiles = (event) => {
    const file = event.target.files[0];
    console.log("file", file);

    if (!file) return;

    const fileName =
      file.name.length > 12
        ? `${file.name.substring(0, 13)}....${file.name.split(".")[1]}`
        : file.name;
    const formData = new FormData();
    formData.append("file", file);
    setFiles((prev) => [...prev, { name: fileName, loading: 0 }]);
    setShowProgress(true);
    axios
      .post("", formData, {
        onUploadedProgress: ([loaded, total]) => {
          setFiles((prevstate) => {
            const newFiles = [...prevstate];
            newFiles[newFiles.length - 1].loading = Math.floor(
              (loaded / total) * 100
            );
            return newFiles;
          });
          if (loaded == total) {
            const fileSize =
              total < 1024
                ? `${total} KB`
                : `${loaded / (1024 * 1024).toFixed(2)} MB`;
            setUploadedFiles([
              ...uploadedfiles,
              { name: fileName, size: fileSize },
            ]);
            setFiles([]);
            setShowProgress(false);
          }
        },
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleSend = async () => {
    if (input.trim) {
      setChat([...chat, { role: "user", content: input }]);
      setInput("");
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...chat, { role: "user", content: input }],
        }),
      });

      //eslint-disable-next-line
      const readData = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();
      let aiRes = "";
      let done = false; // Initialize a flag to control the loop
      while (!done) {
        const { done, value } = await readData.read();
        if (done) {
          break;
        }
        aiRes += value;
        setChat([
          ...chat,
          { role: "user", content: input },
          { role: "assistant", content: aiRes },
        ]);
      }

      if (!title) {
        const createTitle = await fetch("http://localhost:8000/api/title", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: input,
          }),
        });

        const title = await createTitle.json();
        setTitle(title?.title);
        setChatHistory([...chatHistory, title]);
      }
    }
  };

  const handleTextSelect = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    if (selectedText) {
      const range = selection.getRangeAt(0);
      const rect = range.getClientRects()[0]; // Use the first rectangle
      if (rect) {
        const offsetX = rect.left + window.scrollX + rect.width / 2; // Adjust for center alignment
        const offsetY = rect.top + window.scrollY - 10; // Adjust for vertical alignment
        setPopupPosition({ top: offsetY, left: offsetX });
        setSelectedText(selectedText);
        setPopupVisible(true);
      }
    }
  };

  const handleToneChange = async (tone) => {
    console.log("Tone", tone);
    console.log("selectedText", selectedText);
    const response = await fetch("/api/change-tone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: selectedText, tone }),
    });
    const data = await response.json();
    const newText = data.text;

    const updatedChat = chat.map((message) => ({
      ...message,
      content: message.content.replace(selectedText, newText),
    }));
    setChat(updatedChat);
    setPopupVisible(false);
  };

  const HandleAskAi = () => {
    console.log("HandleASk Ai");
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleTextSelect);
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mouseup", handleTextSelect);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (e) => {
    const popup = document.querySelector(".PopupBox");
    if (!popup.contains(e.target)) {
      setPopupVisible(false);
    }
  };
  return (
    <div className={styles.ChatBody}>
      {DummyChat.length > 0 ? (
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingBottom: "10%",
          }}
          className={styles.scrollContainer}
        >
          {popupVisible && (
            <TonePopup
              onToneChange={handleToneChange}
              style={{ top: popupPosition.top, left: popupPosition.left }}
              HandleAskAi={HandleAskAi}
            />
          )}

          {DummyChat.map((item, index) => (
            <div
              key={index}
              // className={`${
              //   item.role === "assistant" && "bg-slate-900 rounded"
              // }`}
              style={{
                display: "flex",
                position: "relative",
              }}
            >
              <span>
                {item.role === "user" ? (
                  <img
                    src={USerProfilePic}
                    style={{
                      borderRadius: "50%",
                      width: "35px",
                      height: "35px",
                    }}
                  />
                ) : (
                  <img
                    src={Sidebar}
                    style={{
                      borderRadius: "50%",
                      width: "35px",
                      height: "35px",
                    }}
                  />
                )}
              </span>
              <div
                style={{
                  whiteSpace: "break-spaces",
                  margin: "0 5px 10px 5px",
                  padding: "0 10px",
                  fontSize: "13px",
                }}
              >
                {item.role === "user" ? (
                  <div>
                    <p className={styles.chatMessageHeading}>You</p>
                    <div className={styles.ChatContent}>{item.content}</div>
                    <div className={styles.ChatEditIcon}>
                      <LuPencil />
                    </div>
                  </div>
                ) : (
                  <>
                    <p className={styles.chatMessageHeading}>ChangeAI</p>
                    <div className={styles.ChatContent}>{item.content}</div>
                    <div className={styles.ChatResponseCard}>
                      <FaCopy className={styles.ResponseIcons} />
                      <FaThumbsUp className={styles.ResponseIcons} />
                      <FaThumbsDown className={styles.ResponseIcons} />
                      <FaSync className={styles.ResponseIcons} />
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.nestedGrid}>
          <section className={styles.uploadBox}>
            <form>
              <input
                type="file"
                name="file"
                hidden
                className={styles.fileInput}
                ref={fileInputRef}
                onChange={uploadFiles}
              />
              <div className={styles.icon}>
                <img
                  src={uploadFileIcon}
                  style={{
                    background: "lightgray",
                    borderRadius: "5px",
                    height: "40px",
                    width: "30px",
                  }}
                />
              </div>
              <p style={{ margin: "10px 0", fontWeight: "600" }}>
                Upload your files
              </p>
              <div
                onClick={handlefileInputClick}
                style={{
                  fontSize: "14px",
                }}
              >
                <span
                  style={{
                    color: "rgba(0, 102, 255, 1)",
                    fontFamily: "Poppins",
                    fontWeight: "600",
                  }}
                >
                  Click to Upload
                </span>{" "}
                or drag and drop
              </div>
              <p
                style={{
                  color: "gray",
                  fontSize: "10px",
                }}
              >
                (Max. File size: 25 MB)
              </p>
            </form>
            {showprogress && (
              <section className={styles.loadingArea}>
                {files.map((file, index) => {
                  <li className={styles.row} key={index}>
                    {/* <i className="fas fa-file-alt"></i> */}
                    <div className={styles.content}>
                      <div className={styles.details}>
                        <span
                          className={styles.name}
                        >{`${file.name} - uploading`}</span>
                        <span
                          className={styles.percent}
                        >{`${file.loading}%`}</span>
                        <div className={styles.leadingBar}>
                          <div
                            className={styles.loading}
                            style={{
                              width: `${file.loading}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </li>;
                })}
              </section>
            )}
            <section className={styles.uploadedArea}>
              {uploadedfiles.map((file, index) => {
                <li className={styles.row} key={index}>
                  <div className={`${styles.content} ${styles.upload}`}>
                    {/* <li className="fas fa-file-alt"></li> */}
                    <div className={styles.details}>
                      <span className={styles.name}>{file.name}</span>
                      <span className={styles.size}>{file.size}</span>
                    </div>
                  </div>
                  {/* <i className="fas fa-check"></i> */}
                </li>;
              })}
            </section>
          </section>

          {Example.map(({ question }, index) => (
            <div
              key={index}
              style={{
                padding: "20px",
                borderRadius: "10px",
                border: "2px solid lightgray",
              }}
            >
              {question}
            </div>
          ))}
        </div>
      )}

      <div className={styles.chatAssistantInput}>
        <input
          type="text"
          placeholder="Search in Ai assistant text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <FaMagic className={styles.SearchIcon} />
        <MdAttachFile className={styles.SearchIcon} />
        <LuSendHorizonal
          className={styles.SearchIcon}
          onClick={() => (input.trim() ? handleSend() : undefined)}
        />
      </div>
    </div>
  );
};

export default ChatMessages;
