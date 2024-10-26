import React, { useState } from 'react';
import { faqsLogo } from '../../../assets';
import { Accordian } from '../../feature/Index.js'; // Adjust path to your assets

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
];

const FAQs = () => {
  const [openAccordion, setOpenAccordion] = useState(null); // Track currently open accordion

  const handleOpenAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index); // Toggle open/close
  };

  return (
    <div className="faqs">
      <div className="faq1">
        <img src={faqsLogo} alt="FAQs Logo" />
        <h2>Frequently Asked Questions</h2>
      </div>
      <div className="faq2">
        {accordianData.map((item, index) => (
          <Accordian
            key={item.count}
            title={item.title}
            desc={item.desc}
            count={item.count}
            isOpen={openAccordion === index} // Check if this accordion is open
            onClick={() => handleOpenAccordion(index)} // Handle the accordion click
          />
        ))}
      </div>
      <style>
        {`
          .faqs {
            margin: 50px;
            font-size: 1.5rem;
            width: 80%;
            margin-left: auto;
            margin-right: auto;
            font-family: 'Arial', sans-serif;
          }

          .faq1 {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            font-size: 40px;
            font-weight: 600;
            margin-bottom: 30px;
          }

          .faq2 {
            width: 100%;
            margin: 20px 0px 20px 0px;
            padding-bottom: 10px;
          }

          h2 {
            font-size: 36px;
            font-weight: bold;
            margin-bottom: 30px;
            color: #333;
          }
        `}
      </style>
    </div>
  );
};

export default FAQs;
