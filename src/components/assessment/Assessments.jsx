import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import SideBarModal from '../../components/common/SideBarModal';

import AssessmentTasks from './AssessmentComponent/AssessmentTasks';
import AssessmentMedia from './AssessmentComponent/AssessmentMedia';
import AssessmentComments from './AssessmentComponent/AssessmentComments';
import AsessmentBookmark from './AssessmentComponent/AssessmentBookMark';
import AssessmentVersionHistory from './AssessmentComponent/AssessmentVersionHistory';
import appConfig from '../../config/config.js';

import { IoIosChatboxes } from 'react-icons/io';
import { PiClockCounterClockwiseBold } from 'react-icons/pi';
import {
  FaBookmark,
  FaImages,
} from 'react-icons/fa';
import { RiNewspaperLine } from 'react-icons/ri';

const Assessments = ({ handleAssessmentSelect, folderID }) => {
  const [activeIcon, setActiveIcon] = useState('question');
  const [versions, setVersions] = useState([]);
  const [comments, setComments] = useState([]);
  const { id: assessmentId } = useParams();

  const handleIconClick = (icon) => {
    setActiveIcon((prevIcon) => (prevIcon === icon ? null : icon));
  };

  // Fetch assessment data directly from API when version history is opened
  useEffect(() => {
    if (activeIcon === 'clock' && assessmentId) {
      const token = localStorage.getItem('token');
      fetch(`${appConfig.apiURL}/workspace-assessment/${assessmentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((r) => r.json())
        .then((data) => {
          const assessment = data?.data || data;
          if (assessment?.qa?.length > 0) {
            const versionList = assessment.qa
              .filter((q) => q.status === 'answered' || q.answer)
              .map((q) => ({
                date: q.answered_at || q.answeredAt || q.created_at || q.createdAt || 'N/A',
                users: [{ name: q.question?.substring(0, 50) + '...' || 'Question' }],
              }));
            setVersions(versionList);
          }
          if (assessment?.report) {
            setVersions((prev) => [
              { date: assessment.report.generated_at || assessment.report.generatedAt || 'Report generated', users: [{ name: 'Report: ' + (assessment.report.title || assessment.name || 'Final Report') }] },
              ...prev,
            ]);
          }
        })
        .catch((e) => { if (import.meta.env.DEV) console.error('Version history fetch error:', e); });
    }
  }, [activeIcon, assessmentId]);

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
          bodyContent={<AssessmentComments comments={comments || []} />}
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
