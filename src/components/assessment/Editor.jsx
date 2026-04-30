import PropTypes from 'prop-types';
import { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import { FiDownload } from 'react-icons/fi';
import {
  useEditReportMutation,
  useRegenerateReportMutation,
} from '../../redux/api/workspaceApi';
import apiClient from '../../api/axios';
import { ConfirmModal } from '../modal';
import Button from '../common/Button';
import { AnchoredMenu } from '../common';
import { marked } from 'marked';
import TurndownService from 'turndown';
import { exportDocument } from '@utils/exportDocument';

const Editor = ({
  placeholder,
  // eslint-disable-next-line no-unused-vars
  height = '100%',
  data,
  title,
  assesmentId,
}) => {
  const editor = useRef(null);
  const [content, setContent] = useState(data?.content || '');
  const [assessmentID] = useState(assesmentId);
  const [editReport] = useEditReportMutation();
  const [regenerateReport, { isLoading: regenLoading }] = useRegenerateReportMutation();
  const [saveStatus, setSaveStatus] = useState('idle');
  const [showRegenConfirm, setShowRegenConfirm] = useState(false);
  const [createPlaybookLoading, setCreatePlaybookLoading] = useState(false);

  const htmlContent = useMemo(
    () => marked(content || data?.content),
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleRegenerate = async () => {
    try {
      const response = await regenerateReport({ assessmentId: assessmentID }).unwrap();
      const newContent = response?.data?.report?.content;
      if (newContent) setContent(newContent);
      setShowRegenConfirm(false);
    } catch (error) {
      if (import.meta.env.DEV) console.error('Regenerate report error:', error);
      setShowRegenConfirm(false);
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
    [placeholder]
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
        <AnchoredMenu
          align="left"
          trigger={({ onClick }) => (
            <Button
              variant="primary"
              className="assiss-btn"
              iconLeft={<FiDownload size={16} />}
              onClick={onClick}
            >
              Export
            </Button>
          )}
          items={[
            { key: 'pdf', label: 'PDF', onClick: () => handleExport('pdf') },
            { key: 'docx', label: 'Word (.docx)', onClick: () => handleExport('docx') },
            { key: 'pptx', label: 'PowerPoint (.pptx)', onClick: () => handleExport('pptx') },
            { key: 'xlsx', label: 'Excel (.xlsx)', onClick: () => handleExport('xlsx') },
          ]}
        />
        <Button
          variant="primary"
          className="assiss-btn"
          loading={regenLoading}
          disabled={regenLoading}
          onClick={() => setShowRegenConfirm(true)}
        >
          {regenLoading ? 'Re-generating...' : 'Re-generate'}
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
        onConfirm={handleRegenerate}
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
