import { marked } from 'marked';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Sidebarlogo from '@assets/dashboard/sidebarLogo.png';
// Import your cover photo here. Replace the path with the actual path to your cover photo.
import CoverPhoto from '../../assets/common/coverPhoto.svg';

const Page = styled.div`
  width: 21cm;
  height: 29.7cm;
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
`;

const FormatPageContainer = styled(Page)`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
  color: #333;
  line-height: 1.5;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  p {
    max-width: 80%;
    text-align: center;
  }
`;

const ContentPageContainer = styled(Page)`
  font-size: 16px;
  white-space: pre-wrap;
`;

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

const WordReportTemplate = ({ content }) => {
  const htmlContent = marked(content);
  const pages = splitContentIntoPages(htmlContent);

  return (
    <div>
      <CoverPageContainer>
        <div className="header">
          <img src={Sidebarlogo} alt="Logo" className="logo" />
        </div>
        {/* Displaying the cover photo */}
        <img src={CoverPhoto} alt="Cover" className="cover-photo" />
        {/* <div className="footer">
          <p>1234 Street Name</p>
          <p>City, State, ZIP</p>
          <p>(123) 456-7890</p>
          <p>www.yourwebsite.com</p>
        </div> */}
      </CoverPageContainer>

      {/* <FormatPageContainer>
        <h2>Document Format</h2>
        <p>
          This document follows a structured format with clear sections and
          proper pagination to ensure readability and compliance with standard
          documentation practices.
        </p>
      </FormatPageContainer> */}

      {pages.map((pageContent, index) => (
        <ContentPageContainer
          key={index}
          dangerouslySetInnerHTML={{ __html: pageContent }}
        />
      ))}
    </div>
  );
};

WordReportTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default WordReportTemplate;
