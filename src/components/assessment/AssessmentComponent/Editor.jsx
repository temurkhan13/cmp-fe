import PropTypes from 'prop-types';
import { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import WordReportTemplate from '../../reports/WordReportTemplate';
import ReactDOMServer from 'react-dom/server';
import htmlToPdfmake from 'html-to-pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Editor = ({ placeholder, height, data, title, }) => {
  const editor = useRef(null);
  const [content, setContent] = useState(data);

  const markdownData = data 

  const downloadPdf = () => {
    const editorContent = editor.current.value;

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
    pdfMake.createPdf(documentDefinition).download('jodit-editor-content.pdf');
  };

  // Generate HTML for TrioPage
  const reportHtml = ReactDOMServer.renderToStaticMarkup(
    <WordReportTemplate title={title} content={markdownData} />
  );

  const htmlToDocx = (html) => {};

  const downloadDocx = async (content) => {
    try {
      const doc = htmlToDocx(content);

      // Convert the DOCX document to a Blob
      const blob = await Packer.toBlob(doc);
      saveAs(blob, 'document.docx');
    } catch (error) {
      console.error('Error generating DOCX file:', error);
    }
  };

  useEffect(() => {
    setContent(reportHtml);
  }, [reportHtml]);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || 'Start typing...',
      height: height || '100%', // Set the height here
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      toolbarButtonSize: 'large',
      toolbarAdaptive: true,
      extraPlugins: ['export-docs'],
      export: {
        fileProxy: '/export-to-pdf', // Ensure this endpoint is correctly set up on your server
        download: true, // Enable download directly from the editor
      },
      aiAssistant: {
        aiTranslateToFrenchPrompt: '',

        aiAssistantCallback(propmt, htmlFragment) {
          return Promise.resolve('AI Assistant is not configured');
        },
      },
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
          name: 'export',
          iconURL: 'http://localhost:5173/src/assets/common/icon.svg',
          exec: (editor) => {
            const content = editor.getEditorValue();
            console.log(content);
            downloadDocx(content);
            //  const blob = new Blob([content], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
            // const docxContent = HTMLDocx.asBlob(content);
            // const link = document.createElement('a');
            // link.href = URL.createObjectURL(docxContent);
            // link.download = 'document.docx';
            // link.click();
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
    <div>
      {' '}
      <button onClick={downloadPdf}>Download as PDF</button>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1}
        onBlur={(newContent) => setContent(newContent)}
        onChange={() => {}}
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
