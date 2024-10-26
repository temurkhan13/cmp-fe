import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import '../../styles/chat/ChatMessage.scss';
import { LuPencil } from 'react-icons/lu';
import { FaCopy, FaThumbsUp, FaThumbsDown, FaSync } from 'react-icons/fa';
import { IoAttach, IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { IoSend } from 'react-icons/io5';
import { CiEdit } from 'react-icons/ci';
import UserPic from '../../assets/chat/user.png';
import AiPic from '../../assets/dashboard/sidebarLogo.png';
import InpireMeIcon from '../../assets/inspireBtn.svg';
import TonePopup from '../../components/common/TonePopup';
import { ScaleLoader } from 'react-spinners';
import { useLocation } from 'react-router-dom';
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
import { useGetWorkspacesQuery } from '../../redux/api/workspaceApi';
import { selectAllWorkspaces } from '../../redux/selectors/selectors';
import { selectWorkspace } from '../../redux/slices/workspacesSlice';
import useGenerateSingleReport from '../../hooks/useGenerateSingleReport';
import useInspire from '../../hooks/AiFeatureHooks/useInspire';

const TopBar = ({
  progress,
  solvedQuestions,
  totalQuestions,
  topbarHeading,
}) => {
  return (
    <div className="assessment-topbar">
      <div className="topbar-heading">{topbarHeading}</div>
      <div className="report">
        <span>Progress:</span>
        <span className="progress" style={{ backgroundColor: '#C3E11D' }}>
          {progress}%
        </span>
      </div>
      <div className="qa-container">
        <span>Q&A:</span>
        <span className="qa">
          {solvedQuestions}/{totalQuestions}
        </span>
      </div>
      <button className="edit-report-button">
        Edit Report
        <CiEdit size={20} />
      </button>
    </div>
  );
};
const MessagesSection = ({ handleAssessmentSelect, selectedAssessment }) => {
  const location = useLocation();
  const { Questions } = location.state || {};

  const [file, setFile] = useState([]);
  const [text, setText] = useState('');
  const [chat, setChat] = useState([]);
  const [generateSingleReport, setGenerateSingleReport] = useState(false);
  const [finalReport, setFinalReport] = useState('');
  const [reportTitle, setReportTitle] = useState('');
  const [SubReportId, setSubReportId] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [assessmentId, setAssessmentId] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [selectedTone, setSelectedTone] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);
  const [responseLength, setResponseLength] = useState('');
  const [askAi, setAskAI] = useState('');
  const [loading, setLoading] = useState(false);
  const [assessmentLoading, setAssessmentLoading] = useState(false);
  const [showTopBar, setShowTopBar] = useState(false);
  const [showInputField, setShowInputField] = useState(false);
  const workspaceId = useSelector(
    (state) => state.workspaces.currentWorkspaceId
  );
  const selectedAssessmentTitle = useSelector(
    (state) => state.workspaces.currentSelectedTitle
  );

  console.log(selectedAssessmentTitle, 'selectedAssessmentTitle');
  const folderId = useSelector((state) => state.workspaces.currentFolderId);
  // custom hooks
  const { StartAssessment } = usestartAssessment();
  const { AssessmentReport } = useAssessmentReport({
    workspaceId,
    folderId,
    assessmentId,
  });
  const { GenerateSingleReport } = useGenerateSingleReport({
    workspaceId,
    folderId,
    assessmentId,
  });
  const { fixGrammar } = useGrammarFix();
  const { improveWriting } = useImproveWriting();
  const { summarize } = useSummarize();
  const { ChangeToneFun } = useChangeTone();
  const { comprehensiveWriting } = useComprehensive();
  const { autoWritingFnc } = useAuto();
  const { shortText } = useShorter();
  const { LongText } = useLonger();
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

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSendMessage = async () => {
    console.log('Text:', text);
    console.log('Uploaded File:', file);

    // if (!text && !file) return;
    if (firstPrompt) {
      setChat((prevChat) => [
        ...prevChat,
        { role: 'user', content: firstPrompt || null },
      ]);
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
        // set AI chat
        setChat((prevChat) => [
          ...prevChat,
          { role: 'ai', content: response.content },
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
    const inspiredText = await handleInspire(chat[chat.length - 1].content);
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
      if (
        filteredFolders.length > 0 &&
        filteredFolders[0].assessments.length > 0 &&
        filteredFolders[0].assessments[0].report.length > 0
      ) {
        // setAssessmentId(filteredFolders[0].assessments[0]._id);
        // setSubReportId(
        //   filteredFolders[0].assessments[0].report[0].subReport[0]._id
        // );
      }
    }
  }, [generateSingleReport, selectedWorkspace]);

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const handleStartAssessment = async (assessmentName) => {
    try {
      setAssessmentLoading(true);
      const initialResponse = await StartAssessment(
        '',
        assessmentName,
        Questions
      );
      refetch();

      console.log(initialResponse, 'initialMessage');
      const initialMessage =
        initialResponse.report[0].subReport[0].questionAnswer[0].question
          .content;
      const filteredFolders = selectedWorkspace.folders.filter(
        (item) => item._id === folderId
      );

      handleAssessmentSelect(filteredFolders[0].assessments[0]);
      // setAssessmentId(filteredFolders[0].assessments[0]._id);
      setAssessmentId(initialResponse._id);
      setSubReportId(initialResponse.report[0].subReport[0]._id);
      // setSubReportId(
      //   filteredFolders[0].assessments[0].report[0].subReport[0]._id
      // );

      setChat((prevChat) => [
        ...prevChat,
        { role: 'ai', content: initialMessage },
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
    const data = await GenerateSingleReport();
    const fullUrl = `${data.data.report.finalReportURL}`;
    window.open(fullUrl, '_blank');
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

  return (
    <div className="chat-message-wrapper">
      <div className="toggle-top-bar">
        <button
          onClick={() => setShowTopBar(!showTopBar)}
          className="topbar-btn"
        >
          {showTopBar ? <IoChevronUp /> : <IoChevronDown />}
        </button>
      </div>
      {showTopBar && (
        <TopBar
          topbarHeading="Change Management"
          progress={50}
          solvedQuestions={2}
          totalQuestions={6}
        />
      )}
      <div
        className="spinner"
        style={{ display: loading || assessmentLoading ? 'flex' : 'none' }}
      >
        <ScaleLoader
          color={'#000000'}
          loading={loading || assessmentLoading}
          size={150}
        />
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

            {chat.map((item, index) => (
              <div
                key={index}
                ref={index === chat.length - 1 ? messagesEndRef : null}
              >
                <div>
                  {item.role === 'user' ? (
                    <div className="card">
                      <div>
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
                        {/* <img src={UserPic} alt="avatar" /> */}
                      </div>
                      <div>
                        <p className="Heading">You</p>
                        {item.content && (
                          <div className="msg">
                            <ReactMarkdown>{item.content}</ReactMarkdown>
                          </div>
                        )}
                        {item.file && (
                          <div className="file-preview">
                            <a
                              href={item.file}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.fileName}
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
                      </div>
                      <div className="msg">
                        <ReactMarkdown>{item.content}</ReactMarkdown>
                      </div>
                      <div className="message-action-icons">
                        <div className="message-icon-wrapper">
                          <FaCopy />
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
            <div className="assessmentDefaultContianer">
              <p className="assessmentDefaultHeading">
                {selectedAssessment}
                {selectedAssessmentTitle.report?.[0]?.subReport?.[0]
                  ?.ReportTitle ||
                  selectedAssessmentTitle.ReportTitle ||
                  selectedAssessmentTitle ||
                  (assessmentQnaData.length > 0
                    ? assessmentQnaData[0]
                    : '')}{' '}
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
              display: 'flex',
              marginBottom: '1rem',
            }}
          >
            Generate a Single Report
          </button>
          <div className="Message_container">
            <div className="input-container">
              <div style={{ display: 'flex', alignItems: 'center' }}>
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
                value={firstPrompt}
                onChange={(e) => setFirstPrompt(e.target.value)}
              />
              <div className="icons">
                <label htmlFor="file-input">
                  <IoAttach className="send-icon " />
                </label>
                <IoSend onClick={handleSendMessage} className="send-icon " />
              </div>
            </div>
          </div>
        </>
      )}
      <style>{`
        .assessment-topbar {
          display: flex;
          align-items: center;
          // flex-direction: column;
          justify-content: space-between;
          background-color: white;
          gap: 1rem;
          border-radius: 1rem;
          padding: 1rem;
          box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 15px;
          position: absolute;
          width:70%;
          top:8.5rem;
          // left:35%;
          transition: all 0.3s ease-in-out;
        }
        .topbar-heading{
        font-size: 1.5rem;

          }
        .report,
        .qa-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-weight: 500;
          padding-bottom:1rem;
          gap:0.5rem;
          
        }
        .progress,
        .qa {
          padding: 0.5rem;
          border-radius: 1rem;
          background-color: #C3E11D;
          font-weight: 500;
          text-align: center;
          min-width: 5rem;
          }
          .edit-report-button {
          padding: 1rem;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background-color: #C3E11D;
          gap: 5px;
          font-weight: 500;
          border: none;
          // width:100%;
        }
        .topbar-btn{
          position:absolute;
          top:5rem;
          border:none;
          outline:none;
          font-size:2rem;
          background-color: lightgray;
          padding:0.5rem 1rem;
          border-radius:1rem;
          display:flex;
          align-items:center;
          justify-content:center;
          }
    .msg {
      margin: 1rem 0;
      font-size: 1rem;
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
