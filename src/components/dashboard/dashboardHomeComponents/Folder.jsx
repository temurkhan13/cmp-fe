import { Link } from 'react-router-dom';

import Workspaces from './Workspaces';
import CountingCards from './CountingCards';
import FileStructure from '../../dashboard/FileStructure';

import { TiPlus } from 'react-icons/ti';
import { BsFilterLeft } from 'react-icons/bs';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { BsFilterCircle } from 'react-icons/bs';
import { HiAdjustmentsHorizontal } from 'react-icons/hi2';
import { TfiMenuAlt } from 'react-icons/tfi';
import { SlArrowRight } from 'react-icons/sl';
import { SlArrowLeft } from 'react-icons/sl';
import { CgMenuGridR } from 'react-icons/cg';
import { PiFilesFill } from 'react-icons/pi';

const Folder = () => {
  const truncateString = (str, num) =>
    str.length > num ? str.slice(0, num) + '...' : str;

  const mockFiles = [
    { name: 'AI Overview' },
    { name: 'Machine Learning Basics' },
    { name: 'Advanced Neural Networks' },
    { name: 'Introduction to NLP' },
    { name: 'AI in Robotics' },
    { name: 'Reinforcement Learning Concepts' },
    { name: 'AI and Ethics' },
    { name: 'AI in Healthcare Applications' },
    { name: 'AI in Financial Services' },
    { name: 'Data Science Techniques' },
    { name: 'Predictive Modeling' },
    { name: 'AI and Privacy' },
    { name: 'Computer Vision Applications' },
    { name: 'Deep Learning Explained' },
    { name: 'AI for Beginners' },
    { name: 'AI Research Papers' },
    { name: 'Natural Language Processing Guide' },
    { name: 'Understanding AI Algorithms' },
    { name: 'AI in Marketing' },
    { name: 'AI in Education' },
    { name: 'AI Overview' },
    { name: 'Machine Learning Basics' },
    { name: 'Advanced Neural Networks' },
    { name: 'Introduction to NLP' },
    { name: 'AI in Robotics' },
    { name: 'Reinforcement Learning Concepts' },
    { name: 'AI and Ethics' },
    { name: 'AI in Healthcare Applications' },
  ];

  return (
    <div className="dashboard">
      <section className="generate" style={{ marginTop: '2rem' }}>
        <div className="container">
          <div className="left-buttons">
            <button className="arrow-btn">
              <SlArrowLeft />
            </button>
            <button className="arrow-btn">
              <SlArrowRight />
            </button>
            <p className="assistant-heading">Folders</p>
          </div>

          <div className="center-buttons">
            <div className="left-buttons">
              <CgMenuGridR className="icon" />
              <TfiMenuAlt className="icon-small" />
            </div>
            {/* <div className="right-buttons">
              <BsFilterLeft className="filter-icon" />
              <MdOutlineKeyboardArrowDown className="icon-small" />
            </div>
            <div className="right-buttons">
              <BsFilterCircle className="icon-small" />
              <MdOutlineKeyboardArrowDown className="icon-small" />
            </div>
            <div className="right-buttons">
              <HiAdjustmentsHorizontal className="adjustments-icon" />
            </div> */}
            <div>
              <Link
                to="/assisstant/chat"
                target="_blank"
                style={{ textDecoration: 'none' }}
              >
                <button className="assiss-btn">
                  <TiPlus />
                  New Folder
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <FileStructure />
      <style>{`
        .dashboard {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
          .generate {
          background-color: rgba(249, 249, 249, 1);
        }
        .generate .container {
          display: flex;
          text-align: center;
          align-items: center;
          justify-content: space-between;
          padding: 1%;
          height: 10vh;
        }
        .generate .arrow-btn {
          height: 40px;
          width: 40px;
          border: none;
          outline: none;
          border-radius: 50%;
          background: transparent;
        }
        .generate .assistant-heading {
          font-family: 'Poppins';
          font-size: 20px;
          font-weight: 600;
          line-height: 36px;
          letter-spacing: 0.12px;
          text-align: left;
          color: black;
        }
        .generate .assiss-btn {
          background-color: rgba(10, 10, 10, 1);
          display: flex;
          text-align: center;
          align-items: center;
          justify-content: space-between;
          color: white;
          border-radius: 8px;
          margin-left: 10px;
          padding: 10px 20px;
        }
        .generate .left-buttons,
        .generate .center-buttons,
        .generate .right-buttons {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .generate .center-buttons {
          justify-content: space-between;
        }
        .generate .icon {
          font-size: 26px;
        }
        .generate .icon-small {
          margin-right: 30px;
          margin-left: 5px;
          font-size: 18px;
        }
        .generate .filter-icon {
          font-size: 22px;
        }
        .generate .adjustments-icon {
          margin-right: 30px;
          font-size: 22px;
        }
        .files {
          padding: 0 2rem;
          // margin-top:1rem;
          border-right: 2px solid lightgray;
        }
        .files-heading {
          font-size: 2.5rem;
          display: flex;
          font-weight: 600;
          margin-top: 2rem;
          padding: 0 3rem;
        }
        .file-list {
          display: flex;
          flex-wrap: wrap;
          flex-direction: row;
          gap: 1rem;
        }
        .file-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: gray;
          cursor: pointer;
          font-size: 1.25rem;
          gap: 0.1rem;
          padding: 0.5rem;
          border-radius: 0.8rem;
          &:hover {
          background-color: #f0f0f0;
        }
        }
      `}</style>
    </div>
  );
};

export default Folder;
