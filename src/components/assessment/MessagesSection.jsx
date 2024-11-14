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
import assessmentQnaData from '../../data/chat/assessmentQnaData';
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

const MessagesSection = ({ handleAssessmentSelect, selectedAssessment }) => {
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
  const [reaction, setReaction] = useState('');
  const [allAssessmentData, setAllAssessmentData] = useState([]);
  const [reportsData, setReportsData] = useState([]);
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

  useEffect(() => {
    setAssessmentId(id);
    if (id) {
      const getAssessmentAsync = async () => {
        const singleAssessment = await getAssessment(id);
        console.log('GET ASSESSMENT', singleAssessment);

        if (singleAssessment.report && singleAssessment.report.isGenerated) {
          setShowReportButton(true);
        }

        setAssessmentData(singleAssessment);
        const initialMessage =
          singleAssessment?.qa[singleAssessment?.qa.length - 1]?.question;
        const filteredFolders = selectedWorkspace.folders.filter(
          (item) => item._id === folderId
        );

        handleAssessmentSelect(filteredFolders[0]?.assessments[0]);
        setAssessmentId(id);
        setSubReportId(singleAssessment?.report?.id || id);
        setChat((prevChat) => [
          ...prevChat,
          { role: 'ai', content: initialMessage },
        ]);

        setShowInputField(true);
        setChat(singleAssessment.qa);
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
  const chatId = useSelector((state) => state.workspaces.currentChatId);
  const userId = useSelector((state) => state.auth.user?.id);
  const workspacess = useSelector(selectAllWorkspaces);
  const selectedWorkspace = useSelector(selectWorkspace);
  const { refetch } = useGetWorkspacesQuery(userId);
  const [firstPrompt, setFirstPrompt] = useState('');
  const { handleInspire } = useInspire();

  const { error, chatWithdoc } = useChat();
  const [photoPath, setPhotoPath] = useState('false');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setPhotoPath(storedUser.photoPath);
      setUser(storedUser);
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
    console.log('Text:', text);
    console.log('Uploaded File:', file);

    // if (!text && !file) return;
    if (firstPrompt) {
      // setChat((prevChat) => [
      //   ...prevChat,
      //   { role: 'user', answer: firstPrompt || null, status: 'answered' },
      // ]);
      const updatedChat = [...chat];
      updatedChat[updatedChat.length - 1] = {
        ...updatedChat[updatedChat.length - 1],
        answer: firstPrompt,
        status: 'answered',
      };

      // Update the chat state with the modified array
      setChat(updatedChat);
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
      const response = await AssessmentReport(firstPrompt, SubReportId);
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
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInspireClick = async () => {
    setLoading(true);
    console.log('LASR -> ', chat[chat.length - 1]);
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
    } catch (error) {
      console.error('Asi AI', error);
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
        const messageRole = element.querySelector('.Heading').textContent;
        if (messageRole === 'ChangeAI' || messageRole === 'You') {
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

  const getInitials = () => {
    if (!user) {
      return 'N/A';
    }
    return `${user.firstName?.[0] || ''}${
      user.lastName?.[0] || ''
    }`.toUpperCase();
  };
  // handle Tone change
  const handleToneChange = async (tone) => {
    setSelectedTone(tone);
    // if (selectedText && tone) {
    setLoading(true);
    try {
      console.log('HandleToen -> ', tone);
      console.log('HandleToen selectedText -> ', selectedText);
      const response = await ChangeToneFun(selectedText, tone);
      applyFixedText(response);
    } catch (error) {
      console.error('Error occurred while changing tone:', error);
    } finally {
      setLoading(false);
    }
    // }
  };

  // handle Response length
  const handleResponseLengthChange = async (value) => {
    console.log('response length', value);
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
    } catch (error) {
      console.error('Error occurred while changing tone:', error);
    } finally {
      setLoading(false);
    }
    // }
  };

  useEffect(() => {
    if (generateSingleReport && selectedWorkspace) {
      const filteredFolders = selectedWorkspace.folders.filter(
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
        console.log(
          filteredFolders[0].assessments[0].report[0],
          'generateSingleReport'
        );
        setGenerateSingleReport(false);
      }
    }
    if (selectedWorkspace) {
      const filteredFolders = selectedWorkspace.folders.filter(
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
      console.log('initialMessage', initialMessage);

      const filteredFolders = selectedWorkspace.folders.filter(
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
    } catch (error) {
      console.error('Start Assessment Error', error);
    } finally {
      setAssessmentLoading(false);
    }
  };

  const handleSingleReport = async () => {
    setLoading(true);

    const reportsData = await GenerateSingleReport();
    setReportsData(reportsData);
    console.log('REPORT DATAAAAAAAAAAAAAAAAAAAAAAAAAA', reportsData);
    setShowModal(true);
    const fullUrl = `${reportsData.data.report.url}`;
    window.open(fullUrl, '_blank');
    const link = document.createElement('a');
    link.href = fullUrl;
    link.download = 'report.pdf'; // You can specify the filename
    link.click();
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

  const handleClose = () => {
    setShowModal(false); // Set to false to hide the modal
  };
  console.log('CHAT', chat);

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
                {/* Display the Question on the left */}
                <div className="chat-container-assisstant left">
                  <div className="card assistant-card">
                    <div className="header">
                      <img src={AiPic} alt="avatar" className="avatar" />
                    </div>
                    <div className="msg">
                      <ReactMarkdown>{item.question}</ReactMarkdown>
                    </div>
                    <div className="message-action-icons">
                      <div
                        className="message-icon-wrapper"
                        title="Copy"
                        onClick={() => handleCopyMessage(item.answer)}
                      >
                        <FaCopy style={{ cursor: 'pointer' }} />
                        <span className="tooltip-assessment">Copy</span>
                      </div>
                      <div
                        className="message-icon-wrapper"
                        title="Like"
                        onClick={() => handleLikeClick(item)}
                      >
                        <FaThumbsUp
                          style={
                            item.reactions?.some(
                              (react) =>
                                react.user ===
                                  JSON.parse(localStorage.getItem('user')).id &&
                                react.type === 'like'
                            )
                              ? { color: '#C3E11D' }
                              : {}
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
                            item.reactions?.some(
                              (react) =>
                                react.user ===
                                  JSON.parse(localStorage.getItem('user')).id &&
                                react.type === 'dislike'
                            )
                              ? { color: '#C3E11D' }
                              : {}
                          }
                        />
                        <span className="tooltip-assessment">Dislike</span>
                      </div>
                      <div className="message-icon-wrapper" title="Bookmark">
                        <FaBookmark
                          onClick={() => handleAddBookmark(item)}
                          style={
                            chat.bookmarks?.some(
                              (bookmark) =>
                                bookmark.messageId === item._id &&
                                bookmark.userId ===
                                  JSON.parse(localStorage.getItem('user')).id
                            )
                              ? { color: '#C3E11D' }
                              : {}
                          }
                        />
                        <span className="tooltip-assessment">Bookmark</span>
                      </div>
                    </div>
                  </div>
                </div>
                {item.status === 'answered' && (
                  <div className="chat-container-assisstant right">
                    <div className="card user-card">
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {photoPath ? (
                          <img
                            src={photoPath}
                            alt="profile"
                            className="ProfileImage"
                            style={{ cursor: 'pointer' }}
                          />
                        ) : (
                          <div className="initials-placeholder">
                            {getInitials()}
                          </div>
                        )}
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
                Evaluate the key aspects of a change initiative: objectives,
                benefits, risks, and success metrics.
              </p>
              <button
                onClick={() =>
                  handleStartAssessment(
                    selectedAssessmentTitle?.ReportTitle ||
                      selectedAssessmentTitle
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
            <div className="input-container">
              <div style={{ display: 'flex', alignItems: 'center' }}>
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
                value={firstPrompt}
                onChange={(e) => setFirstPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(); // Send message on Enter
                  }
                }}
                onInput={(e) => {
                  // e.target.style.height = 'auto'; // Reset height
                  // e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height
                }}
                style={{
                  resize: 'none',
                  overflowY: 'auto',
                  height: 'auto',
                  maxHeight: '150px', // Set maximum height before scroll
                  width: '100%', // Full width of the container
                  border: 'none',
                  borderRadius: '10px',
                  padding: '14px 12px 0px 12px',
                  fontSize: '14px',
                  fontFamily: 'Arial, sans-serif',
                  boxSizing: 'border-box',
                  outline: 'none',
                }}
                rows={0} // Initial row
              />
              <div className="icons" style={{ display: 'flex' }}>
                <IoSend
                  color="C3E11D"
                  onClick={handleSendMessage}
                  className="send-icon "
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
          background-color: #007bff;
          color: #ffffff;
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
