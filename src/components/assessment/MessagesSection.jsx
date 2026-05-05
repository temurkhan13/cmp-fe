import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './assessment.scss';
import TonePopup from '../../components/common/TonePopup';
import { ScaleLoader } from 'react-spinners';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import useAiTextActions from '../../hooks/useAiTextActions';
import usestartAssessment from '../../hooks/usestartAssessment';
import useAssessmentReport from '../../hooks/useAssessmentReport';
import useChat from '../../hooks/useChat';
import { useSelector, useDispatch } from 'react-redux';
import assessmentQnaData, { assessmentDescriptions, assessmentPhases } from '../../data/chat/assessmentQnaData';
import {
  useDislikeChatMessageMutation,
  useGetWorkspacesQuery,
  useLikeChatMessageMutation,
  useRemoveBookmarkMutation,
  useAddBookmarkMutation,
  useUpdateAssessmentQuestionMutation,
} from '../../redux/api/workspaceApi';
import { selectWorkspace, setCurrentSelectedTitle } from '../../redux/slices/workspacesSlice';
import useGenerateSingleReport from '../../hooks/useGenerateSingleReport';
import useInspire from '../../hooks/AiFeatureHooks/useInspire';
import { selectSelectedFolder } from '../../redux/slices/folderSlice.js';
import { AssessmentModal } from '../modal';
import Editor from './Editor.jsx';
import useAssessment from '../../hooks/useAssessment.js';
import useLocalStorageUser from '../../hooks/useLocalStorageUser';
import useTextSelectionPopup from '../../hooks/useTextSelectionPopup';
import Button from '../common/Button';
import FilePreviewChip from '../chat/FilePreviewChip';
import MessageInput from '../chat/MessageInput';
import UserMessageBubble from '../chat/UserMessageBubble';
import AiMessageBubble from '../chat/AiMessageBubble';

const MessagesSection = ({ handleAssessmentSelect, selectedAssessment, onMediaUpdate, onBookmarksUpdate }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [file, setFile] = useState([]);
  const [chat, setChat] = useState([]);
  const [generateSingleReport, setGenerateSingleReport] = useState(false);
  const [SubReportId, setSubReportId] = useState('');
  const [assessmentId, setAssessmentId] = useState();
  const {
    selectedText,
    selectedId: editingQaId,
    popupVisible,
    setPopupVisible,
  } = useTextSelectionPopup({ selector: '.msg[data-qa-id]', idAttribute: 'data-qa-id' });
  const [loading, setLoading] = useState(false);
  const [assessmentLoading, setAssessmentLoading] = useState(false);
  const [showInputField, setShowInputField] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [allAssessmentData] = useState([]);
  const [reportsData, setReportsData] = useState([]);
  const [reactions, setReactions] = useState({});
  const [copy, setCopy] = useState({});
  const [bookmark, setBookmark] = useState({});
  const workspaceId = useSelector(
    (state) => state.workspaces.currentWorkspaceId
  );
  const [showReportButton, setShowReportButton] = useState(false);
  const currentWorkspace = useSelector(selectWorkspace);
  const { id } = useParams();

  const selectedAssessmentTitle = useSelector(
    (state) => state.workspaces.currentSelectedTitle
  );

  const [folderId, setFolderId] = useState('');

  // const folderId = useSelector((state) => state.workspaces.currentFolderId);
  const folder = useSelector(selectSelectedFolder);

  const { getAssessment } = useAssessment(workspaceId, folderId);

  // When user clicks a different assessment type from sidebar, reset state
  useEffect(() => {
    if (selectedAssessment && typeof selectedAssessment === 'string') {
      // sidebar picked a new assessment type, reset back to Start Assessment
      setChat([]);
      setAssessmentId(undefined);
      setShowInputField(false);
      setShowReportButton(false);
      setSubReportId('');
      setFirstPrompt('');
      // Clear the assessment ID from URL so the id useEffect doesn't re-fetch
      navigate('/assessment/chat', { replace: true });
    }
  }, [selectedAssessment, navigate]);

  useEffect(() => {
    // Reset input state when switching assessments
    setFirstPrompt('');
    setFile([]);
    setChat([]);
    setShowReportButton(false);
    setShowInputField(false);
    setSubReportId('');

    setAssessmentId(id);
    if (id) {
      const getAssessmentAsync = async () => {
        try {
          const singleAssessment = await getAssessment(id);

          if (singleAssessment.report && singleAssessment.report.isGenerated) {
            setShowReportButton(true);
          }

          setAssessmentData(singleAssessment);

          if (singleAssessment.name) {
            dispatch(setCurrentSelectedTitle(singleAssessment.name));
          }

          setAssessmentId(id);
          setSubReportId(singleAssessment?.report?.id || id);

          // If report exists but no Q&A, show report as a chat message
          if (singleAssessment.qa && singleAssessment.qa.length > 0) {
            setChat(singleAssessment.qa);

            // Initialize reactions from persisted data
            const initialReactions = {};
            const currentUserId = JSON.parse(localStorage.getItem('user'))?.id;
            singleAssessment.qa.forEach((q) => {
              const msgId = q._id || q.id;
              const userReaction = (q.reactions || []).find((r) => r.user_id === currentUserId);
              if (userReaction) {
                initialReactions[msgId] = userReaction.type;
              }
            });
            setReactions(initialReactions);

            // Initialize bookmarks from persisted data (store full bookmark object for unbookmark)
            const initialBookmarks = {};
            (singleAssessment.bookmarks || []).forEach((b) => {
              const msgId = b.messageId || b.message_id;
              if (b.userId === currentUserId || b.user_id === currentUserId) {
                initialBookmarks[msgId] = b;
              }
            });
            setBookmark(initialBookmarks);
          } else if (singleAssessment.report?.content) {
            setChat([{ question: singleAssessment.report.content, status: 'report' }]);
            setShowReportButton(true);
          }

          setShowInputField(true);
        } catch (err) {
          console.error('failed to load assessment', err);
        }
      };
      getAssessmentAsync();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (assessmentId) {
      const cleanPathname = location.pathname.replace(/\/+$/, '');
      // Only append ID if we're on the base /assessment/chat route (no ID in URL yet)
      if (cleanPathname === '/assessment/chat' && !id) {
        navigate(`/assessment/chat/${assessmentId}`, { replace: true });
      }
    }
  }, [assessmentId, location.pathname, navigate, id]);

  useEffect(() => {
    if (folder) {
      setFolderId(folder.id || folder._id);
    }
  }, [folder]);

  // custom hooks
  const {
    StartAssessment,
    isReportGenerated: isStartReportGenerated,
  } = usestartAssessment();
  const {
    AssessmentReport,
    isReportGenerated,
    setAssessmentData,
    singleAssessmenChats,
  } = useAssessmentReport({
    workspaceId: currentWorkspace.id,
    folderId: folder?.id || folderId,
    assessmentId,
    allAssessmentData: allAssessmentData,
  });
  const { GenerateSingleReport } = useGenerateSingleReport({
    workspaceId: currentWorkspace.id,
    folderId: folder?.id || folderId,
    assessmentId,
  });

  useEffect(() => {
    if (isReportGenerated || isStartReportGenerated) {
      setShowReportButton(true);
    }
  }, [isReportGenerated, isStartReportGenerated]);

  const { askAi, changeTone, changeLength } = useAiTextActions();
  const [addBookmark] = useAddBookmarkMutation();
  const [removeBookmark] = useRemoveBookmarkMutation();
  const [likeChatMessage] = useLikeChatMessageMutation();
  const [dislikeChatMessage] = useDislikeChatMessageMutation();
  const userId = useSelector((state) => state.auth.user?.id);
  const selectedWorkspace = useSelector(selectWorkspace);
  const { refetch } = useGetWorkspacesQuery(userId);
  const [firstPrompt, setFirstPrompt] = useState('');
  const { handleInspire } = useInspire();
  const [updateAssessmentQuestion] = useUpdateAssessmentQuestionMutation();

  const { error } = useChat();
  const { userProfilePhoto, userName } = useLocalStorageUser();

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAddBookmark = async (message) => {
    const msgId = message._id || message.id;
    const existing = bookmark[msgId];

    if (existing) {
      await removeBookmark({
        workspaceId,
        folderId,
        contextType: 'assessment',
        contextId: assessmentId,
        messageId: msgId,
        bookmarkId: existing._id || existing.id,
      }).unwrap();
      setBookmark((prev) => {
        const next = { ...prev };
        delete next[msgId];
        return next;
      });
    } else {
      const result = await addBookmark({
        workspaceId,
        folderId,
        contextType: 'assessment',
        contextId: assessmentId,
        messageId: msgId,
      }).unwrap();
      setBookmark((prev) => ({ ...prev, [msgId]: result }));
    }

    // Dispatch action to add bookmark
    refetch(); // Trigger the chat query to refetch
  };

  // Sync bookmarks to sidebar whenever bookmark state or chat changes
  useEffect(() => {
    if (onBookmarksUpdate) {
      const bookmarkedMessages = Object.entries(bookmark).map(([msgId, bData]) => {
        const qaItem = chat.find((q) => (q._id || q.id) === msgId);
        return {
          _id: bData._id || bData.id || msgId,
          text: qaItem?.question || '',
          from: 'AI',
          localDate: bData.created_at
            ? new Date(bData.created_at).toLocaleDateString()
            : '',
        };
      });
      onBookmarksUpdate(bookmarkedMessages);
    }
  }, [bookmark, chat, onBookmarksUpdate]);

  const handleSendMessage = async () => {
    const hasFile = file && file instanceof File;
    const currentFile = hasFile ? file : null;

    if (firstPrompt) {
      setChat((prevChat) => {
        const updated = [...prevChat];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          answer: firstPrompt,
          status: 'answered',
          ...(hasFile ? { file: URL.createObjectURL(file), fileName: file.name } : {}),
        };
        return updated;
      });
    } else if (hasFile) {
      setChat((prevChat) => [
        ...prevChat,
        {
          role: 'user',
          file: URL.createObjectURL(file),
          fileName: file.name,
        },
      ]);
      scrollToBottom();
    }
    setLoading(true);

    try {
      // file parsing is server-side now
      const data = await AssessmentReport(firstPrompt, SubReportId, currentFile);
      // overwrite local chat with persisted qa so items keep backend shape
      if (data?.qa) {
        setChat(data.qa);
      }
      setFirstPrompt('');
      setFile(null);
      const fileInput = document.getElementById('file-input');
      if (fileInput) fileInput.value = '';
    } finally {
      setLoading(false);
    }
  };

  const handleInspireClick = async () => {
    setLoading(true);
    const inspiredText = await handleInspire(chat[chat.length - 1].question);
    setFirstPrompt(inspiredText);
    setLoading(false);
  };

  const HandleAskAi = async (value) => {
    setLoading(true);
    try {
      const response = await askAi(value, selectedText);
      applyFixedText(response);
    } finally {
      setLoading(false);
    }
  };

  // Full-text replacement: getSelection().toString() and raw markdown diverge,
  // so substring replace isn't reliable here.
  const applyFixedText = async (newText) => {
    if (!editingQaId || !assessmentId || !newText) {
      setPopupVisible(false);
      return;
    }
    try {
      await updateAssessmentQuestion({
        assessmentId,
        qaId: editingQaId,
        question: newText,
      }).unwrap();
      const refreshed = await getAssessment(assessmentId);
      if (refreshed?.qa) setChat(refreshed.qa);
    } catch (err) {
      console.error('failed to update question', err);
    }
    setPopupVisible(false);
  };

  const handleToneChange = async (tone) => {
    setLoading(true);
    try {
      const response = await changeTone(tone, selectedText);
      applyFixedText(response);
    } finally {
      setLoading(false);
    }
  };

  const handleResponseLengthChange = async (value) => {
    setLoading(true);
    try {
      const response = await changeLength(value, selectedText);
      applyFixedText(response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (generateSingleReport && selectedWorkspace) {
      const filteredFolders = (selectedWorkspace?.folders || []).filter(
        (item) => item._id === folderId
      );
      if (
        filteredFolders.length > 0 &&
        filteredFolders[0].assessments.length > 0 &&
        filteredFolders[0].assessments[0].report.length > 0
      ) {
        setGenerateSingleReport(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generateSingleReport, selectedWorkspace]);

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const handleStartAssessment = async (assessmentName) => {
    try {
      setAssessmentLoading(true);
      const initialResponse = await StartAssessment(assessmentName, folderId);
      setAssessmentId(initialResponse.id);
      refetch();
      setAssessmentData(initialResponse);

      const initialMessage =
        initialResponse?.qa[initialResponse?.qa.length - 1]?.question;

      const filteredFolders = (selectedWorkspace?.folders || []).filter(
        (item) => item._id === folderId
      );

      handleAssessmentSelect(filteredFolders[0]?.assessments[0]);
      setAssessmentId(initialResponse.id);
      setSubReportId(initialResponse?.report?.id || initialResponse?.id);
      setChat((prevChat) => [
        ...prevChat,
        { role: 'ai', question: initialMessage },
      ]);

      setShowInputField(true);
    } finally {
      setAssessmentLoading(false);
    }
  };

  const handleSingleReport = async () => {
    setLoading(true);

    const reportsData = await GenerateSingleReport();
    setReportsData(reportsData);
    setShowModal(true);
    // const fullUrl = `${reportsData.data.report.url}`;
    // window.open(fullUrl, '_blank');
    // const link = document.createElement('a');
    // link.href = fullUrl;
    // link.download = 'report.pdf'; // You can specify the filename
    // link.click();
    setLoading(false);
    refetch();
    setGenerateSingleReport(false);
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  // Extract media from persisted assessment data and local chat state
  useEffect(() => {
    if (!onMediaUpdate) return;
    const documents = [];
    const images = [];
    const links = [];

    // Load persisted media, documents, and links from backend
    const assessmentMedia = singleAssessmenChats?.media || [];
    const assessmentDocs = singleAssessmenChats?.documents || [];
    const assessmentLinks = singleAssessmenChats?.links || [];

    assessmentMedia.forEach((m) => {
      if (m.url) images.push(m.url);
    });
    assessmentDocs.forEach((d) => {
      documents.push({
        name: d.fileName || d.file_name || d.name || 'Document',
        date: d.date ? new Date(d.date).toLocaleDateString() : '',
        size: d.size || '',
        url: d.url || '',
      });
    });
    assessmentLinks.forEach((l) => {
      links.push({ name: l.name || l.url || 'Link', url: l.url || '' });
    });

    // Also include any locally-attached files from current session (not yet persisted)
    chat.forEach((item) => {
      if (item.fileName && item.file) {
        const ext = item.fileName.split('.').pop().toLowerCase();
        const isImage = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp'].includes(ext);
        // Only add if not already in persisted data (avoid duplicates)
        if (isImage) {
          if (!images.includes(item.file)) images.push(item.file);
        } else {
          const alreadyExists = documents.some((d) => d.name === item.fileName);
          if (!alreadyExists) {
            documents.push({
              name: item.fileName,
              date: new Date().toLocaleDateString(),
              size: '',
              url: item.file,
            });
          }
        }
      }
    });

    onMediaUpdate({ images, documents, links });
  }, [chat, onMediaUpdate, singleAssessmenChats]);

  const handleLikeClick = async (message) => {
    const msgId = message._id || message.id;
    await likeChatMessage({
      workspaceId,
      folderId,
      contextType: 'assessment',
      contextId: assessmentId,
      messageId: msgId,
    }).unwrap();
    setReactions((prev) => ({ ...prev, [msgId]: prev[msgId] === 'like' ? '' : 'like' }));
    refetch();
  };

  const handleDislikeMessage = async (message) => {
    const msgId = message._id || message.id;
    await dislikeChatMessage({
      workspaceId,
      folderId,
      contextType: 'assessment',
      contextId: assessmentId,
      messageId: msgId,
    }).unwrap();
    setReactions((prev) => ({ ...prev, [msgId]: prev[msgId] === 'dislike' ? '' : 'dislike' }));
    refetch();
  };

  const handleCopyMessage = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleClose = () => {
    setShowModal(false); // Set to false to hide the modal
  };

  return (
    <div className="chat-message-wrapper">
      <ScaleLoader
        color={'#000000'}
        loading={loading || assessmentLoading}
        size={150}
      />

      <div className="chat-message">
        <input
          type="file"
          id="file-input"
          onChange={handleFileChange}
          className="msg-file-input-hidden"
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
            {chat.map((item, index) => {
              const msgKey = item._id || item.id || index;
              const isLast = index === chat.length - 1;
              const aiActions = {
                onCopy: () => {
                  handleCopyMessage(item.question);
                  setCopy((prev) => ({ ...prev, [msgKey]: true }));
                },
                copied: !!copy[msgKey],
                onLike: () => handleLikeClick(item),
                liked: reactions[msgKey] === 'like',
                onDislike: () => handleDislikeMessage(item),
                disliked: reactions[msgKey] === 'dislike',
                onBookmark: () => handleAddBookmark(item),
                bookmarked: !!bookmark[msgKey],
              };

              return (
                <div key={index} ref={isLast ? messagesEndRef : null}>
                  {/* User-uploaded file or standalone user message */}
                  {item.role === 'user' && (
                    <UserMessageBubble
                      text={item.question || item.answer}
                      attachedFile={
                        item.file
                          ? { url: item.file, name: item.fileName }
                          : undefined
                      }
                      userProfilePhoto={userProfilePhoto}
                      userName={userName}
                    />
                  )}
                  {/* AI message */}
                  {item.role === 'ai' && (
                    <AiMessageBubble
                      text={item.question}
                      dataAttributes={{ 'data-qa-id': item._id || item.id }}
                      actions={aiActions}
                    />
                  )}
                  {/* backend Q&A shape: AI question on left */}
                  {!item.role && item.question && (
                    <AiMessageBubble
                      text={item.question}
                      dataAttributes={{ 'data-qa-id': item._id || item.id }}
                      actions={aiActions}
                    />
                  )}
                  {/* user answer on right */}
                  {!item.role && item.status === 'answered' && (
                    <UserMessageBubble
                      text={item.answer}
                      userProfilePhoto={userProfilePhoto}
                      userName={userName}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="defaultPage">
            <div className="assessmentDefaultContianer">
              <p className="assessmentDefaultHeading">
                {selectedAssessment ||
                  selectedAssessmentTitle.report?.[0]?.subReport?.[0]
                    ?.ReportTitle ||
                  selectedAssessmentTitle ||
                  (assessmentQnaData.length > 0 ? assessmentQnaData[0] : '')}
              </p>

              <p className="assessmentDefaultSubHeading">
                {assessmentDescriptions[selectedAssessment || selectedAssessmentTitle?.ReportTitle || selectedAssessmentTitle || 'Change Vision/Case for Change'] || 'Select an assessment to begin.'}
              </p>
              {assessmentPhases[selectedAssessment || selectedAssessmentTitle?.ReportTitle || selectedAssessmentTitle] && (
                <span className="msg-phase-badge">
                  Phase: {assessmentPhases[selectedAssessment || selectedAssessmentTitle?.ReportTitle || selectedAssessmentTitle]}
                </span>
              )}
              <Button
                variant="primary"
                className="msg-start-btn"
                onClick={() =>
                  handleStartAssessment(
                    selectedAssessmentTitle?.ReportTitle ||
                      selectedAssessmentTitle ||
                      'Change Vision/Case for Change'
                  )
                }
              >
                Start Assessment
              </Button>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="error msg-error">
          {error}
        </div>
      )}
      {/* progress indicator above input */}
      {showInputField && (
        <>
          <div className="msg-report-wrapper">
            <Button
              variant="primary"
              className={`msg-view-report-btn ${showReportButton ? 'msg-view-report-btn--visible' : 'msg-view-report-btn--hidden'}`}
              onClick={handleSingleReport}
            >
              View Report
            </Button>
          </div>
          <div className="Message_container">
            {/* Progress bar */}
            {chat.length > 0 && (
              <div className="msg-progress-row">
                <div className="msg-progress-track">
                  <div
                    className="msg-progress-bar"
                    style={{
                      width: showReportButton ? '100%' : `${Math.min(((chat.filter(c => c.answer || c.status === 'answered').length) / 7) * 100, 95)}%`,
                      background: showReportButton ? '#28a745' : '#C3E11D',
                    }}
                  />
                </div>
                <span className={`msg-progress-label ${showReportButton ? 'msg-progress-label--complete' : 'msg-progress-label--active'}`}>
                  {showReportButton ? 'Complete' : `Question ${chat.filter(c => c.answer || c.status === 'answered').length + 1}`}
                </span>
              </div>
            )}
            {chat.length <= 1 && (
              <div className="msg-suggestions">
                {['Help me get started', 'What should I consider?', 'Give me an example', 'Summarise best practices'].map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="secondary"
                    size="sm"
                    className="msg-suggestion-btn"
                    onClick={() => setFirstPrompt(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            )}
            <FilePreviewChip file={file} onRemove={() => setFile(null)} />
            <MessageInput
              value={firstPrompt}
              onChange={setFirstPrompt}
              onSend={handleSendMessage}
              onInspire={handleInspireClick}
              loading={loading}
            />
          </div>
        </>
      )}
      {showModal && (
        <AssessmentModal
          title={'something'}
          setShowModal={setShowModal}
          content={
            <Editor
              title={'test'}
              data={reportsData}
              assesmentId={assessmentId}
              placeholder="Type your text here..."
              height="100vw"
            />
          }
          onClose={handleClose} // Change `onclose` to `onClose` here
        />
      )}

      {/* {isStartReportGenerated && (
            <AssessmentModal
              title={'something'}
              content={
                <Editor
                  title={'test'}
                  data={startFinalReport}
                  placeholder="Type your text here..."
                  height="100vw"
                />
              }
            />
          )} */}
    </div>
  );
};

MessagesSection.propTypes = {
  handleAssessmentSelect: PropTypes.func.isRequired,
  selectedAssessment: PropTypes.object,
};

export default MessagesSection;
