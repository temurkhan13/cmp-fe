import { useState, useRef, useEffect } from 'react';
import { MdSupportAgent, MdSend, MdClose } from 'react-icons/md';
import apiClient from '../../api/axios';
import config from '../../config/config';

const SupportChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "Hello! I'm the ChangeAI Support Assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSend = async () => {
    const msg = input.trim();
    if (!msg || loading) return;

    const userMsg = { role: 'user', text: msg };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await apiClient.post(`${config.apiURL}/support/chat`, {
        message: msg,
        history: messages.map((m) => ({ role: m.role, text: m.text })),
      });
      setMessages((prev) => [...prev, { role: 'bot', text: res.data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: "I'm having trouble connecting right now. Please try again in a moment." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} style={styles.fab}>
          <MdSupportAgent size={28} color="#0B1444" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div style={styles.chatWindow}>
          {/* Header */}
          <div style={styles.header}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MdSupportAgent size={22} color="#C3E11D" />
              <span style={{ fontWeight: 600, fontSize: '14px' }}>Support Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} style={styles.closeBtn}>
              <MdClose size={18} />
            </button>
          </div>

          {/* Messages */}
          <div style={styles.messagesContainer}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                ...styles.messageBubble,
                ...(msg.role === 'user' ? styles.userBubble : styles.botBubble),
              }}>
                {msg.text.split('\n').map((line, j) => (
                  <span key={j}>
                    {line.split(/(\*\*[^*]+\*\*)/).map((part, k) =>
                      part.startsWith('**') && part.endsWith('**')
                        ? <strong key={k}>{part.slice(2, -2)}</strong>
                        : part
                    )}
                    {j < msg.text.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </div>
            ))}
            {loading && (
              <div style={{ ...styles.messageBubble, ...styles.botBubble }}>
                <div style={styles.typingDots}>
                  <span style={styles.dot} />
                  <span style={{ ...styles.dot, animationDelay: '0.2s' }} />
                  <span style={{ ...styles.dot, animationDelay: '0.4s' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={styles.inputContainer}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question..."
              style={styles.input}
              disabled={loading}
            />
            <button onClick={handleSend} disabled={loading || !input.trim()} style={styles.sendBtn}>
              <MdSend size={18} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes supportDotPulse {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
};

const styles = {
  fab: {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: '#C3E11D',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
    transition: 'all 0.2s ease',
    zIndex: 9999,
  },
  chatWindow: {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    width: '380px',
    height: '520px',
    borderRadius: '16px',
    background: '#fff',
    boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    zIndex: 9999,
    fontFamily: 'Poppins, sans-serif',
  },
  header: {
    background: '#0B1444',
    color: '#fff',
    padding: '14px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    opacity: 0.7,
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    background: '#f9fafb',
  },
  messageBubble: {
    maxWidth: '85%',
    padding: '10px 14px',
    borderRadius: '12px',
    fontSize: '13px',
    lineHeight: '1.5',
    wordWrap: 'break-word',
  },
  userBubble: {
    alignSelf: 'flex-end',
    background: '#0B1444',
    color: '#fff',
    borderBottomRightRadius: '4px',
  },
  botBubble: {
    alignSelf: 'flex-start',
    background: '#fff',
    color: '#374151',
    border: '1px solid #e5e7eb',
    borderBottomLeftRadius: '4px',
  },
  typingDots: {
    display: 'flex',
    gap: '4px',
    padding: '4px 0',
  },
  dot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#9ca3af',
    animation: 'supportDotPulse 1.2s infinite',
    display: 'inline-block',
  },
  inputContainer: {
    display: 'flex',
    gap: '8px',
    padding: '12px 16px',
    borderTop: '1px solid #e5e7eb',
    background: '#fff',
  },
  input: {
    flex: 1,
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '10px 12px',
    fontSize: '13px',
    outline: 'none',
    fontFamily: 'Poppins, sans-serif',
  },
  sendBtn: {
    background: '#C3E11D',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#0B1444',
  },
};

export default SupportChat;
