import { useState, useEffect, useRef } from 'react';
import '@styles/chat/ChatMessage.scss';
import { LuPencil } from 'react-icons/lu';
import {
  FaCopy,
  FaThumbsUp,
  FaThumbsDown,
  FaSync,
  FaCommentAlt,
  FaQuestion,
  FaLightbulb,
  FaBullhorn,
  FaUsers,
} from 'react-icons/fa';
import { IoAttach, IoSend } from 'react-icons/io5';
import { FaFile } from 'react-icons/fa6';
import InpireMeIcon from '../../assets/inspireBtn.svg';
import UserPic from '@assets/chat/user.png';
import AiPic from '@assets/dashboard/sidebarLogo.png';
import { Example } from '@utils';
// import fileIcon from '@assets/dashboard/fileIcon.png';
import TonePopup from '../../components/common/TonePopup';
import CommentPopup from './CommentPopup';
import { ScaleLoader } from 'react-spinners';
import ReactMarkdown from 'react-markdown';
import useGrammarFix from '@hooks/AiFeatureHooks/useGrammarFix';
import useSummarize from '@hooks/AiFeatureHooks/useSummarize';
import useImproveWriting from '@hooks/AiFeatureHooks/useImproveWriting';
import useChangeTone from '@hooks/AiFeatureHooks/useChangeTone';
import useComprehensive from '@hooks/AiFeatureHooks/useComprehensive';
import useAuto from '@hooks/AiFeatureHooks/useAuto';
import useShorter from '@hooks/AiFeatureHooks/useShorter';
import useLonger from '@hooks/AiFeatureHooks/useLonger';
import useChat from '@hooks/useChat';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { logo } from '../../assets/common/index';
// import {
//   addMessage,
//   updateMessage,
//   addBookmark,
// } from '../../redux/slices/workspaceSlice'; // Adjusted import

import {
  useAddMessageMutation,
  useUpdateMessageMutation,
  // useRemoveMessageMutation,
  useAddBookmarkMutation,
  useGetChatQuery,
} from '../../redux/api/workspaceApi';
import {
  selectCurrentChat,
  selectCurrentFolder,
  selectCurrentWorkspace,
} from '../../redux/selectors/selectors';

import * as FaIcons from 'react-icons/fa';
// import { v4 as uuidv4 } from 'uuid';

const MessagesSection = () => {
  const dispatch = useDispatch();
  // const state = useSelector((state) => state.workspace);
  // const selectedWorkspaceId = useSelector(
  //   (state) => state.workspace.selectedWorkspaceId
  // );
  // const selectedFolderId = useSelector(
  //   (state) => state.workspace.selectedFolderId
  // );
  // const chats = useSelector(
  //   (state) =>
  //     state.workspace.workspaces
  //       .find((workspace) => workspace.workspaceId === selectedWorkspaceId)
  //       ?.folders.find((folder) => folder.folderId === selectedFolderId)
  //       ?.chats || []
  // );
  // const selectedChatId = useSelector((state) => state.workspace.selectedChatId);
  // const currentChat = chats.find((chat) => chat.chatId === selectedChatId);

  // const selectedWorkspace = state.workspaces.find(
  //   (workspace) => workspace.workspaceId === selectedWorkspaceId
  // );
  // const selectedFolder = selectedWorkspace?.folders.find(
  //   (folder) => folder.folderId === selectedFolderId
  // );

  //api Integration
  const [addMessage] = useAddMessageMutation();
  const [updateMessage] = useUpdateMessageMutation();
  const [addBookmark] = useAddBookmarkMutation();
  const workspaceId = useSelector(
    (state) => state.workspaces.currentWorkspaceId
  );
  const folderId = useSelector((state) => state.workspaces.selectedFolder);
  const chatId = useSelector((state) => state.workspaces.currentChatId);
  const [messageId, setMessageId] = useState();

  const currentWorkspace = useSelector(selectCurrentWorkspace);
  const currentFolder = useSelector(selectCurrentFolder);
  const currentChat = useSelector(selectCurrentChat);
  

  useEffect(() => {}, [currentFolder, currentChat, currentWorkspace]);

  const [file, setFile] = useState([]);
  const [text, setText] = useState('');

  const { data: chat } = useGetChatQuery({ workspaceId, folderId: folderId._id, chatId });
  const [messages, setMessages] = useState(chat? chat.generalMessages : []);
  

  // const [chat, setChat] = useState(
  //   currentChat ? currentChat.generalMessages : []
  // );

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [selectedTone, setSelectedTone] = useState('');
  const [responseLength, setResponseLength] = useState('');
  const [askAi, setAskAI] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCommentPopup, setShowCommentPopup] = useState(false);

  const { fixGrammar } = useGrammarFix();
  const { improveWriting } = useImproveWriting();
  const { summarize } = useSummarize();
  const { ChangeToneFun } = useChangeTone();
  const { comprehensiveWriting } = useComprehensive();
  const { autoWritingFnc } = useAuto();
  const { shortText } = useShorter();
  const { LongText } = useLonger();
  const { error, chatWithdoc } = useChat();


  const renderIcon = (iconName, style = {}) => {
    const IconComponent = FaIcons[iconName];
    return IconComponent ? <IconComponent style={style} /> : null;
  };

  useEffect(() => {
    if (chatId === null) {
    //  setChat([]);
      return;
    }
    if (currentChat) {
      console.log(currentChat);
     // setChat(currentChat.generalMessages || []);
      console.log('chat Messages: ' + currentChat.generalMessages);
      console.log('chat: ' + chat);
    }
    // if(chatId === null){
    //   setChat([]);
    // }
  }, [currentChat, chatId]);

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
  const handleCommentClick = (e) => {
    e.stopPropagation();
    setShowCommentPopup((prev) => !prev);
    setAskAI(false);
    setPopupVisible(false);
  };
  const handleSendMessage = async () => {
    // e.preventDefault();
    if (!workspaceId) {
      alert('Please select a workspace');
      return;
    }
    try {
     addMessage({
        workspaceId: workspaceId,
        folderId: folderId._id,
        chatId: chatId ? chatId : 'newChat',
        message: text,
        files: file,
      })
        .unwrap();
        //.then((response) => console.log('text: ', response));

      // setChatContent('');
    } catch (error) {
      console.error('Failed to add chat:', error);
    }
  };

  // Memoize HandleAskAi function
  const HandleAskAi = useCallback(
    async (value) => {
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
    },
    [fixGrammar, improveWriting, summarize, selectedText]
  );

  // Memoize applyFixedText function
  // const applyFixedText = useCallback(
  //   (newText) => {
  //     const updatedChat = chat.map((message) => {
  //       // console.log(message);
  //       if (message.text) {
  //         return {
  //           ...message,
  //           text: message.text.replace(selectedText, newText),
  //         };
  //       }
  //       return message;
  //     });
  //     console.log('chatttt :' + chat);
  //   //  setChat(updatedChat);
  //     //dispatch(updateMessage(workspaceId, folderId, chatId, messageId, message));

  //     setPopupVisible(false);
  //   },
  //   [chat, selectedText, dispatch, workspaceId, chatId]
  // );

  const applyFixedText = useCallback(
    async (newText) => {
      const updatedMessages = chat.generalMessages.map((message) => {
        if (message.text && message.text.includes(selectedText)) {
          return {
            ...message,
            text: message.text.replace(selectedText, newText),
          };
        }
        return message;
      });

      // Optimistic update: Update UI immediately
      // You might want to use a local state to manage this, as shown in the example

      try {
        // Optionally dispatch an action or make an API call to update the message
        // await Promise.all(
        //   updatedMessages
        //     .filter((msg) => msg.text !== message.text)
        //     .map((message) =>
        //       updateMessage({
        //         workspaceId,
        //         folderId,
        //         chatId,
        //         messageId: message._id,
        //         text: message.text,
        //       })
        //     )
        // );

        // Refetch the chat to get the latest data from the server
      //  await refetch();
      } catch (error) {
        console.error('Failed to update message:', error);
        // Handle error (e.g., show an error message to the user)
      }

      setPopupVisible(false);
    },
    [chat, selectedText, updateMessage, workspaceId, folderId, chatId]
  );

  useEffect(() => {
    const handleMouseUp = () => {
      handleTextSelect();
    };

    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleTextSelect = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    // Check if the selected text is within an element with class '.msg'
    const messageElements = document.querySelectorAll('.msg');
    let isValidSelection = false;
    let selectedMessageId = null;

    messageElements.forEach((msgElement) => {
      // Check if the selected text starts from within the msgElement
      if (
        msgElement.contains(selection.anchorNode) &&
        msgElement.contains(selection.focusNode)
      ) {
        isValidSelection = true;
        selectedMessageId = msgElement.getAttribute('data-message-id'); // Get the messageId
      }
    });

    // Set the popup visibility and selection state based on isValidSelection
    if (isValidSelection) {
      setSelectedText(selectedText);
      setPopupVisible(!!selectedText); // Show popup if there's a valid selection
      if (selectedMessageId) {
        console.log(`Selected Message ID: ${selectedMessageId}`);
        setMessageId(selectedMessageId);
        // You can now use `selectedMessageId` as needed
      }
    } else {
      setPopupVisible(false); // Hide popup if selection is invalid
    }
  };

  const handleToneChange = async (tone) => {
    setSelectedTone(tone);
    setLoading(true);
    try {
      console.log('selected Text', selectedText);
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
  const handleAddBookmark = async (messageId) => {
    // const bookmark = {
    //   bookmarkId: 'bookmarkId3',
    //   userId: 'userId4',
    //   timestamp: '2024-07-12T12:40:00Z',
    //   date: '2024-07-12',
    //   messages: [
    //     {
    //       messageId: messageId,
    //       sender: 'ChangeAI',
    //       text: content,
    //       savedBy: 'You',
    //     },
    //   ],
    // };
    //dispatch(addBookmark(bookmark));
    console.log('bookmarked: ' + messageId);
    await addBookmark({ workspaceId, folderId : folderId._id, chatId, messageId });
    // console.log('bookmarked ' + bookmark.bookmarkId);
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

  // useEffect(() => {
  //   document.addEventListener('mouseup', handleTextSelect);
  //   return () => {
  //     document.removeEventListener('mouseup', handleTextSelect);
  //   };
  // }, []);
  useEffect(() => {
    scrollToBottom();
  }, [chat]);
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

        {chat && chat.generalMessages.length > 0 ? (
          <div className="chat-scroll">
            {popupVisible && (
              <TonePopup
                onToneChange={handleToneChange}
                onResponseLengthChange={handleResponseLengthChange}
                HandleAskAi={HandleAskAi}
                onClose={handleClosePopup}
              />
            )}

            {chat && chat.generalMessages.map((message, index) => (
              <div
                key={index}
                ref={index === chat.generalMessages.length - 1 ? messagesEndRef : null}
              >
                <div>
                  {message && message.sender ? (
                    <div className="card">
                      <div>
                        <img src={UserPic} alt="avatar" />
                      </div>
                      <div>
                        <p className="Heading">You</p>
                        {/* <div className="msg">{item.content}</div> */}
                        {message.text && (
                          <div className="msg" data-message-id={message._id}>
                            <ReactMarkdown>{message.text}</ReactMarkdown>
                          </div>
                        )}
                        {message.file && (
                          <div className="file-preview">
                            <a
                              href={message.file}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {message.fileName}
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
                      <div className="header">
                        <img src={AiPic} alt="avatar" className="avatar" />
                        <p className="heading">ChangeAI</p>
                        {message && (
                          <div className="msg" data-message-id={message._id}>
                            <ReactMarkdown>{message.text}</ReactMarkdown>
                          </div>
                        )}
                      </div>
                      <div className="message-action-icons">
                        <div className="message-icon-wrapper">
                          <FaCopy
                            onClick={() => handleAddBookmark(message._id)}
                            style={{ cursor: 'pointer' }}
                          />
                          <span className="tooltip-assessment">Copy</span>
                        </div>
                        <div className="message-icon-wrapper">
                          <FaThumbsUp />
                          <span className="tooltip-assessment">Like</span>
                        </div>
                        <div className="message-icon-wrapper">
                          <FaThumbsDown />
                          <span className="tooltip-assessment">Dislike</span>
                        </div>
                        <div className="message-icon-wrapper">
                          <FaCommentAlt
                            data-message-id={message._id}
                            onClick={handleCommentClick}
                            style={{ cursor: 'pointer' }}
                          />
                          <span className="tooltip-assessment">Comment</span>
                        </div>
                        <div className="message-icon-wrapper">
                          <FaSync />
                          <span className="tooltip-assessment">Regenerate</span>
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
            {/* <div
              className="file-upload"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="file-upload-icon">
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
            </div> */}
            <div className="chat-screen-logo">
              <img src={logo} alt="Change ai Logo" />
            </div>
            <div className="data-map">
              {Example.map(({ question, iconName, style }, index) => (
                <div
                  key={index}
                  className="data-map-item"
                  onClick={() => setText(question)}
                >
                  {renderIcon(iconName, style)}
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
      {showCommentPopup && (
        <CommentPopup
          onClose={() => setShowCommentPopup(false)}
          workspaceId={workspaceId}
          folderId={folderId._id}
          chatId={chatId}
          messageId={messageId}
        />
      )}
      <style>{` .msg {
      margin: 1rem 0;
      font-size: 1rem;
    }
    .message-action-icons {
      display: flex;
      // gap: 0.5rem;
    }
    .message-icon-wrapper {
      position: relative;
      cursor: pointer;
      font-size: 1.2rem;
    }
    .message-icon-wrapper:hover .tooltip-assessment {
         opacity: 1;
      visibility: visible;
      transform: translateY(-5px);
    }
    .tooltip-assessment {
   position: absolute;
      top: -2.5rem;
      left: 50%;
      transform: translateX(-50%);
      background-color: black;
      color: #fff;
      padding: 0.5rem 0.6rem;
      border-radius: 4px;
      font-size: 1.2rem;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }`}</style>
    </div>
  );
};

export default MessagesSection;
