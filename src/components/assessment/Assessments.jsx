import { useState } from 'react';

import SideBarModal from '../../components/common/SideBarModal';

import AssessmentTasks from './AssessmentComponent/AssessmentTasks';
import AssessmentMedia from './AssessmentComponent/AssessmentMedia';
import AssessmentComments from './AssessmentComponent/AssessmentComments';
import AsessmentBookmark from './AssessmentComponent/AssessmentBookMark';
import AssessmentVersionHistory from './AssessmentComponent/AssessmentVersionHistory';

import { RxAvatar } from 'react-icons/rx';
import { IoIosChatboxes } from 'react-icons/io';
import { PiClockCounterClockwiseBold } from 'react-icons/pi';
import {
  FaRegQuestionCircle,
  FaBookmark,
  FaImages,
  FaUserCircle,
} from 'react-icons/fa';

const tasks = [
  { name: 'Assessment Progress', progress: 3 },
  { name: 'Change vision/case for change', progress: 100 },
  { name: 'Change approach / strategy', progress: 50 },
  { name: 'Change impact assessment', progress: 65 },
  { name: 'Stakeholder assessment/map', progress: 100 },
  { name: 'ADKAR assessment', progress: 100 },
  { name: 'Training assessment', progress: 7 },
  { name: 'Communications plan', progress: 20 },
  { name: 'Engagement plan', progress: 68 },
  { name: 'Training plan', progress: 20 },
  { name: 'Key messages by stakeholder group', progress: 75 },
  { name: 'Briefing messages', progress: 12 },
  { name: 'Benefits/Adoption KPIs', progress: 6 },
  { name: "What's changing and what is not summary", progress: 50 },
  { name: 'Champions survey', progress: 100 },
];
const versions = [
  {
    date: 'Today at 14:13 AM',
    users: [{ name: 'Imran' }, { name: 'Sherrimac Gyver' }],
  },
  {
    date: 'April 28, 2024 | 8:00 PM',
    users: [{ name: 'Imran' }, { name: 'Sherrimac Gyver' }],
  },
  {
    date: 'Feb 28, 2024 | 8:00 PM',
    users: [{ name: 'Imran' }, { name: 'Sherrimac Gyver' }],
  },
  {
    date: 'Jan 28, 2024 | 8:00 PM',
    users: [{ name: 'Imran' }, { name: 'Sherrimac Gyver' }],
  },
  {
    date: 'Today at 14:13 AM',
    users: [{ name: 'Imran' }, { name: 'Sherrimac Gyver' }],
  },
];
const images = [
  'https://picsum.photos/id/0/5000/3333',
  'https://picsum.photos/id/7/4728/3168',
  'https://picsum.photos/id/10/2500/1667',
  'https://picsum.photos/id/11/2500/1667',
  'https://picsum.photos/id/13/2500/1667',
  'https://picsum.photos/id/16/2500/1667',
  'https://picsum.photos/id/24/4855/1803',
  'https://picsum.photos/id/28/4928/3264',
  'https://picsum.photos/id/27/3264/1836',
  'https://picsum.photos/id/29/4000/2670',
  'https://picsum.photos/id/0/5000/3333',
  'https://picsum.photos/id/7/4728/3168',
  'https://picsum.photos/id/10/2500/1667',
  'https://picsum.photos/id/11/2500/1667',
  'https://picsum.photos/id/13/2500/1667',
  'https://picsum.photos/id/16/2500/1667',
  'https://picsum.photos/id/24/4855/1803',
  'https://picsum.photos/id/28/4928/3264',
  'https://picsum.photos/id/27/3264/1836',
  'https://picsum.photos/id/29/4000/2670',
];
const documents = [
  {
    name: 'file_name_123',
    date: 'April 18, 2024, 6:17 PM',
    size: '2,345 KB',
  },
  {
    name: 'file_name_123',
    date: 'April 18, 2024, 6:17 PM',
    size: '2,345 KB',
  },
  {
    name: 'file_name_123',
    date: 'April 18, 2024, 6:17 PM',
    size: '2,345 KB',
  },
  {
    name: 'file_name_123',
    date: 'April 18, 2024, 6:17 PM',
    size: '2,345 KB',
  },
  {
    name: 'file_name_123',
    date: 'April 18, 2024, 6:17 PM',
    size: '2,345 KB',
  },
  {
    name: 'file_name_123',
    date: 'April 18, 2024, 6:17 PM',
    size: '2,345 KB',
  },
  {
    name: 'file_name_123',
    date: 'April 18, 2024, 6:17 PM',
    size: '2,345 KB',
  },
  {
    name: 'file_name_123',
    date: 'April 18, 2024, 6:17 PM',
    size: '2,345 KB',
  },
  {
    name: 'file_name_123',
    date: 'April 18, 2024, 6:17 PM',
    size: '2,345 KB',
  },
];
const links = [
  {
    name: 'www.figma.com',
    url: 'https://www.figma.com/design/NFE9opL7eqFHBJ...',
  },
  {
    name: 'www.figma.com',
    url: 'https://www.figma.com/design/NFE9opL7eqFHBJ...',
  },
  {
    name: 'www.figma.com',
    url: 'https://www.figma.com/design/NFE9opL7eqFHBJ...',
  },
  {
    name: 'www.figma.com',
    url: 'https://www.figma.com/design/NFE9opL7eqFHBJ...',
  },
  {
    name: 'www.figma.com',
    url: 'https://www.figma.com/design/NFE9opL7eqFHBJ...',
  },
];
const data = [
  {
    date: 'Today',
    messages: [
      {
        avatar: <RxAvatar />,
        sender: 'ChangeAI',
        text: 'The ADKAR model is a framework designed to guide individuals and organizations through change. Developed by Jeff Hiatt, it provides a structured approach to understanding and managing change at both personal and organizational levels.',
        savedBy: 'You',
      },
    ],
  },
  {
    date: 'Yesterday',
    messages: [
      {
        avatar: <RxAvatar />,
        sender: 'ChangeAI',
        text: 'The ADKAR model is a framework designed to guide individuals and organizations through change. Developed by Jeff Hiatt, it provides a structured approach to understanding and managing change at both personal and organizational levels.',
        savedBy: 'Imran',
      },
    ],
  },
  {
    date: 'Yesterday',
    messages: [
      {
        avatar: <RxAvatar />,
        sender: 'ChangeAI',
        text: 'The ADKAR model is a framework designed to guide individuals and organizations through change. Developed by Jeff Hiatt, it provides a structured approach to understanding and managing change at both personal and organizational levels.',
        savedBy: 'Imran',
      },
    ],
  },
  {
    date: 'Yesterday',
    messages: [
      {
        avatar: <RxAvatar />,
        sender: 'ChangeAI',
        text: 'The ADKAR model is a framework designed to guide individuals and organizations through change. Developed by Jeff Hiatt, it provides a structured approach to understanding and managing change at both personal and organizational levels.',
        savedBy: 'Imran',
      },
    ],
  },
];
const Comment = {
  id: 1,
  time: 'Today',
  avatar: <FaUserCircle />,
  name: 'Jerald Huels',
  text: 'Can you explain the ADKAR model? How it works?',
  status: 'It’s Completed.',
  replies: [
    {
      id: 11,
      time: 'Today',
      avatar: <FaUserCircle />,
      name: 'Imran',
      text: 'Sure, let me explain.',
    },
    {
      id: 12,
      time: 'Today',
      avatar: <FaUserCircle />,
      name: 'Alex',
      text: 'I can help too.',
    },
    {
      id: 13,
      time: 'Today',
      avatar: <FaUserCircle />,
      name: 'Alex',
      text: 'I can help too.',
    },
    {
      id: 14,
      time: 'Today',
      avatar: <FaUserCircle />,
      name: 'Alex',
      text: 'I can help too.',
    },
    {
      id: 15,
      time: 'Today',
      avatar: <FaUserCircle />,
      name: 'Alex',
      text: 'I can help too.',
    },
    {
      id: 16,
      time: 'Today',
      avatar: <FaUserCircle />,
      name: 'Alex',
      text: 'I can help too.',
    },
    {
      id: 17,
      time: 'Today',
      avatar: <FaUserCircle />,
      name: 'Alex',
      text: 'I can help too.',
    },
    {
      id: 18,
      time: 'Today',
      avatar: <FaUserCircle />,
      name: 'Alex',
      text: 'I can help too.',
    },
    {
      id: 19,
      time: 'Today',
      avatar: <FaUserCircle />,
      name: 'Alex',
      text: 'I can help too.',
    },
    {
      id: 20,
      time: 'Today',
      avatar: <FaUserCircle />,
      name: 'Alex',
      text: 'I can help too.',
    },
  ],
};

const Assessments = () => {
  const [activeIcon, setActiveIcon] = useState(null);

  const handleIconClick = (icon) => {
    setActiveIcon((prevIcon) => (prevIcon === icon ? null : icon));
  };

  return (
    <>
      <section className="iconSection">
        <div className="iconContainer">
          <span
            className={`iconButton ${
              activeIcon === 'question' ? 'active' : ''
            }`}
            onClick={() => handleIconClick('question')}
          >
            <FaRegQuestionCircle className="icon" />
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
            <span className="tooltip">Images</span>
          </span>
          <span
            className={`iconButton ${activeIcon === 'message' ? 'active' : ''}`}
            onClick={() => handleIconClick('message')}
          >
            <IoIosChatboxes className="icon" />
            <span className="tooltip">Comments</span>
          </span>
          <span
            className={`iconButton ${
              activeIcon === 'bookmark' ? 'active' : ''
            }`}
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
          bodyContent={<AssessmentTasks tasks={tasks} />}
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
          title="Images"
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
          bodyContent={<AssessmentComments Comments={Comment} />}
          onClose={() => setActiveIcon(null)}
        />
      )}
      {activeIcon === 'bookmark' && (
        <SideBarModal
          title="Bookmark"
          bodyContent={
            <div>
              {data.map((item, index) => (
                <AsessmentBookmark
                  key={index}
                  date={item.date}
                  messages={item.messages}
                />
              ))}
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
  position: relative; /* Ensure tooltips are positioned relative to the icon button */
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
