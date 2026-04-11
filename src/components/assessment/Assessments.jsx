import { useState } from 'react';

import SideBarModal from '../../components/common/SideBarModal';

import AssessmentTasks from './AssessmentComponent/AssessmentTasks';
import AssessmentMedia from './AssessmentComponent/AssessmentMedia';
import AssessmentComments from './AssessmentComponent/AssessmentComments';
import AsessmentBookmark from './AssessmentComponent/AssessmentBookMark';
import AssessmentVersionHistory from './AssessmentComponent/AssessmentVersionHistory';

import { IoIosChatboxes } from 'react-icons/io';
import { PiClockCounterClockwiseBold } from 'react-icons/pi';
import {
  FaBookmark,
  FaImages,
  FaUserCircle,
} from 'react-icons/fa';
import { RiNewspaperLine } from 'react-icons/ri';

const Assessments = ({ handleAssessmentSelect, folderID, assessmentData }) => {
  const [activeIcon, setActiveIcon] = useState('question');
  const handleIconClick = (icon) => {
    setActiveIcon((prevIcon) => (prevIcon === icon ? null : icon));
  };

  // Extract real data from assessmentData
  const versions = (assessmentData?.qa || []).map((qa, index) => ({
    date: qa.createdAt || qa.created_at || new Date().toISOString(),
    users: [{ name: 'You' }],
  }));

  const images = [];
  const documents = [];
  const links = [];
  const bookmarkData = [];

  // Extract comments from assessment messages
  const comments = assessmentData?.comments || [];
  const Comment = comments.length > 0 ? comments[0] : {
    id: 0,
    time: '',
    avatar: <FaUserCircle />,
    name: '',
    text: 'No comments yet',
    status: '',
    replies: [],
  };

  return (
    <>
      <section className="iconSection">
        <div className="iconContainer">
          <span
            className={`iconButton ${activeIcon === 'question' ? 'active' : ''}`}
            onClick={() => handleIconClick('question')}
          >
            <RiNewspaperLine className="icon" />
            <span className="tooltip">Assessments</span>
          </span>
          <span
            className={`iconButton ${activeIcon === 'clock' ? 'active' : ''}`}
            onClick={() => handleIconClick('clock')}
          >
            <PiClockCounterClockwiseBold className="icon" />
            <span className="tooltip">Version History</span>
          </span>
          <span
            className={`iconButton ${activeIcon === 'gallery' ? 'active' : ''}`}
            onClick={() => handleIconClick('gallery')}
          >
            <FaImages className="icon" />
            <span className="tooltip">Media</span>
          </span>
          <span
            className={`iconButton ${activeIcon === 'message' ? 'active' : ''}`}
            onClick={() => handleIconClick('message')}
          >
            <IoIosChatboxes className="icon" />
            <span className="tooltip">Comments</span>
          </span>
          <span
            className={`iconButton ${activeIcon === 'bookmark' ? 'active' : ''}`}
            onClick={() => handleIconClick('bookmark')}
          >
            <FaBookmark className="icon" />
            <span className="tooltip">Bookmark</span>
          </span>
        </div>
      </section>

      {activeIcon === 'question' && (
        <SideBarModal
          title="Assessments"
          bodyContent={
            <AssessmentTasks
              tasks={[]}
              folderID={folderID}
              handleAssessmentSelect={handleAssessmentSelect}
            />
          }
          onClose={() => setActiveIcon(null)}
        />
      )}
      {activeIcon === 'clock' && (
        <SideBarModal
          title="Version History"
          bodyContent={<AssessmentVersionHistory versions={versions} />}
          onClose={() => setActiveIcon(null)}
        />
      )}
      {activeIcon === 'gallery' && (
        <SideBarModal
          title="Media"
          bodyContent={
            <AssessmentMedia
              images={images}
              documents={documents}
              links={links}
            />
          }
          onClose={() => setActiveIcon(null)}
        />
      )}
      {activeIcon === 'message' && (
        <SideBarModal
          title="Comments"
          bodyContent={<AssessmentComments comments={comments} />}
          onClose={() => setActiveIcon(null)}
        />
      )}
      {activeIcon === 'bookmark' && (
        <SideBarModal
          title="Bookmark"
          bodyContent={
            <div>
              {bookmarkData.length > 0 ? (
                bookmarkData.map((item, index) => (
                  <AsessmentBookmark
                    key={index}
                    date={item.date}
                    messages={item.messages}
                  />
                ))
              ) : (
                <p style={{ padding: '1rem', color: '#888', textAlign: 'center' }}>No bookmarks yet</p>
              )}
            </div>
          }
          onClose={() => setActiveIcon(null)}
        />
      )}

      <style>{`
        .iconSection {
          display: flex;
          flex-direction: column;
        }
        .iconContainer {
          display: flex;
          flex-direction: column;
          border: 0.063rem solid lightgray;
          border-radius: 1rem;
          align-items: center;
          width: 4rem;
        }
      .iconButton {
  display: flex;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  margin-top: 0.6rem;
  margin-bottom: 0.6rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: white;
  border-radius: 0.6rem;
  transition: background-color 0.3s ease;
  padding: 0.5rem;
  position: relative;
}
        .icon {
          font-size: 2rem;
          color: gray;
        }
        .iconButton.active {
          background-color: black;
        }
        .iconButton.active .icon {
          color: white;
        }
.tooltip {
          visibility: hidden;
          background-color: black;
          color: #fff;
          text-align: center;
          border-radius: 6px;
          padding: 1rem;
          font-size: 1.2rem;
          position: absolute;
          z-index: 1;
          bottom: 0%;
          right: 135%;
          opacity: 0;
          transition: opacity 0.5s;
          white-space: nowrap;
        }
      .iconButton:hover .tooltip {
  visibility: visible;
  opacity: 1;
}
   .tooltip::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 100%;
          margin-top: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: transparent transparent transparent black;
        }
      `}</style>
    </>
  );
};

export default Assessments;
