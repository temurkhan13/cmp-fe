import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './chat-message.scss';
import './assessment.scss';
import { LuPencil } from 'react-icons/lu';
import {
  FaCopy,
  FaThumbsUp,
  FaThumbsDown,
  FaSync,
  FaBookmark,
} from 'react-icons/fa';
import { IoAttach, IoChevronDown, IoChevronUp, IoSend } from 'react-icons/io5';
import { CiEdit } from 'react-icons/ci';
import AiPic from '../../assets/dashboard/sidebarLogo.png';
import UserAvatar from '../common/UserAvatar';
import InpireMeIcon from '../../assets/inspireBtn.svg';
import TonePopup from '../../components/common/TonePopup';
import { ScaleLoader } from 'react-spinners';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// ASk-Ai
import useGrammarFix from '../../hooks/AiFeatureHooks/useGrammarFix';
import useSummarize from '../../hooks/AiFeatureHooks/useSummarize';
import useImproveWriting from '../../hooks/AiFeatureHooks/useImproveWriting';

// change Tone
import useChangeTone from '../../hooks/AiFeatureHooks/useChangeTone';

// response length
import useAuto from '../../hooks/AiFeatureHooks/useAuto';
import useLonger from '../../hooks/AiFeatureHooks/useLonger';
import useShorter from '../../hooks/AiFeatureHooks/useShorter';
import useComprehensive from '../../hooks/AiFeatureHooks/useComprehensive';
import usestartAssessment from '../../hooks/usestartAssessment';
import useAssessmentReport from '../../hooks/useAssessmentReport';
// chat upload pdf & text
import useChat from '../../hooks/useChat';
import { useSelector, useDispatch } from 'react-redux';
import assessmentQnaData, { assessmentDescriptions, assessmentPhases } from '../../data/chat/assessmentQnaData';
import appConfig from '../../config/config.js';
import {
  useDislikeChatMessageMutation,
  useGetWorkspacesQuery,
  useLikeChatMessageMutation,
  useRemoveBookmarkMutation,
  useAddBookmarkMutation,
  useUpdateChatMutation,
  useUpdateAssessmentQuestionMutation,
} from '../../redux/api/workspaceApi';
import { selectAllWorkspaces } from '../../redux/selectors/selectors';
import { selectWorkspace, setCurrentSelectedTitle } from '../../redux/slices/workspacesSlice';
import useGenerateSingleReport from '../../hooks/useGenerateSingleReport';
import useInspire from '../../hooks/AiFeatureHooks/useInspire';
import useExplain from '../../hooks/AiFeatureHooks/useExplain';
import { selectSelectedFolder } from '../../redux/slices/folderSlice.js';
import AssessmentModal from './AssessmentComponent/AssessmentModal.jsx';
import Editor from './AssessmentComponent/Editor.jsx';
import useAssessment from '../../hooks/useAssessment.js';
import Button from '../common/Button';

const MessagesSection = ({ handleAssessmentSelect, selectedAssessment, onMediaUpdate, onBookmarksUpdate }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [file, setFile] = useState([]);
  const [text, setText] = useState('');
  const [chat, setChat] = useState([]);
  const [generateSingleReport, setGenerateSingleReport] = useState(false);
  const [finalReport, setFinalReport] = useState('');
  const [reportTitle, setReportTitle] = useState('');
  const [SubReportId, setSubReportId] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [assessmentId, setAssessmentId] = useState();
  const [selectedText, setSelectedText] = useState('');
  const [editingQaId, setEditingQaId] = useState('');
  const [selectedTone, setSelectedTone] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);
  const [responseLength, setResponseLength] = useState('');
  const [askAi, setAskAI] = useState('');
  const [loading, setLoading] = useState(false);
  const [assessmentLoading, setAssessmentLoading] = useState(false);
  const [showInputField, setShowInputField] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [allAssessmentData, setAllAssessmentData] = useState([]);
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
      // A new assessment type was selected from the sidebar — reset to show Start Assessment
      setChat([]);
      setAssessmentId(undefined);
      setShowInputField(false);
      setShowReportButton(false);
      setSubReportId('');
      setFirstPrompt('');
      // Clear the assessment ID from URL so the id useEffect doesn't re-fetch
      navigate('/assessment/chat', { replace: true });
    }
  }, [selectedAssessment]);

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
        } catch (error) {
          if (import.meta.env.DEV) console.error('Failed to load assessment:', error);
        }
      };
      getAssessmentAsync();
    }
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
    report: startFinalReport,
    isReportGenerated: isStartReportGenerated,
  } = usestartAssessment();
  const {
    AssessmentReport,
    isReportGenerated,
    report,
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

  const { fixGrammar } = useGrammarFix();
  const { improveWriting } = useImproveWriting();
  const { summarize } = useSummarize();
  const { ChangeToneFun } = useChangeTone();
  const { comprehensiveWriting } = useComprehensive();
  const { autoWritingFnc } = useAuto();
  const { shortText } = useShorter();
  const { LongText } = useLonger();
  const [addBookmark] = useAddBookmarkMutation();
  const [removeBookmark] = useRemoveBookmarkMutation();
  const [likeChatMessage] = useLikeChatMessageMutation();
  const [dislikeChatMessage] = useDislikeChatMessageMutation();
  const userId = useSelector((state) => state.auth.user?.id);
  const workspacess = useSelector(selectAllWorkspaces);
  const selectedWorkspace = useSelector(selectWorkspace);
  const { refetch } = useGetWorkspacesQuery(userId);
  const [firstPrompt, setFirstPrompt] = useState('');
  const { handleInspire } = useInspire();
  const { Explain } = useExplain();
  const [updateAssessmentQuestion] = useUpdateAssessmentQuestionMutation();

  const { error, chatWithdoc } = useChat();
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

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (assessmentQnaData.length > 0) {
      setText(assessmentQnaData[0]);
    } else {
      setText('');
    }
  }, []);

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
      // File parsing is now handled server-side — just pass the file to the hook
      const data = await AssessmentReport(firstPrompt, SubReportId, currentFile);
      // Server is source of truth for Q&A — overwrite local chat with persisted qa
      // so every item stays in backend shape ({ _id, question, answer?, status? })
      // and the render branches for !item.role handle both the AI question and the
      // user's answer consistently across all turns.
      if (data?.qa) {
        setChat(data.qa);
      }
      setFirstPrompt('');
      setFile(null);
      const fileInput = document.getElementById('file-input');
      if (fileInput) fileInput.value = '';
      setText('');
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

  // Ask-Ai
  const HandleAskAi = async (value) => {
    try {
      setLoading(true);
      setAskAI(value);

      if (value === 'Fix Spelling & Grammar') {
        const responseGrammar = await fixGrammar(selectedText);
        applyFixedText(responseGrammar);
        //
      } else if (value === 'Improve Writing') {
        const responseWriting = await improveWriting(selectedText);
        applyFixedText(responseWriting);
        //
      } else if (value === 'Summarize') {
        const responseSummary = await summarize(selectedText);
        applyFixedText(responseSummary);
      } else if (value === 'Explain This') {
        const responseExplain = await Explain(selectedText);
        applyFixedText(responseExplain);
      }
    } finally {
      setLoading(false);
    }
  };

  // Replace the AI question with the transformed text and persist.
  // Full-text replacement (same as assistant/MessagesSection) — substring replace
  // is unreliable because getSelection().toString() and the raw markdown diverge.
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
    } catch (error) {
      if (import.meta.env.DEV) console.error('Failed to update question:', error);
    }
    setPopupVisible(false);
  };

  const handleTextSelect = () => {
    const selection = window.getSelection();
    const text = selection.toString().trim();

    // Only allow selection inside AI-question .msg divs (tagged with data-qa-id).
    // Answer divs are untagged because users can't edit their own answers.
    const messageElements = document.querySelectorAll('.msg[data-qa-id]');
    let isValidSelection = false;
    let qaId = null;
    messageElements.forEach((el) => {
      if (el.contains(selection.anchorNode) && el.contains(selection.focusNode)) {
        isValidSelection = true;
        qaId = el.getAttribute('data-qa-id');
      }
    });

    if (isValidSelection && text) {
      setSelectedText(text);
      setEditingQaId(qaId);
      setPopupVisible(true);
    } else {
      setPopupVisible(false);
    }
  };

  // handle Tone change
  const handleToneChange = async (tone) => {
    setSelectedTone(tone);
    // if (selectedText && tone) {
    setLoading(true);
    try {
      const response = await ChangeToneFun(selectedText, tone);
      applyFixedText(response);
    } finally {
      setLoading(false);
    }
    // }
  };

  // handle Response length
  const handleResponseLengthChange = async (value) => {
    setResponseLength(value);

    // if (value) {
    setLoading(true);
    try {
      if (value === 'Auto') {
        const responseAuto = await autoWritingFnc(selectedText);
        applyFixedText(responseAuto);
        //
      } else if (value === 'Small') {
        const responseSmall = await shortText(selectedText);
        applyFixedText(responseSmall);
        //
      } else if (value === 'Medium') {
        const responseMedium = await LongText(selectedText);
        applyFixedText(responseMedium);
        //
      } else if (value === 'Comprehensive') {
        const responseComp = await comprehensiveWriting(selectedText);
        applyFixedText(responseComp);
        //
      }
    } finally {
      setLoading(false);
    }
    // }
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
        setFinalReport(filteredFolders[0].assessments[0].report[0].finalReport);
        setReportTitle(filteredFolders[0].assessments[0].report[0].ReportTitle);
        setFileUrl(filteredFolders[0].assessments[0].report[0].finalReportURL);

        setGenerateSingleReport(false);
      }
    }
    if (selectedWorkspace) {
      const filteredFolders = (selectedWorkspace?.folders || []).filter(
        (item) => item._id === folderId
      );
    }
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
    document.addEventListener('mouseup', handleTextSelect);
    return () => {
      document.removeEventListener('mouseup', handleTextSelect);
    };
  }, []);

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
            {chat.map((item, index) => (
              <div
                key={index}
                ref={index === chat.length - 1 ? messagesEndRef : null}
              >
                {/* User-uploaded file or standalone user message */}
                {item.role === 'user' && (
                  <div className="chat-container-assistant right">
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
                      <div className="msg">
                        {item.file && (
                          <div className="msg-file-link">
                            <a href={item.file} target="_blank" rel="noopener noreferrer">
                              {item.fileName || 'Attached file'}
                            </a>
                          </div>
                        )}
                        {item.question && <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.question}</ReactMarkdown>}
                        {item.answer && <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.answer}</ReactMarkdown>}
                      </div>
                    </div>
                  </div>
                )}
                {/* AI message */}
                {item.role === 'ai' && (
                  <div className="chat-container-assistant left">
                    <div className="card chat-card assistant-card">
                      <div className="ai-avatar">
                        <UserAvatar
                          src={AiPic}
                          name="AI Assistant"
                          size={50}
                          imgClassName="avatar"
                        />
                      </div>
                      <div className="msg" data-qa-id={item._id || item.id}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.question}</ReactMarkdown>
                      </div>
                      <div className="message-action-icons">
                        <div
                          className="message-icon-wrapper"
                          title="Copy"
                          onClick={() => { handleCopyMessage(item.question); setCopy((prev) => ({ ...prev, [item._id || item.id || index]: true })); }}
                        >
                          <FaCopy
                            className={copy[item._id || item.id || index] ? 'msg-icon-active' : ''}
                          />
                          <span className="tooltip-assessment">Copy</span>
                        </div>
                        <div
                          className="message-icon-wrapper"
                          title="Like"
                          onClick={() => handleLikeClick(item)}
                        >
                          <FaThumbsUp
                            className={reactions[item._id || item.id || index] === 'like' ? 'msg-icon-active' : ''}
                          />
                          <span className="tooltip-assessment">Like</span>
                        </div>
                        <div
                          className="message-icon-wrapper"
                          title="Dislike"
                          onClick={() => handleDislikeMessage(item)}
                        >
                          <FaThumbsDown
                            className={reactions[item._id || item.id || index] === 'dislike' ? 'msg-icon-active' : ''}
                          />
                          <span className="tooltip-assessment">Dislike</span>
                        </div>
                        <div className="message-icon-wrapper" title="Bookmark" onClick={() => handleAddBookmark(item)}>
                          <FaBookmark
                            className={bookmark[item._id || item.id || index] ? 'msg-icon-active' : ''}
                          />
                          <span className="tooltip-assessment">Bookmark</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* Q&A format from backend (no role field) — AI question on left */}
                {!item.role && item.question && (
                  <div className="chat-container-assistant left">
                    <div className="card chat-card assistant-card">
                      <div className="ai-avatar">
                        <UserAvatar
                          src={AiPic}
                          name="AI Assistant"
                          size={50}
                          imgClassName="avatar"
                        />
                      </div>
                      <div className="msg" data-qa-id={item._id || item.id}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.question}</ReactMarkdown>
                      </div>
                      <div className="message-action-icons">
                        <div
                          className="message-icon-wrapper"
                          title="Copy"
                          onClick={() => { handleCopyMessage(item.question); setCopy((prev) => ({ ...prev, [item._id || item.id || index]: true })); }}
                        >
                          <FaCopy
                            className={copy[item._id || item.id || index] ? 'msg-icon-active' : ''}
                          />
                          <span className="tooltip-assessment">Copy</span>
                        </div>
                        <div
                          className="message-icon-wrapper"
                          title="Like"
                          onClick={() => handleLikeClick(item)}
                        >
                          <FaThumbsUp
                            className={reactions[item._id || item.id || index] === 'like' ? 'msg-icon-active' : ''}
                          />
                          <span className="tooltip-assessment">Like</span>
                        </div>
                        <div
                          className="message-icon-wrapper"
                          title="Dislike"
                          onClick={() => handleDislikeMessage(item)}
                        >
                          <FaThumbsDown
                            className={reactions[item._id || item.id || index] === 'dislike' ? 'msg-icon-active' : ''}
                          />
                          <span className="tooltip-assessment">Dislike</span>
                        </div>
                        <div className="message-icon-wrapper" title="Bookmark" onClick={() => handleAddBookmark(item)}>
                          <FaBookmark
                            className={bookmark[item._id || item.id || index] ? 'msg-icon-active' : ''}
                          />
                          <span className="tooltip-assessment">Bookmark</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* Q&A format — user answer on right */}
                {!item.role && item.status === 'answered' && (
                  <div className="chat-container-assistant right">
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
                      <div className="msg">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.answer}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
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
      {/* Progress indicator — rendered just above input */}
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
            {file && file instanceof File && (
              <div className="file-preview-chip">
                <div className="file-preview-chip__icon">
                  {file.type?.includes('pdf') ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  ) : file.type?.includes('image') ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
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
                value={firstPrompt}
                onChange={(e) => setFirstPrompt(e.target.value)}
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
                  color="#c3e11d"
                  onClick={handleSendMessage}
                  className="send-icon"
                  size={32}
                />
              </div>
            </div>
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
