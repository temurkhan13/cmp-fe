import { FaArrowRight } from 'react-icons/fa';
import '../../landing-page.scss';

const Accordian = (props) => {
  const { title, desc, isOpen, onClick } = props;

  return (
    <div className="landing-accordion">
      <div onClick={onClick} className="landing-accordion__header">
        {title}
        <FaArrowRight
          className={`landing-accordion__arrow ${isOpen ? 'landing-accordion__arrow--open' : 'landing-accordion__arrow--closed'}`}
        />
      </div>
      <div className={`landing-accordion__body ${isOpen ? 'landing-accordion__body--open' : 'landing-accordion__body--closed'}`}>
        {desc}
      </div>
    </div>
  );
};

export default Accordian;
