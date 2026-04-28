import { marked } from 'marked';
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Sidebarlogo from '@assets/dashboard/sidebarLogo.png';
import CoverPhoto from '../../assets/common/coverPhoto.svg';
import { FaSave } from 'react-icons/fa';
import { FaDownload } from 'react-icons/fa6';
import Button from '../common/Button';

// Styled components
const Page = styled.div`
  width: 21cm;
  height: auto;
  padding: 2cm;
  margin: 1cm auto;
  border: 1px solid #ccc;
  box-sizing: border-box;
  page-break-after: always;
  overflow: hidden;

  @media print {
    box-shadow: none;
    margin: 0;
    border: none;
    page-break-after: always;
  }
`;

const CoverPageContainer = styled(Page)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: aliceblue;
  position: relative;
  height: 100vh;
  padding: 2rem;

  .header {
    position: absolute;
    top: 2rem;
    right: 2rem;
  }

  .logo {
    max-width: 9.375rem;
    height: auto;
  }

  .cover-photo {
    width: 100%;
    height: auto;
  }

  .footer {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    text-align: right;
    line-height: 1.5;
  }

  .floatBtn {
    position: fixed;
    bottom: 5rem;
    z-index: 99999;
    display: flex;
    gap: 0.5rem;
  }

  .floatBtn button {
    width: fit-content;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: none;
    box-shadow: 0 0 10px grey;
    display: flex;
    align-items: center;
    gap: 0.2rem;
  }
`;

const ContentPageContainer = styled(Page)`
  font-size: 16px;
  white-space: pre-wrap;
`;

// Helper function to split content into pages
const splitContentIntoPages = (htmlContent) => {
  const lines = htmlContent.split('\n');

  const pages = [];
  let currentPage = '';

  lines.forEach((line) => {
    if (currentPage.length + line.length > 1800) {
      pages.push(currentPage);
      currentPage = '';
    }
    currentPage += line + '\n';
  });

  if (currentPage) {
    pages.push(currentPage);
  }

  return pages;
};

// Main component
const WordReportTemplate = ({ content = '', title }) => {
  // Ensure content is a valid string
  const safeContent = content || '';
  const htmlContent = marked(safeContent || ''); // Convert Markdown to HTML
  const pages = splitContentIntoPages(htmlContent);

  return (
    <div>
      <CoverPageContainer>
        <div className="header">
          <img
            style={{ width: '100%', height: '100vh' }}
            src={Sidebarlogo}
            alt="Logo"
            className="logo"
          />
        </div>
        <img src={CoverPhoto} alt="Cover" className="cover-photo" />

        <div className="floatBtn">
          <Button variant="primary" iconLeft={<FaSave />}>
            Save
          </Button>
          <Button variant="primary" iconLeft={<FaDownload />}>
            Download
          </Button>
        </div>
      </CoverPageContainer>

      {pages.map((pageContent, index) => (
        <ContentPageContainer
          key={index}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(pageContent) }}
        />
      ))}
    </div>
  );
};

// PropTypes validation
WordReportTemplate.propTypes = {
  content: PropTypes.string, // Allow null or undefined
  title: PropTypes.string.isRequired,
};


export default WordReportTemplate;
