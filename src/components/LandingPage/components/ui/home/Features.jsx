import FeaturesCard from '../../feature/FeaturesCard'; // Ensure the correct import path
import {
  feature1,
  feature2,
  feature3,
  feature4,
  feature5,
  feature6,
} from '../../../assets'; // Adjust the import paths as needed

const cards = [
  {
    title: 'Digital Playbook',
    desc: 'Use digital playbook to design and generate your own reports.',
    img: feature1,
  },
  {
    title: 'Chat Assistant',
    desc: 'Our chat assistant is available 24/7 to help you with any query you have in your mind.',
    img: feature2,
  },
  {
    title: 'AI Assessment',
    desc: 'Prepare yourself for AI assessment and go through some technical evaluation.',
    img: feature3,
  },
  {
    title: 'Automated Reports',
    desc: 'Reports generated will be in different formats so you can use them according to your will.',
    img: feature4,
  },
  {
    title: 'AI Data Visualization',
    desc: 'Our AI will show you the data in orderly form and create a complete roadmap.',
    img: feature5,
  },
  {
    title: 'Product Sitemaps & Structure',
    desc: 'Sitemaps & content data structure allows you to understand your query deeply.',
    img: feature6,
  },
];

const Features = () => {
  return (
    <div className="features-container">
      <h2 className="features-title">Our Features</h2>
      <div className="features-grid">
        {cards.map((card, index) => (
          <FeaturesCard
            key={index}
            title={card.title}
            desc={card.desc}
            img={card.img}
          />
        ))}
      </div>
    </div>
  );
};

export default Features;
