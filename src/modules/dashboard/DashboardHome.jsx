import { useState } from 'react';
import DashboardLayout from '@layout/DashboardLayout';
import { BiSolidCollection } from 'react-icons/bi';
import { PiFilesFill } from 'react-icons/pi';
import PropTypes from 'prop-types';
import FileStructure from '../../components/dashboard/FileStructure';
import { FaFolderOpen } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';

const DashboardHome = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const mockFolders = [
    { name: 'AI Research', items: ['Neural Networks', 'Deep Learning'] },
    {
      name: 'Machine Learning',
      items: ['Supervised Learning', 'Unsupervised Learning'],
    },
    { name: 'Data Science', items: ['Data Cleaning', 'Data Visualization'] },
    {
      name: 'Natural Language Processing',
      items: ['Sentiment Analysis', 'Chatbots'],
    },
    {
      name: 'Computer Vision',
      items: ['Image Recognition', 'Object Detection'],
    },
    { name: 'Robotics', items: ['Path Planning', 'Control Systems'] },
    {
      name: 'Reinforcement Learning',
      items: ['Q-Learning', 'Policy Gradients'],
    },
    { name: 'AI Ethics', items: ['Bias in AI', 'Privacy Concerns'] },
    {
      name: 'AI in Healthcare',
      items: ['Predictive Analytics', 'Medical Imaging'],
    },
    {
      name: 'AI in Finance',
      items: ['Fraud Detection', 'Algorithmic Trading'],
    },
    {
      name: 'AI in Education',
      items: ['Personalized Learning', 'Automated Grading'],
    },
    {
      name: 'AI in Transportation',
      items: ['Autonomous Vehicles', 'Traffic Prediction'],
    },
    {
      name: 'AI in Marketing',
      items: ['Targeted Ads', 'Customer Segmentation'],
    },
    {
      name: 'AI in Retail',
      items: ['Inventory Management', 'Recommendation Systems'],
    },
    {
      name: 'AI in Agriculture',
      items: ['Crop Monitoring', 'Yield Prediction'],
    },
    {
      name: 'AI in Manufacturing',
      items: ['Process Optimization', 'Quality Control'],
    },
    {
      name: 'AI in Cybersecurity',
      items: ['Threat Detection', 'Anomaly Detection'],
    },
    {
      name: 'AI in Sports',
      items: ['Performance Analysis', 'Injury Prevention'],
    },
    {
      name: 'AI in Gaming',
      items: ['Procedural Content Generation', 'Game AI'],
    },
    { name: 'AI in Music', items: ['Music Generation', 'Audio Analysis'] },
    { name: 'AI in Art', items: ['Image Generation', 'Style Transfer'] },
    {
      name: 'AI in Environment',
      items: ['Climate Modeling', 'Conservation Efforts'],
    },
    { name: 'AI in Law', items: ['Legal Research', 'Contract Analysis'] },
    {
      name: 'AI in Human Resources',
      items: ['Talent Acquisition', 'Employee Engagement'],
    },
    {
      name: 'AI in Real Estate',
      items: ['Property Valuation', 'Market Analysis'],
    },
    {
      name: 'AI in Logistics',
      items: ['Supply Chain Optimization', 'Route Planning'],
    },
    {
      name: 'AI in Finance',
      items: ['Risk Management', 'Portfolio Optimization'],
    },
    { name: 'AI in Energy', items: ['Demand Forecasting', 'Grid Management'] },
    { name: 'AI in Fashion', items: ['Trend Analysis', 'Design Assistance'] },
    {
      name: 'AI in Communication',
      items: ['Speech Recognition', 'Language Translation'],
    },
  ];

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
    { name: 'AI for Social Good' },
    { name: 'Future of AI' },
    { name: 'AI in Transportation' },
    { name: 'AI Hardware' },
    { name: 'AI Software Tools' },
    { name: 'Ethical AI Practices' },
    { name: 'AI in Gaming' },
    { name: 'AI in Manufacturing' },
    { name: 'AI for Cybersecurity' },
    { name: 'AI Project Management' },
  ];

  const toggleModal = (folder) => {
    setSelectedFolder(folder);
    setIsModalOpen(!isModalOpen);
  };

  const truncateString = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + '...';
    } else {
      return str;
    }
  };

  return (
    <DashboardLayout>
      <div className="dashboard">
        <div className="collection">
          <p className="collection-heading"> Collections</p>
          <div className="icons">
            {mockFolders.map((folder, index) => (
              <div key={index} className="icon-container">
                <BiSolidCollection />
                <span
                  className="three-dots"
                  onClick={() => toggleModal(folder)}
                >
                  •••
                </span>
              </div>
            ))}
          </div>

          {isModalOpen && selectedFolder && (
            <div className="modal">
              <div className="modal-wrapper">
                <h3 className="modal-heading">{selectedFolder.name}</h3>
                <button
                  className="modal-closebtn"
                  onClick={() => setIsModalOpen(false)}
                >
                  <RxCross2 />
                </button>
              </div>
              <ul>
                {selectedFolder.items.map((item, index) => (
                  <li className="modal-list" key={index}>
                    <FaFolderOpen
                      style={{
                        marginRight: '8px',
                        fontSize: '1.5rem',
                        color: 'gray',
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="files">
          <p className="files-heading">Ai Assessments</p>
          <div className="file-list">
            {mockFiles.map((file, index) => (
              <div key={index} className="file-item">
                <PiFilesFill style={{ fontSize: '6rem', color: 'gray' }} />
                <span>{truncateString(file.name, 6)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="folders">
          <p className="files-heading">Ai Assisstant</p>
          <FileStructure />
        </div>

        <style>{`
        .dashboard {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          // padding: 20px;
        }
        .collection{
        padding:0 2.5rem;
        }
        .icons {
          display: flex;
          flex-wrap: wrap;
          color:gray;
          font-size:6rem;
          gap: 10px;
        }
          .collection-heading{
          font-size: 2.5rem;
          display:flex;
          align-items: center;
          justify-content: center;
          margin-top:2rem;
          margin-bottom:4rem;
          font-weight: 600;
          background-color:#f2f9cf;
          padding:5rem;
          border-radius:1rem;
          }
        .icon-container {
          position: relative;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          &:hover{
          border-radius:0.5rem;
          color:black;
          }
        }
        .three-dots {
          position: absolute;
          top: -0.3rem;
          left: 5rem;
          color:black;
          font-size: 1.3rem;
          cursor: pointer;
        }
        .modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          padding: 20px;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.3  );
          border-radius:1rem;
        }
          .modal-wrapper{
          display:flex;
          align-items:center;
          justify-content: space-between;
          gap:2rem;

          }
          .modal-heading{
          font-size: 2rem;
          padding:1rem 0;
          }
          .modal-list{
          list-style: none;
          font-size:1.5rem;
          padding:1rem 0.7rem;
          transition: all 0.2s ease-in-out;
          border-radius: 0.5rem;
          &:hover{
          background-color: lightgray;
          cursor:pointer;
          }
          }
          .modal-closebtn{
          border:none;
          outline:none;
          background-color: lightgray;
          display:flex;
          font-size:2rem;
          padding:0.5rem;
          border-radius:50%;
          }
          .files{
          padding:0 2rem;
          }
          .files-heading{
          font-size: 2.5rem;
          display:flex;
          font-weight:600;
          margin-top:3rem;
          margin-bottom:3rem;
          padding:0 2rem;
          }
        .file-list {
          display: flex;
          flex-wrap:wrap;
          flex-direction: row;
          gap: 1rem;
        }
        .file-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          colro:gray;
          cursor:pointer;
          font-size: 1.25rem;
          gap:1rem;
        }
        .file-item span {
          margin-left: 8px;
        }
          .folders{
          padding:0 2rem;
          }
      `}</style>
      </div>
    </DashboardLayout>
  );
};

DashboardHome.propTypes = {
  folders: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
  files: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ),
  additionalComponent: PropTypes.node,
};

export default DashboardHome;
