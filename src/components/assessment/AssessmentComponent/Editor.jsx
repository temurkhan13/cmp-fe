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

  useEffect(() => {
    console.log('REPORRRTTTT IDDDDD', data);
  });

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

      console.log('Full API response:', response);

      // Update the editor content with Markdown
      setContent(response?.content); // Ensure safe fallback
    } catch (error) {
      console.error('Error updating the report:', error);
    }
  };

  const handleReportDownload = async () => {
    try {
      console.log('Assessment ID:', assessmentID);

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

      console.log('Download successful');
    } catch (error) {
      console.error('Error downloading the report:', error);
      alert('An unexpected error occurred. Please try again.');
    }
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
    } catch (error) {
      console.error('Error generating DOCX file:', error);
    }
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

  return (
    <div style={{ width: '870px' }}>
      <JoditEditor
        ref={editor}
        value={htmlContent} // Render HTML in the editor
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
