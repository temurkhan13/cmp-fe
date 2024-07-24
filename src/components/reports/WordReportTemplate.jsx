import React from 'react';
import { marked } from 'marked';
import styled from 'styled-components';

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
  justify-content: center;
  align-items: center;
  text-align: center;

  h1 {
    font-size: 36px;
  }
`;

const ContentPageContainer = styled(Page)`
  font-size: 16px;
  white-space: pre-wrap; /* Preserve white space formatting */
`;

const EndingPageContainer = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  h1 {
    font-size: 36px;
  }
`;

const splitContentIntoPages = (htmlContent) => {
  const lines = htmlContent.split('\n');
  const pages = [];
  let currentPage = '';

  lines.forEach(line => {
    if (currentPage.length + line.length > 1800) { // Approximate character limit per page
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
        <h1>Cover Page Title</h1>
      </CoverPageContainer>
      {pages.map((pageContent, index) => (
        <ContentPageContainer
          key={index}
          dangerouslySetInnerHTML={{ __html: pageContent }}
        />
      ))}
      <EndingPageContainer>
        <h1>Ending Page</h1>
      </EndingPageContainer>
    </div>
  );
};

export default WordReportTemplate;
