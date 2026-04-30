import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { SideBarModal } from '../modal';

import AssessmentTasks from './AssessmentComponent/AssessmentTasks';
import Media from '../chat/Media';
import AssessmentComments from './AssessmentComponent/AssessmentComments';
import ChatBookmark from '../assistant/assistantModal/ChatBookmark';
import AssessmentVersionHistory from './AssessmentComponent/AssessmentVersionHistory';

import { PiClockCounterClockwiseBold } from 'react-icons/pi';
import {
  FaBookmark,
  FaImages,
} from 'react-icons/fa';
import { RiNewspaperLine } from 'react-icons/ri';

const Assessments = ({ handleAssessmentSelect, folderID, chatMedia, bookmarkData = [], isOverlay = false, isVisible = false, onClose }) => {
  const [activeIcon, setActiveIcon] = useState('question');
  const [comments] = useState([]);
  const { id: assessmentId } = useParams();

  const images = chatMedia?.images || [];
  const documents = chatMedia?.documents || [];
  const links = chatMedia?.links || [];

  const handleIconClick = (icon) => {
    setActiveIcon((prevIcon) => (prevIcon === icon ? null : icon));
  };

  return (
    <>
      <section className={`iconSection ${isOverlay ? 'iconSection--overlay' : ''} ${isOverlay && isVisible ? 'iconSection--visible' : ''}`}>
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
          {/* <span
            className={`iconButton ${activeIcon === 'message' ? 'active' : ''}`}
            onClick={() => handleIconClick('message')}
          >
            <IoIosChatboxes className="icon" />
            <span className="tooltip">Comments</span>
          </span> */}
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
              onTaskSelected={() => {
                setActiveIcon(null);
                if (isOverlay && onClose) onClose();
              }}
            />
          }
          onClose={() => setActiveIcon(null)}
        />
      )}
      {activeIcon === 'clock' && (
        <SideBarModal
          title="Version History"
          bodyContent={<AssessmentVersionHistory assessmentId={assessmentId} onClose={() => setActiveIcon(null)} />}
          onClose={() => setActiveIcon(null)}
        />
      )}
      {activeIcon === 'gallery' && (
        <SideBarModal
          title="Media"
          bodyContent={
            <Media
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
            <ChatBookmark messages={bookmarkData} />
          }
          onClose={() => setActiveIcon(null)}
        />
      )}

    </>
  );
};

export default Assessments;
