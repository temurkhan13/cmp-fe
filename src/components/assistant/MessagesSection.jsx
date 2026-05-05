import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/axios';
import './assistant.scss';
import '../assessment/assessment.scss';
import { Example } from '@data/chat';
import TonePopup from '../../components/common/TonePopup';
import CommentPopup from './CommentPopup';
import CommentsThread from './CommentsThread';
import { ScaleLoader } from 'react-spinners';
import useAiTextActions from '@hooks/useAiTextActions';
import useChat from '@hooks/useChat';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { logo } from '../../assets/common/index';
import {
  useDislikeChatMessageMutation,
  useGetWorkspacesQuery,
  useLikeChatMessageMutation,
  useRemoveBookmarkMutation,
} from '../../redux/api/workspaceApi';

import {
  useAddMessageMutation,
  useUpdateMessageMutation,
  // useRemoveMessageMutation,
  useAddBookmarkMutation,
  useGetChatQuery,
} from '../../redux/api/workspaceApi';
import {
  selectCurrentChat,
} from '../../redux/selectors/selectors';
import * as FaIcons from 'react-icons/fa';
import { setChats, getChatsAsync } from '../../redux/slices/chatSlice';
import {
  selectWorkspace,
  setCurrentChatId,
} from '../../redux/slices/workspacesSlice';
import { selectSelectedFolder } from '../../redux/slices/folderSlice.js';
import useInspire from '../../hooks/AiFeatureHooks/useInspire.js';
import useLocalStorageUser from '../../hooks/useLocalStorageUser';
import useTextSelectionPopup from '../../hooks/useTextSelectionPopup';
import FilePreviewChip from '../chat/FilePreviewChip';
import MessageInput from '../chat/MessageInput';
import UserMessageBubble from '../chat/UserMessageBubble';
import AiMessageBubble from '../chat/AiMessageBubble';

const MessagesSection = ({ setCurrentChat }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addMessage] = useAddMessageMutation();
  const [updateMessage] = useUpdateMessageMutation();
  const [addBookmark] = useAddBookmarkMutation();
  const [removeBookmark] = useRemoveBookmarkMutation();
  const [likeChatMessage] = useLikeChatMessageMutation();
  const [dislikeChatMessage] = useDislikeChatMessageMutation();
  const userId = useSelector(
    (state) => state.auth.user?.id || state.auth.user?._id
  );
  useGetWorkspacesQuery(userId, { skip: !userId });
  const currentWorkspace = useSelector(selectWorkspace);
  const workspaceId = currentWorkspace?.id;
  const selectedFolder = useSelector(selectSelectedFolder);
  const chatId = useSelector((state) => state.workspaces.currentChatId);
  const [messageId, setMessageId] = useState();

  const selId = selectedFolder?._id || selectedFolder?.id;
  const belongsToWorkspace = currentWorkspace?.folders?.some((f) => (f._id || f.id) === selId);
  const folderId = (selId && belongsToWorkspace)
    ? selectedFolder
    : (currentWorkspace?.folders?.find((f) => f.isActive) || currentWorkspace?.folders?.[0] || selectedFolder);
  const currentChat = useSelector(selectCurrentChat);


  const [file, setFile] = useState([]);
  const [text, setText] = useState('');
  const [pendingSuggestionSend, setPendingSuggestionSend] = useState(false);
  const { userProfilePhoto, userName } = useLocalStorageUser();

  const resolvedFolderId = folderId?._id || folderId?.id;
  const { data: chat, refetch: rawRefetch, isLoading: isChatLoading, isFetching: isChatFetching } = useGetChatQuery({
    workspaceId,
    folderId: resolvedFolderId,
    chatId,
  }, { skip: !workspaceId || !resolvedFolderId || !chatId });

  const refetch = useCallback(async () => {
    if (!chatId) return;
    try {
      await rawRefetch();
    } catch {
      // refetch may throw if the underlying query has been skipped
    }
  }, [chatId, rawRefetch]);

  useEffect(() => {
    if (chat && (chat?._id || chat?.id)) {
      setCurrentChat(chat);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chat]);


  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const {
    selectedText,
    selectedId,
    popupVisible,
    setPopupVisible,
  } = useTextSelectionPopup({
    selector: '.msg',
    idAttribute: 'data-message-id',
    ignoreSelector: '.PopupBox',
  });
  const [loading, setLoading] = useState(false);
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [replyingCommentId, setReplyingCommentId] = useState(null);

  const { askAi, changeTone, changeLength } = useAiTextActions();
  const { error } = useChat();
  const { handleInspire } = useInspire();
  const [, setFirstPrompt] = useState('');

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
      } catch (err) {
        console.error('updateMessage failed', err);
      }

      setPopupVisible(false);
    },
    [messageId, updateMessage, workspaceId, folderId, chatId, refetch]
  );

  useEffect(() => {
    if (selectedId) setMessageId(selectedId);
  }, [selectedId]);

  const HandleAskAi = async (value) => {
    if (!selectedText) return;
    try {
      setLoading(true);
      setPopupVisible(false);
      const response = await askAi(value, selectedText);
      if (response) {
        await applyFixedText(response);
        refetch();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToneChange = async (tone) => {
    setLoading(true);
    try {
      const response = await changeTone(tone, selectedText);
      if (response) {
        applyFixedText(response);
      }
    } catch (e) {
      console.error("error", e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResponseLengthChange = async (value) => {
    setLoading(true);
    try {
      const response = await changeLength(value, selectedText);
      if (response) {
        await applyFixedText(response);
      }
    } catch (e) {
      console.error("error", e.message);
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

    refetch();
  };

  useEffect(() => {
    if (pendingSuggestionSend && text.trim()) {
      setPendingSuggestionSend(false);
      handleSendMessage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          .catch(() => { /* ignored */ });
      }
      setText('');
      setFile(null);
      await refetch();
    } catch (err) {
      console.error('send failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInspireClick = async () => {
    try {
      setLoading(true);
      const lastChat = chat.generalMessages.filter(
        (message) => message.from == 'user'
      );
      const lastMessage = lastChat?.[lastChat.length - 1]?.text;

      if (lastMessage) {
        const inspiredText = await handleInspire(lastMessage);
        setFirstPrompt(inspiredText);
        setText(inspiredText);
        handleSendMessage();
      }
    } catch (e) {
      console.error("error", e.message);
    } finally {
      setLoading(false);
    }
  };

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
              chat.generalMessages.map((message, index) => {
                const isUser = (message.sender || message.from) === 'user';
                const isLast = index === chat.generalMessages.length - 1;
                const liked = !!message?.reactions?.some(
                  (r) => r.user == userId && r.type == 'like'
                );
                const disliked = !!message?.reactions?.some(
                  (r) => r.user == userId && r.type == 'dislike'
                );
                const bookmarked = !!chat.bookmarks?.some(
                  (b) => b.messageId === message._id && b.userId === userId
                );
                const baseActions = {
                  onCopy: () => handleCopyMessage(message.text),
                  onLike: () => handleLikeClick(message),
                  liked,
                  onDislike: () => handleDislikeMessage(message),
                  disliked,
                  onBookmark: () => handleAddBookmark(message),
                  bookmarked,
                };

                return (
                  <div key={index} ref={isLast ? messagesEndRef : null}>
                    {isUser ? (
                      <UserMessageBubble
                        text={message.text}
                        attachedFile={
                          message.file
                            ? { url: message.file, name: message.fileName }
                            : undefined
                        }
                        userProfilePhoto={userProfilePhoto}
                        userName={userName}
                        dataAttributes={{ 'data-message-id': message._id }}
                        bodyClassName="user-message"
                        actions={baseActions}
                      />
                    ) : (
                      <AiMessageBubble
                        text={message.text}
                        cardClassName="ai-card"
                        bodyClassName="ai-message"
                        dataAttributes={{ 'data-message-id': message._id }}
                        actions={{
                          ...baseActions,
                          onComment: handleCommentClick,
                          commentMessageId: message._id,
                        }}
                      >
                        <CommentsThread
                          comments={message.comments}
                          messageId={message._id}
                          workspaceId={workspaceId}
                          folderId={resolvedFolderId}
                          chatId={chatId}
                          editingCommentId={editingCommentId}
                          setEditingCommentId={setEditingCommentId}
                          replyingCommentId={replyingCommentId}
                          setReplyingCommentId={setReplyingCommentId}
                          refetch={refetch}
                        />
                      </AiMessageBubble>
                    )}
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="defaultPage">
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
        <FilePreviewChip file={file} onRemove={() => setFile(null)} />
        <MessageInput
          value={text}
          onChange={setText}
          onSend={handleSendMessage}
          onInspire={handleInspireClick}
          loading={loading}
        />
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

MessagesSection.propTypes = {
  setCurrentChat: PropTypes.func,
};

MessagesSection.defaultProps = {
  setCurrentChat: () => { },
};

export default MessagesSection;
