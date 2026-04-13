import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiHome, FiMessageSquare, FiFileText, FiMap, FiBook, FiSettings, FiTrash2, FiHelpCircle, FiCreditCard, FiDatabase, FiMessageCircle } from 'react-icons/fi';

const commands = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: <FiHome size={16} />, keywords: 'home main' },
  { id: 'assistant', label: 'AI Assistant', path: '/dashboard/AiAssistant', icon: <FiMessageSquare size={16} />, keywords: 'chat ai bot' },
  { id: 'assessments', label: 'My Assessments', path: '/dashboard/myAssessments', icon: <FiFileText size={16} />, keywords: 'assessment evaluate test' },
  { id: 'sitemap', label: 'Sitemap', path: '/sitemap/list', icon: <FiMap size={16} />, keywords: 'sitemap structure tree' },
  { id: 'playbook', label: 'Digital Playbook', path: '/digital-playbook/list', icon: <FiBook size={16} />, keywords: 'playbook document report' },
  { id: 'knowledge', label: 'Knowledge Base', path: '/dashboard/knowledge-base', icon: <FiDatabase size={16} />, keywords: 'knowledge rag upload document' },
  { id: 'billing', label: 'Plan & Billing', path: '/dashboard/PlanBilling', icon: <FiCreditCard size={16} />, keywords: 'plan billing payment subscription' },
  { id: 'help', label: 'Help Center', path: '/dashboard/HelpCenter', icon: <FiHelpCircle size={16} />, keywords: 'help support faq' },
  { id: 'feedback', label: 'Feedback', path: '/dashboard/feedback', icon: <FiMessageCircle size={16} />, keywords: 'feedback review' },
  { id: 'trash', label: 'Trash', path: '/dashboard/Trash', icon: <FiTrash2 size={16} />, keywords: 'trash delete removed' },
  { id: 'settings', label: 'Settings', path: '/dashboard/settings', icon: <FiSettings size={16} />, keywords: 'settings profile account' },
  { id: 'new-chat', label: 'New Chat', path: '/assistant/chat', icon: <FiMessageSquare size={16} />, keywords: 'new chat conversation start' },
];

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const filtered = commands.filter((cmd) => {
    const q = query.toLowerCase();
    return cmd.label.toLowerCase().includes(q) || cmd.keywords.includes(q);
  });

  const handleKeyDown = useCallback((e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setIsOpen((prev) => !prev);
      setQuery('');
      setSelectedIndex(0);
    }
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleSelect = (cmd) => {
    navigate(cmd.path);
    setIsOpen(false);
    setQuery('');
  };

  const handleItemKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      handleSelect(filtered[selectedIndex]);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(4px)',
          zIndex: 9998,
        }}
        onClick={() => setIsOpen(false)}
      />
      <div
        style={{
          position: 'fixed',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '560px',
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
          zIndex: 9999,
          overflow: 'hidden',
          fontFamily: 'Poppins, sans-serif',
          animation: 'cmdFadeIn 0.15s ease-out',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <FiSearch size={18} style={{ color: '#9ca3af', marginRight: '12px', flexShrink: 0 }} />
          <input
            autoFocus
            placeholder="Search pages..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            onKeyDown={handleItemKeyDown}
            style={{
              border: 'none',
              outline: 'none',
              fontSize: '16px',
              width: '100%',
              fontFamily: 'Poppins, sans-serif',
            }}
          />
          <kbd style={{
            fontSize: '11px',
            padding: '2px 6px',
            background: '#f3f4f6',
            borderRadius: '4px',
            color: '#6b7280',
            border: '1px solid #e5e7eb',
          }}>ESC</kbd>
        </div>
        <div style={{ maxHeight: '320px', overflowY: 'auto', padding: '8px' }}>
          {filtered.length === 0 && (
            <div style={{ padding: '24px', textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>
              No results found
            </div>
          )}
          {filtered.map((cmd, i) => (
            <div
              key={cmd.id}
              onClick={() => handleSelect(cmd)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 12px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500,
                color: i === selectedIndex ? '#111' : '#374151',
                background: i === selectedIndex ? 'rgba(195,225,29,0.12)' : 'transparent',
                transition: 'background 0.1s ease',
              }}
              onMouseEnter={() => setSelectedIndex(i)}
            >
              <span style={{ color: '#6b7280', display: 'flex' }}>{cmd.icon}</span>
              {cmd.label}
            </div>
          ))}
        </div>
        <div style={{
          padding: '8px 20px',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          display: 'flex',
          gap: '16px',
          fontSize: '11px',
          color: '#9ca3af',
        }}>
          <span><kbd style={{ background: '#f3f4f6', padding: '1px 4px', borderRadius: '3px', border: '1px solid #e5e7eb' }}>↑↓</kbd> navigate</span>
          <span><kbd style={{ background: '#f3f4f6', padding: '1px 4px', borderRadius: '3px', border: '1px solid #e5e7eb' }}>↵</kbd> select</span>
          <span><kbd style={{ background: '#f3f4f6', padding: '1px 4px', borderRadius: '3px', border: '1px solid #e5e7eb' }}>esc</kbd> close</span>
        </div>
      </div>
      <style>{`
        @keyframes cmdFadeIn {
          from { opacity: 0; transform: translateX(-50%) scale(0.96); }
          to { opacity: 1; transform: translateX(-50%) scale(1); }
        }
      `}</style>
    </>
  );
};

export default CommandPalette;
