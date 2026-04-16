import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import '../../styles/chat/ChatMessage.scss';
import { LuPencil } from 'react-icons/lu';
import {
  FaCopy,
  FaThumbsUp,
  FaThumbsDown,
  FaSync,
  FaBookmark,
} from 'react-icons/fa';
import { IoAttach, IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { IoSend } from 'react-icons/io5';
import { CiEdit } from 'react-icons/ci';
import AiPic from '../../assets/dashboard/sidebarLogo.png';
import UserAvatar from '../common/UserAvatar';
import InpireMeIcon from '../../assets/inspireBtn.svg';
import TonePopup from '../../components/common/TonePopup';
import { ScaleLoader } from 'react-spinners';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

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
import { useSelector } from 'react-redux';
import assessmentQnaData, { assessmentDescriptions, assessmentPhases } from '../../data/chat/assessmentQnaData';
import appConfig from '../../config/config.js';
import {
  useDislikeChatMessageMutation,
  useGetWorkspacesQuery,
  useLikeChatMessageMutation,
  useRemoveBookmarkMutation,
  useAddBookmarkMutation,
  useUpdateChatMutation,
} from '../../redux/api/workspaceApi';
import { selectAllWorkspaces } from '../../redux/selectors/selectors';
import { selectWorkspace } from '../../redux/slices/workspacesSlice';
import useGenerateSingleReport from '../../hooks/useGenerateSingleReport';
import useInspire from '../../hooks/AiFeatureHooks/useInspire';
import { selectSelectedFolder } from '../../redux/slices/folderSlice.js';
import AssessmentModal from './AssessmentComponent/AssessmentModal.jsx';
import Editor from './AssessmentComponent/Editor.jsx';
import useAssessment from '../../hooks/useAssessment.js';

const MessagesSection = ({ handleAssessmentSelect, selectedAssessment, onMediaUpdate }) => {
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
    setAssessmentId(id);
    if (id) {
      const getAssessmentAsync = async () => {
        const singleAssessment = await getAssessment(id);

        if (singleAssessment.report && singleAssessment.report.isGenerated) {
          setShowReportButton(true);
        }

        setAssessmentData(singleAssessment);
        const filteredFolders = (selectedWorkspace?.folders || []).filter(
          (item) => (item._id || item.id) === folderId
        );

        handleAssessmentSelect(filteredFolders[0]?.assessments[0]);
        setAssessmentId(id);
        setSubReportId(singleAssessment?.report?.id || id);

        // If report exists but no Q&A, show report as a chat message
        if (singleAssessment.qa && singleAssessment.qa.length > 0) {
          setChat(singleAssessment.qa);
        } else if (singleAssessment.report?.content) {
          setChat([{ question: singleAssessment.report.content, status: 'report' }]);
          setShowReportButton(true);
        }

        setShowInputField(true);
      };
      getAssessmentAsync();
    }
  }, [id]);

  useEffect(() => {
    if (assessmentId) {
      const cleanPathname = location.pathname.replace(/\/+$/, ''); // Remove any trailing slashes
      if (!cleanPathname.includes(assessmentId)) {
        navigate(`${cleanPathname}/${assessmentId}`, { replace: true });
      }
    }
  }, [assessmentId, location.pathname, navigate]);

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
    const existingBookmark =
      chat &&
      chat.bookmarks?.filter(
        (b) =>
          b.messageId === msgId &&
          b.userId === JSON.parse(localStorage.getItem('user')).id
      );

    if (existingBookmark && existingBookmark.length > 0) {
      await removeBookmark({
        workspaceId,
        folderId,
        chatId: assessmentId,
        messageId: msgId,
        bookmarkId: existingBookmark[0]._id || existingBookmark[0].id,
      }).unwrap();
      setBookmark((prev) => ({ ...prev, [msgId]: false }));
    } else {
      await addBookmark({
        workspaceId,
        folderId,
        chatId: assessmentId,
        messageId: msgId,
      }).unwrap();
      setBookmark((prev) => ({ ...prev, [msgId]: true }));
    }

    // Dispatch action to add bookmark
    refetch(); // Trigger the chat query to refetch
  };

  const handleSendMessage = async () => {
    // Extract file content — upload to backend for parsing (PDF/DOCX need server-side processing)
    let fileText = '';
    if (file && file instanceof File) {
      try {
        const ext = file.name.split('.').pop().toLowerCase();
        if (ext === 'txt' || ext === 'csv') {
          // Plain text files — read on client
          fileText = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = () => resolve('');
            reader.readAsText(file);
          });
        } else {
          // PDF/DOCX — send to backend for text extraction
          const token = localStorage.getItem('token');
          const formData = new FormData();
          formData.append('pdfPath', file);
          const extractRes = await fetch(
            `${appConfig.apiURL}/workspace/extract-text`,
            {
              method: 'POST',
              headers: { Authorization: `Bearer ${token}` },
              body: formData,
            }
          );
          if (extractRes.ok) {
            const extractData = await extractRes.json();
            fileText = extractData.text || '';
          }
        }
        if (fileText.length > 30000) {
          fileText = fileText.substring(0, 30000) + '\n[...truncated...]';
        }
      } catch (e) {
        import.meta.env.DEV && console.error('File extraction error:', e);
      }
    }

    if (firstPrompt) {
      setChat((prevChat) => {
        const updated = [...prevChat];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          answer: firstPrompt,
          status: 'answered',
        };
        return updated;
      });
    } else {
      setChat((prevChat) => [
        ...prevChat,
        {
          role: 'user',
          file: file ? URL.createObjectURL(file) : null,
          fileName: file ? file.name : null,
        },
      ]);
      scrollToBottom();
    }
    setLoading(true);

    try {
      const answerWithFile = fileText
        ? `${firstPrompt}\n\n[Attached Document Content]:\n${fileText}`
        : firstPrompt;
      const response = await AssessmentReport(answerWithFile, SubReportId);
      if (response) {
        setChat((prevChat) => [
          ...prevChat,
          { role: 'ai', question: response, status: 'pending' },
        ]);
      }
      setFirstPrompt('');
      setFile(null);
      document.getElementById('file-input').value = '';
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
      }
    } finally {
      setLoading(false);
    }
  };

  // replace selected text chat
  const applyFixedText = (newText) => {
    // updated
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
    setPopupVisible(false);
  };

  const handleTextSelect = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    // Check if the selected text is within a ChangeAI or user message
    const messageElements = document.querySelectorAll('.chat-message .card');

    let isValidSelection = false;
    messageElements.forEach((element) => {
      const contentElement = element.querySelector('.msg');
      if (contentElement && contentElement.contains(selection.anchorNode)) {
        const headingEl = element.querySelector('.Heading');
        const messageRole = headingEl?.textContent || '';
        if (messageRole === 'ChangeAI' || messageRole === 'You' || !headingEl) {
          isValidSelection = true;
        }
      }
    });

    if (isValidSelection) {
      setSelectedText(selectedText);
      setPopupVisible(!!selectedText);
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
    setResponseLength(length);

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

  // Extract media (documents, images, links) from chat messages and report to parent
  useEffect(() => {
    if (!onMediaUpdate) return;
    const documents = [];
    const images = [];
    const links = [];

    chat.forEach((item) => {
      if (item.fileName) {
        const ext = item.fileName.split('.').pop().toLowerCase();
        const isImage = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp'].includes(ext);
        if (isImage) {
          if (item.file) images.push(item.file);
        } else {
          documents.push({
            name: item.fileName,
            date: new Date().toLocaleDateString(),
            size: '',
            url: item.file || '',
          });
        }
      }
    });

    onMediaUpdate({ images, documents, links });
  }, [chat, onMediaUpdate]);

  const handleLikeClick = async (message) => {
    const msgId = message._id || message.id;
    await likeChatMessage({
      workspaceId,
      folderId,
      chatId: assessmentId,
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
      chatId: assessmentId,
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
              <div
                key={index}
                ref={index === chat.length - 1 ? messagesEndRef : null}
              >
                {/* User-uploaded file or standalone user message */}
                {item.role === 'user' && (
                  <div className="chat-container-assisstant right">
                    <div className="card user-card">
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
                          <div style={{ marginBottom: '0.5rem' }}>
                            <a href={item.file} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>
                              {item.fileName || 'Attached file'}
                            </a>
                          </div>
                        )}
                        {item.question && <ReactMarkdown>{item.question}</ReactMarkdown>}
                        {item.answer && <ReactMarkdown>{item.answer}</ReactMarkdown>}
                      </div>
                    </div>
                  </div>
                )}
                {/* AI message */}
                {item.role === 'ai' && (
                  <div className="chat-container-assisstant left">
                    <div className="card assistant-card">
                      <div className="ai-avatar">
                        <UserAvatar
                          src={AiPic}
                          name="AI Assistant"
                          size={50}
                          imgClassName="avatar"
                        />
                      </div>
                      <div className="msg">
                        <ReactMarkdown>{item.question}</ReactMarkdown>
                      </div>
                      <div className="message-action-icons">
                        <div
                          className="message-icon-wrapper"
                          title="Copy"
                          onClick={() => { handleCopyMessage(item.question); setCopy((prev) => ({ ...prev, [item._id || item.id || index]: true })); }}
                        >
                          <FaCopy
                            style={{
                              cursor: 'pointer',
                              color: copy[item._id || item.id || index] ? '#C3E11D' : '',
                            }}
                          />
                          <span className="tooltip-assessment">Copy</span>
                        </div>
                        <div
                          className="message-icon-wrapper"
                          title="Like"
                          onClick={() => handleLikeClick(item)}
                        >
                          <FaThumbsUp
                            style={
                              reactions[item._id || item.id || index] === 'like'
                                ? { color: '#C3E11D' }
                                : { color: '' }
                            }
                          />
                          <span className="tooltip-assessment">Like</span>
                        </div>
                        <div
                          className="message-icon-wrapper"
                          title="Dislike"
                          onClick={() => handleDislikeMessage(item)}
                        >
                          <FaThumbsDown
                            style={
                              reactions[item._id || item.id || index] === 'dislike' ? { color: '#C3E11D' } : {}
                            }
                          />
                          <span className="tooltip-assessment">Dislike</span>
                        </div>
                        <div className="message-icon-wrapper" title="Bookmark" onClick={() => handleAddBookmark(item)}>
                          <FaBookmark
                            style={
                              bookmark[item._id || item.id || index] ? { color: '#C3E11D' } : {}
                            }
                          />
                          <span className="tooltip-assessment">Bookmark</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* Q&A format from backend (no role field) — AI question on left */}
                {!item.role && item.question && (
                  <div className="chat-container-assisstant left">
                    <div className="card assistant-card">
                      <div className="ai-avatar">
                        <UserAvatar
                          src={AiPic}
                          name="AI Assistant"
                          size={50}
                          imgClassName="avatar"
                        />
                      </div>
                      <div className="msg">
                        <ReactMarkdown>{item.question}</ReactMarkdown>
                      </div>
                      <div className="message-action-icons">
                        <div
                          className="message-icon-wrapper"
                          title="Copy"
                          onClick={() => { handleCopyMessage(item.question); setCopy((prev) => ({ ...prev, [item._id || item.id || index]: true })); }}
                        >
                          <FaCopy
                            style={{
                              cursor: 'pointer',
                              color: copy[item._id || item.id || index] ? '#C3E11D' : '',
                            }}
                          />
                          <span className="tooltip-assessment">Copy</span>
                        </div>
                        <div
                          className="message-icon-wrapper"
                          title="Like"
                          onClick={() => handleLikeClick(item)}
                        >
                          <FaThumbsUp
                            style={
                              reactions[item._id || item.id || index] === 'like'
                                ? { color: '#C3E11D' }
                                : { color: '' }
                            }
                          />
                          <span className="tooltip-assessment">Like</span>
                        </div>
                        <div
                          className="message-icon-wrapper"
                          title="Dislike"
                          onClick={() => handleDislikeMessage(item)}
                        >
                          <FaThumbsDown
                            style={
                              reactions[item._id || item.id || index] === 'dislike' ? { color: '#C3E11D' } : {}
                            }
                          />
                          <span className="tooltip-assessment">Dislike</span>
                        </div>
                        <div className="message-icon-wrapper" title="Bookmark" onClick={() => handleAddBookmark(item)}>
                          <FaBookmark
                            style={
                              bookmark[item._id || item.id || index] ? { color: '#C3E11D' } : {}
                            }
                          />
                          <span className="tooltip-assessment">Bookmark</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* Q&A format — user answer on right */}
                {!item.role && item.status === 'answered' && (
                  <div className="chat-container-assisstant right">
                    <div className="card user-card">
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
                        <ReactMarkdown>{item.answer}</ReactMarkdown>
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
                <span style={{ fontSize: '1.1rem', color: '#888', marginBottom: '1rem', display: 'inline-block', padding: '4px 12px', background: '#f0f0f0', borderRadius: '20px' }}>
                  Phase: {assessmentPhases[selectedAssessment || selectedAssessmentTitle?.ReportTitle || selectedAssessmentTitle]}
                </span>
              )}
              <button
                onClick={() =>
                  handleStartAssessment(
                    selectedAssessmentTitle?.ReportTitle ||
                      selectedAssessmentTitle ||
                      'Change Vision/Case for Change'
                  )
                }
                style={{
                  backgroundColor: 'rgba(195, 225, 29, 1)',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '1.5rem',
                  fontWeight: '500',
                }}
              >
                Start Assessment
              </button>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="error" style={{ color: 'red' }}>
          {error}
        </div>
      )}
      {/* Progress indicator — rendered just above input */}
      {showInputField && (
        <>
          <div style={{ position: 'relative', width: '70%' }}>
            <button
              onClick={handleSingleReport}
              style={{
                backgroundColor: 'rgba(195, 225, 29, 1)',
                padding: '1rem',
                borderRadius: '10px',
                border: 'none',
                outline: 'none',
                fontSize: '1.5rem',
                fontWeight: '500',
                display: showReportButton ? 'flex' : 'none',
                marginBottom: '1rem',
                margin: '0 0 1rem auto',
              }}
            >
              View Report
            </button>
          </div>
          <div className="Message_container">
            {/* Progress bar */}
            {chat.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '8px 16px', marginBottom: '4px' }}>
                <div style={{ flex: 1, height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    width: showReportButton ? '100%' : `${Math.min(((chat.filter(c => c.answer || c.status === 'answered').length) / 7) * 100, 95)}%`,
                    height: '100%',
                    background: showReportButton ? '#28a745' : '#C3E11D',
                    borderRadius: '4px',
                    transition: 'width 0.5s ease',
                    minWidth: '5%',
                  }} />
                </div>
                <span style={{ fontSize: '1.2rem', color: showReportButton ? '#28a745' : '#555', fontWeight: 600, whiteSpace: 'nowrap' }}>
                  {showReportButton ? 'Complete' : `Question ${chat.filter(c => c.answer || c.status === 'answered').length + 1}`}
                </span>
              </div>
            )}
            {chat.length <= 1 && (
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', padding: '0 8px', marginBottom: '8px' }}>
                {['Help me get started', 'What should I consider?', 'Give me an example', 'Summarise best practices'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setFirstPrompt(suggestion)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '16px',
                      border: '1px solid #ddd',
                      background: 'white',
                      fontSize: '12px',
                      cursor: 'pointer',
                      color: '#333',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => { e.target.style.background = '#f5f5f5'; e.target.style.borderColor = '#C3E11D'; }}
                    onMouseLeave={(e) => { e.target.style.background = 'white'; e.target.style.borderColor = '#ddd'; }}
                  >
                    {suggestion}
                  </button>
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
                <button
                  className="file-preview-chip__remove"
                  onClick={() => setFile(null)}
                  title="Remove file"
                >
                  &times;
                </button>
              </div>
            )}
            <div className="input-container" style={{ position: 'relative' }}>
              <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                {!loading ? (
                  <img
                    src={InpireMeIcon}
                    alt="Inspire Me"
                    onClick={handleInspireClick}
                    style={{ width: '16px', height: '16px' }}
                  />
                ) : (
                  <div
                    style={{
                      border: '2px solid #c3e11d10',
                      borderTop: '2px solid #c3e11d',
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
                style={{
                  resize: 'none',
                  overflowY: 'auto',
                  height: 'auto',
                  maxHeight: '150px',
                  width: '100%',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '1rem',
                  fontSize: '14px',
                  fontFamily: 'Arial, sans-serif',
                  boxSizing: 'border-box',
                  outline: 'none',
                  boxShadow: 'none',
                  marginLeft: '0.5rem',
                }}
                rows={1}
              />
              <div className="icons" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <label htmlFor="file-input" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
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
      <style>{`
            .header{
      display: flex;
      }
    .msg {
      margin: 1rem 0;
      font-size: 1rem;
      text-align: justify;
    }
      .initials-placeholder {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #C3E11D;
          color: #0B1444;
          font-size: 18px;
          font-weight: bold;
          text-align: center;
          margin-right: 8px;
          cursor: pointer;
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
    }
      `}</style>
    </div>
  );
};

MessagesSection.propTypes = {
  handleAssessmentSelect: PropTypes.func.isRequired,
  selectedAssessment: PropTypes.object,
};

export default MessagesSection;
