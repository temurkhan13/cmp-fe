import { useState, useEffect, useRef } from 'react';
import '../../../styles/chat/ChatMessage.scss';
import { LuPencil } from 'react-icons/lu';
import { FaCopy, FaThumbsUp, FaThumbsDown, FaSync } from 'react-icons/fa';
import { IoAttach } from 'react-icons/io5';
import { IoSend } from 'react-icons/io5';
import UserPic from '../../../assets/chat/user.png';
import AiPic from '../../../assets/dashboard/sidebarLogo.png';
import InpireMeIcon from '../../../assets/inspireBtn.svg';
import { Example } from '../../../utils';
import fileIcon from '../../../assets/dashboard/fileIcon.png';
import TonePopup from '../../../components/assisstent/assisstentChat/TonePopup';
import { ScaleLoader } from 'react-spinners';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

// hooks

// ASk-Ai
import useGrammarFix from '../../../hooks/useGrammarFix';
import useSummarize from '../../../hooks/useSummarize';
import useImproveWriting from '../../../hooks/useImproveWriting';

// change Tone
import useChangeTone from '../../../hooks/useChangeTone';

// response length
import useAuto from '../../../hooks/useAuto';
import useLonger from '../../../hooks/useLonger';
import useShorter from '../../../hooks/useShorter';
import useComprehensive from '../../../hooks/useComprehensive';
import usestartAssessment from '../../../hooks/usestartAssessment';
// chat upload pdf & text
import useChat from '../../../hooks/useChat';

const MessagesSection = ({ selectedAssessment }) => {
  const location = useLocation();
  const { Questions } = location.state || {};

  const [file, setFile] = useState([]);
  const [text, setText] = useState('');
  const [chat, setChat] = useState([]);
  const [selectedText, setSelectedText] = useState('');
  const [selectedTone, setSelectedTone] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);
  const [responseLength, setResponseLength] = useState('');
  const [askAi, setAskAI] = useState('');
  const [loading, setLoading] = useState(false);
  const [assessmentLoading, setAssessmentLoading] = useState(false);

  // custom hooks
  const { StartAssessment } = usestartAssessment();
  const { fixGrammar } = useGrammarFix();
  const { improveWriting } = useImproveWriting();
  const { summarize } = useSummarize();
  const { ChangeToneFun } = useChangeTone();
  const { comprehensiveWriting } = useComprehensive();
  const { autoWritingFnc } = useAuto();
  const { shortText } = useShorter();
  const { LongText } = useLonger();

  const { error, chatWithdoc } = useChat();

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

    if (!text && !file) return;
    if (text) {
      setChat((prevChat) => [
        ...prevChat,
        {
          role: 'user',
          content: text || null,
        },
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
      const response = await StartAssessment(text);
      if (response) {
        // set AI chat
        setChat((prevChat) => [...prevChat, { role: 'ai', content: response }]);
      }

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
    // const currentQuestionKey = `question-${data.questionnaire.Questions[activeStep - 1].id}`;
    // const inspiredText = await handleInspire(answers[currentQuestionKey]);
    // setAnswers({
    //   ...answers,
    //   [currentQuestionKey]: inspiredText,
    // });
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

  // select the text from chat
  const handleTextSelect = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    setSelectedText(selectedText);
    setPopupVisible(!!selectedText);
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

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const handleStartAssessment = async (assessmentName) => {
    try {
      setAssessmentLoading(true);
      const initialMessage = await StartAssessment(
        '',
        assessmentName,
        Questions
      );
      setChat((prevChat) => [
        ...prevChat,
        { role: 'ai', content: initialMessage },
      ]);
    } catch (error) {
      console.error('Start Assessment Error', error);
    } finally {
      setAssessmentLoading(false);
    }
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
          <div>
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
                        <img src={UserPic} alt="avatar" />
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
                      <div>
                        <img src={AiPic} alt="avatar" />
                      </div>
                      <div>
                        <p className="Heading">ChangeAI</p>
                        <div className="msg">
                          <ReactMarkdown>{item.content}</ReactMarkdown>
                        </div>
                        <div>
                          <FaCopy />
                          <FaThumbsUp />
                          <FaThumbsDown />
                          <FaSync />
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
                {selectedAssessment} Champions Survey
              </p>
              <p className="assessmentDefaultSubHeading">
                Evaluate the key aspects of a change initiative: objectives,
                benefits, risks, and success metrics.
              </p>
              <button
                onClick={() =>
                  handleStartAssessment('Change vision/case for change')
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
      <div className="Message_container">
        <div>
          <label htmlFor="file-input" className="file-upload-text">
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
    </div>
  );
};

export default MessagesSection;
