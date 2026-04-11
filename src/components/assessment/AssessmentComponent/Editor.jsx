import PropTypes from 'prop-types';
import { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import WordReportTemplate from '../../reports/WordReportTemplate';
import ReactDOMServer from 'react-dom/server';
import htmlToPdfmake from 'html-to-pdfmake';
import axios from 'axios';
import coverPhoto from '@assets/common/coverPhoto.png';
import { PDFDocument } from 'pdf-lib';
import {
  useEditReportMutation,
  useDownloadReportMutation,
} from '../../../redux/api/workspaceApi';
import appConfig from '../../../config/config';
import { marked } from 'marked'; // Markdown to HTML converter
import TurndownService from 'turndown'; // HTML to Markdown converter

async function loadPdfMake() {
  const pdfMake = (await import('pdfmake/build/pdfmake')).default;
  const pdfFonts = (await import('pdfmake/build/vfs_fonts')).default;

  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  return pdfMake;
}

const Editor = ({
  placeholder,
  height,
  data,
  title,
  assesmentId,
  asssessment,
}) => {
  const editor = useRef(null);
  const [content, setContent] = useState(data?.content || ''); // Ensure default fallback
  const [assessmentID, setAssessmentID] = useState(assesmentId);
  const [editReport] = useEditReportMutation();
  const [downloadReport] = useDownloadReportMutation();

  // Convert Markdown to HTML for editor display
  const htmlContent = useMemo(
    () => marked(content || data?.content),
    [content]
  );

  const processTableContent = (html) => {
    const container = document.createElement('div');
    container.innerHTML = html;

    // Iterate over tables and apply custom adjustments if needed
    const tables = container.querySelectorAll('table');
    tables.forEach((table) => {
      // Ensure all table cells have styles for consistent rendering
      const rows = table.querySelectorAll('tr');
      rows.forEach((row) => {
        const cells = row.querySelectorAll('td, th');
        cells.forEach((cell) => {
          // Set a default style for table cells
          cell.style.border = '1px solid black';
          cell.style.padding = '5px';
          cell.style.textAlign = 'left';
        });
      });
    });

    return container.innerHTML;
  };

  const downloadPdf = () => {
    const editorContent = editor.current?.value || '';

    const updatedContent = editorContent.replace(
      /<img src="([^"]+)"[^>]*>/g,
      (match, src) => {
        return `<img src="${src}" style="max-width:100%;"/>`;
      }
    );

    // Convert the updated HTML content to a PDF format
    const html = htmlToPdfmake(updatedContent);
    const documentDefinition = { content: html };

    // Create and download the PDF
    loadPdfMake().then((pdfMake) => {
      pdfMake
        .createPdf(documentDefinition)
        .download('jodit-editor-content.pdf');
    });
  };

  const handleContentUpdate = async (newContent) => {
    try {
      // Convert HTML back to Markdown using Turndown
      const turndownService = new TurndownService();
      const markdownContent = turndownService.turndown(newContent);

      // Call the mutation API with Markdown content
      const response = await editReport({
        assessmentId: assessmentID,
        title,
        content: markdownContent,
      }).unwrap();

      // Update the editor content with Markdown
      setContent(response?.content); // Ensure safe fallback
    } catch (error) {}
  };

  const handleReportDownload = async () => {
    try {
      // Fetch the PDF as a Blob
      const pdfBlob = await downloadReport({
        assessmentId: assessmentID,
      }).unwrap();

      // Create a URL for the Blob
      const url = window.URL.createObjectURL(pdfBlob);

      // Create an anchor element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report-${assessmentID}.pdf`); // Set the filename
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {}
  };

  const reportHtml = ReactDOMServer.renderToStaticMarkup(
    <WordReportTemplate title={title} content={content} />
  );

  const downloadDocx = async (content) => {
    try {
      const doc = htmlToPdfmake(content); // Convert to a document
      const blob = new Blob([doc], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'document.docx';
      link.click();
    } catch (error) {}
  };

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || 'Start typing...',
      height: '90vh', // Set the height here
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
        {
          name: 'save',
          tooltip: 'Save Content',
          exec: () => {
            const currentContent = editor.current?.getEditorValue() || '';
            handleContentUpdate(currentContent);
          },
        },
        {
          name: 'Download',
          tooltip: 'Download Report',
          exec: () => {
            handleReportDownload();
          },
        },
        'fullsize',
        'print',
        '|',
        'source',
      ],
    }),
    [placeholder, height]
  );

  const stripHtml = (html) => {
    if (!html) return '';
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  const exportWord = async () => {
    const { Document, Packer, Paragraph, TextRun, HeadingLevel } = await import('docx');
    const editorContent = editor.current?.value || content || '';
    const plainText = stripHtml(editorContent);
    const children = [
      new Paragraph({ text: title || 'Assessment Report', heading: HeadingLevel.TITLE }),
      new Paragraph({ children: [new TextRun(plainText)], spacing: { after: 200 } }),
    ];
    const doc = new Document({ sections: [{ children }] });
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title || 'report'}.docx`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportPptx = async () => {
    const PptxGenJS = (await import('pptxgenjs')).default;
    const pptx = new PptxGenJS();
    const slide = pptx.addSlide();
    slide.addText(title || 'Assessment Report', {
      x: 0.5, y: 0.5, w: '90%', fontSize: 24, color: '00316f', bold: true,
    });
    const plainText = stripHtml(editor.current?.value || content || '');
    slide.addText(plainText.substring(0, 2000), {
      x: 0.5, y: 1.5, w: '90%', h: '70%', fontSize: 11, color: '333333', breakLine: true, valign: 'top',
    });
    pptx.writeFile({ fileName: `${title || 'report'}.pptx` });
  };

  const exportExcel = async () => {
    const ExcelJS = (await import('exceljs')).default;
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet(title || 'Report');
    sheet.columns = [
      { header: 'Section', key: 'section', width: 80 },
    ];
    sheet.getRow(1).font = { bold: true, size: 12 };
    const plainText = stripHtml(editor.current?.value || content || '');
    plainText.split('\n').filter(Boolean).forEach((line) => {
      sheet.addRow({ section: line.trim() });
    });
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title || 'report'}.xlsx`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ width: '870px' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
        <button onClick={handleReportDownload} style={{ padding: '6px 14px', border: '1px solid #ddd', borderRadius: '6px', background: '#fff', cursor: 'pointer', fontSize: '0.85rem' }}>
          PDF
        </button>
        <button onClick={exportWord} style={{ padding: '6px 14px', border: '1px solid #ddd', borderRadius: '6px', background: '#fff', cursor: 'pointer', fontSize: '0.85rem' }}>
          Word
        </button>
        <button onClick={exportPptx} style={{ padding: '6px 14px', border: '1px solid #ddd', borderRadius: '6px', background: '#fff', cursor: 'pointer', fontSize: '0.85rem' }}>
          PowerPoint
        </button>
        <button onClick={exportExcel} style={{ padding: '6px 14px', border: '1px solid #ddd', borderRadius: '6px', background: '#fff', cursor: 'pointer', fontSize: '0.85rem' }}>
          Excel
        </button>
        <button onClick={() => {
          if (window.confirm('Re-generate this report? Your edits will be replaced.')) {
            handleReportDownload();
          }
        }} style={{ padding: '6px 14px', border: '1px solid #C3E11D', borderRadius: '6px', background: '#fafff0', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500 }}>
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
          } catch (e) { console.error('Create playbook error:', e); }
        }} style={{ padding: '6px 14px', border: '1px solid #00316f', borderRadius: '6px', background: '#f0f5ff', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500, color: '#00316f' }}>
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
    </div>
  );
};

Editor.propTypes = {
  placeholder: PropTypes.string,
  title: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  data: PropTypes.any,
};

Editor.defaultProps = {
  height: '100%',
};

export default Editor;
