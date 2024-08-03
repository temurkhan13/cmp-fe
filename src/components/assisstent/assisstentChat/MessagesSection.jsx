import { useState, useEffect } from 'react';
import '@styles/chat/ChatMessage.scss';
import { LuPencil } from 'react-icons/lu';
import { FaCopy, FaThumbsUp, FaThumbsDown, FaSync } from 'react-icons/fa';
import { IoAttach, IoSend } from 'react-icons/io5';
import { FaFile } from 'react-icons/fa6';
import InpireMeIcon from '../../../assets/inspireBtn.svg';
import UserPic from '@assets/chat/user.png';
import AiPic from '@assets/dashboard/sidebarLogo.png';
import { Example } from '@utils';
import fileIcon from '@assets/dashboard/fileIcon.png';
import TonePopup from './TonePopup';
import { ScaleLoader } from 'react-spinners';
import ReactMarkdown from 'react-markdown';
import useGrammarFix from '@hooks/useGrammarFix';
import useSummarize from '@hooks/useSummarize';
import useImproveWriting from '@hooks/useImproveWriting';
import useChangeTone from '@hooks/useChangeTone';
import useComprehensive from '@hooks/useComprehensive';
import useAuto from '@hooks/useAuto';
import useShorter from '@hooks/useShorter';
import useLonger from '@hooks/useLonger';
import useChat from '@hooks/useChat';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';

import { addMessage ,updateMessage, addBookmark } from '../../../redux/slices/workspaceSlice'; // Adjusted import

import { v4 as uuidv4 } from 'uuid';

const MessagesSection = () => {

  const dispatch = useDispatch();
  const state = useSelector((state) => state.workspace);
  const selectedWorkspaceId = useSelector((state) => state.workspace.selectedWorkspaceId);
  const selectedFolderId = useSelector((state) => state.workspace.selectedFolderId);
  const chats = useSelector((state) => state.workspace.workspaces
    .find(workspace => workspace.workspaceId === selectedWorkspaceId)
    ?.folders.find(folder => folder.folderId === selectedFolderId)
    ?.chats || []);
  const selectedChatId = useSelector((state) => state.workspace.selectedChatId);
  const currentChat = chats.find((chat) => chat.chatId === selectedChatId);

  const selectedWorkspace = state.workspaces.find(workspace => workspace.workspaceId === selectedWorkspaceId);
const selectedFolder = selectedWorkspace?.folders.find(folder => folder.folderId === selectedFolderId);


  const [file, setFile] = useState([]);
  const [text, setText] = useState('');
  const [chat, setChat] = useState(
    currentChat ? currentChat.generalMessages : []
  );


  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [selectedTone, setSelectedTone] = useState('');
  const [responseLength, setResponseLength] = useState('');
  const [askAi, setAskAI] = useState('');
  const [loading, setLoading] = useState(false);

  const { fixGrammar } = useGrammarFix();
  const { improveWriting } = useImproveWriting();
  const { summarize } = useSummarize();
  const { ChangeToneFun } = useChangeTone();
  const { comprehensiveWriting } = useComprehensive();
  const { autoWritingFnc } = useAuto();
  const { shortText } = useShorter();
  const { LongText } = useLonger();
  const { error, chatWithdoc } = useChat();

  useEffect(() => {
//     console.log('chats:', chats);
//     console.log('selectedChatId:', selectedChatId, selectedWorkspaceId, selectedFolderId);
//     console.log('Redux state:', state);
//   console.log('currentChat:', currentChat);
//   console.log('selectedWorkspace:', selectedWorkspace);
// console.log('selectedFolder:', selectedFolder);
// console.log('chats:', selectedFolder?.chats || []);
    if (currentChat) {
      console.log(currentChat);
      setChat(currentChat.generalMessages);
      console.log("chat Messages: " + currentChat.generalMessages);
      console.log("chat: " + chat);
    }
  }, [currentChat]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Memoize handleSendMessage function
const handleSendMessage = useCallback(async () => {
  if (!text && !file) return;

  const newMessage = {
    messageId:uuidv4(),    
      userId: "userId2",
      role: "user",
      content: text || null,
      timestamp: "2024-07-12T12:01:00Z",
      createdAt: "2024-07-12T12:01:00Z",
      updatedAt: "2024-07-12T12:01:00Z"
  };

  const message = [...chat, newMessage];
  console.log("user Message", chat);
  setChat(message);

  console.log("AI response Message:", message);
  dispatch(addMessage(newMessage));

  try {
    setLoading(true);
    const response = await chatWithdoc(text, file);
    if (response) {
      const aiMessage = {
        messageId:uuidv4(),    
      userId: "userId2",
      role: "ai",
      content: response,
      timestamp: "2024-07-12T12:01:00Z",
      createdAt: "2024-07-12T12:01:00Z",
      updatedAt: "2024-07-12T12:01:00Z"
      };
      const finalChat = [...message, aiMessage];
      setChat(finalChat);
      console.log("AI response Message:", finalChat);
      dispatch(addMessage(aiMessage));
    }

    setFile(null);
    document.getElementById('file-input').value = '';
    setText('');
  } catch (error) {
    console.log(error.message);
  } finally {
    console.log(chat);
    setLoading(false);
  }

}, [text, file, chat, dispatch, chatWithdoc]);


  // Memoize HandleAskAi function
const HandleAskAi = useCallback(async (value) => {
  try {
    setLoading(true);
    setAskAI(value);

    let response;
    if (value === 'Fix Spelling & Grammar') {
      response = await fixGrammar(selectedText);
    } else if (value === 'Improve Writing') {
      response = await improveWriting(selectedText);
    } else if (value === 'Summarize') {
      response = await summarize(selectedText);
    }

    if (response) {
      applyFixedText(response);
    }
  } catch (error) {
    console.error('Asi AI', error);
  } finally {
    setLoading(false);
  }
}, [fixGrammar, improveWriting, summarize, selectedText]);


  // Memoize applyFixedText function
const applyFixedText = useCallback((newText) => {
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
  dispatch(updateMessage(selectedWorkspaceId, selectedChatId, updatedChat));

  setPopupVisible(false);
}, [chat, selectedText, dispatch, selectedWorkspaceId, selectedChatId]);

  const handleTextSelect = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    setSelectedText(selectedText);
    setPopupVisible(!!selectedText);
  };

  const handleToneChange = async (tone) => {
    setSelectedTone(tone);
    setLoading(true);
    try {
      const response = await ChangeToneFun(selectedText, tone);
      if (response) {
        applyFixedText(response);
      }
    } catch (error) {
      console.error('Error occurred while changing tone:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResponseLengthChange = async (value) => {
    setResponseLength(value);
    setLoading(true);
    try {
      let response;
      if (value === 'Auto') {
        response = await autoWritingFnc(selectedText);
      } else if (value === 'Small') {
        response = await shortText(selectedText);
      } else if (value === 'Medium') {
        response = await LongText(selectedText);
      } else if (value === 'Comprehensive') {
        response = await comprehensiveWriting(selectedText);
      }

      if (response) {
        applyFixedText(response);
      }
    } catch (error) {
      console.error('Error occurred while changing tone:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const handleAddBookmark = (content, messageId) => {
    const bookmark = {
      bookmarkId: 'bookmarkId3',
      userId: 'userId4',
      timestamp: '2024-07-12T12:40:00Z',
      date: '2024-07-12',
      messages: [
        {
          messageId: messageId,
          sender: 'ChangeAI',
          text: content,
          savedBy: 'You',
        },
      ],
    };
    dispatch(addBookmark(bookmark));
    console.log('bookmarked ' + bookmark.bookmarkId);
  };

  const handleInspireClick = async () => {
    //Todo: will implement Inspire 
    // const currentQuestionKey = `question-${data.questionnaire.Questions[activeStep - 1].id}`;
    // const inspiredText = await handleInspire(answers[currentQuestionKey]);
    // setAnswers({
    //   ...answers,
    //   [currentQuestionKey]: inspiredText,
    // });
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleTextSelect);
    return () => {
      document.removeEventListener('mouseup', handleTextSelect);
    };
  }, []);

  return (
    <div className="chat-message-wrapper">
      <div className="spinner" style={{ display: loading ? 'flex' : 'none' }}>
        <ScaleLoader color={'#000000'} loading={loading} size={150} />
      </div>

      <div className="chat-message">
        <input
          type="file"
          id="file-input"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          multiple
        />

        {chat.length > 0 ? (
          <div className="chat-scroll">
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
                  {item && item.role === 'user' ? (
                    <div className="card">
                      <div>
                        <img src={UserPic} alt="avatar" />
                      </div>
                      <div>
                        <p className="Heading">You</p>
                        {/* <div className="msg">{item.content}</div> */}
                        {item.content && (
                          <div className="msg">
                            <ReactMarkdown>{item.content}</ReactMarkdown>
                          </div>
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
                        {item && (
                          <div className="msg">
                            <ReactMarkdown>{item.content}</ReactMarkdown>
                          </div>
                        )}
                        <div>
                        <FaCopy
                         onClick={() => handleAddBookmark(item.content, item.messageId)}
                         style={{ cursor: 'pointer' }}
                         />
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
                {/* <img src={fileIcon} alt="" /> */}
                <FaFile style={{ fontSize: '5rem', color: '#0066FFAD' }} />
              </div>

              <div className="file-upload-text">Upload Your File</div>
              <div className="file-upload-info">
                <label htmlFor="file-input">
                  <span
                    style={{
                      color: 'rgba(0, 102, 255, 1)',
                      textDecoration: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Click to upload
                  </span>{' '}
                  or drag and drop
                </label>
              </div>
              <div className="file-upload-info">(Max. File size: 25MB)</div>
            </div>

            <div className="data-map">
              {Example.map(({ question }, index) => (
                <div
                  key={index}
                  className="data-map-item"
                  onClick={() => setText(question)}
                >
                  {question}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="error" style={{ color: 'red' }}>
          {error}
        </div>
      )}
      {/* input */}
      <div className="Message_container">
        <div>
          <label htmlFor="file-input" className="file-upload-text">
            {/* {file ? file.map((f) => f.name).join(", ") : ""} */}
            {/* {file.name} */}
            {file ? file.name : ''}
          </label>
        </div>
        <div className="input-container">
          <div
            style={{
              position: 'left',
              bottom: '10px',
              right: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              src={InpireMeIcon}
              alt="Inspire Me"
              onClick={handleInspireClick}
            />
            {loading && (
              <div
                style={{
                  border: '2px solid rgba(0, 0, 0, 0.1)',
                  borderTop: '2px solid #000',
                  borderRadius: '50%',
                  width: '16px',
                  height: '16px',
                  animation: 'spin 1s linear infinite',
                  marginLeft: '8px',
                }}
              />
            )}
          </div>
          <input
            type="text"
            placeholder="Enter text here.."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="icons">
            <label htmlFor="file-input">
              <IoAttach className="send-icon " />
            </label>
            <IoSend onClick={handleSendMessage} className="send-icon " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesSection;
