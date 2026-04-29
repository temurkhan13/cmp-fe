import { useState } from 'react';
import { faqsLogo } from '../../../assets';
import { Accordian } from '../../feature/Index.js'; // Adjust path to your assets

const accordianData = [
  {
    title: 'Is there a free trial available?',
    desc: "Yes, we offer a free Starter plan that lets you explore the AI Assistant, run up to 3 assessments per month, and create your first Digital Playbook — no credit card required.",
    count: 1,
  },
  {
    title: 'Can I change my plan later?',
    desc: "Absolutely. You can upgrade or downgrade your plan at any time from the Plan & Billing section in your dashboard. Changes take effect immediately and billing is adjusted accordingly.",
    count: 2,
  },
  {
    title: 'How does support work?',
    desc: "You can reach our support team through the Help Center in your dashboard, or by emailing support@changeai.com. Professional and Enterprise plans include priority support with faster response times.",
    count: 3,
  },
  {
    title: 'Do you provide tutorials?',
    desc: "Yes, our Help Center includes step-by-step guides for every feature — from running your first AI assessment to building a Digital Playbook. We also offer onboarding sessions for Enterprise customers.",
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
        <h2 className="faqs-heading">Frequently Asked Questions</h2>
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
    </div>
  );
};

export default FAQs;
