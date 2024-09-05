import { useState } from 'react';
import MainCard from '../../feature/MainCard';
import { MainImg, MainImg2, MainImg3 } from '../../../assets';

const cards = [
  {
    title: 'Digital Playbook',
    desc: (
      <>
        A digital playbook that generates sitemaps and wireframes is a strategic
        tool that streamlines the planning and design process, ensuring
        consistent and efficient website development.
      </>
    ),
  },
  {
    title: 'AI Assessment',
    desc: (
      <>
        An AI assessment tool that generates questionnaires and tests for users
        automates and personalizes the evaluation process, enhancing accuracy
        and efficiency in measuring skills and knowledge.
      </>
    ),
  },
  {
    title: 'AI Assistant',
    desc: (
      <>
        An AI assistant integrated into a digital playbook helps users
        efficiently navigate and complete tasks, providing real-time support and
        guidance throughout the process.
      </>
    ),
  },
];

const Main = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleMouseEnter = (card) => {
    console.log(`Mouse entered: ${card}`);
    setHoveredCard(card);
  };

  const handleMouseLeave = () => {
    console.log('Mouse left');
    setHoveredCard(null);
  };

  const getImage = () => {
    switch (hoveredCard) {
      case 'Digital Playbook':
        return MainImg;
      case 'AI Assessment':
        return MainImg2;
      case 'AI Assistant':
        return MainImg3;
      default:
        return MainImg;
    }
  };

  return (
    <div className="main-container">
      <h1 className="heading-small hidden lg:block">
        Develop your documentation
        <br /> with <span />
        <span className="change-ai-heading">Change AI</span>
      </h1>
      <div className="card-grid">
        {cards.map((x) => (
          <MainCard
            title={x.title}
            desc={x.desc}
            onMouseEnter={() => handleMouseEnter(x.title)}
            onMouseLeave={handleMouseLeave}
            key={x.title}
          />
        ))}
      </div>
      <div className="image-container">
        <img src={getImage()} alt="Main visual" />
      </div>
      <style>{`
        .main-container {
          margin-top: 6.25rem;
        }

        @media (min-width: 640px) {
          .main-container {
            margin-top: 15.625rem;
          }
        }

        @media (min-width: 1024px) {
          .main-container {
            margin-top: 25rem;
          }
        }

        /* Headings */
        .heading-small {
          font-size: 2.5rem;
          text-align: center;
          font-weight: 600;
          margin-bottom: 3rem;
        }

        .change-ai-heading {
          font-size: 4rem;
          background: linear-gradient(90deg, #47beba 0%, #c3e11d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }

        /* Grid layout */
        .card-grid {
          width: 95%;
          margin: auto;
          display: grid;
          gap: 1.5625rem;
          grid-template-columns: repeat(1, 1fr);
        }

        @media (min-width: 768px) {
          .card-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .card-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .image-container {
          display: flex;
          justify-content: center;
          margin-top: 1.25rem;
        }

        .image-container img {
          width: 70%;
          border-radius: 1.5rem;
          box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Main;
