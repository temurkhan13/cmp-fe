import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '@styles/chat/ChatMessage.scss';
import {
  FaCopy,
  FaThumbsUp,
  FaThumbsDown,
  FaSync,
  FaCommentAlt,
} from 'react-icons/fa';
import { IoAttach, IoSend } from 'react-icons/io5';
import { FaBookmark } from 'react-icons/fa6';
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
import {
  useDislikeChatMessageMutation,
  useGetWorkspacesQuery,
  useLikeChatMessageMutation,
  useRemoveBookmarkMutation,
  useUpdateChatMutation,
} from '../../redux/api/workspaceApi';
import { FaUser } from 'react-icons/fa';

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
// import { addBookmark } from '../../../redux/slices/workspaceSlice';

import * as FaIcons from 'react-icons/fa';
// import { v4 as uuidv4 } from 'uuid';
import { deleteBookmark, setChats } from '../../redux/slices/chatSlice';
import { getChatsAsync } from '../../redux/slices/workspaceSlice';
import {
  selectWorkspace,
  setCurrentChatId,
} from '../../redux/slices/workspacesSlice';
import { selectSelectedFolder } from '../../redux/slices/folderSlice.js';
import useInspire from '../../hooks/AiFeatureHooks/useInspire.js';

const MessagesSection = ({ setCurrentChat }) => {
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
  const [updateChat] = useUpdateChatMutation();
  const [addBookmark] = useAddBookmarkMutation();
  const [removeBookmark] = useRemoveBookmarkMutation();
  // const [likeChatMessage,dislikeChatMessage] = useLikeDislikeChatMutation()
  const [likeChatMessage] = useLikeChatMessageMutation();
  const [dislikeChatMessage] = useDislikeChatMessageMutation();
  const userId = useSelector((state) => state.auth.user?.id);
  const { data: workspaces } = useGetWorkspacesQuery(userId);
  const workspaceId = useSelector(
    (state) => state.workspaces.currentWorkspaceId
  );
  const folderId = useSelector(selectSelectedFolder);
  const chatId = useSelector((state) => state.workspaces.currentChatId);
  const [messageId, setMessageId] = useState();
  const currentWorkspace = useSelector(selectWorkspace);
  const currentFolder = useSelector(selectSelectedFolder);
  const currentChat = useSelector(selectCurrentChat);

  useEffect(() => {}, [currentFolder, currentChat, currentWorkspace]);

  const [file, setFile] = useState([]);
  const [text, setText] = useState('');
  const [userProfilePhoto, setUserProfilePhoto] = useState(UserPic);

  useEffect(() => {
    const getUserProfilePhoto = async () => {
      try {
        const storedUser = await localStorage.getItem('user');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        const userPhoto = parsedUser?.photoPath;

        // Set profile photo, fallback to default if no photo is found
        setUserProfilePhoto(userPhoto ? userPhoto : UserPic);
      } catch (error) {
        console.error('Failed to fetch user photo from localStorage', error);
        setUserProfilePhoto(UserPic); // Fallback to default image in case of error
      }
    };

    getUserProfilePhoto();
  }, []);

  const { data: chat, refetch } = useGetChatQuery({
    workspaceId,
    folderId: folderId?._id || folderId?.id,
    chatId,
  });

  useEffect(() => {
    if (chat && chat?._id) {
      setCurrentChat(chat);
    }
  }, [chat]);
  // console.log(chat);

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
  console.debug(selectedTone, responseLength, askAi, chatWithdoc);
  const { handleInspire } = useInspire();
  const [firstPrompt, setFirstPrompt] = useState('');

  const renderIcon = (iconName, style = {}) => {
    const IconComponent = FaIcons[iconName];
    return IconComponent ? <IconComponent style={style} /> : null;
  };

  useEffect(() => {
    if (chatId === null) {
      // setChat([]);
      return;
    }
    if (currentChat) {
      // console.log(currentChat);
      // setChat(currentChat.generalMessages || []);
      // console.log('chat Messages: ' + currentChat.generalMessages);
      // console.log('chat: ' + chat);
    }
    // if(chatId === null){
    //   setChat([]);
    // }
  }, [currentChat, chatId]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCommentClick = (event) => {
    event.stopPropagation();
    const messageId = event.currentTarget.getAttribute('data-message-id');
    setMessageId(messageId);
    setShowCommentPopup((prev) => !prev);
    setAskAI(false);
    setPopupVisible(false);
  };
  // const handleSendMessage = async () => {
  // e.preventDefault();
  // if (!workspaceId) {
  //   alert('Please select a workspace');
  //   return;
  // }
  // try {
  //   addMessage({
  //     workspaceId: workspaceId,
  //     folderId: folderId._id,
  //     chatId: chatId ? chatId : 'newChat',
  //     message: text,
  //     files: file,
  //   }).unwrap();
  //.then((response) => console.log('text: ', response));

  // setChatContent('');
  //   } catch (error) {
  //     console.error('Failed to add chat:', error);
  //   }
  // };

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
          await applyFixedText(response);
          refetch();
        }
      } catch (error) {
        console.error('Asi AI', error);
      } finally {
        setLoading(false);
      }
    },
    [fixGrammar, improveWriting, summarize, selectedText]
  );

  // // Memoize applyFixedText function
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
  //    // setChat(updatedChat);
  //    //  dispatch(updateMessage(workspaceId, folderId, chatId, messageId, message));
  //
  //     refetch()
  //
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
        console.log(updatedMessages, 'updatedMessages', chat);
        // Optionally dispatch an action or make an API call to update the message
        // await Promise.all(
        //   updatedMessages
        //     .filter((msg) => msg.text !== updatedMessages.text)
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
        console.log(workspaceId, folderId, chatId);
        updateChat({
          workspaceId,
          folderId: folderId.id || folderId._id,
          chatId,
          chat: { ...chat, generalMessages: updatedMessages },
        });
        // Refetch the chat to get the latest data from the server
        await refetch();
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
        // console.log(`Selected Message ID: ${selectedMessageId}`);
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

  const handleAddBookmark = async (message) => {
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

    const bookmark =
      chat &&
      chat.bookmarks?.filter(
        (bookmark) =>
          bookmark.messageId === message._id &&
          bookmark.userId === JSON.parse(localStorage.getItem('user')).id
      );

    if (bookmark && bookmark.length > 0) {
      await removeBookmark({
        workspaceId,
        folderId: folderId._id || folderId.id,
        chatId,
        messageId: message._id,
        bookmarkId: bookmark[0]._id, // Send the whole bookmark data
      }).unwrap();
    } else {
      await addBookmark({
        workspaceId,
        folderId: folderId._id || folderId.id,
        chatId,
        messageId: message._id, // Send the whole bookmark data
      }).unwrap();
    }

    // Dispatch action to add bookmark
    refetch(); // Trigger the chat query to refetch
  };

  const handleSendMessage = async () => {
    if (!text.trim()) return; // Prevent empty messages

    setLoading(true); // Show spinner
    try {
      console.log(folderId, 'folderrrr is here');
      // Simulate sending message
      const data = await addMessage({
        workspaceId: workspaceId,
        folderId: folderId._id || folderId.id,
        chatId: chatId ? chatId : 'newChat',
        message: text,
        files: file,
      }).unwrap();

      if (!chatId && data.success) {
        dispatch(
          getChatsAsync({
            workspaceId: currentWorkspace.id,
            folderId: folderId._id || folderId.id,
          })
        )
          .then((response) => {
            dispatch(setChats(response.payload.data));
            if (response.payload.data.length > 0) {
              dispatch(setCurrentChatId(response.payload.data[0]._id));
            }
          })
          .catch((error) => {
            console.error(error, 'error');
          });
      }
      // refetch();
      setText(''); // Clear input field after message sent
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setLoading(false); // Hide spinner after response
    }
  };

  const HandleEnterKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };
  // const handleInspireClick = async () => {
  //   //Todo: will implement Inspire
  //   // const currentQuestionKey = `question-${data.questionnaire.Questions[activeStep - 1].id}`;
  //   // const inspiredText = await handleInspire(answers[currentQuestionKey]);
  //   // setAnswers({
  //   //   ...answers,
  //   //   [currentQuestionKey]: inspiredText,
  //   // });
  // };

  const handleInspireClick = async () => {
    try {
      setLoading(true);
      // Check if chat and generalMessages are defined and not empty
      const lastChat = chat.generalMessages.filter(
        (message) => message.from == 'user'
      );
      console.log(lastChat, 'lastchat');
      const lastMessage = lastChat?.[lastChat.length - 1]?.text;

      if (lastMessage) {
        // Use the last message for inspiration
        const inspiredText = await handleInspire(lastMessage);

        setFirstPrompt(inspiredText);
        console.log(inspiredText, 'inspiredText');
        setText(inspiredText);
        handleSendMessage();
      } else {
        console.warn(
          'No general messages found or no text available in the last message.'
        );
      }
    } catch (error) {
      console.error('An error occurred in handleInspireClick:', error);
    } finally {
      setLoading(false);
    }
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

  const handleLikeClick = async (message) => {
    console.log(message, 'message');
    await likeChatMessage({
      workspaceId,
      folderId: folderId._id || folderId.id,
      chatId,
      messageId: message._id, // Send the whole bookmark data
    }).unwrap();
    refetch(); // Trigger the chat query to refetch
  };

  const handleDislikeMessage = async (message) => {
    console.log(message, 'message');
    console.log(JSON.parse(localStorage.getItem('user')).id);
    console.log(
      message?.reactions?.some(
        (react) => react.user == JSON.parse(localStorage.getItem('user')).id
      ),
      'message'
    );
    await dislikeChatMessage({
      workspaceId,
      folderId: folderId._id || folderId.id,
      chatId,
      messageId: message._id, // Send the whole bookmark data
    }).unwrap();
    refetch(); // Trigger the chat query to refetch
  };

  const handleCopyMessage = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="chat-message-wrapper">
      <ScaleLoader color={'#000000'} loading={loading} size={150} />

      <div className="chat-message">
        <input
          type="file"
          id="file-input"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          multiple
        />
        {chatId && chat && chat.generalMessages.length > 0 ? (
          <div className="chat-scroll">
            {popupVisible && (
              <TonePopup
                onToneChange={handleToneChange}
                onResponseLengthChange={handleResponseLengthChange}
                HandleAskAi={HandleAskAi}
                onClose={handleClosePopup}
              />
            )}

            {chat &&
              chat.generalMessages.map((message, index) => (
                <div
                  key={index}
                  ref={
                    index === chat.generalMessages.length - 1
                      ? messagesEndRef
                      : null
                  }
                >
                  <div
                    className={
                      message && message.sender
                        ? 'chat-container-assisstant right'
                        : 'chat-container-assisstant left'
                    }
                  >
                    {message && message.sender ? (
                      <div className="card user-card">
                        <div className="user-avatar">
                          <img
                            src={
                              userProfilePhoto ||
                              'https://avatar.iran.liara.run/public/boy?username=Ash'
                            }
                            alt="avatar"
                            onError={(e) =>
                              (e.target.src =
                                'https://avatar.iran.liara.run/public/boy?username=Ash')
                            }
                          />
                          {/*<FaUser />*/}
                        </div>
                        <div className="user-message">
                          {/*<p className="heading">You</p>*/}
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
                          {/*<div className="edit-icon">*/}
                          {/*  <LuPencil />*/}
                          {/*</div>*/}
                        </div>
                        <div className="message-action-icons">
                          <div
                            className="message-icon-wrapper"
                            title="Copy"
                            onClick={() => handleCopyMessage(message.text)}
                          >
                            <FaCopy style={{ cursor: 'pointer' }} />
                            <span className="tooltip-assessment">Copy</span>
                          </div>
                          <div
                            className="message-icon-wrapper"
                            title="Like"
                            onClick={() => handleLikeClick(message)}
                          >
                            <FaThumbsUp
                              style={
                                message?.reactions?.some(
                                  (react) =>
                                    react.user ==
                                      JSON.parse(localStorage.getItem('user'))
                                        .id && react.type == 'like'
                                )
                                  ? { color: '#c1de1c' }
                                  : {}
                              }
                            />
                            <span className="tooltip-assessment">Like</span>
                          </div>
                          <div
                            className="message-icon-wrapper"
                            title="Dislike"
                            onClick={() => handleDislikeMessage(message)}
                          >
                            <FaThumbsDown
                              style={
                                message?.reactions?.some(
                                  (react) =>
                                    react.user ==
                                      JSON.parse(localStorage.getItem('user'))
                                        .id && react.type == 'dislike'
                                )
                                  ? { color: '#c1de1c' }
                                  : {}
                              }
                            />
                            <span className="tooltip-assessment">Dislike</span>
                          </div>
                          {/*<div className="message-icon-wrapper" title="Comment">*/}
                          {/*  <FaCommentAlt*/}
                          {/*    data-message-id={message._id}*/}
                          {/*    onClick={handleCommentClick}*/}
                          {/*    style={{ cursor: 'pointer' }}*/}
                          {/*  />*/}
                          {/*  <span className="tooltip-assessment">Comment</span>*/}
                          {/*</div>*/}
                          {/*<div className="message-icon-wrapper" title="Regenerate">*/}
                          {/*  <FaSync />*/}
                          {/*  <span className="tooltip-assessment">Regenerate</span>*/}
                          {/*</div>*/}
                          <div
                            className="message-icon-wrapper"
                            title="Bookmark"
                          >
                            <FaBookmark
                              onClick={() => handleAddBookmark(message)}
                              style={
                                chat.bookmarks?.some(
                                  (bookmark) =>
                                    bookmark.messageId === message._id &&
                                    bookmark.userId ===
                                      JSON.parse(localStorage.getItem('user'))
                                        .id
                                )
                                  ? { color: '#c1de1c' }
                                  : {}
                              }
                            />
                            <span className="tooltip-assessment">Bookmark</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="card ai-card">
                        <div className="ai-avatar">
                          <img
                            src={AiPic || 'https://via.placeholder.com/50'}
                            alt="avatar"
                            className="avatar"
                            onError={(e) =>
                              (e.target.src = 'https://via.placeholder.com/50')
                            }
                          />
                        </div>
                        <div className="ai-message">
                          {message && (
                            <div className="msg" data-message-id={message._id}>
                              <ReactMarkdown>{message.text}</ReactMarkdown>
                            </div>
                          )}
                        </div>
                        <div className="message-action-icons">
                          <div
                            className="message-icon-wrapper"
                            title="Copy"
                            onClick={() => handleCopyMessage(message.text)}
                          >
                            <FaCopy style={{ cursor: 'pointer' }} />
                            <span className="tooltip-assessment">Copy</span>
                          </div>
                          <div
                            className="message-icon-wrapper"
                            title="Like"
                            onClick={() => handleLikeClick(message)}
                          >
                            <FaThumbsUp
                              style={
                                message?.reactions?.some(
                                  (react) =>
                                    react.user ==
                                      JSON.parse(localStorage.getItem('user'))
                                        .id && react.type == 'like'
                                )
                                  ? { color: '#c1de1c' }
                                  : {}
                              }
                            />
                            <span className="tooltip-assessment">Like</span>
                          </div>
                          <div
                            className="message-icon-wrapper"
                            title="Dislike"
                            onClick={() => handleDislikeMessage(message)}
                          >
                            <FaThumbsDown
                              style={
                                message?.reactions?.some(
                                  (react) =>
                                    react.user ==
                                      JSON.parse(localStorage.getItem('user'))
                                        .id && react.type == 'dislike'
                                )
                                  ? { color: '#c1de1c' }
                                  : {}
                              }
                            />
                            <span className="tooltip-assessment">Dislike</span>
                          </div>
                          <div className="message-icon-wrapper" title="Comment">
                            <FaCommentAlt
                              data-message-id={message._id}
                              onClick={handleCommentClick}
                              style={{ cursor: 'pointer' }}
                            />
                            <span className="tooltip-assessment">Comment</span>
                          </div>
                          {/* <div
                            className="message-icon-wrapper"
                            title="Regenerate"
                          >
                            <FaSync />
                            <span className="tooltip-assessment">
                              Regenerate
                            </span>
                          </div> */}
                          <div
                            className="message-icon-wrapper"
                            title="Bookmark"
                          >
                            <FaBookmark
                              onClick={() => handleAddBookmark(message)}
                              style={
                                chat.bookmarks?.some(
                                  (bookmark) =>
                                    bookmark.messageId === message._id &&
                                    bookmark.userId ===
                                      JSON.parse(localStorage.getItem('user'))
                                        .id
                                )
                                  ? { color: '#c1de1c' }
                                  : {}
                              }
                            />
                            <span className="tooltip-assessment">Bookmark</span>
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
        <div className="input-container" style={{ position: 'relative' }}>
          {/* <div
            style={{
              position: 'absolute',
              bottom: '13px',
              right: '99%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {!loading ? (
              <img
                src={InpireMeIcon}
                alt="Inspire Me"
                onClick={handleInspireClick}
              />
            ) : (
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
          </div> */}

          <textarea
            placeholder="Enter text here.."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(); // Send message on Enter
              }
            }}
            onInput={(e) => {
              e.target.style.height = 'auto'; // Reset height
              e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height
            }}
            style={{
              resize: 'none',
              overflowY: 'auto',
              height: 'auto',
              maxHeight: '150px', // Set maximum height before scroll
              width: '100%', // Full width of the container
              border: 'none',
              borderRadius: '10px',
              padding: '15px 12px',
              fontSize: '14px',
              fontFamily: 'Arial, sans-serif',
              boxSizing: 'border-box',
              outline: 'none',
            }}
            rows={1} // Initial row
          />
          <div className="icons">
            <IoSend onClick={handleSendMessage} className="send-icon" />
          </div>
        </div>
      </div>
      {showCommentPopup && (
        <CommentPopup
          onClose={() => {
            setShowCommentPopup(false);
            refetch();
          }}
          workspaceId={workspaceId}
          folderId={folderId._id || folderId.id}
          chatId={chatId}
          messageId={messageId}
        />
      )}
      <style>{`
 .msg {
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

// Define prop types for validation
MessagesSection.propTypes = {
  setCurrentChat: PropTypes.func.isRequired, // Validate that it's a required function
};

// Optionally, define defaultProps if needed
MessagesSection.defaultProps = {
  setCurrentChat: () => {}, // Default no-op function if none is passed
};

export default MessagesSection;
