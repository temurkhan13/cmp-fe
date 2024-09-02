import { useState, useEffect } from 'react';
import '@styles/chat/ChatMessage.scss';
import { LuPencil } from 'react-icons/lu';
import {
  FaCopy,
  FaThumbsUp,
  FaThumbsDown,
  FaSync,
  FaCommentAlt,
} from 'react-icons/fa';
import { IoAttach, IoSend } from 'react-icons/io5';
import { FaFile } from 'react-icons/fa6';
import InpireMeIcon from '../../../assets/inspireBtn.svg';
import UserPic from '@assets/chat/user.png';
import AiPic from '@assets/dashboard/sidebarLogo.png';
import { Example } from '@utils';
import fileIcon from '@assets/dashboard/fileIcon.png';
import TonePopup from './TonePopup';
import CommentPopup from './CommentPopup';
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

import {
  addMessage,
  updateMessage,
  addBookmark,
} from '../../../redux/slices/workspaceSlice'; // Adjusted import

import { useAddMessageMutation, useUpdateMessageMutation, useRemoveMessageMutation, useAddBookmarkMutation } from '../../../redux/api/workspaceApi';
import { selectCurrentChat } from '../../../redux/selectors/selectors';


import { v4 as uuidv4 } from 'uuid';

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
   const workspaceId = useSelector((state) => state.workspaces.currentWorkspaceId);
   const folderId = useSelector((state) => state.workspaces.currentFolderId);
   const chatId = useSelector((state) => state.workspaces.currentChatId);
   
   const currentChat = useSelector(selectCurrentChat);

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

  
  useEffect(() => {
    if(chatId === null){
      setChat([]);
      return;
    }
    if (currentChat) {
      console.log(currentChat);
      setChat(currentChat.generalMessages || []);
      console.log("chat Messages: " + currentChat.generalMessages);
      console.log("chat: " + chat);
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
  const handleSendMessage = async() => {

    
    // e.preventDefault();
     if (!workspaceId) {
       alert('Please select a workspace');
       return;
     }
     try {
       await addMessage({ workspaceId: workspaceId, folderId: folderId, chatId:(chatId?chatId:"newChat"), message:text, files:file }).unwrap();
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
const applyFixedText = useCallback((newText) => {
  const updatedChat = chat.map((message) => {
   // console.log(message);
    if (message.content) {
      return {
        ...message,
        content: message.content.replace(selectedText, newText),
      };
    }
    return message;
  });
  console.log("chatttt :"+ chat);
  setChat(updatedChat);
//  dispatch(updateMessage(updatedChat));

  setPopupVisible(false);
}, [chat, selectedText, dispatch, workspaceId, chatId]);

  // const adjustSelectionToWordBoundaries = () => {
  //   const selection = window.getSelection();
  //   if (selection.rangeCount > 0) {
  //     const range = selection.getRangeAt(0);

  //     // Adjust start boundary
  //     let startOffset = range.startOffset;
  //     let endOffset = range.endOffset;
  //     const startContainer = range.startContainer;

  //     while (
  //       startOffset > 0 &&
  //       !/\s/.test(startContainer.textContent[startOffset - 1])
  //     ) {
  //       startOffset--;
  //     }

  //     // Adjust end boundary
  //     while (
  //       endOffset < startContainer.textContent.length &&
  //       !/\s/.test(startContainer.textContent[endOffset])
  //     ) {
  //       endOffset++;
  //     }

  //     range.setStart(startContainer, startOffset);
  //     range.setEnd(startContainer, endOffset);
  //   }
  // };

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
  
    messageElements.forEach((msgElement) => {
      // Check if the selected text starts from within the msgElement
      if (msgElement.contains(selection.anchorNode) && msgElement.contains(selection.focusNode)) {
        isValidSelection = true;
      }
    });
  
    // Set the popup visibility and selection state based on isValidSelection
    if (isValidSelection) {
      setSelectedText(selectedText);
      setPopupVisible(!!selectedText); // Show popup if there's a valid selection
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

  // useEffect(() => {
  //   document.addEventListener('mouseup', handleTextSelect);
  //   return () => {
  //     document.removeEventListener('mouseup', handleTextSelect);
  //   };
  // }, []);

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

            

{chat.map((message, index) => (
              <div key={index}>
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
                          <div className="msg">
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
                      <div>
                        <img src={AiPic} alt="avatar" />
                      </div>
                      <div>
                        <p className="Heading">ChangeAI</p>
                        {message && (
                          <div className="msg">
                            <ReactMarkdown>{message.text}</ReactMarkdown>
                          </div>
                        )}
                        <div>
                        <FaCopy
                         onClick={() => handleAddBookmark(message.text, message._Id)}
                         style={{ cursor: 'pointer' }}
                         />
                          <FaThumbsUp />
                          <FaThumbsDown />

                          <FaSync
                          onClick={handleCommentClick}
                          style={{ cursor: 'pointer' }}
                            />       
                          
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
      {showCommentPopup && (
        <CommentPopup onClose={() => setShowCommentPopup(false)} />
      )}
    </div>
  );
};

export default MessagesSection;
