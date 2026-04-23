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
      <h2 className="heading-small hidden lg:block">
        Develop your documentation
        <br /> with <span />
        <span className="change-ai-heading">Change AI</span>
      </h2>
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
        <div className="main-image-container">
          <img src={getImage()} alt="Main visual" />
        </div>
      </div>
    </div>
  );
};

export default Main;
