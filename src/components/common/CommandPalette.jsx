import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiHome, FiMessageSquare, FiFileText, FiMap, FiBook, FiSettings, FiTrash2, FiHelpCircle, FiCreditCard, FiDatabase, FiMessageCircle } from 'react-icons/fi';
import './common.scss';

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
        className="cmd-palette-overlay"
        onClick={() => setIsOpen(false)}
      />
      <div className="cmd-palette-dialog">
        <div className="cmd-palette-search-row">
          <FiSearch size={18} className="cmd-palette-search-icon" />
          <input
            autoFocus
            placeholder="Search pages..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            onKeyDown={handleItemKeyDown}
            className="cmd-palette-input"
          />
          <kbd className="cmd-palette-kbd">ESC</kbd>
        </div>
        <div className="cmd-palette-results">
          {filtered.length === 0 && (
            <div className="cmd-palette-empty">
              No results found
            </div>
          )}
          {filtered.map((cmd, i) => (
            <div
              key={cmd.id}
              onClick={() => handleSelect(cmd)}
              className={`cmd-palette-item ${i === selectedIndex ? 'cmd-palette-item--selected' : ''}`}
              onMouseEnter={() => setSelectedIndex(i)}
            >
              <span className="cmd-palette-item-icon">{cmd.icon}</span>
              {cmd.label}
            </div>
          ))}
        </div>
        <div className="cmd-palette-footer">
          <span><kbd className="cmd-palette-footer-kbd">↑↓</kbd> navigate</span>
          <span><kbd className="cmd-palette-footer-kbd">↵</kbd> select</span>
          <span><kbd className="cmd-palette-footer-kbd">esc</kbd> close</span>
        </div>
      </div>
    </>
  );
};

export default CommandPalette;
