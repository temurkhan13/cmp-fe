import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/axios';
import '../assessment/chat-message.scss';
import './assistant.scss';
import '../assessment/assessment.scss';
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
import Button from '../common/Button';
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
import { setChats, getChatsAsync } from '../../redux/slices/chatSlice';
import {
  selectWorkspace,
  setCurrentChatId,
} from '../../redux/slices/workspacesSlice';
import { selectSelectedFolder } from '../../redux/slices/folderSlice.js';
import useInspire from '../../hooks/AiFeatureHooks/useInspire.js';
import useExplain from '../../hooks/AiFeatureHooks/useExplain.js';
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
  const refetch = async () => {
    try { if (chatId) await rawRefetch(); } catch (e) { /* query not active */ }
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
        contextType: 'chat',
        contextId: chatId,
        messageId: message._id,
        bookmarkId: bookmark[0]._id,
      }).unwrap();
    } else {
      await addBookmark({
        workspaceId,
        folderId: folderId._id || folderId.id,
        contextType: 'chat',
        contextId: chatId,
        messageId: message._id,
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
        const formData = new FormData();
        formData.append('text', messageText);
        formData.append('pdfPath', file);

        const response = await apiClient.patch(
          `/workspace/${workspaceId}/folder/${currentFolderId}/chat/${currentChatId}/message`,
          formData,
        );
        data = response.data;
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
          .catch((error) => { });
      }
      setText('');
      setFile(null);
      await refetch();
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
      contextType: 'chat',
      contextId: chatId,
      messageId: message._id,
    }).unwrap();
    refetch();
  };

  const handleDislikeMessage = async (message) => {
    await dislikeChatMessage({
      workspaceId,
      folderId: folderId._id || folderId.id,
      contextType: 'chat',
      contextId: chatId,
      messageId: message._id,
    }).unwrap();
    refetch();
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
          className="msg-file-input-hidden"
          multiple
        />
        {chatId && (isChatLoading || (isChatFetching && (!chat || (chat._id || chat.id) !== chatId))) ? (
          <div className="asst-loading-center" style={{ height: '100%' }}>
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
                        ? 'chat-container-assistant right'
                        : 'chat-container-assistant left'
                    }
                  >
                    {message && (message.sender || message.from) === 'user' ? (
                      <div className="card chat-card user-card">
                        <div className="user-avatar">
                          <UserAvatar
                            src={userProfilePhoto}
                            name={userName}
                            size={50}
                            imgClassName="avatar"
                            style={{ backgroundColor: '#C3E11D' }}
                            initialsStyle={{ color: '#0B1444' }}
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
                            <FaCopy className="cursor-pointer" />
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
                      <div className="card chat-card ai-card">
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
                            <div className="asst-comment-section">
                              {message.comments.map((c, ci) => (
                                <div key={ci} className="asst-comment-item">
                                  <FaCommentAlt className="asst-comment-icon" />
                                  {editingCommentId === (c._id || c.id) ? (
                                    <input
                                      autoFocus
                                      defaultValue={c.text}
                                      onKeyDown={async (e) => {
                                        if (e.key === 'Enter') {
                                          const msgId = c.messageId || c.message_id || message._id;
                                          await apiClient.patch(`/workspace/${workspaceId}/folder/${resolvedFolderId}/chat/${chatId}/message/${msgId}/comment/${c._id || c.id}`, { text: e.target.value });
                                          setEditingCommentId(null);
                                          refetch();
                                        }
                                        if (e.key === 'Escape') setEditingCommentId(null);
                                      }}
                                      onBlur={() => setEditingCommentId(null)}
                                      className="asst-comment-input"
                                    />
                                  ) : (
                                    <>
                                      <span className="asst-comment-user">{c.userName || c.user_name || 'You'}:</span>
                                      <span className="asst-comment-text">{c.text}</span>
                                      <span
                                        className="asst-comment-action asst-comment-action--edit"
                                        onClick={() => setEditingCommentId(c._id || c.id)}
                                      >Edit</span>
                                      <span
                                        className="asst-comment-action asst-comment-action--delete"
                                        onClick={async () => {
                                          const msgId = c.messageId || c.message_id || message._id;
                                          await apiClient.delete(`/workspace/${workspaceId}/folder/${resolvedFolderId}/chat/${chatId}/message/${msgId}/comment/${c._id || c.id}`);
                                          refetch();
                                        }}
                                      >Delete</span>
                                      <span
                                        className="asst-comment-action asst-comment-action--save"
                                        onClick={() => setReplyingCommentId(c._id || c.id)}
                                      >Reply</span>
                                    </>
                                  )}
                                  {c.replies && c.replies.length > 0 && (
                                    <div className="asst-reply-section">
                                      {c.replies.map((r, ri) => (
                                        <div key={ri} className="asst-reply-item">
                                          <span className="asst-comment-user">{r.userName || r.user_name || 'User'}:</span>{' '}
                                          <span>{r.text}</span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  {replyingCommentId === (c._id || c.id) && (
                                    <div className="asst-reply-input-row">
                                      <input
                                        autoFocus
                                        placeholder="Write a reply... (Enter to send)"
                                        onKeyDown={async (e) => {
                                          if (e.key === 'Enter' && e.target.value.trim()) {
                                            const val = e.target.value;
                                            e.target.disabled = true;
                                            try {
                                              const msgId = c.messageId || c.message_id || message._id;
                                              await apiClient.post(`/workspace/${workspaceId}/folder/${resolvedFolderId}/chat/${chatId}/message/${msgId}/comment/${c._id || c.id}/reply`, { text: val });
                                              setReplyingCommentId(null);
                                              refetch();
                                            } catch (err) {
                                              e.target.disabled = false;
                                            }
                                          }
                                          if (e.key === 'Escape') setReplyingCommentId(null);
                                        }}
                                        className="asst-reply-input"
                                      />
                                      <span
                                        className="asst-reply-cancel"
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
                            <FaCopy className="cursor-pointer" />
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
                              className="cursor-pointer"
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
                  <FaFile className="asst-file-icon" />
                </div>

                <div className="file-upload-text">Upload Your File</div>
                <div className="file-upload-info">
                  <label htmlFor="file-input">
                    <span className="asst-comment-action--edit">
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
        <div className="error msg-error">
          {error}
        </div>
      )}
      {/* input */}
      <div className="Message_container">
        {file && file.name && (
          <div className="file-preview-chip">
            <div className="file-preview-chip__icon">
              {file.type?.includes('pdf') ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
              ) : file.type?.includes('image') ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
              )}
            </div>
            <div className="file-preview-chip__info">
              <span className="file-preview-chip__name">{file.name.length > 30 ? file.name.slice(0, 27) + '...' : file.name}</span>
              <span className="file-preview-chip__size">{(file.size / 1024).toFixed(0)} KB</span>
            </div>
            <Button
              variant="icon"
              ariaLabel="Remove file"
              className="file-preview-chip__remove"
              title="Remove file"
              onClick={() => setFile(null)}
            >
              &times;
            </Button>
          </div>
        )}
        <div className="input-container msg-input-relative">
          <div className="msg-inspire-wrapper">
            {!loading ? (
              <img
                src={InpireMeIcon}
                alt="Inspire Me"
                onClick={handleInspireClick}
                className="msg-inspire-icon"
              />
            ) : (
              <div className="msg-inspire-spinner" />
            )}
          </div>

          <textarea
            placeholder="Enter text here.."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            className="msg-textarea"
            rows={1}
          />
          <div className="icons msg-icons-row">
            <label htmlFor="file-input" className="msg-attach-label">
              <IoAttach size={32} color="#888" title="Attach file" />
            </label>
            <IoSend
              onClick={handleSendMessage}
              className="send-icon"
              color="#c3e11d"
              size={32}
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
    </div>
  );
};

// Define prop types for validation
MessagesSection.propTypes = {
  setCurrentChat: PropTypes.func.isRequired, // Validate that it's a required function
};

// Optionally, define defaultProps if needed
MessagesSection.defaultProps = {
  setCurrentChat: () => { }, // Default no-op function if none is passed
};

export default MessagesSection;
