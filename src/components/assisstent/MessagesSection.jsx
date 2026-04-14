import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
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
import remarkGfm from 'remark-gfm';
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
import useExplain from '../../hooks/AiFeatureHooks/useExplain.js';
import config from '../../config/config.js';
import UserAvatar from '../common/UserAvatar';

const MessagesSection = ({ setCurrentChat }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const currentWorkspace = useSelector(selectWorkspace);
  const workspaceId = currentWorkspace?.id;
  const selectedFolder = useSelector(selectSelectedFolder);
  const chatId = useSelector((state) => state.workspaces.currentChatId);
  const [messageId, setMessageId] = useState();

  // Ensure folderId belongs to the current workspace — fall back to active/first folder if stale
  const folderId = (() => {
    const selId = selectedFolder?._id || selectedFolder?.id;
    const belongsToWorkspace = currentWorkspace?.folders?.some(
      (f) => (f._id || f.id) === selId
    );
    if (selId && belongsToWorkspace) return selectedFolder;
    const fallback = currentWorkspace?.folders?.find((f) => f.isActive) || currentWorkspace?.folders?.[0];
    return fallback || selectedFolder;
  })();
  const currentFolder = folderId;
  const currentChat = useSelector(selectCurrentChat);


  const [file, setFile] = useState([]);
  const [text, setText] = useState('');
  const [pendingSuggestionSend, setPendingSuggestionSend] = useState(false);
  const [userProfilePhoto, setUserProfilePhoto] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      setUserProfilePhoto(parsedUser?.photoPath || null);
      setUserName(
        [parsedUser?.firstName || parsedUser?.first_name, parsedUser?.lastName || parsedUser?.last_name]
          .filter(Boolean).join(' ') || parsedUser?.name || parsedUser?.email || ''
      );
    } catch {
      setUserProfilePhoto(null);
      setUserName('');
    }
  }, []);

  const resolvedFolderId = folderId?._id || folderId?.id;
  const { data: chat, refetch: rawRefetch, isLoading: isChatLoading, isFetching: isChatFetching } = useGetChatQuery({
    workspaceId,
    folderId: resolvedFolderId,
    chatId,
  }, { skip: !workspaceId || !resolvedFolderId || !chatId });

  // Safe refetch that doesn't throw when query is skipped
  const refetch = () => {
    try { if (chatId) rawRefetch(); } catch (e) { /* query not active */ }
  };

  useEffect(() => {
    if (chat && (chat?._id || chat?.id)) {
      setCurrentChat(chat);
    }
  }, [chat]);

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
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [replyingCommentId, setReplyingCommentId] = useState(null);

  const { fixGrammar } = useGrammarFix();
  const { improveWriting } = useImproveWriting();
  const { summarize } = useSummarize();
  const { ChangeToneFun } = useChangeTone();
  const { comprehensiveWriting } = useComprehensive();
  const { autoWritingFnc } = useAuto();
  const { shortText } = useShorter();
  const { LongText } = useLonger();
  const { error, chatWithdoc } = useChat();
  const { handleInspire } = useInspire();
  // Translation removed — feature not needed
  const { Explain } = useExplain();
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
  //.then((response);

  // setChatContent('');
  //   } catch (error) {
  //   }
  // };

  // Memoize HandleAskAi function

  // // Memoize applyFixedText function
  // const applyFixedText = useCallback(
  //   (newText) => {
  //     const updatedChat = chat.map((message) => {
  //       if (message.text) {
  //         return {
  //           ...message,
  //           text: message.text.replace(selectedText, newText),
  //         };
  //       }
  //       return message;
  //     });
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
      try {
        // Update the specific message by ID via PUT endpoint
        if (messageId) {
          await updateMessage({
            workspaceId,
            folderId: folderId?._id || folderId?.id,
            chatId,
            messageId,
            message: { text: newText },
          });
        }
        // Refetch the chat to get the latest data from the server
        await refetch();
      } catch (error) {
        import.meta.env.DEV && console.error('Failed to update message:', error);
      }

      setPopupVisible(false);
    },
    [messageId, updateMessage, workspaceId, folderId, chatId, refetch]
  );

  useEffect(() => {
    const handleMouseUp = (e) => {
      // Don't close popup when clicking inside TonePopup
      const popup = document.querySelector('.PopupBox');
      if (popup && popup.contains(e.target)) return;
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
        setMessageId(selectedMessageId);
      }
    } else {
      setPopupVisible(false); // Hide popup if selection is invalid
    }
  };

  const HandleAskAi = async (value) => {
    const textToProcess = selectedText;
    if (!textToProcess) return;
    try {
      setLoading(true);
      setAskAI(value);
      setPopupVisible(false);

      let response;
      if (value === 'Fix Spelling & Grammar') {
        response = await fixGrammar(textToProcess);
      } else if (value === 'Improve Writing') {
        response = await improveWriting(textToProcess);
      } else if (value === 'Summarize') {
        response = await summarize(textToProcess);
      } else if (value === 'Explain This') {
        response = await Explain(textToProcess);
      }

      if (response) {
        await applyFixedText(response);
        refetch();
      }
    } catch (error) {
      import.meta.env.DEV && console.error('HandleAskAi error:', error);
    } finally {
      setLoading(false);
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
        await applyFixedText(response);
      }
    } catch (error) {
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

  // Auto-send when suggestion card is clicked
  useEffect(() => {
    if (pendingSuggestionSend && text.trim()) {
      setPendingSuggestionSend(false);
      handleSendMessage();
    }
  }, [pendingSuggestionSend, text]);

  const handleSendMessage = async () => {
    if (!text.trim() && !file) return;

    setLoading(true);
    try {
      const currentFolderId = folderId._id || folderId.id;
      const currentChatId = chatId ? chatId : 'newChat';
      const messageText = text || (file ? 'Please analyze this document' : '');

      let data;
      if (file && file instanceof File) {
        // Use direct fetch for file uploads — RTK Query FormData is unreliable
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('text', messageText);
        formData.append('pdfPath', file);

        const response = await fetch(
          `${config.apiURL}/workspace/${workspaceId}/folder/${currentFolderId}/chat/${currentChatId}/message`,
          {
            method: 'PATCH',
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
          }
        );
        data = await response.json();
      } else {
        // No file — use RTK Query as normal
        data = await addMessage({
          workspaceId: workspaceId,
          folderId: currentFolderId,
          chatId: currentChatId,
          message: messageText,
          files: null,
        }).unwrap();
      }

      if (!chatId && data?.success) {
        const newChatId = data.chat?._id || data.chat?.id;
        if (newChatId) {
          dispatch(setCurrentChatId(newChatId));
          navigate(`/assistant/chat/${newChatId}`, { replace: true });
        }
        dispatch(
          getChatsAsync({
            workspaceId: currentWorkspace.id,
            folderId: currentFolderId,
          })
        )
          .then((response) => {
            dispatch(setChats(response.payload.data));
          })
          .catch((error) => {});
      }
      refetch();
      setText('');
      setFile(null);
    } catch (error) {
      import.meta.env.DEV && console.error('Send message error:', error);
    } finally {
      setLoading(false);
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
      const lastMessage = lastChat?.[lastChat.length - 1]?.text;

      if (lastMessage) {
        // Use the last message for inspiration
        const inspiredText = await handleInspire(lastMessage);

        setFirstPrompt(inspiredText);
        setText(inspiredText);
        handleSendMessage();
      } else {
      }
    } catch (error) {
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
    await likeChatMessage({
      workspaceId,
      folderId: folderId._id || folderId.id,
      chatId,
      messageId: message._id, // Send the whole bookmark data
    }).unwrap();
    refetch(); // Trigger the chat query to refetch
  };

  const handleDislikeMessage = async (message) => {
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
        {chatId && (isChatLoading || (isChatFetching && (!chat || (chat._id || chat.id) !== chatId))) ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <ScaleLoader color="#00316E" />
          </div>
        ) : chatId && chat && chat.generalMessages.length > 0 ? (
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
                      message && (message.sender || message.from) === 'user'
                        ? 'chat-container-assisstant right'
                        : 'chat-container-assisstant left'
                    }
                  >
                    {message && (message.sender || message.from) === 'user' ? (
                      <div className="card user-card">
                        <div className="user-avatar">
                          <UserAvatar
                            src={userProfilePhoto}
                            name={userName}
                            size={50}
                            imgClassName="avatar"
                          />
                        </div>
                        <div className="user-message">
                          {/*<p className="heading">You</p>*/}
                          {message.text && (
                            <div className="msg" data-message-id={message._id}>
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
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
                          <UserAvatar
                            src={AiPic}
                            name="AI Assistant"
                            size={50}
                            imgClassName="avatar"
                          />
                        </div>
                        <div className="ai-message">
                          {message && (
                            <div className="msg" data-message-id={message._id}>
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
                            </div>
                          )}
                          {message.comments && message.comments.length > 0 && (
                            <div style={{ marginTop: '0.5rem', borderTop: '1px solid #eee', paddingTop: '0.5rem' }}>
                              {message.comments.map((c, ci) => (
                                <div key={ci} style={{
                                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                                  padding: '0.3rem 0', fontSize: '0.85rem', color: '#666',
                                  position: 'relative',
                                  group: 'comment',
                                }}>
                                  <FaCommentAlt style={{ fontSize: '0.65rem', color: '#aaa' }} />
                                  {editingCommentId === (c._id || c.id) ? (
                                    <input
                                      autoFocus
                                      defaultValue={c.text}
                                      onKeyDown={async (e) => {
                                        if (e.key === 'Enter') {
                                          const token = localStorage.getItem('token');
                                          const msgId = c.messageId || c.message_id || message._id;
                                          await fetch(`${config.apiURL}/workspace/${workspaceId}/folder/${resolvedFolderId}/chat/${chatId}/message/${msgId}/comment/${c._id || c.id}`, {
                                            method: 'PATCH',
                                            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                                            body: JSON.stringify({ text: e.target.value }),
                                          });
                                          setEditingCommentId(null);
                                          refetch();
                                        }
                                        if (e.key === 'Escape') setEditingCommentId(null);
                                      }}
                                      onBlur={() => setEditingCommentId(null)}
                                      style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '2px 6px', fontSize: '0.85rem', flex: 1 }}
                                    />
                                  ) : (
                                    <>
                                      <span style={{ fontWeight: 600, color: '#555' }}>{c.userName || c.user_name || 'You'}:</span>
                                      <span style={{ flex: 1 }}>{c.text}</span>
                                      <span
                                        style={{ cursor: 'pointer', fontSize: '0.75rem', color: '#007bff', marginLeft: '0.5rem' }}
                                        onClick={() => setEditingCommentId(c._id || c.id)}
                                      >Edit</span>
                                      <span
                                        style={{ cursor: 'pointer', fontSize: '0.75rem', color: '#c00', marginLeft: '0.3rem' }}
                                        onClick={async () => {
                                          const token = localStorage.getItem('token');
                                          const msgId = c.messageId || c.message_id || message._id;
                                          await fetch(`${config.apiURL}/workspace/${workspaceId}/folder/${resolvedFolderId}/chat/${chatId}/message/${msgId}/comment/${c._id || c.id}`, {
                                            method: 'DELETE',
                                            headers: { Authorization: `Bearer ${token}` },
                                          });
                                          refetch();
                                        }}
                                      >Delete</span>
                                      <span
                                        style={{ cursor: 'pointer', fontSize: '0.75rem', color: '#28a745', marginLeft: '0.3rem' }}
                                        onClick={() => setReplyingCommentId(c._id || c.id)}
                                      >Reply</span>
                                    </>
                                  )}
                                  {c.replies && c.replies.length > 0 && (
                                    <div style={{ marginLeft: '1.5rem', borderLeft: '2px solid #eee', paddingLeft: '0.5rem', marginTop: '0.2rem' }}>
                                      {c.replies.map((r, ri) => (
                                        <div key={ri} style={{ fontSize: '0.8rem', color: '#777', padding: '0.15rem 0' }}>
                                          <span style={{ fontWeight: 600, color: '#555' }}>{r.userName || r.user_name || 'User'}:</span>{' '}
                                          <span>{r.text}</span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  {replyingCommentId === (c._id || c.id) && (
                                    <div style={{ display: 'flex', gap: '0.3rem', marginTop: '0.3rem', marginLeft: '1.5rem', width: '100%' }}>
                                      <input
                                        autoFocus
                                        placeholder="Write a reply... (Enter to send)"
                                        onKeyDown={async (e) => {
                                          if (e.key === 'Enter' && e.target.value.trim()) {
                                            const val = e.target.value;
                                            e.target.disabled = true;
                                            try {
                                              const token = localStorage.getItem('token');
                                              const msgId = c.messageId || c.message_id || message._id;
                                              await fetch(`${config.apiURL}/workspace/${workspaceId}/folder/${resolvedFolderId}/chat/${chatId}/message/${msgId}/comment/${c._id || c.id}/reply`, {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                                                body: JSON.stringify({ text: val }),
                                              });
                                              setReplyingCommentId(null);
                                              refetch();
                                            } catch (err) {
                                              e.target.disabled = false;
                                            }
                                          }
                                          if (e.key === 'Escape') setReplyingCommentId(null);
                                        }}
                                        style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '4px 8px', fontSize: '0.85rem', flex: 1 }}
                                      />
                                      <span
                                        style={{ cursor: 'pointer', fontSize: '0.75rem', color: '#999', alignSelf: 'center' }}
                                        onClick={() => setReplyingCommentId(null)}
                                      >Cancel</span>
                                    </div>
                                  )}
                                </div>
                              ))}
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
                  onClick={() => { setText(question); setPendingSuggestionSend(true); }}
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
          <div
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
          </div>

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
              padding: '1rem',
              fontSize: '14px',
              fontFamily: 'Arial, sans-serif',
              boxSizing: 'border-box',
              outline: 'none',
            }}
            rows={1} // Initial row
          />
          <div className="icons" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <label htmlFor="file-input" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <IoAttach size={20} color="#888" title="Attach file" />
            </label>
            <IoSend
              onClick={handleSendMessage}
              className="send-icon"
              color="#c3e11d"
              size={20}
            />
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
          folderId={resolvedFolderId}
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
