import FeaturesCard from '../../feature/FeaturesCard'; // Ensure the correct import path
import {
  feature1,
  feature2,
  feature3,
  feature4,
  feature5,
  feature6,
} from '../../../assets';

const cards = [
  {
    title: <>Digital Playbook</>,
    desc: (
      <>
        Use digital playbook to design and generate <br /> your own reports.
      </>
    ),
    img: feature1,
  },
  {
    title: <>Chat Assistant</>,
    desc: (
      <>
        Our chat assistant is available 24/7 to help <br /> you with any query
        you have in your mind.
      </>
    ),
    img: feature2,
  },
  {
    title: <>AI Assessment</>,
    desc: (
      <>
        Prepare yourself for AI assessment and go <br /> through some technical
        evaluation.
      </>
    ),
    img: feature3,
  },
  {
    title: <>Automated Reports</>,
    desc: (
      <>
        Reports generated will be in different formats <br /> so you can use
        them according to your will.
      </>
    ),
    img: feature4,
  },
  {
    title: <>AI Data Visualization</>,
    desc: (
      <>
        Our AI will show you the data in orderly <br /> form and create a
        complete roadmap.
      </>
    ),
    img: feature5,
  },
  {
    title: <>Product Sitemaps & Structure</>,
    desc: (
      <>
        Sitemaps & content data structure allows <br /> you to understand your
        query deeply.
      </>
    ),
    img: feature6,
  },
];

const Features = () => {
  return (
    <div className="feature px-4 md:px-10 lg:px-20">
      <h1 className="">Our Features</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((x, index) => (
          <FeaturesCard key={index} title={x.title} desc={x.desc} img={x.img} />
        ))}
      </div>
      <style>
        {`
        .feature{
        padding: 30px 100px;
        }
        .feature h1{
        font-weight: bold;
        color: #00316F;
        text-align: center;
        margin: 15px 0;
        }
        .feature div{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap:20px;
        }
        @media screen and (max-width: 768px) {
         .feature div{
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          }
          .feature{
          padding: 30px 50px;
          }
        }
        `}
      </style>
    </div>
  );
};

export default Features;
