import { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import Components from '@components';
import data from '@data';
//

import { FaHistory } from 'react-icons/fa';
import { FaBookmark } from 'react-icons/fa';
import { GrGallery } from 'react-icons/gr';
import { GoCommentDiscussion } from 'react-icons/go';

const Assessments = () => {
  const [showAssessmentList, setShowAssessmentList] = useState(false);

  const handleToggle = () => {
    setShowAssessmentList(!showAssessmentList);
  };

  return (
    <>
      {showAssessmentList && (
        <div className="assessmentList">
          <header>
            <Components.Feature.Text className="main--bold">
              Assessments
            </Components.Feature.Text>
            <span onClick={handleToggle}>
              <RxCross2 />
            </span>
          </header>
          <section>
            <Components.Feature.DropDownList
              name="Q&A Assessments"
              data={data.chat.assessmentQnaData}
            />
            <Components.Feature.DropDownList
              name="Survey"
              data={data.chat.serverData}
              link={true}
            />
            <Components.Feature.DropDownList
              name="Checks / FAQs"
              data={data.chat.faqData}
              link={true}
            />
          </section>
        </div>
      )}

      <section className="iconSection">
        <div className="iconContainer">
          <span onClick={handleToggle} className="iconButton">
            <FaHistory className="icon" />
          </span>
          <span onClick={handleToggle} className="iconButton">
            <GrGallery className="icon" />
          </span>
          <span onClick={handleToggle} className="iconButton">
            <GoCommentDiscussion className="icon" />
          </span>
          <span onClick={handleToggle} className="iconButton">
            <FaBookmark className="icon" />
          </span>
        </div>
      </section>

      <style jsx>{`
        .assessmentList {
          width: ${showAssessmentList ? '30.8rem' : '0'};
          transition: width 0.3s;
        }
        .iconSection {
          display: flex;
          flex-direction: column;
        }
        .iconContainer {
          padding-top: 1rem;
          padding-bottom: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          border: 1px solid lightgray;
          border-radius: 10px;
          align-items: center;
          justify-content: center;
          width: 3.5rem;
        }
        .iconButton {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          width: 2.7rem;
          height: 2.7rem;
          background: #d9d9d9;
          border-radius: 8px;
        }
        .icon {
          width: 1.8rem;
          height: 1.8rem;
          color: #595959;
        }
      `}</style>
    </>
  );
};

export default Assessments;
