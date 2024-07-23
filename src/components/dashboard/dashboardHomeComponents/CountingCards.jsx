import card1 from '../../../assets/dashboard/card1.svg';

import { PiFilesFill } from 'react-icons/pi';
import { FaNetworkWired } from 'react-icons/fa';
import { BiSolidCollection, BiSolidFolderOpen } from 'react-icons/bi';

const cardData = [
  {
    icon: <BiSolidCollection style={{ fontSize: '3.5rem', color: 'gray ' }} />,
    title: 'WorkSpaces',
    count: 30,
    background: card1,
  },
  {
    icon: <PiFilesFill style={{ fontSize: '3.5rem', color: 'gray' }} />,
    title: 'Assessments',
    count: 30,
    background: card1,
  },
  {
    icon: <BiSolidFolderOpen style={{ fontSize: '3.5rem', color: 'gray' }} />,
    title: 'Chat Assistants',
    count: 30,
    background: card1,
  },
  {
    icon: <FaNetworkWired style={{ fontSize: '3.5rem', color: 'gray' }} />,
    title: 'Wireframes',
    count: 30,
    background: card1,
  },
];

const CountingCards = () => {
  return (
    <div className="counting-cards">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="dashboard-card"
          style={{
            background: `url(${card.background}) no-repeat`,
            backgroundSize: 'cover',
          }}
        >
          <div className="count-heading">
            <div>{card.icon}</div>
            <div>{card.title}</div>
          </div>
          <div
            className="counts"
            style={{
              fontSize: `${String(card.count).length > 3 ? '2.8rem' : '5rem'}`,
            }}
          >
            {card.count}
          </div>
        </div>
      ))}
      <style>{`
         .counting-cards {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1rem;
          margin: 1rem 2rem;
        }

        @media screen and (max-width: 1240px) {
          .counting-cards {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }
          .dashboard-card {
          display: flex;
          flex-direction: column;
          padding: 1rem;
          align-items: center;
          justify-content: space-around;
          width: 30rem;
          height: 15rem;
          background-position: right;
          transition: all 0.1s linear;
          border-radius: 2rem !important;
          background-color: white !important;
        }

        @media screen and (max-width: 1240px) {
          .dashboard-card {
            width: auto;
            height: 20rem;
          }
        }

        .count-heading {
          font-size: 2rem;
          font-weight: 500;
          display: flex;
          flex-direction: row-reverse;
          align-items: flex-start;
          width: 100%;
          padding: 0 1rem;
          justify-content: space-between;
        }

        .counts {
          font-weight: bold;
          color: gray;
          width: 100%;
          margin-left: 2rem;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
        }
      `}</style>
    </div>
  );
};

export default CountingCards;
