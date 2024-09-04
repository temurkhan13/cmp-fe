import { faqsLogo } from '../../../assets';
import Accordian from '../../feature/Accordian'; // Adjust import path if necessary

const accordianData = [
  {
    title: 'Is there a free trial available?',
    desc: "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free 30-minute onboarding call to get you up and running. Book a call here.",
    count: 1,
  },
  {
    title: 'Can I change my plan later?',
    desc: "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free 30-minute onboarding call to get you up and running. Book a call here.",
    count: 2,
  },
  {
    title: 'How does support work?',
    desc: "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free 30-minute onboarding call to get you up and running. Book a call here.",
    count: 3,
  },
  {
    title: 'Do you provide tutorials?',
    desc: "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free 30-minute onboarding call to get you up and running. Book a call here.",
    count: 4,
  },
  {
    title: 'What is your cancellation policy?',
    desc: "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free 30-minute onboarding call to get you up and running. Book a call here.",
    count: 5,
  },
  {
    title: 'How do I change my account email?',
    desc: "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free 30-minute onboarding call to get you up and running. Book a call here.",
    count: 6,
  },
  {
    title: 'How does billing work?',
    desc: "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free 30-minute onboarding call to get you up and running. Book a call here.",
    count: 7,
  },
  {
    title: 'Can other info be added to an invoice?',
    desc: "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free 30-minute onboarding call to get you up and running. Book a call here.",
    count: 8,
  },
];

const FAQs = () => {
  return (
    <div className="faqs">
      <div className="faq1">
        <img src={faqsLogo} alt="" />
        <h2>Frequently Asked Questions.</h2>
      </div>
      <div className="faq2">
        {accordianData.map((item) => (
          <Accordian
            key={item.count}
            title={item.title}
            desc={item.desc}
            count={item.count}
          />
        ))}
      </div>
      <div className="faq3">
        <h1>Need Personal Assistance?</h1>
        <h5>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore <br /> magna
          aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut <br /> labore et dolore magna aliqua.
        </h5>
        <button>Contact Us</button>
      </div>
      <style>
        {`
      .faqs{
      margin: 50px 0;
      font-size:1.5rem;
      }
      .faq1{
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      font-size: 40px;
      font-weight: 600;
      }
      .faq2{
      width: 70%;
      margin:0 auto;
      margin-top: 50px;
      }
      .faq3{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 40px;
      font-weight: 600;
      margin-top: 20px;
      }
      .faq3 h1{
      font-size: 40px;
      }
      .faq3 h5{
      font-size: 1.5rem;
      font-weight: 300;
      margin: 10px 0;
      }
      .faq3 button{
      background-color: #b4ff00;
      border-radius: 999px;
      padding: 10px 53px;
      font-size: 20px;
      font-weight: 500;
      border:none;
      }
      `}
      </style>
    </div>
  );
};

export default FAQs;
