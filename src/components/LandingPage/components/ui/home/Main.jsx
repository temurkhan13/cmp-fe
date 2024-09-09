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
  const [hoveredCard, setHoveredCard] = useState(cards[0].title); // Set default to the first card

  const handleMouseEnter = (card) => {
    setHoveredCard(card); // Only update the hovered card when a new card is hovered
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
      <div className="content-grid">
        <div className="card-grid">
          {cards.map((x) => (
            <MainCard
              title={x.title}
              desc={x.desc}
              onMouseEnter={() => handleMouseEnter(x.title)}
              key={x.title}
            />
          ))}
        </div>
        <div className="image-container">
          <img src={getImage()} alt="Main visual" />
        </div>
      </div>
      <style>{`
        .main-container {
          margin-top: 3rem;
          padding: 1rem;
        }

        @media (min-width: 640px) {
          .main-container {
            margin-top: 6rem;
          }
        }

        @media (min-width: 1024px) {
          .main-container {
            margin-top: 45rem;
          }
        }

        /* Headings */
        .heading-small {
          font-size: 2rem;
          text-align: center;
          font-weight: 600;
          margin-bottom: 2rem;
        }

        @media (min-width: 768px) {
          .heading-small {
            font-size: 2.5rem;
            margin-bottom: 3rem;
          }
        }

        .change-ai-heading {
          font-size: 3rem;
          background: linear-gradient(90deg, #47beba 0%, #c3e11d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }

        @media (min-width: 768px) {
          .change-ai-heading {
            font-size: 4rem;
          }
        }

        .content-grid {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .content-grid {
            flex-direction: row;
            justify-content: space-between;
            width: 95%;
            margin: 0 auto;
            gap: 3rem;
          }
        }

        /* Grid layout */
        .card-grid {
          width: 100%;
          display: grid;
          grid-column-order:reverse;
          grid-template-columns: repeat(1, 1fr);
          // gap: 2rem;
        }

        @media (min-width: 768px) {
          .card-grid {
            grid-template-columns: repeat(1, 1fr);
            width: 35%;
          }
        }

        .image-container {
          display: flex;
          justify-content: center;
          background: linear-gradient(120deg, #47beba 0%, #c3e11d 100%);
          padding: 2rem;
          border-radius: 2rem;
          width: 100%;
        }

        @media (max-width: 767px) {
          .image-container {
            display: none;
          }
        }

        @media (max-width: 768px) {
            .main-container {
            margin-top: 20rem;
          }
        }

        .image-container img {
          width: 100%;
          border-radius: 1.5rem;
          box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
        }

        /* Cards */
        .card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .card:hover {
          transform: translateY(-0.5rem);
          box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
        }

        .card h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .card p {
          color: #4a5568;
          font-size: 1.5rem;
          // line-height: 1.5;
        }
      `}</style>
    </div>
  );
};

export default Main;
