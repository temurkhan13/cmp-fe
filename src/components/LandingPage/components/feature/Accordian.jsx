import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const Accordian = (props) => {
  const { title, desc, isOpen, onClick } = props; // Destructure props

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={onClick}>
        {title}
        <FaArrowRight className={isOpen ? 'icon-rotate' : 'icon'} />
      </div>
      <div className={`accordion-body ${isOpen ? 'open' : ''}`}>{desc}</div>
      <style>
        {`
          .accordion {
            border-radius: 8px;
            margin-bottom: 15px;
            background-color: #f9f9f9;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            transition: box-shadow 0.3s ease;
          }

          .accordion:hover {
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
          }

          .accordion-header {
            padding: 15px 25px;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: bold;
            background-color: #fff;
            border-bottom: 1px solid #ddd;
            transition: background-color 0.3s ease;
            position: relative;
          }

          .accordion-header:hover {
            background-color: #f1f1f1;
          }

          .accordion-body {
            padding: 0 25px;
            max-height: 0;
            opacity: 0;
            overflow: hidden;
            transition: all 0.5s ease, opacity 0.3s ease-out;
          }

          .accordion-body.open {
            max-height: 500px;
            opacity: 1;
            padding: 15px 25px;
          }

          .icon {
            font-size: 18px;
            transition: transform 0.3s ease-out;
            position: absolute;
            right: 15px;
          }

          .icon-rotate {
            font-size: 18px;
            position: absolute;
            right: 15px;
            transform: rotate(90deg);
          }
        `}
      </style>
    </div>
  );
};

export default Accordian;
