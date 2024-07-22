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

const WordReportTemplate = ({ content }) => (
  <div>
    <CoverPageContainer>
      <h1>Cover Page Title</h1>
    </CoverPageContainer>
    <ContentPageContainer
      dangerouslySetInnerHTML={{ __html: marked(content) }}
    />
    <EndingPageContainer>
      <h1>Ending Page</h1>
    </EndingPageContainer>
  </div>
);

export default WordReportTemplate;
