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
        Develop your documentation at{' '}
        <span className="text-gradient font-bold">Change AI</span>
      </h1>
      <div className="card-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
      <style>
        {`
        .main-container {
  margin-top: 100px;
}

@media (min-width: 640px) {
  .main-container {
    margin-top: 250px;
  }
}

@media (min-width: 1024px) {
  .main-container {
    margin-top: 400px;
  }
}

/* Headings */
.heading-large {
  font-size: 40px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 56px;
}

.heading-medium {
  font-size: 30px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 56px;
}

.heading-small {
  font-size: 25px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 56px;
}

/* Text gradient */
.text-gradient {
  background: linear-gradient(to right, #ff7e5f, #feb47b); /* Adjust colors as needed */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Grid layout */
.card-grid {
  width: 80%;
  margin: auto;
  display: grid;
  gap: 25px;
}

.card-grid.grid-cols-1 {
  grid-template-columns: repeat(1, 1fr);
}

@media (min-width: 786px) {
  .card-grid.grid-cols-1 {
  grid-template-columns: repeat(2, 1fr);
}
}

@media (min-width: 1024px) {
  .card-grid.grid-cols-1 {
  grid-template-columns: repeat(3, 1fr);
}
}


/* Image container */
.image-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.image-container img {
  width: 70%;
  border-radius: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Adjust shadow as needed */
}
        `}
      </style>
    </div>
  );
};

export default Main;
