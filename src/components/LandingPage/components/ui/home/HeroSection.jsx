import { DottedBg, heroBg, heroBg2, MainBg } from '../../../assets';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../common/Button';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-section">
      <img className="main-bg" src={MainBg} alt="ChangeAI platform illustration" />
      <img className="dotted-bg" src={DottedBg} alt="" role="presentation" />
      <div className="hero-content">
        <h1 className="hero-text" style={{ backgroundImage: `url(${heroBg})` }}>
          Transforming the <br /> future of <br /> Documentation
        </h1>
        <Button
          variant="primary"
          size="lg"
          className="demo-button"
          iconRight={<FaArrowRight className="hero-rotate-icon" />}
          onClick={() => {
            navigate('/sign-up');
          }}
        >
          Get Free Demo
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
