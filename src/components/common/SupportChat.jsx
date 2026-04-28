import { useState, useRef, useEffect } from 'react';
import { MdSupportAgent, MdSend, MdClose } from 'react-icons/md';
import apiClient from '../../api/axios';
import Button from './Button';
import './common.scss';

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
      const res = await apiClient.post(`/support/chat`, {
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
      {!isOpen && (
        <Button
          variant="icon"
          ariaLabel="Open support chat"
          className="support-chat-fab"
          onClick={() => setIsOpen(true)}
        >
          <MdSupportAgent size={28} color="#0B1444" />
        </Button>
      )}

      {isOpen && (
        <div className="support-chat-window">
          <div className="support-chat-header">
            <div className="support-chat-header-title">
              <MdSupportAgent size={22} color="#C3E11D" />
              <span className="support-chat-header-name">Support Assistant</span>
            </div>
            <Button
              variant="icon"
              ariaLabel="Close support chat"
              className="support-chat-close-btn"
              onClick={() => setIsOpen(false)}
            >
              <MdClose size={18} />
            </Button>
          </div>

          <div className="support-chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`support-chat-bubble ${msg.role === 'user' ? 'support-chat-bubble--user' : 'support-chat-bubble--bot'}`}>
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
              <div className="support-chat-bubble support-chat-bubble--bot">
                <div className="support-chat-typing">
                  <span className="support-chat-dot" />
                  <span className="support-chat-dot" style={{ animationDelay: '0.2s' }} />
                  <span className="support-chat-dot" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="support-chat-input-container">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question..."
              className="support-chat-input"
              disabled={loading}
            />
            <Button
              variant="primary"
              ariaLabel="Send message"
              className="support-chat-send-btn"
              disabled={loading || !input.trim()}
              onClick={handleSend}
            >
              <MdSend size={18} />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default SupportChat;
