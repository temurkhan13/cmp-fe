import PropTypes from 'prop-types';
import { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { FiDownload } from 'react-icons/fi';
import {
  useEditReportMutation,
} from '../../../redux/api/workspaceApi';
import apiClient from '../../../api/axios';
import ConfirmModal from '../../common/ConfirmModal';
import Button from '../../common/Button';
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
  const exportRef = useRef(null);
  const [content, setContent] = useState(data?.content || '');
  const [assessmentID, setAssessmentID] = useState(assesmentId);
  const [editReport] = useEditReportMutation();
  const [saveStatus, setSaveStatus] = useState('idle');
  const [showRegenConfirm, setShowRegenConfirm] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [createPlaybookLoading, setCreatePlaybookLoading] = useState(false);

  useEffect(() => {
    function handleClickOutside(e) {
      if (exportRef.current && !exportRef.current.contains(e.target)) {
        setExportOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    setExportOpen(false);
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

  const createPlaybook = async () => {
    setCreatePlaybookLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const res = await apiClient.post('/dpb/sitemap', {
        message: stripHtml(editor.current?.value || content || '').substring(0, 500),
        sitemapName: title || 'Assessment Playbook',
        userId: user.id || user._id,
      });
      const id = res.data._id || res.data.id;
      if (id) window.location.href = `/playbook/${id}`;
    }
    catch (e) {
      import.meta.env.DEV && console.error('Create playbook error:', e);
    }
    finally {
      setCreatePlaybookLoading(false);
    }
  }

  return (
    <div className="editor-container">
      <div className="editor-toolbar">
        <Button
          variant="primary"
          className="assiss-btn"
          disabled={saveStatus === 'saving'}
          style={{
            background: saveStatus === 'saved' ? '#dcfce7' : saveStatus === 'error' ? '#fee2e2' : undefined,
            cursor: saveStatus === 'saving' ? 'not-allowed' : undefined,
            color: saveStatus === 'error' ? '#dc2626' : undefined,
          }}
          loading={saveStatus === 'saving'}
          onClick={() => {
            const currentContent = editor.current?.value || editor.current?.getEditorValue?.() || '';
            handleContentUpdate(currentContent);
          }}
        >
          {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved' : saveStatus === 'error' ? 'Save Failed' : 'Save'}
        </Button>
        <div className="editor-export-wrap" ref={exportRef}>
          <Button
            variant="primary"
            className="assiss-btn"
            iconLeft={<FiDownload size={16} />}
            onClick={() => setExportOpen(!exportOpen)}
          >
            Export
          </Button>
          {exportOpen && (
            <div className="editor-export-dropdown">
              <Button variant="ghost" onClick={() => handleExport('pdf')}>PDF</Button>
              <Button variant="ghost" onClick={() => handleExport('docx')}>Word (.docx)</Button>
              <Button variant="ghost" onClick={() => handleExport('pptx')}>PowerPoint (.pptx)</Button>
              <Button variant="ghost" onClick={() => handleExport('xlsx')}>Excel (.xlsx)</Button>
            </div>
          )}
        </div>
        <Button
          variant="primary"
          className="assiss-btn"
          onClick={() => setShowRegenConfirm(true)}
        >
          Re-generate
        </Button>
        <Button
          variant="primary"
          className="assiss-btn"
          loading={createPlaybookLoading}
          onClick={createPlaybook}
        >
          Create Playbook
        </Button>
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
