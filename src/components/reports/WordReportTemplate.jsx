import React from 'react';
import { marked } from 'marked';
import styled from 'styled-components';
import Sidebarlogo from '@assets/dashboard/sidebarLogo.png';

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
  color: yellowgreen;
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
    max-width: 9.375rem; /* 150px in rem */
    height: auto;
  }

  h1 {
    font-size: 2.25rem; /* 36px in rem */
    text-align: center;
    margin: 0;
  }

  .footer {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    text-align: right;
    line-height: 1.5;
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

  lines.forEach((line) => {
    if (currentPage.length + line.length > 1800) {
      // Approximate character limit per page
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

const WordReportTemplate = ({ content, title }) => {
  const htmlContent = marked(content);
  const pages = splitContentIntoPages(htmlContent);

  return (
    <div>
      <CoverPageContainer>
        <div className="header">
          <img src={Sidebarlogo} alt="Logo" className="logo" />
        </div>
        <h1>{title}</h1>
        <div className="footer">
          <p>1234 Street Name</p>
          <p>City, State, ZIP</p>
          <p>(123) 456-7890</p>
          <p>www.yourwebsite.com</p>
        </div>
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
