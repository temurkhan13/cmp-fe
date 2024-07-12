// import { RxCross2 } from 'react-icons/rx';
// import Components from '@components';
// import data from '@data';
{
  /* {showAssessmentList && (
        <div className="assessmentList">
          <header>
            <Components.Feature.Text className="main--bold">
              Assessments
            </Components.Feature.Text>
            <span >
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
            )} */
}

import { useState } from 'react';
// import icon from '../../../assets/common/index';
import Media from './assessmentModal/Media';
import Comment from './assessmentModal/Comments';
import AssessmentModal from './assessmentModal/Index';
import ChatBookmark from './assessmentModal/ChatBookmark';
import VersionHistory from './assessmentModal/VersionHistory';

import { RxAvatar } from 'react-icons/rx';
// import { FaUserCircle } from 'react-icons/fa';
import { IoIosChatboxes } from 'react-icons/io';
import { FaHistory, FaBookmark, FaImages } from 'react-icons/fa';

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
const comments = [];

const Assessments = () => {
  const [isVersionHistoryModalOpen, setIsVersionHistoryModalOpen] =
    useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);

  const closeModal = () => {
    setIsVersionHistoryModalOpen(false);
    setIsMediaModalOpen(false);
    setIsCommentsModalOpen(false);
    setIsBookmarkModalOpen(false);
  };

  return (
    <>
      <section className="iconSection">
        <div className="iconContainer">
          <span
            className={`iconButton ${
              isVersionHistoryModalOpen ? 'active' : ''
            }`}
            onClick={() => setIsVersionHistoryModalOpen(true)}
          >
            <FaHistory className="icon" size={20} />
            <span className="tooltip">Version History</span>
          </span>
          <span
            className={`iconButton ${isMediaModalOpen ? 'active' : ''}`}
            onClick={() => setIsMediaModalOpen(true)}
          >
            <FaImages className="icon" size={20} />
            <span className="tooltip">Media</span>
          </span>
          <span
            className={`iconButton ${isCommentsModalOpen ? 'active' : ''}`}
            onClick={() => setIsCommentsModalOpen(true)}
          >
            <IoIosChatboxes className="icon" size={22} />
            <span className="tooltip">Comments</span>
          </span>
          <span
            className={`iconButton ${isBookmarkModalOpen ? 'active' : ''}`}
            onClick={() => setIsBookmarkModalOpen(true)}
          >
            <FaBookmark className="icon" size={20} />
            <span className="tooltip">Bookmark</span>
          </span>
        </div>
      </section>

      {isVersionHistoryModalOpen && (
        <AssessmentModal
          title="Version History"
          bodyContent={<VersionHistory versions={versions} />}
          onClose={closeModal}
        />
      )}
      {isMediaModalOpen && (
        <AssessmentModal
          title="Media"
          bodyContent={
            <Media images={images} documents={documents} links={links} />
          }
          onClose={closeModal}
        />
      )}
      {isCommentsModalOpen && (
        <AssessmentModal
          title="Comments"
          bodyContent={<Comment {...comments} />}
          onClose={closeModal}
        />
      )}
      {isBookmarkModalOpen && (
        <AssessmentModal
          title="Book Mark"
          bodyContent={
            <div>
              {data.map((item, index) => (
                <ChatBookmark
                  key={index}
                  date={item.date}
                  messages={item.messages}
                />
              ))}
            </div>
          }
          onClose={closeModal}
        />
      )}

      <style>{`
        .iconSection {
          display: flex;
          flex-direction: column;
          align-items: center;
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
          width: 5rem;
        }
        .iconButton {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 8px;
          position: relative;
        }
        .iconButton:hover {
          background: #d9d9d9;
        }
        .iconButton.active {
          background: black;
          transition: opacity 0.5s;
        }
        .iconButton.active .icon {
          color: white;
        }
        .icon {
          color: #595959;
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
