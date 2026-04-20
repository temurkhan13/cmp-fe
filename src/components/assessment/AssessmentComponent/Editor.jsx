import PropTypes from 'prop-types';
import { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import {
  useEditReportMutation,
} from '../../../redux/api/workspaceApi';
import appConfig from '../../../config/config';
import ConfirmModal from '../../common/ConfirmModal';
import { marked } from 'marked';
import TurndownService from 'turndown';
import { exportDocument } from '@utils/exportDocument';

const Editor = ({
  placeholder,
  height = '100%',
  data,
  title,
  assesmentId,
  asssessment,
}) => {
  const editor = useRef(null);
  const [content, setContent] = useState(data?.content || '');
  const [assessmentID, setAssessmentID] = useState(assesmentId);
  const [editReport] = useEditReportMutation();
  const [saveStatus, setSaveStatus] = useState('idle');
  const [showRegenConfirm, setShowRegenConfirm] = useState(false);

  const htmlContent = useMemo(
    () => marked(content || data?.content),
    [content]
  );

  const handleContentUpdate = async (newContent) => {
    try {
      setSaveStatus('saving');
      const turndownService = new TurndownService();
      const markdownContent = turndownService.turndown(newContent);

      const response = await editReport({
        assessmentId: assessmentID,
        title,
        content: markdownContent,
      }).unwrap();

      setContent(response?.content);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      if (import.meta.env.DEV) console.error(error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleExport = async (type) => {
    try {
      await exportDocument({
        type,
        source: 'assessment',
        sourceId: assessmentID,
      });
    } catch (error) {
      if (import.meta.env.DEV) console.error(`${type} export error:`, error);
    }
  };

  const stripHtml = (html) => {
    if (!html) return '';
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || 'Start typing...',
      height: '90vh',
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      toolbarButtonSize: 'large',
      toolbarAdaptive: true,
      buttons: [
        'bold',
        'italic',
        'underline',
        '|',
        'ul',
        'ol',
        '|',
        'outdent',
        'indent',
        '|',
        'font',
        'fontsize',
        'brush',
        'paragraph',
        '|',
        'image',
        'table',
        '|',
        'fullsize',
        'print',
        '|',
        'source',
      ],
    }),
    [placeholder, height]
  );

  return (
    <div className="editor-container">
      <div className="editor-toolbar">
        <button
          onClick={() => {
            const currentContent = editor.current?.value || editor.current?.getEditorValue?.() || '';
            handleContentUpdate(currentContent);
          }}
          disabled={saveStatus === 'saving'}
          className="editor-btn editor-btn--save"
          style={{
            background: saveStatus === 'saved' ? '#dcfce7' : saveStatus === 'error' ? '#fee2e2' : undefined,
            cursor: saveStatus === 'saving' ? 'not-allowed' : undefined,
            color: saveStatus === 'error' ? '#dc2626' : undefined,
          }}
        >
          {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved' : saveStatus === 'error' ? 'Save Failed' : 'Save'}
        </button>
        <button onClick={() => handleExport('pdf')} className="editor-btn">
          PDF
        </button>
        <button onClick={() => handleExport('docx')} className="editor-btn">
          Word
        </button>
        <button onClick={() => handleExport('pptx')} className="editor-btn">
          PowerPoint
        </button>
        <button onClick={() => handleExport('xlsx')} className="editor-btn">
          Excel
        </button>
        <button onClick={() => setShowRegenConfirm(true)} className="editor-btn editor-btn--regen">
          Re-generate
        </button>
        <button onClick={async () => {
          try {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const res = await fetch(`${appConfig.apiURL}/dpb/sitemap`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
              body: JSON.stringify({
                message: stripHtml(editor.current?.value || content || '').substring(0, 500),
                sitemapName: title || 'Assessment Playbook',
                userId: user.id || user._id,
              }),
            });
            if (res.ok) {
              const data = await res.json();
              const id = data._id || data.id;
              if (id) window.location.href = `/playbook/${id}`;
            }
          } catch (e) { import.meta.env.DEV && console.error('Create playbook error:', e); }
        }} className="editor-btn editor-btn--playbook">
          Create Playbook
        </button>
      </div>
      <JoditEditor
        ref={editor}
        value={htmlContent}
        config={config}
        tabIndex={1}
        onBlur={(newContent) => handleContentUpdate(newContent)}
      />
      <ConfirmModal
        isOpen={showRegenConfirm}
        title="Re-generate Report"
        description="Re-generate this report? Your edits will be replaced."
        confirmText="Re-generate"
        cancelText="Cancel"
        onConfirm={async () => {
          await handleExport('pdf');
          setShowRegenConfirm(false);
        }}
        onCancel={() => setShowRegenConfirm(false)}
      />
    </div>
  );
};

Editor.propTypes = {
  placeholder: PropTypes.string,
  title: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  data: PropTypes.any,
};


export default Editor;
